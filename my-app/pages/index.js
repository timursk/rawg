import { useEffect, useRef, useState } from 'react';
import { Header } from '../components/Header/Header';
import { Pagination } from '../components/Pagination/Pagination';
import { debounce } from '../Utils/debounce';
import { Games } from '../components/Games/Games';
import { Controls } from '../components/Controls/Controls';
import { Loader } from '../components/Loader/Loader';
import { useRouter } from 'next/router';

export default function Home({ initial }) {
  const router = useRouter();
  const { query } = router;

  const [games, setGames] = useState(initial);
  const [filters, setFilters] = useState({
    page: query.page || 1,
    search: query.search || '',
    ordering: query.ordering || '',
    platforms: query.platforms || '4',
    autoScroll: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const isMountRef = useRef(true);

  useEffect(() => {
    setGames(initial);
  }, [initial]);

  useEffect(() => {
    if (isMountRef.current) {
      isMountRef.current = false;
      return;
    }

    const newQuery = { ...filters };
    delete newQuery.autoScroll;

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  }, [filters]);

  return (
    <>
      <Header setFilters={debounce(setFilters, 500)} />

      <Controls setFilters={setFilters} />

      {isLoading ? (
        <Loader />
      ) : (
        <Games games={games} isLoading={isLoading} filters={filters} setGames={setGames} />
      )}

      <Pagination next={games.next} previous={games.previous} />
    </>
  );
}

export async function getServerSideProps({ query: initialQuery }) {
  const query = Object.entries(initialQuery).reduce((prev, [key, value]) => {
    return prev + `&${key}=${value}`;
  }, '');

  const response = await fetch(
    `https://api.rawg.io/api/games?key=2516c1a213f748d4b2f1ef169998a412${query}`
  );
  const initial = await response.json();

  return {
    props: { initial },
  };
}
