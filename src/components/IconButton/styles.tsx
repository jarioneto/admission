import styled from "styled-components";
import { IconButtonSize } from ".";
import { Button } from "../Button";

type StyledIconButton = {
  size: IconButtonSize;
};

type IconButtonSizeAttributes = {
  height: string;
  padding: string;
};

const buttonSizeMap: Record<IconButtonSize, IconButtonSizeAttributes> = {
  small: {
    height: '26px',
    padding: '4px'
  },
  medium: {
    height: '36px',
    padding: '8px'
  },
};

export const IconButton = styled(Button).attrs<StyledIconButton>(props => ({
  size: props.size,
}))`
  width: ${({ size, shape }) => shape === 'circle' ? buttonSizeMap[size].height : 'fit-content'};
  height: ${({ size }) => buttonSizeMap[size].height};
  padding: ${({ size }) => buttonSizeMap[size].padding};
  align-items: center;
  justify-content: center;
`;