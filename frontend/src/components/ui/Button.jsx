import clsx from "clsx";

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2 text-sm",
  lg: "px-7 py-3 text-base",
};

const variantStyles = {
  primary:
    "bg-primary text-primary-foreground hover:-translate-y-0.5 transition-all duration-300 ease-out",

  secondary:
    "bg-secondary text-secondary-foreground hover:bg-primary hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(196,106,27,0.35)] transition-all duration-300 ease-out",

  outline:
    "border border-border text-foreground bg-transparent hover:bg-secondary hover:text-secondary-foreground transition-all duration-300",

  ghost:
    "bg-transparent text-foreground hover:bg-muted transition-colors duration-200",
};

export const Button = ({
  children,
  size = "md",
  variant = "primary",
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center whitespace-nowrap rounded-4xl font-medium transition-transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed duration-300 active:scale-90",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};