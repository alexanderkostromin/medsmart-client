import { twMerge } from "tailwind-merge";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={twMerge(
        "rounded bg-white p-1 shadow-md dark:bg-black",
        className,
      )}
      {...props}
    />
  );
}
