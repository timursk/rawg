import styled from 'styled-components';
import { Search } from './Search';

export function Header({ setFilters }) {
  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  return (
    <StyledHeader>
      <Title>RAWG</Title>

      <Search handleChange={handleChange} />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
  padding: 10px;
  gap: 40px;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;
