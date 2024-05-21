import { Fragment, useState } from "react";
import { twMerge } from "tailwind-merge";
import Collapse from "@mui/material/Collapse";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { Dir, isDir } from "../api/images";
import Link from "./Link";

type DirEntryProps = {
  dir: Dir;
  baseUrl: string;
};

const DirEntry = ({ dir, baseUrl }: DirEntryProps) => {
  const [isOpen, setOpen] = useState(false);
  const href = baseUrl + "/" + dir.path.replace(/^\//, "");
  const dirs = dir.children.filter(isDir);
  return (
    <li className="w-100 px-3">
      <div className="flex items-center">
        <Link
          to={href}
          className="max-w-full py-3"
          style={{ overflowWrap: "break-word" }}
        >
          {dir.name}
        </Link>
        {!!dirs.length && (
          <button className="flex flex-1" onClick={() => setOpen((x) => !x)}>
            {isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
          </button>
        )}
      </div>
      <Collapse in={isOpen}>
        <ul>
          {dirs.map((dir) => (
            <Fragment key={`dir-entry-${dir.path}`}>
              <hr className="mx-3 border-neutral-600/50 dark:border-neutral-100/50" />
              <DirEntry dir={dir} baseUrl="/images" />
            </Fragment>
          ))}
        </ul>
      </Collapse>
    </li>
  );
};

type UlProps = React.HTMLAttributes<HTMLUListElement>;

export type DirListProps = UlProps & {
  rootDir: Dir;
  baseUrl: string;
};

export default function DirList({ rootDir, baseUrl, className }: DirListProps) {
  return (
    <ul
      className={twMerge(
        "flex flex-col items-stretch rounded",
        "bg-neutral-200 shadow-inner dark:bg-neutral-900",
        className,
      )}
    >
      {rootDir.children.filter(isDir).map((dir, i) => (
        <Fragment key={`dir-entry-${dir.path}`}>
          {i !== 0 && (
            <hr className="mx-3 border-neutral-600/50 dark:border-neutral-100/50" />
          )}
          <DirEntry dir={dir} baseUrl={baseUrl} />
        </Fragment>
      ))}
    </ul>
  );
}
