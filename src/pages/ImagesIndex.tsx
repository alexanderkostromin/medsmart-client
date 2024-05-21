import { useLoaderData } from "react-router-dom";
import DirList from "../components/DirList";
import { Dir } from "../api/images";

export default function ImagesIndex() {
  const rootDir = useLoaderData() as Dir;

  return (
    <>
      <DirList className="lg:hidden" rootDir={rootDir} baseUrl="/images" />
      <div className="hidden lg:block">Выберите папку...</div>
    </>
  );
}
