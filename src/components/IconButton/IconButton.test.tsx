import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { IconButton, IconButtonProps } from './index';
import { HiUserAdd } from 'react-icons/hi';

const renderComponent = (props: IconButtonProps = {}) =>
  render(<IconButton {...props}><HiUserAdd /></IconButton>);

describe('IconButton component', () => {
  it('should render the component', () => {
    renderComponent();

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should trigger on click when pressed', async () => {
    const props = {
      onClick: jest.fn(),
    };

    renderComponent(props);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(props.onClick).toHaveBeenCalled();
  });

  it('should do not trigger on click if disabled when pressed', async () => {
    const props = {
      disabled: true,
      onClick: jest.fn(),
    };

    renderComponent(props);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(props.onClick).not.toHaveBeenCalled();
  });

  describe.each`
    variant
    ${'solid'}
    ${'outlined'}
  `('$variant', ({ variant }) => {
    it(`should render ${variant} button`, () => {
      const { container } = renderComponent({ variant });
      expect(container).toMatchSnapshot();
    });
  });

  describe.each`
    color
    ${'primary'}
    ${'secondary'}
    ${'tertiary'}
  `('$color', ({ color }) => {
    it(`should render ${color} button`, () => {
      const { container } = renderComponent({ color });
      expect(container).toMatchSnapshot();
    });
  });

  describe.each`
    shape
    ${'rectangle'}
    ${'circle'}
    ${'pill'}
  `('$shape', ({ shape }) => {
    it(`should render ${shape} button`, () => {
      const { container } = renderComponent({ shape });
      expect(container).toMatchSnapshot();
    });
  });
});
