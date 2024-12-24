import styled from '@emotion/styled';

const GlobalStyle = styled.div`
  height: 100%;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.colors.root};

  color: ${({ theme }) => theme.colors.text};

  transition: background-color 237ms;
`;

export default GlobalStyle;
