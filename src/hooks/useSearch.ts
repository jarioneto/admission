import { useCallback, useEffect, useRef, useState } from 'react';
import { useDashboard } from './useDashboard';
import { formatCPF, unformatCPF } from '~/utils/formaters';
import { validateCPF } from '~/utils/validators';

type UseSearch = {
  /**
   * Term used in the filter.
   * 
   * @default ''
   */
  filter: string;

  /**
   * Callback used to apply a filter.
   */
  setFilter: (value: string) => void;

  /**
   * Callback used to filter admissions.
   */
  listAdmissions: (cpf?: string) => Promise<void>;
};

export function useSearch(): UseSearch {
  const [filter, setFilter] = useState('');
  const hasFilter = useRef<boolean>();
  const { listAdmissions } = useDashboard();

  useEffect(() => {
    if (validateCPF(filter)) {
      hasFilter.current = true;
      listAdmissions(unformatCPF(filter));
    } else if (filter === '' && hasFilter.current) {
      hasFilter.current = false;
      listAdmissions();
    }
  }, [filter, listAdmissions]);

  const handleChange = useCallback((value: string) => {
    setFilter(formatCPF(value));
  }, []);

  return {
    filter,
    setFilter: handleChange,
    listAdmissions,
  };
}
