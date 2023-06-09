import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './GlobalLayout';
import { ROUTE_PATHS } from '../constant/config';
import { lazy } from 'react';

const Landing = lazy(() =>
  import('../pages/Landing').then((module) => ({ default: module.Landing }))
);
const SignIn = lazy(() =>
  import('../pages/SignIn').then((module) => ({ default: module.SignIn }))
);
const SignUp = lazy(() =>
  import('../pages/SignUp').then((module) => ({ default: module.SignUp }))
);
const Cards = lazy(() =>
  import('../pages/Cards').then((module) => ({ default: module.Cards }))
);
const Deck = lazy(() =>
  import('../pages/Deck').then((module) => ({ default: module.Deck }))
);
const Setting = lazy(() =>
  import('../pages/Setting').then((module) => ({ default: module.Setting }))
);
const NotFound = lazy(() =>
  import('../pages/NotFound').then((module) => ({ default: module.NotFound }))
);

/**
 * 참고 자료
 * @see https://github.com/WANTED-TEAM03/pre-onboarding-10th-1-3/blob/main/src/routes/Routes.tsx
 * @see https://github.com/wanted-frontedend-team5/pre-onboarding-10th-1-5/blob/main/src/router/Router.jsx
 */

const routes = createBrowserRouter([
  {
    path: ROUTE_PATHS.WELCOME,
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: ROUTE_PATHS.SIGN_IN, element: <SignIn /> },
      { path: ROUTE_PATHS.SIGN_UP, element: <SignUp /> },
      { path: ROUTE_PATHS.CARDS, element: <Cards /> },
      { path: ROUTE_PATHS.DECK, element: <Deck /> },
      { path: ROUTE_PATHS.SETTING, element: <Setting /> },
    ],
    errorElement: <NotFound />,
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
