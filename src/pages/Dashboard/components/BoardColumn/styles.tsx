import styled from "styled-components";
import { ColumnVariant } from "./index";

type StyledVariant = {
  variant: ColumnVariant;
}

const columnVariantMap: Record<ColumnVariant, string> = {
  REVIEW: "#FDF8E9",
  APPROVED: "#EEEEFD",
  REPROVED: "#FBEDF6"
};

const titleVariantMap: Record<ColumnVariant, string> = {
  REVIEW: "#906C0D",
  APPROVED: "#4242DF",
  REPROVED: "#CE2893"
};

export const Column = styled.div<StyledVariant>`
  min-height: 80vh;
  background-color: ${({ variant }) =>
    columnVariantMap[variant]};
  border-radius: 32px;
`;

export const Title = styled.h3<StyledVariant>`
  color: ${({ variant }) => titleVariantMap[variant]};
  margin: 24px;
`;

export const Content = styled.ul`
  overflow: auto;
  padding: 0;
`;
