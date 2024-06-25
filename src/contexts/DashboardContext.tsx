import React, { createContext, useCallback, useState } from 'react';
import { AdmissionDashboard, AdmissionStatus } from '~/types/admission';

interface DashboardContext {
  /**
   * List with all admissions filtered by status.
   *
   * @default '{ APPROVED: [], REPROVED: [], REVIEW: [] }'
   */
  admissions: AdmissionDashboard;

  /**
   * Use to know if admissions are being loaded.
   *
   * @default false
   */
  loading: boolean;

  /**
   * Callback used to change admissions.
   */
  setAdmissions: (admission: AdmissionDashboard) => void;

  /**
   * Callback used to change loadind state.
   */
  setLoading: (loading: boolean) => void;
}

interface DashboardContextProps {
  children?: React.ReactNode;
}

const initialValue = {
  [AdmissionStatus.Approved]: [],
  [AdmissionStatus.Reproved]: [],
  [AdmissionStatus.Review]: []
};

const Context = createContext<DashboardContext>({} as DashboardContext);

const Provider = ({ children }: DashboardContextProps) => {
  const [admissions, setAdmissions] = useState<AdmissionDashboard>(initialValue);
  const [loading, setLoading] = useState(true);

  const handleLoading = useCallback((value: boolean) => {
    setLoading(value);
  }, []);

  const handleAdmissions = useCallback((value: AdmissionDashboard) => {
    setAdmissions(value);
  }, []);

  const contextValue = {
    loading,
    admissions,
    setLoading: handleLoading,
    setAdmissions: handleAdmissions
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default { Context, Provider };