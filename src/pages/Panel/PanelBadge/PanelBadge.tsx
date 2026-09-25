import React from "react";

// Mismos cinco colores del correo de confirmación y del plan de trabajo del
// backend: nuevo/plum, en curso/wait, entregado o autorizado/done,
// cancelado o fallido/block, neutro/muted.
export type PanelBadgeVariant = "plum" | "wait" | "done" | "block" | "muted";

interface PanelBadgeProps {
  variant: PanelBadgeVariant;
  children: React.ReactNode;
}

export const PanelBadge: React.FC<PanelBadgeProps> = ({
  variant,
  children,
}) => (
  <span className={`fmc-panel__badge fmc-panel__badge--${variant}`}>
    {children}
  </span>
);
