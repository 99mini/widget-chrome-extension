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
