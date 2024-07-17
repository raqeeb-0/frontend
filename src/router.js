import { createBrowserRouter } from 'react-router-dom';

import {
  DashboardLayout
} from './layouts';
import {
  Public,
  Dashboard,
  Root,
  App,
  ErrorPage,
  Login,
  Signup
} from './pages';
import {
  orgsLoader,
  userLoader,
  dashboardLoader,
  rootLoader,
  logOutLoader
} from './loaders';
import {
  logInAction,
  signUpAction
} from './actions';


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
        path: '/auth/signup',
        element: <Signup />,
        action: signUpAction,
      },
      {
        path: '/auth/login',
        element: <Login />,
        action: logInAction,
      },
      {
        path: '/app',
        element: <App />,
      }
    ]
  }
]);
