import { useState } from 'react';
import styled from 'styled-components';

export function Slider({ images }) {
  if (!images?.length) {
    return null;
  }
  const [slide, setSlide] = useState(1);

  const handleClick = (add) => {
    switch (slide + add) {
      case images.length: {
        setSlide(0);
        break;
      }
      case -1: {
        setSlide(images.length - 1);
        break;
      }
      default: {
        setSlide(slide + add);
      }
    }
  };

  return (
    <div>
      <SliderContainer>
        <SliderWrapper slide={slide}>
          {images.map(({ id, image }) => (
            <Image onClick={handleClick} src={image} key={id} />
          ))}
        </SliderWrapper>
      </SliderContainer>

      <Controls>
        <StyledButton onClick={() => handleClick(-1)}>
          <Arrow left></Arrow>
        </StyledButton>

        <StyledButton onClick={() => handleClick(1)}>
          <Arrow right></Arrow>
        </StyledButton>
      </Controls>
    </div>
  );
}

const Arrow = styled.div`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;

  transform: rotate(${(props) => (props.left ? 135 : props.right ? -45 : 0)}deg);
`;
const SliderContainer = styled.div`
  margin: 0 auto 10px;
  width: 100%;
  max-width: 440px;
  height: 250px;
  position: relative;
  overflow: hidden;
`;

const SliderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  transition: all 0.3s ease;
  transform: translateX(${(props) => props.slide * -100}%);
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  width: fit-content;
  margin: 0 auto;
`;

const StyledButton = styled.button`
  width: 40px;
  height: 25px;
  padding: 0;
  border: none;
  background-image: url('${(props) => props.img}');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #fff;
  color: #000;
}
`;
