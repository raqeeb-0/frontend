import { createBrowserRouter } from 'react-router-dom';

import {
  AppLayout
} from './layouts';
import {
  ProductsCategoryUpdate,
  ProductsCategoryCreate,
  ProductsCategories,
  ExpensesCategoryUpdate,
  ExpensesCategoryCreate,
  ExpensesCategories,
  ExpenseUpdate,
  ExpenseCreate,
  Expenses,
  CustomerUpdate,
  CustomerCreate,
  Customers,
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
            element: <Expenses />,
          },
          {
            path: 'expenses/units/create',
            element: <ExpenseCreate />,
          },
          {
            path: 'expenses/units/:expenseId/edit',
            element: <ExpenseUpdate />,
          },
          {
            path: 'expenses/categories',
            element: <ExpensesCategories />,
          },
          {
            path: 'expenses/categories/create',
            element: <ExpensesCategoryCreate />,
          },
          {
            path: 'expenses/categories/:categoryId/edit',
            element: <ExpensesCategoryUpdate />,
          },
          {
            path: 'sales',
            element: <Materials />,
          },
          {
            path: 'customers',
            element: <Customers />,
          },
          {
            path: 'customers/create',
            element: <CustomerCreate />,
          },
          {
            path: 'customers/:customerId/edit',
            element: <CustomerUpdate />,
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
            element: <ProductsCategories />
          },
          {
            path: 'products/categories/create',
            element: <ProductsCategoryCreate />
          },
          {
            path: 'products/categories/:categoryId/edit',
            element: <ProductsCategoryUpdate />
          }
        ]
      }
    ]
  }
]);
