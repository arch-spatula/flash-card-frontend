import { Global } from '@emotion/react';
import GlobalStyle from '../styles/Reset';
import { Footer, Navbar, Spinner } from '@/Components';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { Suspense } from 'react';

/**
 * @see https://github.com/WANTED-TEAM03/pre-onboarding-10th-1-3/blob/main/src/routes/_globalLayout.tsx
 */
function Layout() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Navbar />
      <MainContainer>
        <Suspense
          fallback={
            <Loader>
              <Spinner />
            </Loader>
          }
        >
          <Outlet />
        </Suspense>
      </MainContainer>
      <Footer />
    </>
  );
}

const MainContainer = styled.main`
  max-width: 82.5rem;
  margin: auto;
  min-height: calc(100vh - 4rem);
`;

const Loader = styled.div`
  min-height: inherit;
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Layout;
