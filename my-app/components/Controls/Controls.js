import { Filter } from '../Filter/Filter';
import { Sort } from '../Sort/Sort';
import styled from 'styled-components';

export function Controls({ setFilters }) {
  return (
    <Container>
      <Sort setFilters={setFilters} />
      <Filter setFilters={setFilters} />
    </Container>
  );
}

const Container = styled.div`
  margin-left: auto;
  width: fit-content;
  padding: 5px 10px 0px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
