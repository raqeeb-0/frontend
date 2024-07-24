import { createBrowserRouter } from 'react-router-dom';

import {
  AppLayout
} from './layouts';
import {
  SupplierUpdate,
  SupplierCreate,
  Suppliers,
  MaterialsCategoryUpdate,
  MaterialsCategoryCreate,
  MaterialsCategories,
  MaterialUpdate,
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
            path: 'materials/items',
            element: <Materials />,
          },
          {
            path: 'materials/items/create',
            element: <MaterialCreate />,
          },
          {
            path: 'materials/items/:materialId/edit',
            element: <MaterialUpdate />,
          },
          {
            path: 'materials/categories',
            element: <MaterialsCategories />,
          },
          {
            path: 'materials/categories/create',
            element: <MaterialsCategoryCreate />,
          },
          {
            path: 'materials/categories/:categoryId/edit',
            element: <MaterialsCategoryUpdate />,
          },
          {
            path: 'purchases',
            element: <Materials />,
          },
          {
            path: 'suppliers',
            element: <Suppliers />,
          },
          {
            path: 'suppliers/create',
            element: <SupplierCreate />,
          },
          {
            path: 'suppliers/:supplierId/edit',
            element: <SupplierUpdate />,
          },
          {
            path: 'expenses/units',
            element: <Materials />,
          },
          {
            path: 'expenses/categories',
            element: <Materials />,
          },
          {
            path: 'sales',
            element: <Materials />,
          },
          {
            path: 'customers',
            element: <Materials />,
          },
          {
            path: 'production-orders',
            element: <Materials />,
          },
          {
            path: 'products/items',
            element: <Materials />
          },
          {
            path: 'products/categories',
            element: <Materials />
          }
        ]
      }
    ]
  }
]);
