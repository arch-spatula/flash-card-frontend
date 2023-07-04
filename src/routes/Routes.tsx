import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './GlobalLayout';
import { ROUTE_PATHS } from '../constant/config';
import { lazy } from 'react';
import { cardLoader, protectRoutes } from '@/utils';
import { QueryClient } from '@tanstack/react-query';

const Landing = lazy(() => import('../pages/Landing'));
const SignIn = lazy(() => import('../pages/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp'));
const Cards = lazy(() => import('../pages/Cards'));
const Deck = lazy(() => import('../pages/Deck'));
const Setting = lazy(() => import('../pages/Setting'));
const NotFound = lazy(() => import('../pages/NotFound'));

const queryClient = new QueryClient();

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
      {
        index: true,
        element: <Landing />,
        loader: protectRoutes('cards'),
      },
      {
        path: ROUTE_PATHS.SIGN_IN,
        element: <SignIn />,
        loader: protectRoutes('cards'),
      },
      {
        path: ROUTE_PATHS.SIGN_UP,
        element: <SignUp />,
        loader: protectRoutes('cards'),
      },
      {
        path: ROUTE_PATHS.CARDS,
        element: <Cards />,
        loader: cardLoader(queryClient),
      },
      {
        path: ROUTE_PATHS.DECK,
        element: <Deck />,
        loader: cardLoader(queryClient),
      },
      {
        path: ROUTE_PATHS.SETTING,
        element: <Setting />,
        loader: protectRoutes('signin'),
      },
    ],
    errorElement: <NotFound />,
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
