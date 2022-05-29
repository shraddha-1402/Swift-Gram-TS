export const formatDate = (date: string) =>
  new Date(date).toDateString().split(" ").slice(1, 4).join(" ");
