import React, { useState } from 'react';
import Select from 'react-select';

// Example options for customization
const hairstyles = [
  { value: 'short', label: 'Short Hair' },
  { value: 'long', label: 'Long Hair' },
  { value: 'curly', label: 'Curly Hair' },
];

const clothingOptions = [
  { value: 'tshirt', label: 'T-Shirt' },
  { value: 'sweater', label: 'Sweater' },
  { value: 'jacket', label: 'Jacket' },
];

const accessoriesOptions = [
  { value: 'glasses', label: 'Glasses' },
  { value: 'hat', label: 'Hat' },
  { value: 'necklace', label: 'Necklace' },
];

const AvatarCustomization = () => {
  const [hairstyle, setHairstyle] = useState('short');
  const [clothing, setClothing] = useState('tshirt');
  const [accessories, setAccessories] = useState([]);

  const handleHairstyleChange = (selectedOption) => setHairstyle(selectedOption.value);
  const handleClothingChange = (selectedOption) => setClothing(selectedOption.value);
  const handleAccessoriesChange = (selectedOptions) => setAccessories(selectedOptions.map(option => option.value));

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Customize Your Avatar</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Hairstyle:</h3>
        <Select
          options={hairstyles}
          onChange={handleHairstyleChange}
          className="mb-4"
        />
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Clothing:</h3>
        <Select
          options={clothingOptions}
          onChange={handleClothingChange}
          className="mb-4"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Accessories:</h3>
        <Select
          options={accessoriesOptions}
          isMulti
          onChange={handleAccessoriesChange}
          className="mb-4"
        />
      </div>

      <div className="flex justify-center items-center">
        <div className="w-40 h-40 flex items-center justify-center border border-gray-300 rounded-lg bg-gray-200 relative">
          {/* Render avatar here */}
          <div className={`avatar ${hairstyle} ${clothing}`}>
            {/* Render accessories */}
            {accessories.includes('glasses') && <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-sm bg-gray-900 text-white p-1 rounded">Glasses</div>}
            {accessories.includes('hat') && <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm bg-gray-900 text-white p-1 rounded">Hat</div>}
            {accessories.includes('necklace') && <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm bg-gray-900 text-white p-1 rounded">Necklace</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarCustomization;
