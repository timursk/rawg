import React from 'react';
import styled from 'styled-components';
import { MainInfo } from './MainInfo';
import Link from 'next/link';

export const Card = ({ game: { name, background_image, rating, released, metacritic, id } }) => {
  const handleClick = () => {};

  return (
    <Link href={`/games/${id}`}>
      <Container onClick={handleClick}>
        <Image src={background_image} alt={name} />

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
  // background-color: #202020;
`;

const P = styled.p`
  color: ${({ theme }) => theme.colors.primary};
`;

const Image = styled.img`
  width: 105%;
  max-height: 500px;
`;

const StyledDiv = styled.div`
  width: 100%;
  padding: 0 5px;
`;
