import styled from 'styled-components';

export function BackBtn() {
  const handleClick = () => {
    window.history.back();
  };

  return <Button onClick={handleClick}>Back</Button>;
}

const Button = styled.button`
  padding: 5px 10px;
  cursor: pointer;
`;
