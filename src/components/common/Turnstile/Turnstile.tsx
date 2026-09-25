import React, { useEffect, useImperativeHandle, useRef } from "react";

// Clave pública del widget (Cloudflare → Turnstile). No es secreta: viaja en el
// bundle igual que la de ConfigCat. Si falta, el componente no hace nada y las
// peticiones salen sin token, que es lo que espera un backend que todavía no
// exige la verificación.
const SITE_KEY = process.env.TURNSTILE_SITE_KEY || "";

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

// Cuánto espera el envío a que el widget termine de verificar antes de mandar
// la petición sin token. Normalmente tarda un segundo o dos desde que carga.
const TOKEN_WAIT_MS = 8000;

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      appearance: "always" | "execute" | "interaction-only";
      language: string;
      callback: (token: string) => void;
      "error-callback": () => void;
      "expired-callback": () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<TurnstileApi> | null = null;

// El script se pide una sola vez aunque haya varios widgets en la sesión. Si
// falla (un bloqueador de contenido, sin red) se descarta la promesa para
// poder reintentar al volver a montar el componente.
const loadTurnstile = (): Promise<TurnstileApi> => {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () =>
      window.turnstile
        ? resolve(window.turnstile)
        : reject(new Error("turnstile no disponible"));
    script.onerror = () => reject(new Error("no se pudo cargar turnstile"));
    document.head.appendChild(script);
  }).catch((error) => {
    scriptPromise = null;
    throw error;
  });

  return scriptPromise;
};

export interface TurnstileHandle {
  /** Token vigente; espera a que el widget termine y devuelve `undefined` si no llega. */
  getToken: () => Promise<string | undefined>;
  /** Un token vale una sola vez: pedir uno nuevo después de cada envío. */
  reset: () => void;
}

interface TurnstileProps {
  /** Debe coincidir con lo que verifica el backend: un token de un formulario no sirve en otro. */
  action: "checkout" | "contact";
  ref?: React.Ref<TurnstileHandle>;
}

/**
 * Captcha de Cloudflare. Solo se ve cuando Cloudflare no logra decidir en
 * silencio que quien escribe es una persona (`interaction-only`).
 */
export const Turnstile: React.FC<TurnstileProps> = ({ action, ref }) => {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const token = useRef<string | undefined>(undefined);
  const failed = useRef(false);
  const waiters = useRef<((value: string | undefined) => void)[]>([]);

  const flush = (value: string | undefined) => {
    waiters.current.forEach((resolve) => resolve(value));
    waiters.current = [];
  };

  useImperativeHandle(ref, () => ({
    getToken: () => {
      if (!SITE_KEY || failed.current) return Promise.resolve(undefined);
      if (token.current) return Promise.resolve(token.current);

      return new Promise<string | undefined>((resolve) => {
        const onToken = (value: string | undefined) => {
          clearTimeout(timer);
          resolve(value);
        };
        const timer = setTimeout(() => {
          waiters.current = waiters.current.filter((w) => w !== onToken);
          resolve(undefined);
        }, TOKEN_WAIT_MS);

        waiters.current.push(onToken);
      });
    },
    reset: () => {
      token.current = undefined;
      if (widgetId.current && window.turnstile) {
        window.turnstile.reset(widgetId.current);
      }
    },
  }));

  useEffect(() => {
    if (!SITE_KEY) return;

    let cancelled = false;

    loadTurnstile()
      .then((api) => {
        if (cancelled || !container.current) return;

        widgetId.current = api.render(container.current, {
          sitekey: SITE_KEY,
          action,
          appearance: "interaction-only",
          language: "es",
          callback: (value) => {
            token.current = value;
            flush(value);
          },
          // Un token vence a los 5 minutos: el widget pide otro solo, pero
          // hasta entonces el que teníamos ya no sirve.
          "expired-callback": () => {
            token.current = undefined;
          },
          "error-callback": () => {
            token.current = undefined;
            flush(undefined);
          },
        });
      })
      .catch(() => {
        failed.current = true;
        flush(undefined);
      });

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
      }
      widgetId.current = null;
    };
  }, [action]);

  if (!SITE_KEY) return null;

  return <div ref={container} className="fmc-turnstile" />;
};
