import { twMerge } from "tailwind-merge";

interface LinkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export default function LinkButton({
  label,
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <button
      className={twMerge(
        "font-medium decoration-inherit",
        "bg-transparent",
        "text-blue-700 hover:text-blue-500",
        "dark:text-violet-600 dark:hover:text-violet-400",
        className,
      )}
      {...props}
    >
      {label}
      {children}
    </button>
  );
}
