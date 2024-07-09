import { createBrowserRouter } from 'react-router-dom';

import {
  Root,
  App,
  ErrorPage,
  Login,
  LogOut,
  Signup
} from './pages';
import {
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
    loader: rootLoader,
  },
  {
    path: '/logout',
    element: <LogOut />,
    errorElement: <ErrorPage />,
    loader: logOutLoader,
  },
  {
    path: '/auth/signup',
    element: <Signup />,
    errorElement: <ErrorPage />,
    action: signUpAction,
  },
  {
    path: '/auth/login',
    element: <Login />,
    errorElement: <ErrorPage />,
    action: logInAction,
  },
  {
    path: '/app',
    element: <App />,
  }
]);
