import { twMerge } from "tailwind-merge";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input className={twMerge("rounded p-1 shadow-md", className)} {...props} />
  );
}
