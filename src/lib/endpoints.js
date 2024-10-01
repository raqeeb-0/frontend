
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

export const INVOICE_API = (organizationId) =>
  `${BASE_URL}/organizations/${organizationId}/invoices`;

export const SALE_API = (organizationId) =>
  `${BASE_URL}/organizations/${organizationId}/sales`;

export const PRODUCTION_ORDER_API = (organizationId) =>
  `${BASE_URL}/organizations/${organizationId}/production-orders`;

export const SUPPLIER_API = (organizationId) =>
  `${BASE_URL}/organizations/${organizationId}/suppliers`;

export const CUSTOMER_API = (organizationId) =>
  `${BASE_URL}/organizations/${organizationId}/customers`;

export const PURCHASE_ITEM_API = (organizationId) =>
  `${BASE_URL}/organizations/${organizationId}/purchase-items`;

export const PURCHASE_ITEM_CATEGORY_API = (organizationId) =>
  `${BASE_URL}/organizations/${organizationId}/purchase-item-categories`;

export const PRODUCT_API = (organizationId) =>
  `${BASE_URL}/organizations/${organizationId}/products`;

export const PRODUCT_CATEGORY_API = (organizationId) =>
  `${BASE_URL}/organizations/${organizationId}/product-categories`;
