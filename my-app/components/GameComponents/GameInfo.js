import styled from 'styled-components';
import { Item } from './Item';

export function GameInfo({ game }) {
  return (
    <Container>
      <Item
        title={'Platforms'}
        value={game.platforms?.map((item) => item?.platform?.name).join(', ')}
      />

      <Item title={'Rating'} value={game.metacritic} />

      <Item title={'Genres'} value={game.genres?.map((genre) => genre?.name).join(', ')} />

      <Item title={'Release date'} value={game.released} />

      <Item
        title={'Developer'}
        value={game.developers?.map((developer) => developer?.name).join(', ')}
      />

      <Item
        title={'Publisher'}
        value={game.publishers?.map((publisher) => publisher?.name).join(', ')}
      />

      <Item title={'Age rating'} value={game.esrb_rating?.name} />

      <Item title={'Website'} isBig={true}>
        {game.website && (
          <a href={game.website} rel="noopener noreferrer" target="_blank">
            {game.website}
          </a>
        )}
      </Item>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
