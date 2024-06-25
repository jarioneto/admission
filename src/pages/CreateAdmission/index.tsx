import { HiOutlineArrowLeft } from 'react-icons/hi';
import { AdmissionForm } from './components/AdmissionForm';
import { IconButton } from '~/components/IconButton';
import { useHistory } from 'react-router-dom';
import routes from '~/router/routes';
import { useCreateAdmission } from '~/hooks/useCreateAdmission';
import { PageLoader } from '~/components/Loader';

import * as S from './styles';

const CreateAdmission = (): JSX.Element => {
  const history = useHistory();
  const { createAdmission, loading } = useCreateAdmission();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <S.Section>
          <IconButton onClick={() => goToHome()} aria-label="Voltar">
            <HiOutlineArrowLeft size={24} />
          </IconButton>
          <h2>Nova Admissão</h2>
        </S.Section>
        <AdmissionForm onSubmit={createAdmission} />
      </S.Card>
      {loading && <PageLoader />}
    </S.Container>
  );
};

export default CreateAdmission;
