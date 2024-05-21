import { twMerge } from "tailwind-merge";

export function InvalidMessage(props: { children: React.ReactNode }) {
  return (
    <p
      role="alert"
      className={twMerge(
        "mt-1",
        "animate-beacon italic",
        "font-medium text-black",
        "dark:font-normal dark:text-neutral-500",
      )}
    >
      {props.children}
    </p>
  );
}
