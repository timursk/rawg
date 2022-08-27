import { useEffect, useState } from 'react';

export function useScrollPagination({ games: initialGames, isAutoScroll }) {
  const [initial, setInitial] = useState(initialGames);
  const [games, setGames] = useState(initialGames.results);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setInitial(initialGames);
    setGames(initialGames.results);
  }, [initialGames]);

  useEffect(() => {
    console.log(isAutoScroll);
    if (!isAutoScroll) {
      document.removeEventListener('scroll', handleScroll);
      return;
    }

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, isAutoScroll]);

  function handleScroll(e) {
    if (!initial.next) {
      return;
    }

    const scrollHeightBottom =
      e.target.documentElement.scrollHeight -
      (e.target.documentElement.scrollTop + window.innerHeight);

    if (scrollHeightBottom < 100 && !isFetching) {
      setIsFetching(true);

      const getNewGames = async () => {
        const response = await fetch(initial.next);
        return await response.json();
      };

      getNewGames()
        .then((result) => {
          setInitial(result);
          setGames((prev) => [...prev, ...result.results]);
        })
        .catch((e) => console.log(e.message))
        .finally(() => {
          setIsFetching(false);
        });
    }
  }

  return { gamesList: games, scrolledGames: initial, isFetching };
}
