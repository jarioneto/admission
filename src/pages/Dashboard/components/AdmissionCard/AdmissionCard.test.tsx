import { render, screen } from '@testing-library/react';

import { AdmissionCard, AdmissionCardProps } from './index';
import { AdmissionStatus } from '~/types/admission';

const defaultProps = {
  admission: {
    id: '1',
    date: '2024-06-20',
    employeeCPF: '07622331090',
    employeeName: 'Maria da Silva',
    employeeEmail: 'maria.silva@email.com',
    status: AdmissionStatus.Review,
  }
};

const renderComponent = (props: AdmissionCardProps) => render(<AdmissionCard {...props} />);

describe('AdmissionCard component', () => {
  it('should render component', () => {
    renderComponent(defaultProps);

    const name = screen.getByText(/maria da silva/i);
    const email = screen.getByText(/maria.silva@email.com/i);
    const date = screen.getByText(/20\/06\/2024/i);

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });

  it('display only `reprovar` and `aprovar` actions for review status', () => {
    renderComponent(defaultProps);

    const buttonApprove = screen.getByRole('button', { name: /aprovar/i });
    const buttonReprove = screen.getByRole('button', { name: /reprovar/i });

    const buttonReview = screen.queryByRole('button', { name: /revisar novamente/i });

    expect(buttonApprove).toBeInTheDocument();
    expect(buttonReprove).toBeInTheDocument();

    expect(buttonReview).not.toBeInTheDocument();
  });

  it('display only `revisar novamente` and `reprovar` actions for approved status', () => {
    const props = {
      ...defaultProps,
      admission: {
        ...defaultProps.admission,
        status: AdmissionStatus.Approved,
      }
    };

    renderComponent(props);

    const buttonReprove = screen.getByRole('button', { name: /reprovar/i });
    const buttonReview = screen.getByRole('button', { name: /revisar novamente/i });

    const buttonApprove = screen.queryByRole('button', { name: /aprovar/i });


    expect(buttonReview).toBeInTheDocument();
    expect(buttonReprove).toBeInTheDocument();

    expect(buttonApprove).not.toBeInTheDocument();
  });

  it('display only `revisar novamente` and `aprovar` actions for reproved status', () => {
    const props = {
      ...defaultProps,
      admission: {
        ...defaultProps.admission,
        status: AdmissionStatus.Reproved,
      }
    };

    renderComponent(props);

    const buttonApprove = screen.getByRole('button', { name: /aprovar/i });
    const buttonReview = screen.getByRole('button', { name: /revisar novamente/i });
    
    const buttonReprove = screen.queryByRole('button', { name: /reprovar/i });

    expect(buttonReview).toBeInTheDocument();
    expect(buttonApprove).toBeInTheDocument();

    expect(buttonReprove).not.toBeInTheDocument();
  });
});
