import type { ReactNode } from "react";

type Size = "sm" | "md" | "lg";

interface LoadingProps {
  text?: string;

  size?: Size;

  fullScreen?: boolean;

  children?: ReactNode;
}

export default function Loading({
  text = "Loading...",
  size = "md",
  fullScreen = false,
  children,
}: LoadingProps) {
  const sizes = {
    sm: "h-4 w-4 border-2",

    md: "h-8 w-8 border-4",

    lg: "h-12 w-12 border-4",
  };

  const content = (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-3
      "
    >
      <span
        className={`
          animate-spin
          rounded-full
          border-blue-600
          border-t-transparent
          ${sizes[size]}
        `}
      />

      {children ?? (
        <span
          className="
            text-sm
            text-gray-600
          "
        >
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="
          fixed
          inset-0
          z-50

          flex
          items-center
          justify-center

          bg-white/70
          backdrop-blur-sm
        "
      >
        {content}
      </div>
    );
  }

  return content;
}
