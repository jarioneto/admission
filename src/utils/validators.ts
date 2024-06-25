import { cpf } from 'cpf-cnpj-validator';

export const validateCPF = (value: string): boolean => {
  return cpf.isValid(value);
};

export const validateDate = (value: string): boolean => {
  return /^\d{4}[-](0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
};

export const validateName = (value: string): boolean => {
  return /^(\D+)\s(\D+)/.test(value);
};
