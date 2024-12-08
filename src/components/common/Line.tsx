import styled from '@emotion/styled';

const Line = styled.hr<{
  height?: string;
  margin?: string;
  padding?: string;
  width?: string;
  maxWidth?: string;
}>`
  width: ${({ width }) => width || '100%'};
  max-width: ${({ maxWidth }) => maxWidth || '360px'};
  height: ${({ height }) => height || '2px'};

  margin: ${({ margin }) => margin || '4px 0'};
  padding: ${({ padding }) => padding || '0'};

  border: none;
  background-color: ${({ theme }) => theme.colors.background};
`;

export default Line;
