import React from 'react';

import { Input } from '@/components/ui/input';

import { ErrorText, InputContainer, InputLabelText, InputWrapper } from './Input.style';

type TextInputProps = {
  label?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  valid?: boolean;
  errorText?: string;
  helperText?: string;
};

const TextInput = ({
  type,
  required,
  label,
  placeholder,
  value,
  onChange,
  valid,
  errorText,
  helperText,
}: TextInputProps) => {
  return (
    <InputWrapper>
      <InputContainer>
        {label && <InputLabelText required={required}>{label}</InputLabelText>}
        <Input type={type ?? 'text'} placeholder={placeholder} value={value} onChange={onChange} />
      </InputContainer>
      {(() => {
        if (value && !valid && errorText) {
          return <ErrorText>{errorText}</ErrorText>;
        }
        if (!value && helperText) {
          return <InputLabelText>{helperText}</InputLabelText>;
        }
      })()}
    </InputWrapper>
  );
};

export default TextInput;
