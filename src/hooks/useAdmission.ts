import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  updateAdmission as updateAdmissionRequest,
  deleteAdmission as deleteAdmissionRequest,
} from '~/services/admissionApi';
import { Admission, AdmissionStatus } from '~/types/admission';
import { useDashboard } from './useDashboard';

type UseAdmissionProps = {
  admission: Admission;
};

type UseAdmission = {
  /**
   * Use to know if the request is in progress.
   *
   * @default false
   */
  loading: boolean;

  /**
   * Object that informs which actions are available for admission.
   * 
   * @default '{ APPROVED: false, REPROVED: false, REVIEW: false }'
   */
  enableActions: Record<AdmissionStatus, boolean>;

  /**
   * Callback used to change the status of an admission.
   */
  updateStatus: (status: AdmissionStatus) => Promise<void>;

  /**
   * Callback used to delete admission.
   */
  deleteAdmission: (id: string) => Promise<void>;
};

export function useAdmission({ admission }: UseAdmissionProps): UseAdmission {
  const [loading, setLoading] = useState(false);

  const { listAdmissions } = useDashboard();

  const enableActions = {
    [AdmissionStatus.Review]: admission.status !== AdmissionStatus.Review,
    [AdmissionStatus.Approved]: admission.status !== AdmissionStatus.Approved,
    [AdmissionStatus.Reproved]: admission.status !== AdmissionStatus.Reproved,
  };

  const updateStatus = async (status: AdmissionStatus) => {
    try {
      setLoading(true);

      const data = {
        ...admission,
        status,
      };

      await updateAdmissionRequest(data);
      await listAdmissions();

      toast.success('Admissão atualizada com sucesso.');
    } catch {
      toast.error('Não foi possível atualizar a admissão.');
    } finally {
      setLoading(false);
    }
  };

  const deleteAdmission = async (id: string) => {
    try {
      setLoading(true);

      await deleteAdmissionRequest({ id });
      await listAdmissions();
      toast.success('Admissão excluída com sucesso.');
    } catch {
      toast.error('Erro ao excluir Admissão.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    enableActions,
    updateStatus,
    deleteAdmission,
  };
}
