import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import downImg from '../../assets/down.svg';

export function DropDown({ list, initialValueIndex, handleChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValueIndex);

  const dropDownRef = useRef(null);
  const isMountRef = useRef(true);

  useEffect(() => {
    if (isMountRef.current || isOpen) {
      isMountRef.current = false;
      return;
    }

    handleChange(list[selectedOption]);
  }, [selectedOption, isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const setSelectedThenCloseDropdown = (index) => {
    setSelectedOption(index);
    setIsOpen(false);
  };

  const handleKeyDown = (index) => (e) => {
    console.log('ENTER W', e.key);
    switch (e.key) {
      case ' ':
      case 'SpaceBar':
      case 'Enter':
        e.preventDefault();
        setSelectedThenCloseDropdown(index);
        break;
      default:
        break;
    }
  };

  const handleListKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedOption(selectedOption - 1 >= 0 ? selectedOption - 1 : list.length - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedOption(selectedOption == list.length - 1 ? 0 : selectedOption + 1);
        break;
      default:
        break;
    }
  };

  return (
    <DropDownContainer ref={dropDownRef}>
      <DropDownButton
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleToggle}
        onKeyDown={handleListKeyDown}
      >
        {list[selectedOption].title}
      </DropDownButton>

      <DropDownListContainer isOpen={isOpen}>
        <DropDownList role="listbox" aria-activedescendant={list[selectedOption]} tabIndex={-1}>
          {list.map(({ title, dataValue }, idx) => (
            <ListItem
              isDisabled={selectedOption === idx}
              data-value={dataValue}
              key={idx}
              role="option"
              aria-selected={selectedOption == idx}
              tabIndex={0}
              onKeyDown={handleKeyDown(idx)}
              onClick={() => {
                setSelectedThenCloseDropdown(idx);
              }}
            >
              {title}
            </ListItem>
          ))}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  );
}

const DropDownContainer = styled('div')`
  width: 145px;
  margin: 0 auto;
  position: relative;
`;

const DropDownButton = styled('button')`
  all: unset;
  box-sizing: border-box;
  position: relative;
  padding: 0 10px;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: ${({ theme }) => theme.border.radius};
  background: ${({ theme }) => theme.colors.active};
  color: inherit;
  text-align: left;
  cursor: pointer;
  user-select: none;

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
  top: 0;
  width: 145px;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  user-select: none;
  cursor: pointer;
  z-index: 1;
`;

const DropDownList = styled('ul')`
  padding: 0;
  margin: 0;
  border-radius: ${({ theme }) => theme.border.radius};
  color: ${({ theme }) => theme.colors.inverseTextColor};
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation-name: fadeIn;
  animation-duration: 0.1s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ListItem = styled('li')`
  padding: 0 10px;
  height: 40px;
  display: flex;
  align-items: center;
  list-style: none;

  ${(props) =>
    props.isDisabled
      ? `
    background: ${props.theme.colors.active};
    color: #fff;
  `
      : `
  background: ${props.theme.colors.inversePrimary};
  `}

  &:hover,
  &:active,
  &:focus {
    background: #666666;
  }
`;
