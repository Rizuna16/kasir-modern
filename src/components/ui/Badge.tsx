interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "danger" | "warning" | "info" | "secondary";
}

export default function Badge({ children, variant = "secondary" }: BadgeProps) {
  const variants = {
    success: "bg-green-100 text-green-700 border border-green-200",

    danger: "bg-red-100 text-red-700 border border-red-200",

    warning: "bg-yellow-100 text-yellow-700 border border-yellow-200",

    info: "bg-blue-100 text-blue-700 border border-blue-200",

    secondary: "bg-gray-100 text-gray-700 border border-gray-200",
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
