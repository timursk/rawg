import { useEffect, useRef, useState } from 'react';
import { Header } from '../components/Header/Header';
import { Pagination } from '../components/Pagination';
import { debounce } from '../utils/debounce';
import { Games } from '../components/Games';
import { Controls } from '../components/Controls/Controls';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { API_URL, KEY_URL } from '../utils/constants';
import { Loader } from '../components/Loader';
import { useRouteLoading } from '../hooks/useRouteLoading';
import { initialFilters } from '../constants/constants';

export default function Home({ initial }) {
  const router = useRouter();
  const { query } = router;

  const [filters, setFilters] = useState({
    page: query.page || initialFilters.page,
    search: query.search || initialFilters.search,
    ordering: query.ordering || initialFilters.ordering,
    platforms: query.platforms || initialFilters.platforms,
  });

  const [games, setGames] = useState(initial);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const isMountRef = useRef(true);
  const isLoading = useRouteLoading();

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
      <Head>
        <title>List of Video Games</title>
      </Head>

      <Header setFilters={debounce(setFilters, 500)} />

      <Controls filters={filters} setFilters={setFilters} setIsAutoScroll={setIsAutoScroll} />

      {isLoading ? (
        <Loader />
      ) : (
        <Games games={games} isAutoScroll={isAutoScroll} setGames={setGames} />
      )}

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

  const response = await fetch(`${API_URL}${KEY_URL}${query}`);
  const initial = await response.json();

  return {
    props: { initial },
  };
}
