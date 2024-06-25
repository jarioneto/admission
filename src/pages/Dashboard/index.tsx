import { useEffect } from 'react';
import { Admission, AdmissionStatus } from '~/types/admission';
import Board from './components/Board';
import BoardColumn from './components/BoardColumn';
import BoardItem from './components/BoardItem';
import { SearchBar } from './components/SearchBar';
import { AdmissionCard } from './components/AdmissionCard';
import DashboardContext from '~/contexts/DashboardContext';
import { useDashboard } from '~/hooks/useDashboard';

import * as S from './styles';
import { PageLoader } from '~/components/Loader';

/* -------------------------------------------------------------------------------------------------
 * AdmissionList
 * -----------------------------------------------------------------------------------------------*/

type AdmissionListProps = {
  admissions: Array<Admission>;
};

const AdmissionList = ({ admissions }: AdmissionListProps) => {
  return (
    <>
      {admissions.map((admission) => (
        <BoardItem key={admission.id}>
          <AdmissionCard admission={admission} />
        </BoardItem>
      ))}
    </>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Dashboard
 * -----------------------------------------------------------------------------------------------*/

const Dashboard = (): JSX.Element => {
  const { listAdmissions, admissions, loading } = useDashboard();

  useEffect(() => {
    listAdmissions();
  }, [listAdmissions]);

  return (
    <S.Container>
      <SearchBar />
      <Board>
        <BoardColumn
          title="Pronto para revisar"
          variant={AdmissionStatus.Review}
          data-testid="column-review"
        >
          <AdmissionList admissions={admissions.REVIEW} />
        </BoardColumn>
        <BoardColumn
          title="Aprovado"
          variant={AdmissionStatus.Approved}
          data-testid="column-approved"
        >
          <AdmissionList admissions={admissions.APPROVED} />
        </BoardColumn>
        <BoardColumn
          title="Reprovado"
          variant={AdmissionStatus.Reproved}
          data-testid="column-reproved"
        >
          <AdmissionList admissions={admissions.REPROVED} />
        </BoardColumn>
      </Board>
      {loading && <PageLoader />}
    </S.Container>
  );
};

/* -------------------------------------------------------------------------------------------------
 * DashboardPage
 * -----------------------------------------------------------------------------------------------*/

const DashboardPage = (): JSX.Element => {
  return (
    <DashboardContext.Provider>
      <Dashboard />
    </DashboardContext.Provider>
  );
};

export default DashboardPage;
