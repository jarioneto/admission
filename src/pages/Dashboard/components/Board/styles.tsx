import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(300px, 1fr) minmax(300px, 1fr);
  grid-gap: 24px;
  margin-top: 24px;
  overflow-x: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
