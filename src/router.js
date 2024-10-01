import { createBrowserRouter } from 'react-router-dom';

import {
  AppLayout
} from './layouts';
import {
  InvoiceUpdate,
  InvoiceCreate,
  Invoices,
  SaleUpdate,
  SaleCreate,
  Sales,
  ProductionOrderUpdate,
  ProductionOrderCreate,
  ProductionOrders,
  CustomerUpdate,
  CustomerCreate,
  Customers,
  SupplierUpdate,
  SupplierCreate,
  Suppliers,
  ProductInventory,
  MaterialStock,
  PurchaseItemUpdate,
  PurchaseItemCreate,
  PurchaseItems,
  PurchaseItemsCategoryUpdate,
  PurchaseItemsCategoryCreate,
  PurchaseItemsCategories,
  ProductUpdate,
  ProductCreate,
  Products,
  ProductsCategoryUpdate,
  ProductsCategoryCreate,
  ProductsCategories,
  OrganizationUpdate,
  OrganizationCreate,
  Organization,
  Public,
  Root,
  ErrorPage,
  ResetPassword,
  ForgotPassword,
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
        path: 'organizations/overview',
        element: <Organization />,
      },
      {
        path: 'organizations/create',
        element: <OrganizationCreate />
      },
      {
        path: 'organizations/:organizationId/edit',
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
        path: 'auth/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'auth/reset-password/:token',
        element: <ResetPassword />,
      },
      {
        path: 'organizations/:organizationId/app/',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'purchasing',
            element: <Invoices />,
          },
          {
            path: 'purchasing/create',
            element: <InvoiceCreate />,
          },
          {
            path: 'purchasing/:invoiceId/edit',
            element: <InvoiceUpdate />,
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
            path: 'sales',
            element: <Sales />,
          },
          {
            path: 'sales/create',
            element: <SaleCreate />,
          },
          {
            path: 'sales/:saleId/edit',
            element: <SaleUpdate />,
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
            element: <ProductionOrders />,
          },
          {
            path: 'production-orders/create',
            element: <ProductionOrderCreate />,
          },
          {
            path: 'production-orders/:productionOrderId/edit',
            element: <ProductionOrderUpdate />,
          },
          {
            path: 'inventory/material-stock',
            element: <MaterialStock />,
          },
          {
            path: 'inventory/product-inventory',
            element: <ProductInventory />,
          },
          {
            path: 'purchase-items/list',
            element: <PurchaseItems />,
          },
          {
            path: 'purchase-items/list/create',
            element: <PurchaseItemCreate />,
          },
          {
            path: 'purchase-items/list/:purchaseItemId/edit',
            element: <PurchaseItemUpdate />,
          },
          {
            path: 'purchase-items/categories',
            element: <PurchaseItemsCategories />,
          },
          {
            path: 'purchase-items/categories/create',
            element: <PurchaseItemsCategoryCreate />,
          },
          {
            path: 'purchase-items/categories/:categoryId/edit',
            element: <PurchaseItemsCategoryUpdate />,
          },
          {
            path: 'products/list',
            element: <Products />
          },
          {
            path: 'products/list/create',
            element: <ProductCreate />
          },
          {
            path: 'products/list/:productId/edit',
            element: <ProductUpdate />
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
