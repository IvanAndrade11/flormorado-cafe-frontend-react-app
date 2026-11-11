import { Title } from "@/components/ui";
import {
  CONSUMER_AUTHORITY,
  DATA_CONTROLLER,
  DELIVERY_WINDOW,
  FREE_SHIPPING_FROM,
  TERMS,
  URLS,
} from "@/utils/constants";

import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const cop = (value: number) => `$${value.toLocaleString("es-CO")}`;

export const Terms: React.FC = () => {
  return (
    <div className="container py-4 fmc-legal">
      <Title title="TÉRMINOS Y CONDICIONES" />

      <p className="fmc-legal__intro">
        Estas son las condiciones de compra en {DATA_CONTROLLER.site}. Las
        escribimos para cumplir el Estatuto del Consumidor —la Ley 1480 de 2011,
        reformada por la Ley 2439 de 2024— y para que sepas a qué atenerte antes
        de pagar. Nada de lo que digamos aquí puede quitarte un derecho que la
        ley te da.
      </p>

      <h2 className="h5 mt-4">1. Quién te vende</h2>
      <Table responsive bordered size="sm" className="fmc-legal__table">
        <tbody>
          <tr>
            <th scope="row">Vendedor</th>
            <td>
              {DATA_CONTROLLER.legalName} ({DATA_CONTROLLER.brand})
            </td>
          </tr>
          <tr>
            <th scope="row">{DATA_CONTROLLER.taxIdLabel}</th>
            <td>{DATA_CONTROLLER.taxId}</td>
          </tr>
          <tr>
            <th scope="row">Dirección de notificaciones</th>
            <td>
              {DATA_CONTROLLER.address}, {DATA_CONTROLLER.city}, Colombia
            </td>
          </tr>
          <tr>
            <th scope="row">Correo</th>
            <td>
              <a href={`mailto:${DATA_CONTROLLER.email}`}>
                {DATA_CONTROLLER.email}
              </a>
            </td>
          </tr>
          <tr>
            <th scope="row">Teléfono y WhatsApp</th>
            <td>
              <a href={DATA_CONTROLLER.phoneHref}>
                {DATA_CONTROLLER.phoneLabel}
              </a>
            </td>
          </tr>
        </tbody>
      </Table>

      <h2 className="h5 mt-4">2. Qué vendemos y dónde entregamos</h2>
      <p>
        Café tostado y harina de sagú, para consumo en casa. Entregamos en{" "}
        <strong>Bogotá D.C. y municipios aledaños</strong> — Soacha, Chía, Cota,
        Cajicá, La Calera, Mosquera y Funza. Si tu dirección queda fuera de esa
        zona no podemos despacharte, y el checkout no te dejará elegirla.
      </p>
      <p>
        Las fotos y descripciones buscan parecerse lo más posible al producto
        real. El café es un producto agrícola: el perfil de taza de un mismo
        origen puede variar entre cosechas.
      </p>

      <h2 className="h5 mt-4">3. Precios y costos de envío</h2>
      <ul>
        <li>
          Los precios están en <strong>pesos colombianos</strong> e incluyen los
          impuestos que apliquen.
        </li>
        <li>
          El envío se cobra aparte y lo ves antes de pagar. Es{" "}
          <strong>gratis</strong> a partir de {cop(FREE_SHIPPING_FROM)} de
          compra.
        </li>
        <li>
          Antes de confirmar verás el resumen con cada producto, su precio, el
          envío y el total exacto que vas a pagar. No hay cargos que aparezcan
          después.
        </li>
        <li>
          Si un precio cambió mientras tenías el carrito abierto, te lo decimos
          y te pedimos confirmar de nuevo. Nunca te cobramos un valor distinto
          al que aceptaste.
        </li>
      </ul>

      <h2 className="h5 mt-4">4. Cómo se cierra la compra</h2>
      <p>
        El pedido queda en firme cuando pulsas «Realizar pedido» y te mostramos
        la pantalla de confirmación con tu número. Enseguida te llega un correo
        con ese número, lo que compraste, el total con envío, el medio de pago y
        el tiempo de entrega. Ese correo es tu comprobante: guárdalo.
      </p>
      <p>
        Si no te llega en unos minutos, revisa el correo no deseado y
        escríbenos. Un pedido existe aunque el correo falle.
      </p>

      <h2 className="h5 mt-4">5. Medios de pago</h2>
      <ul>
        <li>
          <strong>Contraentrega:</strong> pagas al recibir.
        </li>
        <li>
          <strong>Transferencia por llave BRE-B:</strong> en la confirmación te
          mostramos la llave, el titular que tu banco debe mostrarte y el monto
          exacto. Empezamos a preparar el pedido cuando confirmamos el pago.
          Verifica siempre el nombre del titular antes de confirmar la
          transferencia.
        </li>
      </ul>

      <h2 className="h5 mt-4">6. Entrega</h2>
      <p>
        Entregamos en <strong>{DELIVERY_WINDOW}</strong> contados desde el día
        siguiente a tu pedido. Si pagas por transferencia, el plazo corre desde
        que confirmamos el pago.
      </p>
      <p>
        Si algo que pediste no está disponible, te avisamos de inmediato y
        acordamos contigo una nueva fecha o la devolución. Y si nos pasamos del
        plazo acordado, <strong>puedes terminar la compra</strong> y te
        devolvemos todo lo que pagaste, sin descuentos ni retenciones, en un
        máximo de <strong>quince días calendario</strong>.
      </p>

      <h2 className="h5 mt-4">7. Derecho de retracto</h2>
      <p>
        Como compras a distancia, tienes <strong>cinco días hábiles</strong>{" "}
        desde que recibes el pedido para arrepentirte sin dar explicaciones.
        Escríbenos a{" "}
        <a href={`mailto:${DATA_CONTROLLER.email}`}>{DATA_CONTROLLER.email}</a>{" "}
        con tu número de pedido.
      </p>
      <p>Con dos precisiones que conviene que sepas antes de comprar:</p>
      <ul>
        <li>
          <strong>
            El café en grano sellado y sin abrir sí admite retracto.
          </strong>{" "}
          Devuélvelo en las mismas condiciones en que lo recibiste. Los costos
          de la devolución corren por tu cuenta, como establece la ley.
        </li>
        <li>
          <strong>El café molido a tu pedido no.</strong> Lo molemos según la
          molienda que elegiste, así que es un producto personalizado, y el
          artículo 47 de la Ley 1480 excluye del retracto los bienes hechos
          conforme a las especificaciones del consumidor.
        </li>
      </ul>
      <p>
        Cuando el retracto aplique, te devolvemos el dinero en un máximo de{" "}
        <strong>quince días calendario</strong> desde que lo ejerces y nos
        devuelves el producto,{" "}
        <strong>por el medio de pago que prefieras</strong>. Dinos cuál al
        escribirnos.
      </p>

      <h2 className="h5 mt-4">8. Si algo llega mal</h2>
      <p>
        Esto no es el retracto: es la <strong>garantía legal</strong>, y existe
        aunque no la mencionáramos. Si el café llega en mal estado, abierto,
        vencido, o no corresponde a lo que pediste, escríbenos con tu número de
        pedido y una foto. <strong>Tú eliges</strong>: te reponemos el producto
        o te devolvemos el dinero.
      </p>
      <p>
        Avísanos apenas lo notes. En alimentos la garantía va atada a la fecha
        de vencimiento del producto, así que entre antes nos escribas, mejor
        podemos responder.
      </p>

      <h2 className="h5 mt-4">9. Reversión del pago</h2>
      <p>
        Si fuiste víctima de un fraude, si la compra no la hiciste tú, si el
        producto no te llegó o llegó defectuoso, la ley te permite pedir la{" "}
        <strong>reversión del pago</strong> ante tu banco y ante nosotros,
        dentro de los cinco días hábiles siguientes a que te enteres. Está en el
        artículo 51 de la Ley 1480 y no tienes que pedirnos permiso para usarlo.
      </p>

      <h2 className="h5 mt-4">10. Preguntas, quejas y reclamos</h2>
      <p>
        Usa el <Link to={URLS.contact}>formulario de contacto</Link>: al
        enviarlo te damos un número de radicado con su fecha y hora, para que
        puedas hacerle seguimiento mencionándolo. También puedes escribirnos a{" "}
        <a href={`mailto:${DATA_CONTROLLER.email}`}>{DATA_CONTROLLER.email}</a>{" "}
        o por{" "}
        <a
          href={DATA_CONTROLLER.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        .
      </p>
      <p>
        Si no quedas conforme, puedes acudir a la{" "}
        <a
          href={CONSUMER_AUTHORITY.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {CONSUMER_AUTHORITY.name}
        </a>
        , que es la autoridad de protección al consumidor en Colombia.
      </p>

      <h2 className="h5 mt-4">11. Tus datos personales</h2>
      <p>
        Qué datos recogemos, para qué y cómo los controlas está en la{" "}
        <Link to={URLS.privacy}>
          política de tratamiento de datos personales
        </Link>
        , que es parte de estas condiciones.
      </p>

      <h2 className="h5 mt-4">12. Cambios y vigencia</h2>
      <p>
        Versión {TERMS.version}, vigente desde el {TERMS.effectiveDate}. Si
        cambiamos estas condiciones, publicamos la versión nueva en esta misma
        página con su fecha. A tu pedido se le aplican las condiciones que
        estaban publicadas cuando lo hiciste, no las que vengan después.
      </p>
    </div>
  );
};
