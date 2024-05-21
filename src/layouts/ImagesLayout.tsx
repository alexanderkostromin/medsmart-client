import { Outlet, useLoaderData } from "react-router-dom";
import DirList from "../components/DirList";
import { Dir } from "../api/images";

export default function ImagesLayout() {
  const rootDir = useLoaderData() as Dir;

  return (
    <main className="flex-grow px-3 lg:flex lg:items-start lg:gap-x-3">
      <DirList
        className="hidden lg:flex lg:min-w-72"
        rootDir={rootDir}
        baseUrl="/images"
      />
      <Outlet />
    </main>
  );
}
