import { useEffect } from 'react';
import styled from 'styled-components';
import downImg from '../../assets/down.svg';

export function DropDown({ isOpen, dropDownRef, value, list, setIsOpen, handleClick }) {
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <DropDownContainer ref={dropDownRef}>
      <DropDownHeader onClick={handleOpen} tabIndex="0">
        {value}
      </DropDownHeader>

      <DropDownListContainer isOpen={isOpen}>
        <DropDownList onClick={handleClick}>
          {list.map(({ title, dataValue }, id) => (
            <ListItem isDisabled={title === value} data-value={dataValue} key={id}>
              {title}
            </ListItem>
          ))}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  );
}

const DropDownContainer = styled('div')`
  width: 125px;
  margin: 0 auto;
`;

const DropDownHeader = styled('div')`
  padding: 10px;
  font-weight: 500;
  user-select: none;
  cursor: pointer;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    right: 10px;
    width: 15px;
    height: 15px;
    transform: translateY(-50%);
    background-image: url('${downImg.src}');
  }
`;

const DropDownListContainer = styled('div')`
  position: absolute;
  width: 125px;
  transition: all 0.1s ease;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.isOpen ? 'all' : 'none')};
  user-select: none;
  cursor: pointer;
`;

const DropDownList = styled('ul')`
  padding: 0;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  margin: 0;
  background: #000;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  font-weight: 500;
`;

const ListItem = styled('li')`
  padding: 5px 10px;
  list-style: none;

  ${(props) =>
    props.isDisabled &&
    `
    background: #d7d7d7;
  `}

  &:hover,
  &:active,
  &:focus {
    background: #666666;
  }
`;
