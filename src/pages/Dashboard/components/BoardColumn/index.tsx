
import { HTMLAttributes } from "react";
import { AdmissionStatus } from "~/types/admission";
import * as S from "./styles";

export type ColumnVariant = AdmissionStatus;
export interface BoardColumnProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  variant: ColumnVariant;
  children?: React.ReactNode;
};

const BoardColumn = ({ children, title, variant, ...props }: BoardColumnProps) => {
  return (
    <S.Column {...props} variant={variant}>
      <S.Title variant={variant}>{title}</S.Title>
      <S.Content role="list">{children}</S.Content>
    </S.Column>
  );
};

export default BoardColumn;
