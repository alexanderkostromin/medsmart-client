import { twJoin, twMerge } from "tailwind-merge";

const buttonVariants = ["primary", "secondary", "danger"] as const;

type ButtonVariant = (typeof buttonVariants)[number];

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  variant?: ButtonVariant;
};

export default function Button({
  label,
  className,
  children,
  variant = "secondary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        twJoin(
          "w-fit px-4 py-1",
          "rounded-md border-2 border-solid border-transparent",
          "shadow-lg",
          "text-base font-medium",
          "text-white",
          "bg-blue-500 bg-opacity-70",
          "hover:bg-opacity-100 hover:shadow-black/15",
          "dark:bg-violet-600 dark:bg-opacity-70",
          "focus:outline-4",
          "cursor-pointer",
          "transition duration-200",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-transparent",
          "active:bg-blue-600",
          "dark:active:bg-white dark:active:text-black",
          variant === "primary" && "bg-blue-500 text-white",
          variant === "danger" && "bg-red-500 dark:bg-red-800",
          className,
        ),
      )}
      {...props}
    >
      {label}
      {children}
    </button>
  );
}
