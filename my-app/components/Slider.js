import { useState } from 'react';
import styled from 'styled-components';

export function Slider({ images }) {
  if (!images?.length) {
    return null;
  }
  const [slide, setSlide] = useState(0);

  const handleBack = () => {
    const newSlide = slide <= 0 ? images.length - 1 : slide - 1;
    setSlide(newSlide);
  };

  const handleNext = () => {
    const sum = slide + 1;
    const newSlide = sum < images.length ? sum : 0;
    setSlide(newSlide);
  };

  return (
    <div>
      <SliderContainer>
        <SliderWrapper slide={slide}>
          {images.map(({ id, image }) => (
            <Image src={image} key={id} />
          ))}
        </SliderWrapper>
      </SliderContainer>

      <Controls>
        <StyledButton onClick={handleBack}>
          <Arrow left></Arrow>
        </StyledButton>

        <StyledButton onClick={handleNext}>
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
  cursor: pointer;
}
`;
