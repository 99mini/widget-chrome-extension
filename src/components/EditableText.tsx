import React, { useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.button`
  padding: 8px;

  border: none;
  background-color: transparent;
`;

const Input = styled.input`
  width: 100%;

  text-align: center;

  border: none;
  background-color: transparent;

  font-size: 16px;
  font-weight: 500;

  &:focus {
    outline: none;
  }
`;

type EditableTextProps = {
  text: string;
  onChange: (text: string) => void;
};

const EditableText: React.FC<EditableTextProps> = ({ text, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const handleEdit = () => {
    console.log('edit');
    setIsEditing(false);
    onChange(value);
  };

  // FIXME: click했을 때 편집 활성화가 안됨
  return (
    <Container
      onClick={() => {
        console.log('click');
        setIsEditing(true);
      }}
    >
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleEdit();
          }
        }}
        onBlur={handleEdit}
        disabled={!isEditing}
      />
    </Container>
  );
};

export default EditableText;
