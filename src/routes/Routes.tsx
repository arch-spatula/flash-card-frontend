import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './GlobalLayout';

/**
 * 참고 자료
 * @see https://github.com/WANTED-TEAM03/pre-onboarding-10th-1-3/blob/main/src/routes/Routes.tsx
 * @see https://github.com/wanted-frontedend-team5/pre-onboarding-10th-1-5/blob/main/src/router/Router.jsx
 */

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<div>Welcome</div>} />
          <Route path="/signin" element={<div>Sign In</div>} />
          <Route path="/signup" element={<div>Sign Up</div>} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
