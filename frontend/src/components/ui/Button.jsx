export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-green-700 text-white hover:bg-green-800",
    secondary:
      "border border-green-700 text-green-700 hover:bg-green-50",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      className={`rounded-xl font-semibold transition duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}