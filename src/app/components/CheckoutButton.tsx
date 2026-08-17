"use client";

import type { ReactNode } from "react";
import { PAYMENT_LINK } from "../lib/checkout";
import { trackCheckoutIniciado, type OrigemCheckout } from "../lib/analytics";

/**
 * Único caminho de compra da landing (RF-01/RF-03).
 *
 * Abre na mesma aba de propósito: o retorno para /obrigado precisa acontecer
 * na mesma janela para que o evento de conversão seja atribuído à visita.
 */
export function CheckoutButton({
  origem,
  children = "Quero minha TV Box",
  className = "",
}: {
  origem: OrigemCheckout;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={PAYMENT_LINK}
      data-evento="checkout_iniciado"
      onClick={() => trackCheckoutIniciado(origem)}
      className={`font-heading inline-block rounded-full bg-cyan px-8 py-3.5 text-sm font-semibold text-navy-deep transition hover:brightness-110 ${className}`}
    >
      {children}
    </a>
  );
}
