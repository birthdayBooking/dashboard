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
