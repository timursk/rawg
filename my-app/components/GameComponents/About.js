import styled from 'styled-components';

export function About({ description_raw }) {
  return (
    <Container>
      <h2>About:</h2>
      <div>{description_raw}</div>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 10px;
`;
