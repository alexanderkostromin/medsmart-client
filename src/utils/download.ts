const tryDetectFilename = (res: Response): string | null => {
  const contentDispositionHeader = res.headers.get("content-disposition");
  const regExpFilename = /filename="(?<filename>.*)"/;
  const filename =
    contentDispositionHeader &&
    regExpFilename
      .exec(contentDispositionHeader)
      ?.groups?.filename.replaceAll(":", "-");
  return filename ?? null;
};

export const downloadFile = async (res: Response, defaultFilename: string) => {
  const blob = await res.blob();
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  const filename = tryDetectFilename(res) ?? defaultFilename;
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
};
