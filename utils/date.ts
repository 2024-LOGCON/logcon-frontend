export function formatDateString(isoString: string) {
  const date = new Date(isoString);
  return `${date.getFullYear() % 100}.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(date.getDate() + 1).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}
