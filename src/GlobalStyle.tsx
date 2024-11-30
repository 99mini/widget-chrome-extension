import styled from '@emotion/styled';

const GlobalStyle = styled.div`
  height: 100%;

  background-color: ${({ theme }) => theme.colors.root};

  color: ${({ theme }) => theme.colors.text};
`;

export default GlobalStyle;
