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

export default function Home({ initial }) {
  const router = useRouter();
  const { query } = router;

  const [loading, setLoading] = useState(false);
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
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', stopLoading);

    return () => {
      router.events.off('routeChangeStart', startLoading);
      router.events.off('routeChangeComplete', stopLoading);
    };
  }, []);

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

      {loading ? (
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
