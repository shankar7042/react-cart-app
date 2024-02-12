export function formatCurrency(value: number) {
  const formatter = new Intl.NumberFormat("en-us", {
    currency: "USD",
    style: "currency",
  });
  return formatter.format(value);
}
