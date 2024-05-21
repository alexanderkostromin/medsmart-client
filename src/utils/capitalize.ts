export const capitalize = <T extends string>(text: T) => {
  return (text.charAt(0)?.toUpperCase() + text.slice(1)) as Capitalize<T>;
};
