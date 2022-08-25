import styled from "styled-components";

export function MainInfo({name, rating, metacritic}) {
  return (
    <TitleContainer>
      <h3>{name}</h3>

      <RaitingContainer>
        <RaitingCard>
          <b>{rating}</b>
        </RaitingCard>

        <RaitingCard>
          <b>{metacritic}</b>
        </RaitingCard>
      </RaitingContainer>
    </TitleContainer>
  )
}

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 5px;
`;

const RaitingContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const RaitingCard = styled.div`
  width: 40px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid green;
  border-radius: 0.3rem;
  color: green;
`;