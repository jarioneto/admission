import { ChangeEvent } from 'react';
import { HiRefresh, HiX } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';
import { TextField } from '~/components/TextField';
import routes from '~/router/routes';
import { useSearch } from '~/hooks/useSearch';

import * as S from './styles';

export const SearchBar = () => {
  const history = useHistory();
  const { listAdmissions, filter, setFilter } = useSearch();

  const goToNewAdmissionPage = () => {
    history.push(routes.createAdmission);
  };

  const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleRefresh = () => {
    setFilter('');
    listAdmissions();
  };

  const handleClear = () => {
    setFilter('');
  };

  return (
    <S.Container>
      <S.Content>
        <TextField
          value={filter}
          onChange={handleChangeFilter}
          maxLength={14}
          placeholder="Digite um CPF válido"
        />
        {filter && (
          <IconButton shape="rectangle" color="tertiary" aria-label="Limpar" onClick={handleClear}>
            <HiX />
          </IconButton>
        )}
      </S.Content>
      <S.Actions>
        <IconButton size="small" aria-label="Atualizar" onClick={handleRefresh}>
          <HiRefresh />
        </IconButton>
        <Button shape="pill" variant="solid" onClick={() => goToNewAdmissionPage()}>
          Nova Admissão
        </Button>
      </S.Actions>
    </S.Container>
  );
};
