import { LoaderFunction } from "react-router-dom";
import { z } from "zod";
import { APIError } from "./common";

export const Image = z.object({
  type: z.literal("dicom"),
  name: z.string(),
  path: z.string(),
});
export type Image = z.infer<typeof Image>;
export const isImage = (node: Node): node is Image => node.type == "dicom";

const baseDir = z.object({
  type: z.literal("dir"),
  name: z.string(),
  path: z.string(),
});
export type Dir = z.infer<typeof baseDir> & {
  children: (Dir | Image)[];
};
export const Dir: z.ZodType<Dir> = baseDir.extend({
  children: z.lazy(() => Node.array()),
});
export const isDir = (node: Node): node is Dir => node.type === "dir";

export const Node = Dir.or(Image);
export type Node = z.infer<typeof Node>;

export const fetchImageList = async (): Promise<Dir> => {
  const res = await fetch("/api/images/list");
  const data = await res.json();
  return Dir.parse(data);
};

export const fetchImageListWithPath: LoaderFunction = async ({
  params,
}): Promise<Dir> => {
  const path = params["*"];
  if (!path) {
    throw Error("Invalid path");
  }
  const url = `/api/images/list/${path}`;
  const res = await fetch(url);
  const data = await res.json();
  return Dir.parse(data);
};

export const uploadImagesArchive = async (
  archive: File,
  dirname: string,
): Promise<null | string> => {
  const formData = new FormData();
  formData.append("file", archive);
  console.debug(formData);
  const res = await fetch(`/api/images/upload/${dirname}`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    const error = APIError.safeParse(data);
    return error.success ? error.data.detail : `unknown error (${res.status})`;
  }
  return null;
};

export const downloadImagesArchive = async (dirpath: string) => {
  const res = await fetch(`/api/images/sources/${dirpath}`);
  if (!res.ok) {
    const data = await res.json();
    const error = APIError.safeParse(data);
    return error.success ? error.data.detail : `unknown error (${res.status})`;
  }
  return res;
};

export const deleteImagesDir = async (
  dirpath: string,
): Promise<null | string> => {
  const res = await fetch(`/api/images/${dirpath}`, { method: "DELETE" });
  if (!res.ok) {
    const data = await res.json();
    const error = APIError.safeParse(data);
    return error.success ? error.data.detail : `unknown error (${res.status})`;
  }
  return null;
};
