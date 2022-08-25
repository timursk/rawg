import React from 'react'
import styled from 'styled-components'

export const Card = ({game: {name, background_image, rating, released}}) => {
  return (
    <Container>
      <Image src={background_image} alt={name} />

      <StyledDiv>
        <h3>{name}</h3>
        <P>Release date: <b>{released}</b></P>
        <p>Rating: <b>{rating}</b></p>
      </StyledDiv>
    </Container>
  )
}

const P = styled.p`
  color: ${({theme}) => theme.colors.primary};
`;

const Container = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid grey;
  border-radius: 1rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 105%;
  max-height: 500px;
`;

const StyledDiv = styled.div`
  width: 100%;
  padding: 0 5px;
`;

