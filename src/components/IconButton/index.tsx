import { forwardRef } from 'react';
import { ButtonProps, ButtonSize } from '../Button';

import * as S from './styles';

type IconButtonElement = HTMLButtonElement;
type IconButtonSize = ButtonSize;
type IconButtonProps = ButtonProps;

const IconButton = forwardRef<IconButtonElement, IconButtonProps>(function IconButton(
  props,
  forwardedRef
) {
  const {
    children,
    disabled = false,
    variant= 'outlined',
    size = 'medium',
    shape = 'circle',
    ...buttonProps
  } = props;

  return (
    <S.IconButton
      {...buttonProps}
      size={size}
      variant={variant}
      shape={shape}
      disabled={disabled}
      aria-disabled={disabled}
      ref={forwardedRef}
    >
      {children}
    </S.IconButton>
  );
});

export { IconButton };
export type { IconButtonProps, IconButtonSize };
