import styled from "styled-components";
import { ButtonShape, ButtonSize, ButtonVariant, ButtonColor } from ".";

type StyledButton = {
  variant: ButtonVariant;
  size: ButtonSize;
  shape: ButtonShape;
  color: ButtonColor;
};

type ButtonColorAttributes = {
  color: string;
  contrast: string;
};

type ButtonShapeAttributes = {
  radius: string;
};

type ButtonSizeAttributes = {
  height: string;
  fontSize: string;
  padding: string;
  shape: Record<ButtonShape, ButtonShapeAttributes>;
};


const buttonColorMap: Record<ButtonColor, ButtonColorAttributes> = {
  primary: {
    color: '#64a98c',
    contrast: '#FFFFFF'
  },
  secondary: {
    color: '#348FEB',
    contrast: '#FFFFFF'
  },
  tertiary: {
    color: '#ff919a',
    contrast: '#FFFFFF'
  }
};

const buttonSizeMap: Record<ButtonSize, ButtonSizeAttributes> = {
  small: {
    height: '38px',
    fontSize: '12px',
    padding: '4px 16px',
    shape: {
      rectangle: {
        radius: '4px'
      },
      pill: {
        radius: '100px'
      },
      circle: {
        radius: '50%'
      }
    }
  },
  medium: {
    height: '56px',
    fontSize: '16px',
    padding: '8px 32px',
    shape: {
      rectangle: {
        radius: '8px'
      },
      pill: {
        radius: '100px'
      },
      circle: {
        radius: '50%'
      }
    }
  },
};

const getColor = ({ variant, color }: StyledButton): string => {
  if (variant === 'outlined') {
    return buttonColorMap[color].color;
  }

  return buttonColorMap[color].contrast;
};

const getBackgroundColor = ({ variant, color }: StyledButton): string => {
  if (variant === 'outlined') {
    return 'transparent';
  }

  return buttonColorMap[color].color;
};

const getBorder = ({ variant, color }: StyledButton): string => {
  if (variant === 'outlined') {
    return `solid 2px ${buttonColorMap[color].color}`;
  }

  return 'none';
};

export const Button = styled.button<StyledButton>`
  transition-property: background, border, color, width, height, transform;
  transition-duration: 0.35s;
  transition-timing-function: ease;
  backface-visibility: hidden;
  will-change: transform;
  perspective: 1000px;

  outline: none;
  display: flex;
  align-items: center;
  border: ${getBorder};
  border-radius: ${({ size, shape }) => buttonSizeMap[size].shape[shape].radius};
  background-color: ${getBackgroundColor};
  color: ${getColor};
  cursor: pointer;
  padding: ${({ size }) => buttonSizeMap[size].padding};
  height: ${({ size }) => buttonSizeMap[size].height};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: ${({ size }) => buttonSizeMap[size].fontSize};
  font-weight: 600;

  &:hover {
    opacity: .8;
  }

  &:active {
    transform: matrix(0.95, 0, 0, 0.95, 0, 0);
  }
`;