import React, { useState } from 'react';
import './Form.css';
import RadioButtonGroup from './RadioButton';
import CheckboxGroup from './Checkbox';

export type InputType = 'text' | 'number' | 'textarea' | 'select'|"RADIO"|"CHECKBOX";

export interface InputProps {
  type: InputType;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  error?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
}

export const Input: React.FC<InputProps> = ({
  type,
  label,
  name,
  placeholder,
  required,
  options,
  error,
  disabled,
  min,
  max,
}) => {

    const [value, setValue] = useState<string|number>("");
    const [selectedRadioButton, setSelectedRadioButton] = useState<string>('2'); // Set default selected value
    const [selectedCheckbox, setSelectedCheckbox] = useState<string>('2'); // Set default selected value

    const radioOptions = [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ];

    const checkboxOptions = [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ];

    const handleChange = (value: string, type?:string) => {
        setValue(value);
        if(type==="RADIO"){
            setSelectedRadioButton(value);
        }
        if(type==="CHECKBOX"){
            setSelectedCheckbox(value);
        }
      };


  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            value={value}
            onChange={(e)=>handleChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={error ? 'error' : ''}
          />
        );
      case 'select':
        return (
          <select
            name={name}
            value={value}
            onChange={(e)=>handleChange(e.target.value)}
            required={required}
            disabled={disabled}
          >
            <option value="">{placeholder || 'Select an option'}</option>
            {options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "RADIO":
        return (
            <RadioButtonGroup options={radioOptions} name={name} selectedValue={selectedRadioButton} onChange={(e)=>handleChange(e.target.value, "RADIO")} />
        );
      case "CHECKBOX":
        return (
            <CheckboxGroup options={checkboxOptions} name={name} selectedValue={selectedCheckbox} onChange={(e)=>handleChange(e.target.value, "CHECKBOX")} />
        );
      default:
        return (
          <input
            type={type}
            name={name}
            value={value}
            onChange={(e)=>handleChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
          />
        );
    }
  };

  return (
    <div className="form-group">
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      {renderInput()}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;
