const numberFormatter = new Intl.NumberFormat("pt-BR");

export function helperFormatNumber(value) {
  return numberFormatter.format(value);
}

export function helperFormatPercentage(value) {
  return value.toFixed(2).replace(".", ",") + "%";
}
