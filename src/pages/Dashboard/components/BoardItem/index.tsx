import * as S from "./styles";

type BoardItemProps = {
  children: React.ReactNode;
};

const BoardItem = ({ children }: BoardItemProps) => {
  return (
    <S.Item role="listitem">
      {children}
    </S.Item>
  );
};

export default BoardItem;
