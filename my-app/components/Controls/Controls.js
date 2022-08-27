import { Filter } from '../Filter/Filter';
import { Sort } from '../Sort/Sort';
import styled from 'styled-components';
import { AutoScroll } from './AutoScroll';

export function Controls({ setFilters }) {
  return (
    <Container>
      <Sort setFilters={setFilters} />
      <Filter setFilters={setFilters} />
      <AutoScroll setFilters={setFilters} />
    </Container>
  );
}

const Container = styled.div`
  margin-left: auto;
  width: fit-content;
  height: 50px;
  padding: 5px 10px 0px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
