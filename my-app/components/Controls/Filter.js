import { useRef, useState } from 'react';
import { DropDown } from './DropDown';

const platforms = [
  { title: 'PC', dataValue: '4' },
  { title: 'PlayStation', dataValue: '18,167,16' },
  { title: 'XBox', dataValue: '1,186,14' },
  { title: 'Nintendo', dataValue: '7,8,9' },
  { title: 'MacOS', dataValue: '5' },
];

export function Filter({ filters, setFilters }) {
  const [value, setValue] = useState('PC');
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
