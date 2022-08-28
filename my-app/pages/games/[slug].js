import styled from 'styled-components';
import { BackBtn } from '../../components/BackBtn';
import { GameInfo } from '../../components/GameComponents/GameInfo';
import { About } from '../../components/GameComponents/About';
import { Slider } from '../../components/Slider';

export default function ({ game, screenshots }) {
  return (
    <Container background_image={game.background_image}>
      <BackBtn />

      <GameContainer>
        <h1>{game.name}</h1>

        <div>
          <p>{screenshots.count} screenshots</p>

          <Slider images={screenshots.results} />
        </div>

        <About description_raw={game.description_raw} />

        <GameInfo game={game} />
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

const GameContainer = styled.div`
  max-width: 900px;
`;

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
