import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import http from '~/services/http';
import { toast } from 'react-toastify';

import CreateAdmission from './index';

const axiosMock = new MockAdapter(http);
const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

jest.mock('react-toastify');

const admissionMockRequest = {
  date: '2024-06-20',
  employeeCPF: '07622331090',
  employeeName: 'Maria da Silva',
  employeeEmail: 'maria.silva@email.com',
  status: 'REVIEW',
};

const renderComponent = () => render(<CreateAdmission />);

describe('CreateAdmission component', () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it('should create admission', async () => {
    const user = userEvent.setup();

    axiosMock
      .onPost('/registrations', admissionMockRequest)
      .reply(200, { id: '1', ...admissionMockRequest });

    renderComponent();

    const inputName = screen.getByRole('textbox', { name: 'Nome' });
    const inputEmail = screen.getByRole('textbox', { name: 'E-mail' });
    const inputDate = screen.getByLabelText('Data de admissão');
    const inputCPF = screen.getByRole('textbox', { name: 'CPF' });

    await user.type(inputName, 'Maria da Silva');
    await user.type(inputEmail, 'maria.silva@email.com');
    await user.type(inputCPF, '07622331090');
    await user.type(inputDate, '2024-06-20');

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Admissão criada com sucesso.');
    });
  });

  it('should create admission with error', async () => {
    const user = userEvent.setup();

    axiosMock
      .onPost('/registrations', admissionMockRequest)
      .reply(500, { message: 'Server error' });

    renderComponent();

    const inputName = screen.getByRole('textbox', { name: 'Nome' });
    const inputEmail = screen.getByRole('textbox', { name: 'E-mail' });
    const inputCPF = screen.getByRole('textbox', { name: 'CPF' });
    const inputDate = screen.getByLabelText('Data de admissão');

    await user.type(inputName, 'Maria da Silva');
    await user.type(inputEmail, 'maria.silva@email.com');
    await user.type(inputCPF, '07622331090');
    await user.type(inputDate, '2024-06-20');

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Não foi possível criar a admissão.');
    });
  });

  it('should go to the dashboard page when clicking the back button', async () => {
    const user = userEvent.setup();
    renderComponent();

    const backButton = screen.getByRole('button', { name: 'Voltar' });
    await user.click(backButton);

    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
});
