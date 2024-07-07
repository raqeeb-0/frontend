import { createBrowserRouter } from 'react-router-dom';
import {
  AuthLayout
} from './layouts';
import {
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
  },
  {
    path: '/auth/signup',
    element: <Signup />,
  },
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/app',
    element: <App />,
  }
]);
