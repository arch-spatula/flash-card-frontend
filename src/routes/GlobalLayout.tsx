import { Global, css } from '@emotion/react';

/**
 * @see https://github.com/WANTED-TEAM03/pre-onboarding-10th-1-3/blob/main/src/routes/_globalLayout.tsx
 *
 */

const GlobalStyle = css`
  * {
    padding: 0;
    border: 0;
    margin: 0;
    font-size: 16px;
  }

  a {
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  input {
    appearance: none;
    outline: none;
  }

  table {
    border-collapse: collapse;
  }
`;

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Global styles={GlobalStyle} />
      <nav>nav</nav>
      {children}
    </>
  );
}

export default Layout;
