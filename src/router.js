import { createBrowserRouter } from 'react-router-dom';

import {
  DashboardLayout
} from './layouts';
import {
  Dashboard,
  Root,
  App,
  ErrorPage,
  Login,
  LogOut,
  Signup
} from './pages';
import {
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
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Root />,
        loader: rootLoader,
      },
      {
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
            loader: dashboardLoader,
          },
        ]
      },
      {
        path: '/logout',
        element: <LogOut />,
        loader: logOutLoader,
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
