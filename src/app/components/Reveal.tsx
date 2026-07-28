"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Garante que o estado inicial (escondido) chegou a ser pintado
          // antes de disparar a transição — sem isso, elementos já visíveis
          // no load (hero) pulam direto pro estado final sem animar.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setVisible(true));
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`inline-block overflow-hidden align-bottom ${className}`}
    >
      <span
        className={`inline-block transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible
            ? "translate-y-0 opacity-100 blur-none"
            : "translate-y-full opacity-0 blur-md"
        }`}
        style={{ transitionDelay: `${index * 60}ms` }}
      >
        {children}
      </span>
    </span>
  );
}

export function RevealText({
  text,
  startIndex = 0,
}: {
  text: string;
  startIndex?: number;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <Reveal index={startIndex + i}>{word}</Reveal>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}
