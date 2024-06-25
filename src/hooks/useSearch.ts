import { useCallback, useEffect, useState } from 'react';
import { useDashboard } from './useDashboard';
import { cpf } from 'cpf-cnpj-validator';
import { formatCPF, unformatCPF } from '~/utils/formaters';

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
  const [hasFilter, setHasFilter] = useState(false);
  const { listAdmissions } = useDashboard();

  useEffect(() => {
    if (cpf.isValid(filter)) {
      setHasFilter(true);
      listAdmissions(unformatCPF(filter));
    } else if (filter === '' && hasFilter) {
      setHasFilter(false);
      listAdmissions();
    }
  }, [filter, hasFilter, listAdmissions]);

  const handleChange = useCallback((value: string) => {
    setFilter(formatCPF(value));
  }, []);

  return {
    filter,
    setFilter: handleChange,
    listAdmissions,
  };
}
