import { Link as _Link, LinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function Link({ className, ...props }: LinkProps) {
  return (
    <_Link
      className={twMerge(
        "decoration-inherit",
        "font-medium",
        "text-blue-700 hover:text-blue-500",
        "dark:text-violet-600 dark:hover:text-violet-400",
        className,
      )}
      {...props}
    />
  );
}
