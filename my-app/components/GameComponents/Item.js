import styled from 'styled-components';

export function Item({ title, value, isBig, children }) {
  return (
    <Container isBig={isBig}>
      <ItemTitle>{title}</ItemTitle>

      <span>{value ? value : children ? null : 'none'}</span>
      {children}
    </Container>
  );
}

const Container = styled.div`
  ${(props) => (props.isBig ? 'grid-column: 1 / 3;' : '')}
  margin-bottom: 10px;
  padding: 5px;
`;

const ItemTitle = styled.p`
  margin: 0 0 5px;
  color: hsla(0, 0%, 100%, 0.4);
`;
