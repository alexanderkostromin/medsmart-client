import { Fragment, useState } from "react";
import { twMerge } from "tailwind-merge";
import { EventHandler, Gallery, Image } from "react-grid-gallery";
import { useLoaderData, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Delete from "@mui/icons-material/Delete";
import Upload from "@mui/icons-material/Upload";
import Download from "@mui/icons-material/Download";
import Link from "../components/Link";
import Button from "../components/Button";
import { downloadFile } from "../utils/download";
import useAuth from "../contexts/AuthContext";
import {
  Dir,
  deleteImagesDir,
  downloadImagesArchive,
  isImage,
} from "../api/images";

export type ImageGalleryProps = {
  imagesPerPage?: number;
};

export default function ImageGallery({
  imagesPerPage = 30,
}: ImageGalleryProps) {
  const currentDir = useLoaderData() as Dir;
  const params = useParams();
  const { roles } = useAuth();

  const [currentPage, setCurrentPage] = useState(0);

  const [isLoading, setLoading] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupSource, setPopupSource] = useState<string | undefined>(undefined);

  const dirpath = params["*"];

  if (!dirpath) {
    throw new Error("Некорректный адрес страницы");
  }

  const isAdmin = roles.includes("admin");

  const pathParts = ["images", ...dirpath.split("/")].reduce(
    (acc, x) =>
      !acc.length
        ? [{ label: x, path: "/" + x }]
        : [...acc, { label: x, path: acc.at(-1)?.path + "/" + x }],
    [] as { label: string; path: string }[],
  );

  const images: Image[] = currentDir.children.filter(isImage).map((file) => ({
    src: `/api/images/${file.path}`,
    width: 320,
    height: 200,
  }));

  const renderedImages = images.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage,
  );

  const totalPages = Math.floor(images.length / imagesPerPage) + 1;

  const onImageClick: EventHandler<Image> = (_, item) => {
    if (isPopupOpen) {
      setPopupOpen(false);
    } else {
      setPopupSource(item.src);
      setPopupOpen(true);
    }
  };

  const downloadDirArchive = async () => {
    try {
      setLoading(true);
      const res = await downloadImagesArchive(dirpath);
      if (typeof res === "string") {
        alert(res);
        return;
      }
      await downloadFile(res, dirpath);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="image-gallery" className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">
          {pathParts.map(({ path, label }, i, { length }) => (
            <Fragment key={`breadcrumb-${path}`}>
              {i !== 0 && <span className="mx-2">/</span>}
              {i < length - 1 ? (
                <Link to={path} className="font-bold">
                  {label}
                </Link>
              ) : (
                <span>{label}</span>
              )}
            </Fragment>
          ))}
        </h2>

        <div id="image-gallery-actions">
          <h4 className="mb-2 font-bold">Действия:</h4>
          <div id="image-gallery-actions-buttons" className="flex gap-x-2">
            <Button
              onClick={downloadDirArchive}
              disabled={isLoading}
              className="flex items-center gap-1 py-1 pl-1 pr-2"
            >
              {isLoading ? (
                <CircularProgress color="inherit" size="1.5rem" thickness={6} />
              ) : (
                <Download />
              )}
              Скачать
            </Button>

            {isAdmin && (
              <Button className="flex items-center gap-2 py-1 pl-1 pr-2">
                <Link
                  to={`/upload?dirname=${dirpath}`}
                  className="text-inherit hover:text-inherit"
                >
                  <Upload />
                  Добавить
                </Link>
              </Button>
            )}

            {isAdmin && (
              <Button
                variant="danger"
                className={twMerge("flex items-center gap-1 p-1 px-2")}
                onClick={async () => {
                  await deleteImagesDir(dirpath);
                  window.location.replace("/images");
                }}
              >
                <Delete />
                Удалить
              </Button>
            )}
          </div>
        </div>

        <div id="image-gallery-contents" className={twMerge("w-full")}>
          <h4 className="mb-2 font-bold">Содержимое:</h4>
          {images.length ? (
            <Gallery
              enableImageSelection={false}
              images={renderedImages}
              onClick={onImageClick}
            />
          ) : (
            <div className={"flex w-full items-center justify-center"}>
              <i>Нет изображений</i>
            </div>
          )}
        </div>
        <div>
          <Button
            onClick={() => setCurrentPage((x) => x - 1)}
            disabled={currentPage === 0}
          >
            &lt;
          </Button>
          <Button
            onClick={() => setCurrentPage((x) => x + 1)}
            disabled={currentPage === totalPages - 1}
          >
            &gt;
          </Button>
        </div>
      </div>
      <dialog
        open={isPopupOpen}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer backdrop-blur-md backdrop:bg-black/50"
        onClick={() => setPopupOpen(false)}
      >
        <img src={popupSource} />
      </dialog>
    </>
  );
}
