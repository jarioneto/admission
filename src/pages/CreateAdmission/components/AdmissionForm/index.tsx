import { TextField, TextFieldStatus } from '~/components/TextField';
import { Button } from '~/components/Button';
import FormItem from '../FormItem';
import { z, ZodType } from 'zod';
import { cpf } from 'cpf-cnpj-validator';
import { AdmissionFormValues } from '~/types/admission';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { validateDate, validateName } from '~/utils/validators';
import { formatCPF } from '~/utils/formaters';

import * as S from './styles';

const REQUIRED_FIELD = 'Campo obrigatório';
const INVALID_FIELD = 'Campo inválido';

const FormSchema: ZodType<AdmissionFormValues> = z.object({
  employeeName: z
    .string()
    .min(1, REQUIRED_FIELD)
    .refine((value) => validateName(value), {
      message: INVALID_FIELD,
    }),
  employeeEmail: z.string().min(1, REQUIRED_FIELD).email(INVALID_FIELD),
  employeeCPF: z
    .string({ required_error: REQUIRED_FIELD })
    .min(1, REQUIRED_FIELD)
    .refine((value) => cpf.isValid(value), { message: INVALID_FIELD }),
  date: z
    .string()
    .min(1, REQUIRED_FIELD)
    .refine((value) => validateDate(value), {
      message: INVALID_FIELD,
    }),
});

interface AdmissionFormProps {
  onSubmit: (data: AdmissionFormValues) => void;
}

const AdmissionForm = ({ onSubmit }: AdmissionFormProps): JSX.Element => {
  const { register, handleSubmit, formState, control } = useForm<AdmissionFormValues>({
    resolver: zodResolver(FormSchema),
  });

  const getStatus = (field: keyof AdmissionFormValues) => {
    const fieldError = formState.errors[field];

    if (fieldError) {
      return {
        status: 'invalid' as TextFieldStatus,
        helperText: fieldError.message,
      };
    }

    return {};
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormItem>
        <TextField
          {...register('employeeName')}
          {...getStatus('employeeName')}
          placeholder="Nome"
          label="Nome"
        />
      </FormItem>
      <FormItem>
        <TextField
          {...register('employeeEmail')}
          {...getStatus('employeeEmail')}
          placeholder="E-mail"
          label="E-mail"
          type="email"
        />
      </FormItem>
      <FormItem>
        <Controller
          control={control}
          name="employeeCPF"
          render={({ field }) => {
            const { value, ...fieldProps } = field;

            return (
              <TextField
                {...fieldProps}
                {...getStatus('employeeCPF')}
                value={formatCPF(value)}
                placeholder="CPF"
                label="CPF"
                maxLength={14}
              />
            );
          }}
        />
      </FormItem>
      <FormItem>
        <TextField
          {...register('date')}
          {...getStatus('date')}
          label="Data de admissão"
          type="date"
        />
      </FormItem>
      <S.Actions>
        <Button shape="pill" variant="solid" type="submit">
          Cadastrar
        </Button>
      </S.Actions>
    </form>
  );
};

export { AdmissionForm };
export type { AdmissionFormProps };
