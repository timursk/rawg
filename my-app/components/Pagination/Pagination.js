import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

export function Pagination({ next, previous }) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(+router.query.page || 1);
  const [pages, setPages] = useState([]);

  const handleClick = (addend) => {
    router.push({
      pathname: router.pathname,
      query: { page: currentPage + Number(addend) },
    });

    setCurrentPage((currentPage) => currentPage + Number(addend));
  };

  useEffect(() => {
    const newPages = [];

    let start = currentPage - 2;
    let end = currentPage + 3;

    while (start <= 0) {
      start += 1;
      end += 1;
    }

    for (let i = start; i <= end; i++) {
      newPages.push(i);
    }

    setPages(newPages);
  }, [currentPage]);

  return (
    <Container>
      <button disabled={!previous} onClick={() => handleClick(-1)}>{`<-`}</button>

      <PagesContainer>
        {pages.map((item, idx) => (
          <PageItem key={idx} isCurrent={item === currentPage}>
            {item}
          </PageItem>
        ))}
      </PagesContainer>

      <button disabled={!next} onClick={() => handleClick(1)}>{`->`}</button>
    </Container>
  );
}

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
  background: ${(props) => (props.isCurrent ? 'green' : 'inherit')};
`;
