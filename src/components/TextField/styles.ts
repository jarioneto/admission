import styled from "styled-components";

export const Input = styled.input`
  outline: none;
  padding: 0 8px;
  vertical-align: middle;
  border-radius: 2px;
  width: 100%;
  min-height: 36px;
  background-color: #ffffff;
  border: 1.5px solid #8b8b8b;
  transition: all 0.2s ease-in-out 0s;
  font-size: 16px;
  font-family: "Inter", sans-serif;
  line-height: 18px;
  font-weight: normal;
  border-radius:8px;
  box-sizing: border-box;

  &[data-status="valid"] {
    border-color: #318462;
  }

  &[data-status="invalid"] {
    border-color: #b45c63;
  }

  &:focus, &:focus-visible {
    box-shadow: inset 0 0 0 1px #8b8b8b;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  line-height: 16px;
  font-weight: normal;
  color: #181818;
`;

export const HelperText = styled.span`
  font-size: 12px;
  line-height: 14px;
  font-weight: normal;
  color: #181818;

  &[data-status="valid"] {
    color: #318462;
  }

  &[data-status="invalid"] {
    color: #b45c63;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;