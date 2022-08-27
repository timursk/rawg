import { useState } from 'react';

export function Sort({ filters, setFilters }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (filters.sort !== e.target.value) {
      setFilters((prev) => ({ ...prev, ordering: e.target.value }));
    }
  };

  return (
    <div>
      <select value={value} onChange={handleChange}>
        <option value="">Relevance</option>
        <option value="-rating">Rating (High)</option>
        <option value="rating">Rating (Low)</option>
        <option value="-released">Release (New)</option>
        <option value="released">Release (Old)</option>
      </select>
    </div>
  );
}
