import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './GlobalLayout';
import {
  Cards,
  Deck,
  Landing,
  NotFound,
  Setting,
  SignIn,
  SignUp,
} from '../pages';

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
          <Route path="/" element={<Landing />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/deck" element={<Deck />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
