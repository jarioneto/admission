import { fireEvent, render, screen } from '@testing-library/react';

import { TextField, TextFieldProps } from './index';

function renderComponent(props: TextFieldProps = {}) {
  const { label = 'Label', ...textFieldProps } = props;
  return render(<TextField label={label} {...textFieldProps} />);
}

describe('TextField component', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByLabelText(/label/i)).toBeInTheDocument();
  });

  it('should update the state when input value changes', () => {
    renderComponent();
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'New string' } });

    expect(input).toHaveValue('New string');
  });

  it('should render helperText when provided', () => {
    const props = {
      helperText: 'Helper text'
    };
    const { getByText } = renderComponent(props);
    const helperText = getByText('Helper text');

    expect(helperText).toBeInTheDocument();
  });

  it('should handle onFocus and onBlur events', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    const props = {
      onFocus: onFocus,
      onBlur: onBlur
    };

    renderComponent(props);
    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('should render a disabled input element', () => {
    const props = {
      disabled: true
    };

    renderComponent(props);
    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('disabled');
  });
});