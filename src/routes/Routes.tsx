import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
import { ROUTE_PATHS } from '../constant/config';

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
