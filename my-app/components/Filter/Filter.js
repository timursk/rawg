import { useState } from 'react';
import styled from 'styled-components';

export function Filter({ filters, setFilters }) {
  const [value, setValue] = useState('4');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (filters.sort !== e.target.value) {
      setFilters((prev) => ({ ...prev, platforms: e.target.value }));
    }
  };

  return (
    <div>
      <select value={value} onChange={handleChange}>
        <option value="4">PC</option>
        <option value="18,187,16">PlayStation</option>
        <option value="1,186,14">XBox</option>
        <option value="7,8,9">Nintendo</option>
        <option value="5">MacOS</option>
      </select>
    </div>
  );
}

// const StyledSelect = styled.select
