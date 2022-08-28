import styled from 'styled-components';
import { Card } from './Card/Card';
import { useScrollPagination } from '../hooks/useScrollPagination';
import { useEffect } from 'react';

export function Games({ games, isAutoScroll, setGames }) {
  const { gamesList, scrolledGames, isFetching } = useScrollPagination({ games, isAutoScroll });

  useEffect(() => {
    const newGames = { ...scrolledGames, results: gamesList };
    setGames(newGames);
  }, [gamesList]);

  if (!games.results.length) {
    return <div>No data!</div>;
  }

  return (
    <Container>
      {games.results.map((game) => (
        <Card key={game.id} game={game} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  justify-content: center;
  gap: 10px;
  padding: 10px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1300px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
