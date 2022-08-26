import { useEffect, useState } from 'react';

const sortCallbacks = {
  relevance: (a, b) => 0,
  'rating-max': (a, b) => b.rating - a.rating,
  'rating-min': (a, b) => a.rating - b.rating,
  'release-max': (a, b) => new Date(b.released) - new Date(a.released),
  'release-min': (a, b) => new Date(a.released) - new Date(b.released),
};

const sortGames = ({ games, key, setGames }) => {
  const newGames = [...games];
  newGames.sort(sortCallbacks[key]);

  setGames(newGames);
};

export function Sort({ games, setGames }) {
  const [value, setValue] = useState('relevance');

  useEffect(() => {
    sortGames({ games, key: value, setGames });
  }, [games]);

  const handleChange = (e) => {
    setValue(e.target.value);
    sortGames({ games, key: e.target.value, setGames });
  };

  return (
    <div>
      <select value={value} onChange={handleChange}>
        <option value="relevance">Relevance</option>
        <option value="rating-max">Rating max</option>
        <option value="rating-min">Rating min</option>
        <option value="release-max">Release max</option>
        <option value="release-min">Release min</option>
      </select>
    </div>
  );
}
