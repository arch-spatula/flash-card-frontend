import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './GlobalLayout';

/**
 * 참고 자료
 * @see https://github.com/WANTED-TEAM03/pre-onboarding-10th-1-3/blob/main/src/routes/Routes.tsx
 * @see https://github.com/wanted-frontedend-team5/pre-onboarding-10th-1-5/blob/main/src/router/Router.jsx
 */

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>404</div>,
    children: [
      {
        path: '/signup',
        element: <div>Sign Up</div>,
      },
      {
        path: '/signin',
        element: <div>Sign In</div>,
      },
      {
        path: '/cards',
        element: <div>Cards</div>,
      },
      {
        index: true,
        element: <div>Welcome</div>,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
  // const routedElements = useRoutes(routes);
}

export default Router;
