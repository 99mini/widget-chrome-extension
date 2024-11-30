import React from 'react';

import styled from '@emotion/styled';

const Container = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;

  box-sizing: border-box;
`;

const Input = styled.input`
  box-sizing: border-box;

  &[type='checkbox'] {
    appearance: none;
    position: relative;
    border: max(2px, 0.1em) solid ${({ theme }) => theme.colors.background};
    border-radius: 16px;
    width: 36px;
    height: 20px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      transform: scale(0.8);
      background-color: ${({ theme }) => theme.colors.background};
      transition: left 250ms linear;

      box-sizing: border-box;
    }

    &:checked {
      background-color: ${({ theme }) => theme.colors.background};
      border-color: ${({ theme }) => theme.colors.background};

      &::before {
        left: 16px;
        background-color: white;

        box-sizing: border-box;
      }
    }

    &:disabled {
      border-color: lightgray;
      opacity: 0.7;
      cursor: not-allowed;

      &:before {
        background-color: lightgray;

        box-sizing: border-box;

        & + span {
          opacity: 0.7;
          cursor: not-allowed;
        }
      }
    }

    &:focus-visible {
      outline-offset: max(2px, 0.1em);
      outline: max(2px, 0.1em) solid ${({ theme }) => theme.colors.background};
    }

    &:enabled:hover {
      box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
    }
  }
`;

const Label = styled.span``;

type SwitchProps = {
  className?: string;
  style?: React.CSSProperties;
  InputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  LabelProps?: React.HTMLAttributes<HTMLSpanElement>;
  children?: React.ReactNode;
};

const Switch: React.FC<SwitchProps> = ({ className, style, InputProps, LabelProps, children }) => {
  return (
    <Container className={className} style={style}>
      <Input type="checkbox" {...InputProps} />
      {children && <Label {...LabelProps}>{children}</Label>}
    </Container>
  );
};

export default Switch;
