import styled, { keyframes } from 'styled-components';

export function Loader() {
  return (
    <Container>
      <StyledDiv></StyledDiv>
      <StyledDiv></StyledDiv>
      <StyledDiv></StyledDiv>
      <StyledDiv></StyledDiv>
    </Container>
  );
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto;
`;

const StyledDiv = styled.div`
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 6px solid #fff;
  border-radius: 50%;
  animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
  }

  &:nth-child(1) {
    animation-delay: -0.45s;
  }
  &:nth-child(2) {
    animation-delay: -0.3s;
  }
  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
