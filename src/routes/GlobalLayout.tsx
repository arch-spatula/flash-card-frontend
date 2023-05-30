import { Outlet } from 'react-router-dom';

/**
 * @see https://github.com/WANTED-TEAM03/pre-onboarding-10th-1-3/blob/main/src/routes/_globalLayout.tsx
 *
 */

function Layout() {
  return (
    <>
      <nav>nav</nav>
      <Outlet />
    </>
  );
}

export default Layout;
