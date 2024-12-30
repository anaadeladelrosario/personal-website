import React from 'react';

interface RadioButtonGroupProps {
  options: { label: string; value: string }[];
  name: string;
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, name, selectedValue, onChange }) => {
    
  return (
    <div>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

export default RadioButtonGroup;