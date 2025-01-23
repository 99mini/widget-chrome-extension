import { SelectProps } from '@radix-ui/react-select';
import React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { InputContainer, InputLabelText } from './Input.style';

type DropDownSelectProps = {
  label?: React.ReactNode;
  placeholder?: string;
  value: string;
  onValueChange?: SelectProps['onValueChange'];
  onOpenChange?: SelectProps['onOpenChange'];
  open?: boolean;
  options: string[];
};

const DropDownSelect = ({
  label,
  placeholder,
  value,
  onValueChange,
  onOpenChange,
  open,
  options,
}: DropDownSelectProps) => {
  return (
    <InputContainer>
      {label && <InputLabelText>{label}</InputLabelText>}
      <Select onValueChange={onValueChange} onOpenChange={onOpenChange} open={open} value={value}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option) => {
              return (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </InputContainer>
  );
};

export default DropDownSelect;
