import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { rgbWithAlpha } from '@/utils/style';

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

export const ModalTitle = styled.div`
  text-align: center;

  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;

  color: ${({ theme }) => theme.colors.text};
`;

export const ModalContainerCSS = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  height: 50%;

  @media (min-width: 1224px) {
    width: 1164px;
  }

  @media (min-width: 840px) and (max-width: 1224px) {
    width: 780px;
  }

  @media (max-width: 840px) {
    width: 396px;
  }
`;

export const Glassmorphism = styled.div`
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  background-color: ${({ theme }) => rgbWithAlpha(theme.colors.backgroundPalette[600], 0.6)};
`;

export const InputContainer = styled.label`
  width: 100%;

  display: flex;
  flex-direction: row;

  gap: 24px;
  align-items: center;

  & > {
    :first-of-type {
      flex: 1;
      min-width: 140px;
    }
    :last-child {
      flex: 3;
    }
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
