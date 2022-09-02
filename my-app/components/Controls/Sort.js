import { DropDown } from './DropDown';
import { sort } from '../../utils/constants';

const getOrdering = (value) => {
  return sort.findIndex((item) => item.dataValue === value);
};

export function Sort({ filters, setFilters }) {
  const initialValueIndex = getOrdering(filters.ordering);

  const handleChange = (value) => {
    setFilters((prev) => ({ ...prev, ordering: value.dataValue }));
  };

  return <DropDown list={sort} initialValueIndex={initialValueIndex} handleChange={handleChange} />;
}
