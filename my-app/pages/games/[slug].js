import styled from 'styled-components';
import { BackBtn } from '../../components/BackBtn';
import { Slider } from '../../components/Slider';

// achievements_count: 684
// added: 16736
// added_by_status: {yet: 944, owned: 9668, beaten: 3949, toplay: 663, dropped: 733, …}
// additions_count: 3
// alternative_names: []
// background_image: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg"
// background_image_additional: "https://media.rawg.io/media/screenshots/3e4/3e4576a772b3df47bfc52b86e4cf7e03.jpg"
// clip: null
// creators_count: 34
// description: "<p>The third game in a series, it holds nothing back from the player. Open world adventures of the renowned monster slayer Geralt of Rivia are now even on a larger scale. Following the source material more accurately, this time Geralt is trying to find the child of the prophecy, Ciri while making a quick coin from various contracts on the side. Great attention to the world building above all creates an immersive story, where your decisions will shape the world around you.</p>\n<p>CD Project Red are infamous for the amount of work they put into their games, and it shows, because aside from classic third-person action RPG base game they provided 2 massive DLCs with unique questlines and 16 smaller DLCs, containing extra quests and items.</p>\n<p>Players praise the game for its atmosphere and a wide open world that finds the balance between fantasy elements and realistic and believable mechanics, and the game deserved numerous awards for every aspect of the game, from music to direction.</p>"
// description_raw: "The third game in a series, it holds nothing back from the player. Open world adventures of the renowned monster slayer Geralt of Rivia are now even on a larger scale. Following the source material more accurately, this time Geralt is trying to find the child of the prophecy, Ciri while making a quick coin from various contracts on the side. Great attention to the world building above all creates an immersive story, where your decisions will shape the world around you.\n\nCD Project Red are infamous for the amount of work they put into their games, and it shows, because aside from classic third-person action RPG base game they provided 2 massive DLCs with unique questlines and 16 smaller DLCs, containing extra quests and items.\n\nPlayers praise the game for its atmosphere and a wide open world that finds the balance between fantasy elements and realistic and believable mechanics, and the game deserved numerous awards for every aspect of the game, from music to direction."
// developers: [{…}]
// dominant_color: "0f0f0f"
// esrb_rating: {id: 4, name: 'Mature', slug: 'mature'}
// game_series_count: 7
// genres: (3) [{…}, {…}, {…}]
// id: 3328
// metacritic: 92
// metacritic_platforms: (3) [{…}, {…}, {…}]
// metacritic_url: "https://www.metacritic.com/game/playstation-4/the-witcher-3-wild-hunt"
// movies_count: 0
// name: "The Witcher 3: Wild Hunt"
// name_original: "The Witcher 3: Wild Hunt"
// parent_achievements_count: 49
// parent_platforms: (4) [{…}, {…}, {…}, {…}]
// parents_count: 0
// platforms: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
// playtime: 46
// publishers: [{…}]
// rating: 4.67
// rating_top: 5
// ratings: (4) [{…}, {…}, {…}, {…}]
// ratings_count: 5477
// reactions: {1: 50, 2: 12, 3: 48, 4: 24, 5: 13, 6: 9, 7: 15, 10: 15, 11: 17, 12: 18, 14: 1, 15: 1, 16: 2, 21: 1}
// reddit_count: 8520
// reddit_description: "A subreddit for veterans and new fans alike of The Witcher 3: Wild Hunt as well as for other Witcher games and the franchise in general. Everyone is welcome."
// reddit_logo: ""
// reddit_name: "r/thewitcher3"
// reddit_url: "https://www.reddit.com/r/thewitcher3/"
// released: "2015-05-18"
// reviews_count: 5555
// reviews_text_count: 78
// saturated_color: "0f0f0f"
// screenshots_count: 107
// slug: "the-witcher-3-wild-hunt"
// stores: (5) [{…}, {…}, {…}, {…}, {…}]
// suggestions_count: 660
// tags: (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// tba: false
// twitch_count: 151
// updated: "2022-08-27T15:02:35"
// user_game: null
// website: "https://thewitcher.com/en/witcher3"
// youtube_count: 1000000

// Описание
// Ссылка на сайт игры
// Слайдер со скриншотами игры

export default function ({ game, screenshots }) {
  console.log(game, screenshots);

  return (
    <Container background_image={game.background_image}>
      <BackBtn />

      <GameContainer>
        <h1>{game.name}</h1>
        
        <div>
          <p>{screenshots.count} screenshots</p>

          <Slider images={screenshots.results} />
        </div>
        <div>About: {game.description_raw}</div>
        <div>
          {game.rating} {game.metacritic}
        </div>
        <div>
          {game.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>
        <div>
          {game.platforms.map(({ platform }) => {
            return <span key={platform.id}>{platform.name}</span>;
          })}
        </div>
        <div>
          {game.developers.map((developer) => (
            <span key={developer.id}>{developer.name}</span>
          ))}
        </div>
        <div>
          {game.publishers.map((publisher) => (
            <span key={publisher.id}>{publisher.name}</span>
          ))}
        </div>
        <div>Release date: {game.released}</div>
        <div>Age rating: {game.esrb_rating.name}</div>
        <div>
          <a href={game.website} rel="noopener noreferrer" target="_blank">
            Website
          </a>
        </div>
      </GameContainer>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('${(props) => props.background_image}');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: brightness(0.2);
    z-index: -1;
  }
`;

const GameContainer = styled.div``;

export async function getStaticProps({ params: { slug } }) {
  const gameResponse = await fetch(
    `https://api.rawg.io/api/games/${slug}?key=2516c1a213f748d4b2f1ef169998a412`
  );
  const game = await gameResponse.json();

  const screenshotsResponse = await fetch(
    `https://api.rawg.io/api/games/${slug}/screenshots?key=2516c1a213f748d4b2f1ef169998a412`
  );
  const screenshots = await screenshotsResponse.json();

  return {
    props: { game, screenshots },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
