import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AdmissionForm, AdmissionFormProps } from './index';

const defaultProps = {
  onSubmit: jest.fn(),
};

const renderComponent = (props: AdmissionFormProps) =>
  render(<AdmissionForm {...props}>Cancel</AdmissionForm>);

describe('AdmissionForm component', () => {
  beforeEach(() => {
    defaultProps.onSubmit.mockReset();
  });

  it('should render the component', () => {
    renderComponent(defaultProps);
    const inputs = screen.getAllByRole('textbox');

    expect(inputs).toHaveLength(3);
    expect(screen.getByText(/nome/i)).toBeInTheDocument();
    expect(screen.getByText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByText(/admissão$/i)).toBeInTheDocument();
  });

  it('should validate required fields when form is empty', async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    const errorMessage = await screen.findAllByText('Campo obrigatório');

    expect(errorMessage).toHaveLength(4);
    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
  });

  it('should validate fields with invalid values', async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const inputName = screen.getByRole('textbox', { name: 'Nome' });
    const inputEmail = screen.getByRole('textbox', { name: 'E-mail' });
    const inputCPF = screen.getByRole('textbox', { name: 'CPF' });
    const inputDate = screen.getByLabelText('Data de admissão');

    await user.type(inputName, 'A');
    await user.type(inputEmail, 'maria@l');
    await user.type(inputCPF, '12544541247');
    await user.type(inputDate, '2024-15-20');

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    const errorMessageInvalid = await screen.findAllByText('Campo inválido');
    const errorMessageRequired = screen.getByText('Campo obrigatório');

    expect(errorMessageInvalid).toHaveLength(3);
    expect(errorMessageRequired).toBeInTheDocument();

    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
  });

  it('should submit form with valid values', async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

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

    expect(defaultProps.onSubmit).toHaveBeenCalledWith(
      {
        employeeName: 'Maria da Silva',
        employeeEmail: 'maria.silva@email.com',
        employeeCPF: '076.223.310-90',
        date: '2024-06-20',
      },
      expect.any(Object),
    );
  });
});
