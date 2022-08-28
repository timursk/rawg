import { useEffect, useRef, useState } from 'react';
import { Header } from '../components/Header/Header';
import { Pagination } from '../components/Pagination';
import { debounce } from '../utils/debounce';
import { Games } from '../components/Games';
import { Controls } from '../components/Controls/Controls';
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
  });

  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const isMountRef = useRef(true);

  useEffect(() => {
    setGames(initial);
  }, [initial]);

  useEffect(() => {
    if (isMountRef.current) {
      isMountRef.current = false;
      return;
    }

    router.push({
      pathname: router.pathname,
      query: filters,
    });
  }, [filters]);

  return (
    <>
      <Header setFilters={debounce(setFilters, 500)} />

      <Controls setFilters={setFilters} setIsAutoScroll={setIsAutoScroll} />

      <Games games={games} isAutoScroll={isAutoScroll} setGames={setGames} />

      <Pagination
        next={games.next}
        previous={games.previous}
        filters={filters}
        setFilters={setFilters}
      />
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
