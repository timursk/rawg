import { platforms } from '../../utils/constants';
import { DropDown } from './DropDown';

const getPlatform = (value) => {
  return platforms.findIndex((platform) => platform.dataValue === value);
};

export function Filter({ filters, setFilters }) {
  const initialValueIndex = getPlatform(filters.platforms);

  const handleChange = (value) => {
    setFilters((prev) => ({ ...prev, platforms: value.dataValue }));
  };

  return (
    <DropDown list={platforms} initialValueIndex={initialValueIndex} handleChange={handleChange} />
  );
}
