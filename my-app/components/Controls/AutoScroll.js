import { useState } from 'react';
import styled from 'styled-components';
import autoscrollImg from '../../assets/autoscroll.png';
import paginationImg from '../../assets/pagination.png';

export function AutoScroll({ setIsAutoScroll }) {
  const [value, setValue] = useState(true);

  const handleClick = () => {
    setValue(!value);
    setIsAutoScroll(!value);
  };

  return (
    <Container>
      <StyledButton disabled={value} img={autoscrollImg.src} onClick={handleClick}></StyledButton>
      <StyledButton disabled={!value} img={paginationImg.src} onClick={handleClick}></StyledButton>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  gap: 5px;
`;

const StyledButton = styled.button`
  width: 50px;
  height: 100%;
  border: 1px solid #e5e5e5;
  transition: all 0.3s;
  background: ${(props) => (props.disabled ? '#efefef' : '#fff')};
  background-image: url('${(props) => props.img}');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
