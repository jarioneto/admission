import React, { ButtonHTMLAttributes, forwardRef } from 'react';

import * as S from './styles';

type ButtonElement = HTMLButtonElement;

type ButtonSize = 'medium' | 'small';
type ButtonShape = 'rectangle' | 'pill' | 'circle';
type ButtonVariant =
  | 'solid'
  | 'outlined'

type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'

interface ButtonProps extends ButtonHTMLAttributes<ButtonElement> {
  /**
   * Variant used to define the visual appearance of the button.
   * If the value is not informed, the default value `solid` is used.
   *
   * @default "solid"
   */
  variant?: ButtonVariant;

  /**
   * Color used to define the visual appearance of the button.
   * If the value is not informed, the default value `primary` is used.
   *
   * @default "primary"
   */
  color?: ButtonColor;

  /**
   * Sets the size of the button.
   * If the value is not informed, the default value `medium` is used.
   *
   * @default "medium"
   */
  size?: ButtonSize;

  /**
   * Sets the shape of the button.
   * If the value is not informed, the default value `rectangle` is used.
   *
   * @default "rectangle"
   */
  shape?: ButtonShape;

  children?: React.ReactNode;
}

const Button = forwardRef<ButtonElement, ButtonProps>(function Button(
  props,
  forwardedRef
) {
  const {
    children,
    disabled = false,
    variant = 'outlined',
    color = 'primary',
    size = 'medium',
    shape = 'rectangle',
    ...buttonProps
  } = props;

  return (
    <S.Button
      {...buttonProps}
      variant={variant}
      color={color}
      shape={shape}
      size={size}
      disabled={disabled}
      aria-disabled={disabled}
      ref={forwardedRef}
    >
      {children}
    </S.Button>
  );
});

export { Button };
export type { ButtonProps, ButtonSize, ButtonVariant, ButtonShape, ButtonColor };
