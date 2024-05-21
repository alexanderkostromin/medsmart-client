import { useState } from "react";
import { NavLinkProps, NavLink as _NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Collapse } from "@mui/material";
import Link from "../components/Link";
import { useBreakpoint } from "../hooks/useBreakpoint";

const NavLink = ({ className, ...props }: NavLinkProps) => (
  <_NavLink
    className={({ isActive, ...rest }) =>
      twMerge(
        "block lg:mt-0 lg:inline-block",
        isActive ? "font-bold" : "font-medium",
        "text-blue-700 hover:text-blue-500",
        "dark:text-violet-600 dark:hover:text-violet-400",
        className &&
          (typeof className === "string"
            ? className
            : className({ isActive, ...rest })),
      )
    }
    {...props}
  />
);

type NavProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

type NavBarProps = NavProps & {
  username: string;
  isAdmin: boolean;
};

export default function NavBar({ username, isAdmin }: NavBarProps) {
  const { isLg } = useBreakpoint("lg");
  const [isExpanded, setExpanded] = useState(false);

  const closeNavBar = () => setExpanded(false);

  return (
    <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between p-6 backdrop-blur">
      <div className="flex flex-shrink-0 items-center lg:mr-6">
        <NavLink
          to="/"
          onClick={closeNavBar}
          className={twMerge(
            "text-lg font-bold",
            "text-black hover:text-black",
            "dark:text-white dark:hover:text-white",
          )}
        >
          MedSmart
        </NavLink>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center rounded border border-gray-400 px-3 py-2 dark:text-gray-200 dark:hover:border-white dark:hover:text-white"
          onClick={() => setExpanded(!isExpanded)}
        >
          <svg
            className="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <Collapse
        in={isExpanded || isLg}
        className="block w-full flex-grow lg:flex lg:w-auto"
      >
        <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center lg:justify-center">
          <div className="my-2 flex flex-col gap-y-2 lg:my-0 lg:mt-0 lg:flex-grow lg:flex-row lg:gap-x-4">
            <NavLink to="/images" onClick={closeNavBar}>
              изображения
            </NavLink>
            {isAdmin && (
              <NavLink to="/upload" onClick={closeNavBar}>
                загрузка
              </NavLink>
            )}
            <NavLink to="/analyses" onClick={closeNavBar}>
              аналитика
            </NavLink>
            {isAdmin && (
              <NavLink to="/users" onClick={closeNavBar}>
                пользователи
              </NavLink>
            )}
          </div>
          <div>
            Вы вошли как <b>{username}</b> (
            <Link to="/logout" className={twMerge("font-normal underline")}>
              выйти
            </Link>
            )
          </div>
        </div>
      </Collapse>
    </nav>
  );
}
