import { useState } from 'react';

const sortCallbacks = {
  relevance: (a, b) => 0,
  'rating-max': (a, b) => b.rating - a.rating,
  'rating-min': (a, b) => a.rating - b.rating,
  'release-max': (a, b) => new Date(b.released) - new Date(a.released),
  'release-min': (a, b) => new Date(a.released) - new Date(b.released),
};

export function Sort({ games, setGames }) {
  const [value, setValue] = useState('relevance');

  const handleChange = (e) => {
    setValue(e.target.value);
    const newGames = [...games];
    newGames.sort(sortCallbacks[e.target.value]);

    setGames(newGames);
    console.log('sorted', newGames);
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

// added: 8805
// added_by_status: {yet: 314, owned: 5914, beaten: 1867, toplay: 147, dropped: 494, …}
// background_image: "https://media.rawg.io/media/games/9fa/9fa63622543e5d4f6d99aa9d73b043de.jpg"
// clip: null
// dominant_color: "0f0f0f"
// esrb_rating: null
// genres: (4) [{…}, {…}, {…}, {…}]
// id: 3612
// metacritic: 85
// name: "Hotline Miami"
// parent_platforms: (5) [{…}, {…}, {…}, {…}, {…}]
// platforms: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
// playtime: 5
// rating: 4.37
// rating_top: 5
// ratings: (4) [{…}, {…}, {…}, {…}]
// ratings_count: 2219
// released: "2012-10-22"
// reviews_count: 2236
// reviews_text_count: 9
// saturated_color: "0f0f0f"
// short_screenshots: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
// slug: "hotline-miami"
// stores: (4) [{…}, {…}, {…}, {…}]
// suggestions_count: 296
// tags: (21) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// tba: false
// updated: "2022-08-24T14:24:44"
// user_game: null
