import { useState } from 'react';
import { DropDown } from './DropDown';
import { useRef } from 'react';

const sort = [
  { title: 'Relevance', dataValue: '' },
  { title: 'Rating (High)', dataValue: '-rating' },
  { title: 'Rating (Low)', dataValue: 'rating' },
  { title: 'Release (New)', dataValue: '-released' },
  { title: 'Release (Old)', dataValue: 'released' },
];

export function Sort({ setFilters }) {
  const [value, setValue] = useState('Relevance');
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  const handleClick = (e) => {
    const targetValue = e.target.dataset.value;
    if (!e.target.textContent) {
      return;
    }

    setValue(e.target.textContent);
    setFilters((prev) => ({ ...prev, ordering: targetValue }));
    setIsOpen(false);
  };

  return (
    <DropDown
      isOpen={isOpen}
      dropDownRef={dropDownRef}
      value={value}
      list={sort}
      setIsOpen={setIsOpen}
      handleClick={handleClick}
    />
  );
}
