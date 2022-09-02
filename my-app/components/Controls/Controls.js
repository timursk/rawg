import { Filter } from './Filter';
import { Sort } from './Sort';
import styled from 'styled-components';
import { AutoScroll } from './AutoScroll';

export function Controls({ filters, setFilters, setIsAutoScroll }) {
  return (
    <Container>
      <StyledDiv>
        <Sort filters={filters} setFilters={setFilters} />
        <Filter filters={filters} setFilters={setFilters} />
      </StyledDiv>

      <AutoScroll setIsAutoScroll={setIsAutoScroll} />
    </Container>
  );
}

const Container = styled.div`
  margin-left: auto;
  padding: 5px 10px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 500px) {
    justify-content: flex-end;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
