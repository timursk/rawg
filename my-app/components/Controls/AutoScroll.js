import { useState } from 'react';
import styled from 'styled-components';

export function AutoScroll({ setIsAutoScroll }) {
  const [value, setValue] = useState(true);

  const handleClick = (e) => {
    setValue(e.target.checked);
    setIsAutoScroll(!value);
  };

  return (
    <Container>
      <StyledP>AutoScroll: </StyledP>

      <ToggleSwitch>
        <SwitchLabel>
          <SwitchInput checked={value} onChange={handleClick} type="checkbox"></SwitchInput>

          <SwitchInner isOpen={value}></SwitchInner>

          <SwitchElement isOpen={value}></SwitchElement>
        </SwitchLabel>
      </ToggleSwitch>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StyledP = styled.p`
  margin: 0;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 75px;
  display: inline-block;
  vertical-align: middle;
  user-select: none;
  text-align: left;
`;

const SwitchInput = styled.input`
  display: none;
  user-select: none;
`;

const SwitchLabel = styled.label`
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 0 solid #bbb;
  border-radius: 20px;
  margin: 0;
  user-select: none;
`;

const SwitchInner = styled.span`
  display: block;
  width: 200%;
  margin-left: ${(props) => (props.isOpen ? '0%' : '-100%')};
  transition: margin 0.3s;

  &:before,
  &:after {
    display: block;
    float: left;
    width: 50%;
    height: 34px;
    padding: 0;
    line-height: 34px;
    color: white;
    font-weight: 500;
    box-sizing: border-box;
  }

  &:before {
    content: 'On';
    text-transform: uppercase;
    padding-left: 10px;
    background-color: ${(props) => props.theme.colors.active};
  }

  &:after {
    content: 'Off';
    text-transform: uppercase;
    padding-right: 10px;
    background-color: #bbb;
    text-align: right;
  }
`;

const SwitchElement = styled.span`
  display: block;
  width: 24px;
  height: 24px;
  margin: 5px;
  background: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  right: ${(props) => (props.isOpen ? '0px' : '40px')};
  border: 0 solid #bbb;
  border-radius: 20px;
  transition: all 0.3s;
`;
