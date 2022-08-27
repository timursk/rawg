import styled from 'styled-components';

export function MainInfo({ name, rating, metacritic }) {
  return (
    <TitleContainer>
      <h3>{name}</h3>

      <RaitingContainer>
        <RaitingCard popover={'Rating'}>
          <b>{rating}</b>
        </RaitingCard>

        <RaitingCard popover={'Metacritic'}>
          <b>{metacritic}</b>
        </RaitingCard>
      </RaitingContainer>
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid #e5e5e5;
  gap: 5px;
`;

const RaitingContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const RaitingCard = styled.div`
  width: 40px;
  padding: 5px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid green;
  border-radius: 0.3rem;
  color: green;

  &:hover::after {
    content: '${(props) => props.popover}';
    padding: 3px;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-120%);
    border-radius: 4px;
    background-color: #ededed;
    color: black;
    pointer-events: none;
  }
`;
