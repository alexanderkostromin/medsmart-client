import { ChangeEvent } from "react";
import { twJoin, twMerge } from "tailwind-merge";

type UlProps = React.HTMLAttributes<HTMLUListElement>;

type InputValue = string | readonly string[] | number | undefined;

type TabProps<T extends InputValue> = {
  value: T;
  label: string;
};

type TabGroupProps<T extends InputValue> = Omit<UlProps, "onChange"> & {
  tabs: TabProps<T>[];
  activeTab: TabProps<T>;
  onChange?: (tab: TabProps<T>, e: ChangeEvent) => unknown;
};

export default function TabGroup<T extends InputValue>({
  tabs,
  activeTab,
  className,
  onChange,
}: TabGroupProps<T>) {
  const tabGroupId = [...tabs.map(({ value }) => value)].sort().join("");

  return (
    <ul
      className={twJoin(
        "mb-3 flex flex-wrap justify-center gap-x-2 gap-y-1",
        className,
      )}
    >
      {tabs.map((tab) => {
        const { value, label } = tab;
        return (
          <li
            key={`${tabGroupId}-${value}`}
            className={twMerge(
              "inline-block cursor-pointer rounded border-2 border-transparent",
              "transition-colors duration-200",
              "hover:border-blue-500 dark:hover:border-violet-500",
              "has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white",
              "has-[:checked]:dark:border-violet-500 has-[:checked]:dark:bg-violet-500 has-[:checked]:dark:text-black",
              className,
            )}
          >
            <label
              htmlFor={`${tabGroupId}-${value}`}
              className="inline-block cursor-pointer px-3 py-1"
            >
              {label}
            </label>
            <input
              type="radio"
              className="hidden"
              id={`${tabGroupId}-${value}`}
              value={value}
              name={tabGroupId}
              onChange={(e) => onChange?.(tab, e)}
              checked={activeTab.value === value}
            />
          </li>
        );
      })}
    </ul>
  );
}
