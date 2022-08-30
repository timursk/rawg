import { useRef, useState } from 'react';
import { platforms } from '../../constants/constants';
import { DropDown } from './DropDown';

const getPlatform = (value) => {
  return platforms.find((platform) => platform.dataValue === value)?.title;
};

export function Filter({ filters, setFilters }) {
  const [value, setValue] = useState(getPlatform(filters.platforms));
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  const handleClick = (e) => {
    const targetValue = e.target.dataset.value;
    if (!e.target.textContent) {
      return;
    }

    setValue(e.target.textContent);
    setFilters((prev) => ({ ...prev, platforms: targetValue }));
    setIsOpen(false);
  };

  return (
    <DropDown
      isOpen={isOpen}
      dropDownRef={dropDownRef}
      value={value}
      list={platforms}
      setIsOpen={setIsOpen}
      handleClick={handleClick}
    />
  );
}
