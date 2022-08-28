import { useEffect, useState } from 'react';
import styled from 'styled-components';

export function Pagination({ next, previous, filters, setFilters }) {
  const [currentPage, setCurrentPage] = useState(Number(filters.page));
  const [pages, setPages] = useState([]);

  const handleClick = (addend) => {
    setFilters((prev) => ({ ...prev, page: currentPage + Number(addend) }));
    setCurrentPage((currentPage) => currentPage + Number(addend));
  };

  const handleSet = (val) => {
    setFilters((prev) => ({ ...prev, page: val }));
    setCurrentPage(val);
  };

  useEffect(() => {
    const newPages = [];
    let start = Math.max(1, currentPage - 2);
    let end = start + 4;

    for (let i = start; i <= end; i++) {
      newPages.push(i);
    }

    setPages(newPages);
  }, [currentPage]);

  return (
    <Container>
      <StyledButton disabled={!previous} onClick={() => handleClick(-1)}>
        <Arrow left={true}></Arrow>
      </StyledButton>

      <PagesContainer>
        {pages.map((item, idx) => (
          <PageItem key={idx} isCurrent={item === currentPage} onClick={() => handleSet(item)}>
            {item}
          </PageItem>
        ))}
      </PagesContainer>

      <StyledButton disabled={!next} onClick={() => handleClick(1)}>
        <Arrow right={true}></Arrow>
      </StyledButton>
    </Container>
  );
}

const Arrow = styled.div`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;

  transform: rotate(${(props) => (props.left ? 135 : props.right ? -45 : 0)}deg);
`;

const StyledButton = styled.button`
  width: 20px;
  height: 20px;
  padding: 15px;
  border: none;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  width: fit-content;
  margin-bottom: 10px;
`;

const PagesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PageItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  width: 20px;
  height: 20px;
  border: 1px solid grey;
  border-radius: 4px;
  background: ${(props) => (props.isCurrent ? '#fff' : 'inherit')};
  color: ${(props) => (props.isCurrent ? '#000' : 'inherit')};
  transition: all 0.2s ease;
  cursor: pointer;
`;
