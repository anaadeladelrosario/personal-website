import React from 'react';

interface CheckboxGroupProps {
    options: { label: string; value: string }[];
    name: string;
    selectedValue: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxGroup({ options, name, selectedValue, onChange }: CheckboxGroupProps) {
    return (
        <div>
            {options.map((option) => (
                <label key={option.value}>
                    <input type="checkbox" name={name} value={option.value} checked={selectedValue === option.value} onChange={onChange} />
                    {option.label}
                </label>
            ))}
        </div>
    );
}