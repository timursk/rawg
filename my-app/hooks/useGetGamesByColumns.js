import { useEffect, useState } from 'react';
import { getColumnsCount } from '../Utils/getColumnsCount';

export function useGetGamesByColumns(initial) {
  const [initialGames, setInitialGames] = useState(initial);
  const [gamesByColumn, setGamesByColumns] = useState([]);

  useEffect(() => {
    setInitialGames(initial);
  }, [initial]);

  useEffect(() => {
    function handleResize() {
      console.log('REHOOK');
      const newGames = [];
      const columnsCount = getColumnsCount(window.innerWidth);

      for (let i = 0; i < columnsCount; i++) {
        newGames.push([]);
      }

      let columnIdx = 0;
      for (let i = 0; i < initialGames.length; i++) {
        newGames[columnIdx].push(initialGames[i]);
        columnIdx = columnIdx === newGames.length - 1 ? 0 : columnIdx + 1;
      }

      setGamesByColumns(newGames);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [initialGames]);

  function addNewGames(initial) {
    if (initialGames === initial) {
      return;
    }

    setInitialGames(initial);
  }

  return { gamesByColumn, allGames: initialGames, setAllGames: setInitialGames, addNewGames };
}
