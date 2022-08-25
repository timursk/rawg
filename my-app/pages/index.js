import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components';
import { Card } from '../components/Card/Card'
import { useGetGamesByColumns } from '../hooks/useGetGamesByColumns';
import styles from '../styles/Home.module.css'

export default function Home({games}) {
  const gamesByColumn = useGetGamesByColumns(games.results);
  console.log(gamesByColumn);

  return (
    <Container className={styles.container}>
      {gamesByColumn.map((gamesColumn) => {
        return (
          <Column>
            {gamesColumn.map((game) => <Card key={game.id} game={game} />)}
          </Column>
          )
      })}
    </Container>
  )
}

export async function getServerSideProps(context) {
  const response = await fetch('https://api.rawg.io/api/games?key=2516c1a213f748d4b2f1ef169998a412');
  const games = await response.json();
  
  return {
    props: {games}, // will be passed to the page component as props
  }
}

const Container = styled.div`
  display: grid;
  justify-content: center;
  gap: 10px;
  padding: 10px;

  @media(min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media(min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Column = styled.div`
  & div {
    margin-bottom: 10px;
  }
  & div:last-child {
    margin-bottom: 0;
  }
`;
