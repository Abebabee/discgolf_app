import React from "react";

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, value, onChange, onKeyDown }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg p-1 pl-2 border border-border"
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default InputField;
