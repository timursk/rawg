import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../components/Card/Card';
import { Header } from '../components/Header/Header';
import { Pagination } from '../components/Pagination/Pagination';
import { useGetGamesByColumns } from '../hooks/useGetGamesByColumns';
import { throttle } from '../Utils/throttle';
import { useRouter } from 'next/router';

export default function Home({ initialGames }) {
  console.log(initialGames);
  const [games, setGames] = useState([]);
  const [pagination, setPagination] = useState({
    previous: initialGames.previous,
    next: initialGames.next,
  });

  const router = useRouter();
  const { games: gamesByColumn, refetch } = useGetGamesByColumns(initialGames.results);

  useEffect(() => {
    setGames(gamesByColumn);
  }, [gamesByColumn]);

  useEffect(() => {
    if (!router.query.page) {
      return;
    }

    async function getGames() {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=2516c1a213f748d4b2f1ef169998a412&page=${router.query.page}`
      );
      return await response.json();
    }

    getGames().then((result) => {
      setPagination({ previous: result.previous, next: result.next });
      refetch(result.results);
    });
  }, [router.query.page]);

  const handleSearch = useCallback((value) => {
    const newGames = gamesByColumn.map((gamesArr) => {
      return gamesArr.filter((game) => game.name.toLowerCase().includes(value.toLowerCase()));
    });

    setGames(newGames);
  }, []);

  const throttledHandleSearch = useCallback(throttle(handleSearch, 200), [handleSearch]);

  return (
    <>
      <Header handleSearch={throttledHandleSearch} />

      <Container>
        {games?.length &&
          games.map((gamesColumn, idx) => {
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

      <Pagination next={pagination.next} previous={pagination.previous} />
    </>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(
    'https://api.rawg.io/api/games?key=2516c1a213f748d4b2f1ef169998a412'
  );
  const initialGames = await response.json();

  return {
    props: { initialGames },
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
