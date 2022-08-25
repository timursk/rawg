import { useEffect, useState } from 'react';
import { getColumnsCount } from '../Utils/getColumnsCount';

export function useGetGamesByColumns(initialGames) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    function handleResize() {
      const columnsCount = getColumnsCount(window.innerWidth);
      const gamesColumnCount = initialGames.length / columnsCount;
      const newGames = [];

      if (Number.isInteger(gamesColumnCount)) {
        for (let i = 0; i < columnsCount; i++) {
          const start = i * gamesColumnCount;
          newGames.push(initialGames.slice(start, start + gamesColumnCount));
        }
      } else {
        let gamesColumnCount = initialGames.length / columnsCount;
        let newGamesLen = 0;

        for (let i = 0; i < columnsCount; i++) {
          if (Number.isInteger(gamesColumnCount)) {
            const start = newGamesLen + (i - columnsCount + 1) * gamesColumnCount;
            newGames.push(initialGames.slice(start, start + gamesColumnCount));
          } else {
            const len = Math.ceil(gamesColumnCount);
            const start = i * len;

            newGames.push(initialGames.slice(start, start + len));

            gamesColumnCount = (initialGames.length - len * (i + 1)) / (columnsCount - (i + 1));
            newGamesLen += len;
          }
        }
      }

      setGames(newGames);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return games;
}
