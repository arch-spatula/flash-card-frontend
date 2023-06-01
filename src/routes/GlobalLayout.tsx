import { Global } from '@emotion/react';
import GlobalStyle from '../styles/Reset';
import { Navbar } from '../Components';

/**
 * @see https://github.com/WANTED-TEAM03/pre-onboarding-10th-1-3/blob/main/src/routes/_globalLayout.tsx
 */
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
