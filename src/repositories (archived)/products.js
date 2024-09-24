import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResponseHandler } from './common';
import {
  deleteProduct,
  updateProduct,
  createProduct,
  getProduct,
  getProducts
} from '../services/products';


export const useGetProducts = () => {
  const { handleResponse } = useResponseHandler();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const refreshProducts = () => {
    setRefresh(!refresh);
  }

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((response) => {
        const success = () => {
          const refinedProducts = response.data.map((product) => {
            return {
              'id': product.id,
              'name': product.name,
              'direct cost': product.costPrice,
              'indirect cost': product.indirectCost,
              'profit': (product.costPrice + product.indirectCost) * product.percentageProfit / 100,
              'selling price': product.sellingPrice,
              'quantity': product.quantity,
              'category': product.category.name,
              'created at': product.createdAt.split('T')[0],
            };
          });
          setProducts(refinedProducts);
        }
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return { products, isLoading, refreshProducts };
}


export const useGetProduct = () => {
  const { handleResponse } = useResponseHandler();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getProduct(productId)
      .then((response) => {
        const success = () => setProduct(response.data);
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { product, isLoading };
}


export const useCreateProduct = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (payload) => {
    setIsLoading(true);
    createProduct(payload)
      .then((response) => {
        const success = () => navigate('/app/products/items');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleCreate };
}


export const useUpdateProduct = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { productId } = useParams();

  const handleUpdate = (payload) => {
    setIsLoading(true);
    updateProduct(productId, payload)
      .then((response) => {
        const success = () => navigate('/app/products/items');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleUpdate };
}


export const useDeleteProduct = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (productId, refreshProducts) => {
    setIsLoading(true);
    deleteProduct(productId)
      .then((response) => {
        const success = () => navigate('/app/products/items');
        handleResponse(response, success);
        refreshProducts();
        setIsLoading(false);
      });
  }

  return { isLoading, handleDelete };
}
