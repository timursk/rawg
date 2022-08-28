import styled from 'styled-components';
import { MainInfo } from './MainInfo';
import Link from 'next/link';

export const Card = ({ game: { name, background_image, rating, released, metacritic, slug } }) => {
  const handleClick = () => {};

  return (
    <Link href={`/games/${slug}`}>
      <Container onClick={handleClick}>
        <Image src={background_image}></Image>

        <StyledDiv>
          <MainInfo name={name} rating={rating} metacritic={metacritic} />

          <p>
            Release date: <b>{released}</b>
          </p>
        </StyledDiv>
      </Container>
    </Link>
  );
};

const Container = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(149, 157, 165, 0.2);
  border-radius: 1rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  overflow: hidden;
  cursor: pointer;
  // background-color: #202020;
`;

const Image = styled.div.attrs((props) => ({
  style: {
    backgroundImage: `url('${props.src}')`,
  },
}))`
  width: 100%;
  height: 180px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const StyledDiv = styled.div`
  width: 100%;
  padding: 0 5px;
`;
