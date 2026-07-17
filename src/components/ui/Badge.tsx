interface BadgeProps {
  children: React.ReactNode;

  variant?: "success" | "danger" | "warning" | "info" | "secondary";
}

export default function Badge({ children, variant = "secondary" }: BadgeProps) {
  const variants = {
    success: `
        bg-green-100
        text-green-700
        border
        border-green-200

        dark:bg-green-900/40
        dark:text-green-300
        dark:border-green-800
      `,

    danger: `
        bg-red-100
        text-red-700
        border
        border-red-200

        dark:bg-red-900/40
        dark:text-red-300
        dark:border-red-800
      `,

    warning: `
        bg-yellow-100
        text-yellow-700
        border
        border-yellow-200

        dark:bg-yellow-900/40
        dark:text-yellow-300
        dark:border-yellow-800
      `,

    info: `
        bg-blue-100
        text-blue-700
        border
        border-blue-200

        dark:bg-blue-900/40
        dark:text-blue-300
        dark:border-blue-800
      `,

    secondary: `
        bg-gray-100
        text-gray-700
        border
        border-gray-200

        dark:bg-gray-800
        dark:text-gray-300
        dark:border-gray-700
      `,
  };

  return (
    <span
      className={`
        inline-flex

        items-center

        rounded-full

        px-3

        py-1

        text-xs

        font-medium

        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}
