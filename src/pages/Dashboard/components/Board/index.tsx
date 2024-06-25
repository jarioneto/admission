
import * as S from "./styles";

type BoardProps = {
  children?: React.ReactNode;
};

const Board = ({ children }: BoardProps) => {
  return (
    <S.Container>
      {children}
    </S.Container>
  );
};

export default Board;
