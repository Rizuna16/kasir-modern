import type { ReactNode } from "react";

interface FormSectionProps {
  title?: string;

  description?: string;

  children: ReactNode;
}

export default function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <div
      className="
        space-y-4
      "
    >
      {(title || description) && (
        <div>
          {title && (
            <h3
              className="
                text-base
                font-semibold
                text-gray-800
              "
            >
              {title}
            </h3>
          )}

          {description && (
            <p
              className="
                mt-1
                text-sm
                text-gray-500
              "
            >
              {description}
            </p>
          )}
        </div>
      )}

      <div>{children}</div>
    </div>
  );
}
