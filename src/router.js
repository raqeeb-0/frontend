import { createBrowserRouter } from 'react-router-dom';

import {
  DashboardLayout
} from './layouts';
import {
  OrganizationUpdate,
  OrganizationCreate,
  Public,
  Dashboard,
  Root,
  App,
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
        element: <App />,
      }
    ]
  }
]);
