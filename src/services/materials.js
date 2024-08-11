import { api } from '../adapters/api';


const resource = 'org/materials';


export const getMaterials = () => api.get(resource);


export const getMaterial = (materialId) =>
  api.get(`${resource}/${materialId}`);


export const createMaterial = (payload) => {
  const { name, price, categoryId } = payload;
  const parsedPrice = parseFloat(price);

  return api.post(
    resource,
    {
      name,
      categoryId,
      priceOfSingleUnit: parsedPrice
    }
  );
}


export const updateMaterial = (materialId, payload) => {
  const { name, price, categoryId } = payload;
  const parsedPrice = parseFloat(price);

  return api.patch(
    `${resource}/${materialId}`,
    {
      name,
      categoryId,
      priceOfSingleUnit: parsedPrice
    }
  );
}


export const deleteMaterial = (materialId) =>
  api.delete(`${resource}/${materialId}`);
