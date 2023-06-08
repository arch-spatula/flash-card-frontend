import { Global } from '@emotion/react';
import GlobalStyle from '../styles/Reset';
import { Navbar } from '../Components';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

/**
 * @see https://github.com/WANTED-TEAM03/pre-onboarding-10th-1-3/blob/main/src/routes/_globalLayout.tsx
 */
function Layout() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Navbar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
}

const MainContainer = styled.main`
  width: 82.5rem;
  margin: auto;
  height: calc(100vh - 4rem);
`;

export default Layout;
