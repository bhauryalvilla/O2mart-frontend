import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const TailwindButton = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "gradient-button hover:shadow-lg hover:shadow-green-500/50 text-white focus:ring-green-400 ring-offset-green-50/20",
    secondary:
      "bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300 focus:ring-emerald-400",
    outline:
      "border-2 border-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 text-green-600 hover:text-white focus:ring-green-400",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={buttonClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default TailwindButton;
