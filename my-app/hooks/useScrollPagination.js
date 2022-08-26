import { useEffect, useState } from 'react';

let isFetching = false;

export function useScrollPagination({ initialGames, next }) {
  const [initial, setInitial] = useState(initialGames);
  const [nextLink, setNextLink] = useState(next);
  const [games, setGames] = useState(initialGames.results);

  useEffect(() => {
    setInitial(initialGames);
  }, [initialGames]);

  useEffect(() => {
    setNextLink(next);
  }, [next]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  function handleScroll(e) {
    const scrollHeightBottom =
      e.target.documentElement.scrollHeight -
      (e.target.documentElement.scrollTop + window.innerHeight);

    if (scrollHeightBottom < 100 && !isFetching) {
      isFetching = true;
      const getNewGames = async () => {
        const response = await fetch(nextLink);
        return await response.json();
      };

      getNewGames()
        .then((result) => {
          setInitial(result);
          setGames((prev) => [...prev, ...result.results]);
        })
        .finally(() => {
          isFetching = false;
        });
    }
  }

  return { scrolledGames: games, scrolledInitialGames: initial };
}
