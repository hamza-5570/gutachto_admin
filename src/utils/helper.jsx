export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON?.parse(user) : null;
};
export function normalizeUrl(url) {
  const BASE = import.meta.env.VITE_SOME_BASE_URL;
  return url.replace("http://0.0.0.0:8000", BASE);
}
export function getFileType(url) {
  const normalizedUrl = normalizeUrl(url);

  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
  const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi", "mkv"];

  const extension = normalizedUrl
    .split(".")
    .pop()
    .split(/#|\?/)[0]
    .toLowerCase();

  if (imageExtensions.includes(extension)) return "image";
  if (videoExtensions.includes(extension)) return "video";
  return "unknown";
}
