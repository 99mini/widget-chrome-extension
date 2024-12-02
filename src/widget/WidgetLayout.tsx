import React from 'react';
import styled from '@emotion/styled';

function generateMediaQueryLayout(base: number, unit: number, cell: number, maxColumns = 20) {
  let css = ``;

  for (let i = 1; i <= maxColumns / 4; i++) {
    css += `@media (min-width: ${base + unit * (i - 1)}px) and (max-width: ${base + unit * i}px) { grid-template-columns: repeat(${i * 4}, ${cell}px); }`;
  }

  return css;
}

/*
  media breakpoints:
  4 columns size: 384px (unit)

  456px: 4 columns (base)
  840px: 8 columns (base + unit)
  1224px: 12 columns (base + 2 * unit)
  1608px: 16 columns (base + 3 * unit)
  1992px: 20 columns (base + 4 * unit)
  2376px: 24 columns (base + 5 * unit)
  ...
*/
const Container = styled.div`
  display: grid;
  justify-content: center;

  gap: ${({ theme }) => `${theme.sizes.widget.columnGap}px ${theme.sizes.widget.rowGap}px `};

  padding: 36px;

  grid-template-columns: repeat(auto-fill, ${({ theme }) => theme.sizes.widget.icon}px);

  ${({ theme }) => generateMediaQueryLayout(456, 384, theme.sizes.widget.icon)}
`;

type WidgetLayoutProps = {
  children: React.ReactNode;
};

const WidgetLayout: React.FC<WidgetLayoutProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default WidgetLayout;
