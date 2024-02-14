// pour rendre les dates lisibles

export function dateReadableLong(date) {
  const options = {
    weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
  };
  return new Date(date).toLocaleDateString("fr-FR", options);
}
export function dateReadableShort(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("fr-FR", options);
}