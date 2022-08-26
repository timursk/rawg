import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../components/Card/Card';
import { Header } from '../components/Header/Header';
import { Pagination } from '../components/Pagination/Pagination';
import { useGetGamesByColumns } from '../hooks/useGetGamesByColumns';
import { throttle } from '../Utils/throttle';
import { useScrollPagination } from '../hooks/useScrollPagination';
import { Sort } from '../components/Sort/Sort';

export default function Home({ initial }) {
  const [initialGames, setInitialGames] = useState(initial);
  const [results, setResults] = useState(initial.results);
  console.log('res', results);
  const [games, setGames] = useState(null);

  const { gamesByColumn, allGames, setAllGames, addNewGames } = useGetGamesByColumns(results);
  const { scrolledGames, scrolledInitialGames } = useScrollPagination({
    initialGames,
    next: initialGames.next,
  });

  useEffect(() => {
    setInitialGames(initial);
    setResults(initial.results);
  }, [initial]);

  useEffect(() => {
    setInitialGames(scrolledInitialGames);
    addNewGames(scrolledGames);
  }, [scrolledGames]);

  useEffect(() => {
    setGames(gamesByColumn);
  }, [gamesByColumn]);

  const handleSearch = useCallback(
    (value) => {
      const newGames = gamesByColumn.map((gamesArr) => {
        return gamesArr.filter((game) => game.name.toLowerCase().includes(value.toLowerCase()));
      });

      setGames(newGames);
    },
    [gamesByColumn]
  );

  const throttledHandleSearch = useCallback(throttle(handleSearch, 200), [handleSearch]);

  return (
    <>
      <Header handleSearch={throttledHandleSearch} />

      <div>
        <Sort games={allGames} setGames={setAllGames} />
      </div>

      {games?.length && (
        <Container>
          {games.map((gamesColumn, idx) => {
            if (!gamesColumn?.length) {
              return;
            }

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

      <Pagination next={initialGames.next} previous={initialGames.previous} />
    </>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=2516c1a213f748d4b2f1ef169998a412&page=${page}`
  );
  const initial = await response.json();

  return {
    props: { initial },
  };
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
