import { useState } from 'react';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';
import { HiOutlineMail, HiOutlineUser, HiOutlineCalendar, HiOutlineTrash } from 'react-icons/hi';
import { Loader } from '~/components/Loader';
import { useAdmission } from '~/hooks/useAdmission';
import { formatToBrazilianDate } from '~/utils/formaters';
import { Admission, AdmissionStatus } from '~/types/admission';

import * as S from './styles';

type AdmissionCardProps = {
  admission: Admission;
};

type AdmissionAction = AdmissionStatus | 'DELETE';

const AdmissionCard = ({ admission }: AdmissionCardProps) => {
  const [visible, setVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<AdmissionAction>();

  const { enableActions, updateStatus, deleteAdmission, loading } = useAdmission({ admission });

  const toogleVisible = () => {
    setVisible((value) => !value);
  };

  const handleAction = (status: AdmissionAction) => {
    setCurrentStatus(status);
    toogleVisible();
  };

  const handleConfirm = () => {
    if (currentStatus !== 'DELETE') {
      updateStatus(currentStatus as AdmissionStatus).finally(() => toogleVisible());
    } else if (currentStatus === 'DELETE') {
      deleteAdmission(admission.id).finally(() => toogleVisible());
    }
  };

  return (
    <S.Container>
      <S.Section>
        <HiOutlineUser />
        <h4>{admission.employeeName}</h4>
      </S.Section>
      <S.Section>
        <HiOutlineMail />
        <span>{admission.employeeEmail}</span>
      </S.Section>
      <S.Section>
        <HiOutlineCalendar />
        <span>{formatToBrazilianDate(admission.date)}</span>
      </S.Section>
      <S.Divider />
      <S.Actions>
        {enableActions.REPROVED && (
          <Button
            size="small"
            color="tertiary"
            onClick={() => handleAction(AdmissionStatus.Reproved)}
          >
            Reprovar
          </Button>
        )}
        {enableActions.APPROVED && (
          <Button
            size="small"
            color="primary"
            onClick={() => handleAction(AdmissionStatus.Approved)}
          >
            Aprovar
          </Button>
        )}
        {enableActions.REVIEW && (
          <Button
            size="small"
            color="secondary"
            onClick={() => handleAction(AdmissionStatus.Review)}
          >
            Revisar novamente
          </Button>
        )}
        <IconButton
          color="tertiary"
          data-align="end"
          aria-label="Excluir"
          onClick={() => handleAction('DELETE')}
        >
          <HiOutlineTrash />
        </IconButton>
      </S.Actions>

      <S.Dialog data-visible={visible}>
        {loading ? (
          <Loader />
        ) : (
          <S.Alert role="alertdialog">
            <S.Section>
              <span>Deseja realizar a ação?</span>
            </S.Section>
            <S.Actions>
              <Button variant="solid" size="small" color="tertiary" onClick={toogleVisible}>
                Não
              </Button>
              <Button variant="solid" size="small" color="primary" onClick={handleConfirm}>
                Sim
              </Button>
            </S.Actions>
          </S.Alert>
        )}
      </S.Dialog>
    </S.Container>
  );
};

export { AdmissionCard };
export type { AdmissionCardProps, AdmissionAction };
