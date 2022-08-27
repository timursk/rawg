import { useEffect, useRef, useState } from 'react';
import { Header } from '../components/Header/Header';
import { Pagination } from '../components/Pagination/Pagination';
import { debounce } from '../Utils/debounce';
import { Games } from '../components/Games/Games';
import { Controls } from '../components/Controls/Controls';

export default function Home({ initial }) {
  const [games, setGames] = useState(initial);
  const [filters, setFilters] = useState({
    page: 1,
    search: '',
    ordering: '',
    platforms: '4',
  });
  const [isLoading, setIsLoading] = useState(false);
  const isMountRef = useRef(true);

  if (isMountRef.current) {
    fetch('https://api.rawg.io/api/platforms?key=2516c1a213f748d4b2f1ef169998a412')
      .then((response) => response.json())
      .then((res) => console.log('platforms', res));
  }

  useEffect(() => {
    setGames(initial);
  }, [initial]);

  useEffect(() => {
    if (isMountRef.current) {
      isMountRef.current = false;
      return;
    }

    const query = Object.entries(filters).reduce((prev, [key, value]) => {
      return prev + '&' + key + '=' + value;
    }, '');

    setIsLoading(true);

    fetch(`https://api.rawg.io/api/games?key=2516c1a213f748d4b2f1ef169998a412${query}`)
      .then((response) => response.json())
      .then((result) => {
        setGames(result);
      })
      .catch((e) => console.log(e.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, [filters]);

  return (
    <>
      <Header setFilters={debounce(setFilters, 650)} />

      <Controls setFilters={setFilters} />

      <Games games={games} isLoading={isLoading} setGames={setGames} />

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
