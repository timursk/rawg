import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../components/Card/Card';
import { Header } from '../components/Header/Header';
import { useGetGamesByColumns } from '../hooks/useGetGamesByColumns';
import styles from '../styles/Home.module.css';

export default function Home({ initialGames }) {
  const [games, setGames] = useState([]);
  const gamesByColumn = useGetGamesByColumns(initialGames.results);

  useEffect(() => {
    setGames(gamesByColumn);
  }, [gamesByColumn]);

  const handleSearch = (value) => {
    const newGames = gamesByColumn.map((gamesArr) => {
      return gamesArr.filter((game) => game.name.toLowerCase().includes(value.toLowerCase()));
    });

    setGames(newGames);
  };

  return (
    <>
      <Header handleSearch={handleSearch} />

      <Container className={styles.container}>
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
