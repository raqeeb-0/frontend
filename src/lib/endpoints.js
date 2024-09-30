
export const BASE_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_VERSION;

export const AUTH_API = {
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGIN: `${BASE_URL}/auth/login`,
  REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
  FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: (token) => `${BASE_URL}/auth/reset-password/${token}`,
};

export const USER_API = `${BASE_URL}/users`;

export const ORG_API = `${BASE_URL}/organizations`;
export const ORG_SELECT_API = `${BASE_URL}/organizations/select`;

export const EXPENSE_PURCHASE_API = `${BASE_URL}/organization/expense-purchases`;

export const MATERIAL_PURCHASE_API = `${BASE_URL}/organization/material-purchases`;

export const SALE_API = `${BASE_URL}/organization/sales`;

export const PRODUCTION_ORDER_API = `${BASE_URL}/organization/production-orders`;

export const SUPPLIER_API = `${BASE_URL}/organization/suppliers`;

export const CUSTOMER_API = `${BASE_URL}/organization/customers`;

export const MATERIAL_API = `${BASE_URL}/organization/materials`;

export const MATERIAL_CATEGORY_API = `${BASE_URL}/organization/material-categories`;

export const EXPENSE_API = `${BASE_URL}/organization/expenses`;

export const EXPENSE_CATEGORY_API = `${BASE_URL}/organization/expense-categories`;

export const PRODUCT_API = `${BASE_URL}/organization/products`;

export const PRODUCT_CATEGORY_API = `${BASE_URL}/organization/product-categories`;
