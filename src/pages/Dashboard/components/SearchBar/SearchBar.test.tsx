import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardContext from '~/contexts/DashboardContext';

import { SearchBar } from './index';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

const renderComponent = () => render(<SearchBar />, { wrapper: ({ children }) => {
  return (
    <DashboardContext.Provider>{children}</DashboardContext.Provider>
  )
}});

describe('SearchBar component', () => {
  it('should go to the create admission page when click on new admission', async () => {
    const user = userEvent.setup();
    renderComponent();

    const buttonNewAdmission = screen.getByRole('button', { name: /nova admissão/i });
    await user.click(buttonNewAdmission);

    expect(mockPush).toHaveBeenCalledWith('/create-admission');
  });

  it('should display clear button if input search is not empty', async () => {
    const user = userEvent.setup();
    renderComponent();

    const inputSearch = screen.getByRole('textbox');
    await user.type(inputSearch, '042');

    const buttonClear = await screen.findByRole('button', { name: /limpar/i });

    expect(buttonClear).toBeInTheDocument();
  });

  it('should clear input search when click on clear button', async () => {
    const user = userEvent.setup();
    renderComponent();

    const inputSearch = screen.getByRole('textbox');
    await user.type(inputSearch, '042');

    const buttonClear = await screen.findByRole('button', { name: /limpar/i });
    await user.click(buttonClear);

    expect(inputSearch).toHaveValue('');
  });
});
