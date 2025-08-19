export const normalizeDay = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "")
    .replace("-feira", "");

export const weekdayNameFromDate = (date: Date) => {
  const map = [
    "domingo",
    "segunda",
    "terca",
    "quarta",
    "quinta",
    "sexta",
    "sabado",
  ];
  return map[date.getDay()];
};

export const formatDate = (d: Date) => d.toLocaleDateString();
