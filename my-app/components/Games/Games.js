import { useGetGamesByColumns } from '../../hooks/useGetGamesByColumns';
import styled from 'styled-components';
import { Card } from '../Card/Card';
import { useScrollPagination } from '../../hooks/useScrollPagination';
import { useEffect } from 'react';

export function Games({ games, setGames }) {
  const { gamesByColumn, allGames, setAllGames, addNewGames } = useGetGamesByColumns(games.results);

  const { gamesList, scrolledGames, isFetching } = useScrollPagination({ games });

  useEffect(() => {
    const newGames = { ...scrolledGames, results: gamesList };
    setGames(newGames);
  }, [gamesList]);

  return (
    <>
      {gamesByColumn?.length && (
        <Container>
          {gamesByColumn.map((gamesColumn, idx) => {
            return (
              <Column key={idx}>
                {gamesColumn.map((game) => (
                  <Card key={game.id} game={game} />
                ))}
              </Column>
            );
          })}
        </Container>
      )}
    </>
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
`;

const Column = styled.div`
  & > div {
    margin-bottom: 10px;
  }
  & > div:last-child {
    margin-bottom: 0;
  }
`;
