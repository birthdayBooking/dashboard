export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatPrice = (number: number) => {
  if (number) {
    return (
      parseFloat(number.toFixed(2)).toLocaleString("en", {
        useGrouping: true,
      }) + " VNĐ"
    );
  }
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based in JavaScript
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function fixedNumber(number: number | undefined) {
  if (!number) return;
  return Number(number.toFixed(1));
}
