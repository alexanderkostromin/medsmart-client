import { twMerge } from "tailwind-merge";

export function TableRow({
  ...props
}: React.TdHTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={twMerge("border-b last:[&:not(:only-child)]:border-none")}
      {...props}
    />
  );
}

export function TableCell({
  children,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={twMerge("p-4 pl-8")} {...props}>
      {children}
    </td>
  );
}

export function TableHeaderCell({
  children,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={twMerge("p-4 pb-3 pl-8 pt-0 text-left font-medium")}
      {...props}
    >
      {children}
    </th>
  );
}
