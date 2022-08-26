import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../components/Card/Card';
import { Header } from '../components/Header/Header';
import { Pagination } from '../components/Pagination/Pagination';
import { useGetGamesByColumns } from '../hooks/useGetGamesByColumns';
import { debounce } from '../Utils/debounce';
import { useScrollPagination } from '../hooks/useScrollPagination';
import { Sort } from '../components/Sort/Sort';

export default function Home({ initial }) {
  const [games, setGames] = useState(initial);
  // const [results, setResults] = useState(initial.results);
  // console.log('res', results);
  // const { gamesByColumn, allGames, setAllGames, addNewGames } = useGetGamesByColumns(results);
  const { gamesByColumn, allGames, setAllGames, addNewGames } = useGetGamesByColumns(games.results);
  console.log('games', games);
  const { scrolledGames, scrolledInitialGames } = useScrollPagination({
    initialGames: games,
    next: games.next,
  });

  useEffect(() => {
    setGames(initial);
    // setResults(initial.results);
  }, [initial]);

  useEffect(() => {
    const newTest = { ...scrolledInitialGames, results: scrolledGames };
    setGames(newTest);
    // setGames(scrolledInitialGames);
    // addNewGames(scrolledGames);
  }, [scrolledGames]);

  const handleSearch = useCallback(
    (value) => {
      async function getGames(search) {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=2516c1a213f748d4b2f1ef169998a412&search=${search}`
        );
        return await response.json();
      }

      getGames(value).then((result) => {
        setGames(result);
      });
    },
    [gamesByColumn]
  );

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 650), [handleSearch]);

  return (
    <>
      <Header handleSearch={debouncedHandleSearch} />

      {/* <div>
        <Sort games={allGames} setGames={setAllGames} />
      </div> */}

      {/* {gamesByColumn?.length && (
        <Container>
          {gamesByColumn.map((gamesColumn, idx) => {
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
      )} */}

      <Pagination next={games.next} previous={games.previous} />
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
