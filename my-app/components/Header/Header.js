import { useState } from 'react';
import styled from 'styled-components';
import searchIcon from '../../assets/search-icon.svg';

export function Header({ handleSearch }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <StyledHeader>
      <Title>RAWG</Title>

      <StyledLabel>
        <StyledInput
          onChange={handleChange}
          value={value}
          type="text"
          placeholder="search"
        ></StyledInput>
      </StyledLabel>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
  padding: 10px;
  background: purple;
  gap: 40px;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

const StyledLabel = styled.label`
  position: relative;
  width: 100%;
  max-width: 500px;

  &::after {
    content: url('${searchIcon.src}');
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 7px;
  padding-left: 40px;
  border: none;
  border-radius: 5px;
  // background: grey;
  font-size: 1.3rem;
`;
