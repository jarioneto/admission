import { styled, keyframes } from 'styled-components';

const rotate = keyframes({
  '0%': {
    transform: 'rotate(0deg)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
});

export const Spin = styled.div`
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;

  & > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 35px;
    height: 35px;
    border: 3px solid #FF8858;
    border-radius: 50%;
    animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #FF8858 transparent transparent transparent;
  }

  & > div:nth-child(1) {
    animation-delay: -0.45s;
  }

  & > div:nth-child(2) {
    animation-delay: -0.3s;
  }

  & > div:nth-child(3) {
    animation-delay: -0.15s;
  }

  & > div:nth-child(4) {
    animation: unset;
    border-color: #FF8858;
    opacity: 0.2;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;

  body {
    overflow: hidden;
  }
`;