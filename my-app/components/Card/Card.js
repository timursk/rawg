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

          <StyledP>
            Release date: <b>{released}</b>
          </StyledP>
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
  border-radius: 1rem;
  background-color: #2d2d2d;
  box-shadow: rgb(0 0 0 / 14%) 5px 5px 5px;
  overflow: hidden;
  cursor: pointer;
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

const StyledP = styled.p`
  color: #d3d3d3;
`;
