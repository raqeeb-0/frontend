import { api } from '../adapters/api';


const resource = 'org/products';


export const getProducts = () => api.get(resource);


export const getProduct = (productId) =>
  api.get(`${resource}/${productId}`);


export const createProduct = (payload) => {
  const {
    name,
    indirectCostPercent,
    profitPercent,
    category,
    materialsList
  } = payload;

  const materialInfo = JSON.parse(materialsList).map(material => ({
    materialId: material.id,
    materialCount: material.count,
  }));
  return api.post(resource, {
    name,
    materialInfo,
    categoryId: category,
    percentageOfIndirectCoast: parseFloat(indirectCostPercent),
    percentageOfProfit: parseFloat(profitPercent),
  });
}


export const updateProduct = (productId, payload) =>
  api.patch(`${resource}/${productId}`, payload);


export const deleteProduct = (productId) =>
  api.delete(`${resource}/${productId}`);
