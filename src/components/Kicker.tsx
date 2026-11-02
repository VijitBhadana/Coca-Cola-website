import type { CSSProperties, ReactNode } from "react";

type Props = { className?: string; style?: CSSProperties; children: ReactNode };

export default function Kicker({ className = "", style, children }: Props) {
  return (
    <p
      className={`mb-[14px] text-[13px] font-extrabold uppercase tracking-[0.22em] text-(--accent) [transition:color_0.5s_ease] ${className}`}
      style={style}
    >
      {children}
    </p>
  );
}
