import { useCallback, useContext } from "react";
import { toast } from 'react-toastify';
import { listAdmissions as listAdmissionsRequest } from "~/services/admissionApi";
import { AdmissionDashboard, AdmissionListResponse, AdmissionStatus } from "~/types/admission";
import DashboardContext from "~/contexts/DashboardContext";

type UseDashboard = {
  /**
   * Use to know if admissions are being loaded.
   *
   * @default false
   */
  loading: boolean;

  /**
   * List with all admissions filtered by status.
   *
   * @default '{ APPROVED: [], REPROVED: [], REVIEW: [] }'
   */
  admissions: AdmissionDashboard;

  /**
   * Callback used to list admissions.
   */
  listAdmissions: (cpf?: string) => Promise<void>;
};

export function useDashboard(): UseDashboard {
  const { loading, admissions, setLoading, setAdmissions } = useContext(DashboardContext.Context)

  const formatAdmissions = (list: AdmissionListResponse): AdmissionDashboard => {
    const admissionDashboard: AdmissionDashboard = {
      [AdmissionStatus.Approved]: [],
      [AdmissionStatus.Reproved]: [],
      [AdmissionStatus.Review]: []
    };

    list.forEach((admission) => {
      admissionDashboard?.[admission.status]?.push(admission);
    });

    return admissionDashboard;
  };

  const listAdmissions = useCallback(async (cpf?: string) => {
    try {
      setLoading(true);

      const { data } = await listAdmissionsRequest({ employeeCPF: cpf });
      setAdmissions(formatAdmissions(data));
    } catch {
      toast.error('Não foi possível carregar as admissões.');
    } finally {
      setLoading(false);
    }
  }, [setAdmissions, setLoading]);

  return {
    loading,
    admissions,
    listAdmissions
  };
}
