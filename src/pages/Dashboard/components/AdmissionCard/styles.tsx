import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  row-gap: 10px;
  padding: 16px;

  h4,
  span {
    margin: 0;
  }
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Divider = styled.hr`
  border-top: solid 1px #E3E3E3;
  margin: 5px 0;
`;

export const Actions = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;

  & > button[data-align="end"] {
    position: absolute;
    right: 0;
  }

  @media only screen and (max-width: 1160px) {
    & > button {
      display: block;
      max-width: 90px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const Dialog = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 100%;
  background-color: #FFFFFF;
  backdrop-filter: blur(0px)!important;
  border-radius: 4px;
  -webkit-transform: translateY(100%);
          transform: translateY(100%);
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  -webkit-transition: opacity 0.1s 0.3s, -webkit-transform 0.4s;
  transition: opacity 0.1s 0.3s, -webkit-transform 0.4s;
  transition: transform 0.4s, opacity 0.1s 0.3s;
  transition: transform 0.4s, opacity 0.1s 0.3s, -webkit-transform 0.4s;

  &[data-visible="true"] {
    opacity: .95;
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
    -webkit-transition: opacity 0.1s, -webkit-transform 0.4s;
    transition: opacity 0.1s, -webkit-transform 0.4s;
    transition: transform 0.4s, opacity 0.1s;
    transition: transform 0.4s, opacity 0.1s, -webkit-transform 0.4s;
  }
`;

export const Alert = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
`;
