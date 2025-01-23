import { css } from '@emotion/react';

import styled from '@emotion/styled';

export const InputWrapper = styled.div`
  width: 100%;
  min-height: 58px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InputContainer = styled.label`
  width: 100%;

  display: flex;
  flex-direction: row;

  gap: 24px;
  align-items: center;

  & > span:first-of-type {
    flex: 1;
    min-width: 140px;
  }

  & > :last-child {
    flex: 3;
  }
`;

export const InputLabelText = styled.span<{ required?: boolean }>`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};

  ${({ theme, required }) =>
    required &&
    css`
      &::after {
        content: '*';
        color: ${theme.colors.error};
        margin-left: 4px;
      }
    `}
`;

const Description = css`
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  text-align: right;
`;

export const ErrorText = styled.span`
  ${Description}
  color: ${({ theme }) => theme.colors.error};
`;

export const HelperText = styled.span`
  ${Description}
  color: ${({ theme }) => theme.colors.text};
`;
