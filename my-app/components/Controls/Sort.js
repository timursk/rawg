import { useState } from 'react';
import { DropDown } from './DropDown';
import { useRef } from 'react';
import { sort } from '../../constants/constants';

const getOrdering = (value) => {
  return sort.find((item) => item.dataValue === value)?.title;
};

export function Sort({ filters, setFilters }) {
  const [value, setValue] = useState(getOrdering(filters.ordering) || 'Relevance');
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
