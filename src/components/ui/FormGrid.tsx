import type { ReactNode } from "react";

interface FormGridProps {
  children: ReactNode;

  cols?: 1 | 2 | 3;
}

export default function FormGrid({ children, cols = 2 }: FormGridProps) {
  const columns = {
    1: "grid-cols-1",

    2: "grid-cols-1 md:grid-cols-2",

    3: "grid-cols-1 md:grid-cols-3",
  };

  return (
    <div
      className={`
        grid

        gap-4

        ${columns[cols]}
      `}
    >
      {children}
    </div>
  );
}
