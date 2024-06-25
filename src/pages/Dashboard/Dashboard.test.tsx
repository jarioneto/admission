import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import http from '~/services/http';
import { toast } from 'react-toastify';
import { AdmissionStatus } from '~/types/admission';

import Dashboard from './index';

const axiosMock = new MockAdapter(http);
const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

jest.mock('react-toastify');

export const admissionListMock = [
  {
    id: '1',
    date: '2024-06-20',
    employeeCPF: '07622331090',
    employeeName: 'Maria da Silva',
    employeeEmail: 'maria.silva@email.com',
    status: 'REVIEW',
  },
  {
    id: '2',
    date: '2024-05-19',
    employeeCPF: '73786942072',
    employeeName: 'Marcelo da Silva',
    employeeEmail: 'marcelo.silva@email.com',
    status: 'APPROVED',
  },
  {
    id: '3',
    date: '2024-04-18',
    employeeCPF: '43211636099',
    employeeName: 'Junior da Silva',
    employeeEmail: 'junior.silva@email.com',
    status: 'REPROVED',
  },
];

const renderComponent = () => render(<Dashboard />);

describe('Dashboard component', () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it('should list admissions', async () => {
    axiosMock.onGet('/registrations').reply(200, admissionListMock);

    renderComponent();

    const columnReview = screen.getByTestId('column-review');
    const columnApproved = screen.getByTestId('column-approved');
    const columnReproved = screen.getByTestId('column-reproved');

    const cardsReview = await within(columnReview).findAllByRole('listitem');
    const cardsApproved = within(columnApproved).getAllByRole('listitem');
    const cardsReproved = within(columnReproved).getAllByRole('listitem');

    expect(cardsReview).toHaveLength(1);
    expect(cardsApproved).toHaveLength(1);
    expect(cardsReproved).toHaveLength(1);
  });

  it('should list admissions with error', async () => {
    axiosMock.onGet('/registrations').reply(500, { message: 'Server error' });

    renderComponent();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Não foi possível carregar as admissões.');
    });
  });

  it('should filter admission by CPF', async () => {
    const user = userEvent.setup();

    axiosMock.onGet('/registrations').reply(200, admissionListMock);
    axiosMock.onGet('/registrations?employeeCPF=43211636099').reply(200, admissionListMock.slice(-1));

    renderComponent();

    const allAdmission = await screen.findAllByRole('listitem');

    expect(allAdmission).toHaveLength(3);

    const inputSearch = screen.getByRole('textbox');
    await user.type(inputSearch, '43211636099');

    const filteredAdmission = await screen.findAllByRole('listitem');

    expect(filteredAdmission).toHaveLength(1);
  });

  it('should display alert dialog to confirm action', async () => {
    const user = userEvent.setup();

    axiosMock.onGet('/registrations').reply(200, admissionListMock);

    renderComponent();

    const columnReview = screen.getByTestId('column-review');

    const cardsReview = await within(columnReview).findAllByRole('listitem');
    const buttonApprove = within(cardsReview[0]).getByRole('button', { name: /aprovar/i });

    await user.click(buttonApprove);

    const alert = within(cardsReview[0]).getByRole('alertdialog');
    expect(alert).toBeVisible();
  });

  it('should approve admission in review', async () => {
    const user = userEvent.setup();
    const { id, ...admission } = admissionListMock[0];

    axiosMock.onGet('/registrations').reply(200, admissionListMock);

    axiosMock
      .onPut(`/registrations/${id}`, { ...admission, status: AdmissionStatus.Approved })
      .reply(200, admission);

    renderComponent();

    const columnReview = screen.getByTestId('column-review');

    const cardsReview = await within(columnReview).findAllByRole('listitem');
    const buttonApprove = within(cardsReview[0]).getByRole('button', { name: /aprovar/i });

    await user.click(buttonApprove);

    const buttonConfirm = within(cardsReview[0]).getByRole('button', { name: /sim/i });
    await user.click(buttonConfirm);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Admissão atualizada com sucesso.');
    });
  });

  it('should reprove admission in approved', async () => {
    const user = userEvent.setup();
    const { id, ...admission } = admissionListMock[1];

    axiosMock.onGet('/registrations').reply(200, admissionListMock);

    axiosMock
      .onPut(`/registrations/${id}`, { ...admission, status: AdmissionStatus.Reproved })
      .reply(200, admission);

    renderComponent();

    const columnApproved = screen.getByTestId('column-approved');

    const cardsApproved = await within(columnApproved).findAllByRole('listitem');
    const buttonReprove = within(cardsApproved[0]).getByRole('button', { name: /reprovar/i });

    await user.click(buttonReprove);

    const buttonConfirm = within(cardsApproved[0]).getByRole('button', { name: /sim/i });
    await user.click(buttonConfirm);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Admissão atualizada com sucesso.');
    });
  });

  it('should send to review admission in reproved', async () => {
    const user = userEvent.setup();
    const { id, ...admission } = admissionListMock[2];

    axiosMock.onGet('/registrations').reply(200, admissionListMock);

    axiosMock
      .onPut(`/registrations/${id}`, { ...admission, status: AdmissionStatus.Reproved })
      .reply(200, admission);

    renderComponent();

    const columnReproved = screen.getByTestId('column-reproved');

    const cardsReproved = await within(columnReproved).findAllByRole('listitem');
    const buttonReview = within(cardsReproved[0]).getByRole('button', { name: /^revisar/i });

    await user.click(buttonReview);

    const buttonConfirm = within(cardsReproved[0]).getByRole('button', { name: /sim/i });
    await user.click(buttonConfirm);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Admissão atualizada com sucesso.');
    });
  });

  it('should delete admission', async () => {
    const user = userEvent.setup();
    const { id, ...admission } = admissionListMock[0];

    axiosMock.onGet('/registrations').reply(200, admissionListMock);
    axiosMock.onDelete(`/registrations/${id}`).reply(200, admission);

    renderComponent();

    const columnReview = screen.getByTestId('column-review');

    const cardsReview = await within(columnReview).findAllByRole('listitem');
    const buttonApprove = within(cardsReview[0]).getByRole('button', { name: /excluir/i });

    await user.click(buttonApprove);

    const buttonConfirm = within(cardsReview[0]).getByRole('button', { name: /sim/i });
    await user.click(buttonConfirm);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Admissão excluída com sucesso.');
    });
  });

  it('should delete admission with erro', async () => {
    const user = userEvent.setup();
    const { id } = admissionListMock[0];

    axiosMock.onGet('/registrations').reply(200, admissionListMock);
    axiosMock.onDelete(`/registrations/${id}`).reply(500, { message: 'Server error' });

    renderComponent();

    const columnReview = screen.getByTestId('column-review');

    const cardsReview = await within(columnReview).findAllByRole('listitem');
    const buttonApprove = within(cardsReview[0]).getByRole('button', { name: /excluir/i });

    await user.click(buttonApprove);

    const buttonConfirm = within(cardsReview[0]).getByRole('button', { name: /sim/i });
    await user.click(buttonConfirm);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Erro ao excluir Admissão.');
    });
  });
});
