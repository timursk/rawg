import styled from 'styled-components';
import { BackBtn } from '../../components/BackBtn';
import { GameInfo } from '../../components/GameComponents/GameInfo';
import { About } from '../../components/GameComponents/About';
import { Slider } from '../../components/Slider';
import Head from 'next/head';
import { API_URL, KEY_URL } from '../../utils/constants';

export default function ({ game, screenshots }) {
  return (
    <>
      <Head>
        <title>{game.name}</title>
      </Head>

      <Container background_image={game.background_image}>
        <BackBtn />

        <GameContainer>
          <h1>{game.name}</h1>

          {screenshots?.results?.length && (
            <div>
              <p>{screenshots.results.length} screenshots</p>
              <Slider images={screenshots.results} />
            </div>
          )}

          <About description_raw={game.description_raw} />

          <GameInfo game={game} />
        </GameContainer>
      </Container>
    </>
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
  min-width: 300px;
`;

export async function getStaticProps({ params: { slug } }) {
  const gameResponse = await fetch(`${API_URL}/${slug}${KEY_URL}`);
  const game = await gameResponse.json();

  const screenshotsResponse = await fetch(`${API_URL}/${slug}/screenshots${KEY_URL}`);
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
