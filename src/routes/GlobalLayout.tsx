import { Global } from '@emotion/react';
import GlobalStyle from '../styles/Reset';
import { Navbar } from '../Components';
import { Outlet } from 'react-router-dom';

/**
 * @see https://github.com/WANTED-TEAM03/pre-onboarding-10th-1-3/blob/main/src/routes/_globalLayout.tsx
 */
function Layout() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
