export const formatCPF = (value: string): string => {
  if (!value) return '';

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2');
};

export const unformatCPF = (value: string): string => {
  if (!value) return '';

  return value.replace(/[\D]/g, '');
};


export const formatToBrazilianDate = (value: string): string => {
  const regexDate = /^\d{4}-\d{2}-\d{2}$/;
  const parsedDate = Date.parse(value);

  const isValidDate = !Number.isNaN(parsedDate);

  if (!isValidDate) {
    return value;
  }

  if (regexDate.test(value)) {
    value = `${value}T00:00:00-03:00`;
  }

  const date = new Date(value);
  return date.toLocaleDateString('pt-BR');
};
