export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'INR' }).format(
    value
  );

export const capitalizeFirstLetter = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};
