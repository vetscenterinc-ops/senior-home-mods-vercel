import React from "react";

export interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
}

export function PageTitle({
  as: Component = "h1",
  children,
  className = "",
  ...props
}: PageTitleProps) {
  return (
    <Component
      className={`
        font-[family-name:var(--font-fraunces)] font-semibold text-[32px] sm:text-[36px]
        leading-[1.12] tracking-tight text-navy
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
}
