import { InputHTMLAttributes, forwardRef, useId } from "react";
import * as S from './styles';

type InputElement = HTMLInputElement;
type TextFieldStatus = 'valid' | 'invalid';
interface TextFieldProps extends InputHTMLAttributes<InputElement> {
  /**
   * Label that will be displayed on the textfield.
   */
  label?: string;

  /**
   * Use to set input status.
   *
   * @default null
   */
  status?: TextFieldStatus;

  /**
   * Use to set input as required.
   *
   * @default false
   */
  required?: boolean;

  /**
   * Informative message that will be displayed in the bottom of Textfield.
   */
  helperText?: string;
}

const TextField = forwardRef<InputElement, TextFieldProps>(function TextField(
  props,
  forwardedRef
) {
  const {
    id,
    status,
    label,
    helperText,
    disabled,
    ...textFieldProps
  } = props;

  const internalId = useId();
  const inputId = id ?? internalId;
  const labelId = `${inputId}-label`;
  const helperTextId = `${inputId}-helper-text`;

  return (
    <S.Container>
      <S.Label id={labelId} htmlFor={inputId}>{label}</S.Label>
      <S.Input 
        {...textFieldProps}
        id={inputId}
        ref={forwardedRef}
        disabled={disabled}
        aria-labelledby={labelId}
        aria-describedby={helperTextId}
        aria-disabled={disabled}
        data-status={status}
      />
      {helperText && <S.HelperText id={helperTextId} data-status={status}>{helperText}</S.HelperText>}
    </S.Container>
  );
});

export { TextField };
export type { TextFieldProps, TextFieldStatus };
