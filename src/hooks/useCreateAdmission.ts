import { useState } from 'react';
import { toast } from 'react-toastify';
import { createAdmission as createAdmissionRequest } from '~/services/admissionApi';
import { AdmissionFormValues, AdmissionStatus } from '~/types/admission';
import { useHistory } from 'react-router-dom';
import routes from '~/router/routes';
import { unformatCPF } from '~/utils/formaters';

type UseCreateAdmission = {
  /**
   * Use to know if the request is in progress.
   *
   * @default false
   */
  loading: boolean;

  /**
   * Callback used to create admission.
   */
  createAdmission: (data: AdmissionFormValues) => Promise<void>;
};

export function useCreateAdmission(): UseCreateAdmission {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const createAdmission = async (data: AdmissionFormValues) => {
    try {
      setLoading(true);

      await createAdmissionRequest({
        ...data,
        employeeCPF: unformatCPF(data.employeeCPF),
        status: AdmissionStatus.Review,
      });

      history.push(routes.dashboard);

      toast.success('Admissão criada com sucesso.');
    } catch {
      toast.error('Não foi possível criar a admissão.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createAdmission,
  };
}
