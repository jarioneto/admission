import * as S from "./styles";

type FormItemProps = {
  children: React.ReactNode;
};

const FormItem = ({ children }: FormItemProps): JSX.Element => {
  return (
    <S.Container>
      {children}
    </S.Container>
  );
};

export default FormItem;
