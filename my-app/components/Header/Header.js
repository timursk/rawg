import Link from 'next/link';
import styled from 'styled-components';
import { Search } from './Search';

export function Header({ setFilters }) {
  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  return (
    <StyledHeader>
      <Link href={'/'}>
        <Title>RAWG</Title>
      </Link>

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
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: #2d2d2d;
  }
`;
