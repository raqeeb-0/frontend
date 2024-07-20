import { createBrowserRouter } from 'react-router-dom';

import {
  AppLayout,
  DashboardLayout
} from './layouts';
import {
  MaterialCreate,
  Materials,
  OrganizationUpdate,
  OrganizationCreate,
  Public,
  Dashboard,
  Root,
  ErrorPage,
  Login,
  Signup
} from './pages';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Public />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'organizations/create',
        element: <OrganizationCreate />
      },
      {
        path: 'organizations/:orgId/edit',
        element: <OrganizationUpdate />
      },
      {
        path: 'auth/signup',
        element: <Signup />,
      },
      {
        path: 'auth/login',
        element: <Login />,
      },
      {
        path: 'app',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'materials',
            element: <Materials />,
          },
          {
            path: 'materials/create',
            element: <MaterialCreate />,
          },
        ]
      }
    ]
  }
]);
