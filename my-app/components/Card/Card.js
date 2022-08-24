import React from 'react'
import styled from 'styled-components'

export const Card = ({name, background_image, rating, released}) => {
  return (
    <Container>
      <Image src={background_image} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{rating}</p>
        <P>{released}</P>
      </div>
    </Container>
  )
}

const P = styled.p`
  color: ${({theme}) => theme.colors.primary};
`;

const Container = styled.div`
  // width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  border-radius: 1rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Image = styled.img`
  width: 200px;
`;

