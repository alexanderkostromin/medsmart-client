export async function getImageDimensions(file: File) {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  await img.decode();
  const width = img.width;
  const height = img.height;
  return {
    width,
    height,
  };
}
