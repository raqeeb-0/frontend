import {
  Form,
  Header,
  FormField,
  SelectInput,
  SearchInput,
  ResourcesTable,
  SelectMultiple,
  EmptyListPlaceholder
} from '../components/app';
import {
  Loader,
  PageHeader
} from '../components/common';
import {
  useDeleteProduct,
  useUpdateProduct,
  useCreateProduct,
  useGetProduct,
  useGetProducts
} from '../hooks/products';
import {
  useGetProductsCategories
} from '../hooks/productsCategories';
import {
  useGetMaterials
} from '../hooks/materials';
import { useState } from 'react';


export const Products = () => {
  const {
    products,
    refreshProducts,
    isLoading: isFetchingProducts
  } = useGetProducts();
  const {
    handleDelete,
    isLoading: isDeletingProduct
  } = useDeleteProduct();

  const deleteHandler = (e) => {
    handleDelete(
      e.currentTarget.getAttribute('data-id'),
      refreshProducts
    );
  }

  const isLoading = isFetchingProducts || isDeletingProduct;

  return (
    <section>
      {
        isLoading
          ?<Loader />
          :<>
            <Header
              value='Products'
              isEmptyList={products.length === 0}
              link={{
                path: '/app/products/items/create',
                name: 'New Product',
              }}
            />
            {
              products.length === 0
                ?<EmptyListPlaceholder
                  listName='products'
                  link={{
                    path: '/app/products/items/create',
                    name: 'Create Product',
                  }}
                />
                :<>
                  <SearchInput resourceName='products' />
                  <ResourcesTable
                    resourceName='product'
                    resourcePath='/products/items'
                    resources={products}
                    handleDelete={deleteHandler}
                  />
                </>
            }
          </>
      }
    </section>
  );
}

export const ProductCreate = () => {
  const { isLoading, handleCreate } = useCreateProduct();
  const {
    categories,
    isLoading: isFetchingCategories
  } = useGetProductsCategories();
  const {
    materials,
    isLoading: isFetchingMaterials
  } = useGetMaterials();
  const [materialInfo, setMaterialInfo] = useState([]);

  const handleChange = (event, index) => {
    const newMaterialInfo = [...materialInfo];
    newMaterialInfo[index] = {
      materialId: event.currentTarget.getAttribute('data-id'),
      materialCount: parseInt(event.target.value),
    }
    setMaterialInfo(newMaterialInfo);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    payload['materialInfo'] = materialInfo;
    payload.price = parseInt(payload.price);
    payload.percentageOfIndirectCoast = parseInt(
      payload.percentageOfIndirectCoast
    );
    payload.percentageOfProfit = parseInt(payload.percentageOfProfit);
    handleCreate(payload);
  }

  return (
    <section>
      {
        isFetchingCategories || isFetchingMaterials
          ?<Loader />
          :<>
            <PageHeader value='New Product' />
            <Form
              legend='Product Details'
              onSubmit={handleSubmit}
              isLoading={isLoading}
            >
              <FormField
                label='Name'
                type='text'
                name='name'
                disabled={isLoading}
              />
              <FormField
                label='Price'
                type='number'
                name='price'
                disabled={isLoading}
              />
              <FormField
                label='Indirect Cost (%)'
                type='number'
                name='percentageOfIndirectCoast'
                disabled={isLoading}
              />
              <FormField
                label='Profit (%)'
                type='number'
                name='percentageOfProfit'
                disabled={isLoading}
              />
              <SelectInput
                label='Category'
                name='categoryId'
                options={categories}
                disabled={isLoading}
              />
              <SelectMultiple
                label='Materials'
                options={materials}
                handleChange={handleChange}
              />
            </Form>
          </>
      }
    </section>
  );
}

export const ProductUpdate = () => {
  const {
    product,
    isLoading: isFetchingProduct
  } = useGetProduct();
  const {
    categories,
    isLoading: isFetchingCategories
  } = useGetProductsCategories();
  const {
    materials,
    isLoading: isFetchingMaterials
  } = useGetMaterials();
  const { isLoading, handleUpdate } = useUpdateProduct();
  const [materialInfo, setMaterialInfo] = useState([]);

  const handleChange = (event, index) => {
    const newMaterialInfo = [...materialInfo];
    newMaterialInfo[index] = {
      materialId: event.currentTarget.getAttribute('data-id'),
      materialCount: parseInt(event.target.value),
    }
    setMaterialInfo(newMaterialInfo);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    payload['materialInfo'] = materialInfo;
    payload.price = parseInt(payload.price);
    payload.percentageOfIndirectCoast = parseInt(
      payload.percentageOfIndirectCoast
    );
    payload.percentageOfProfit = parseInt(payload.percentageOfProfit);
    handleUpdate(payload);
  }

  return (
    <section>
      {
        isFetchingProduct || isFetchingCategories
          ?<Loader />
          :<>
            <PageHeader value='Update Product' />
            <Form
              legend='Product Details'
              onSubmit={handleSubmit}
              isLoading={isLoading}
            >
              <FormField
                label='Name'
                type='text'
                name='name'
                value={product.name}
                disabled={isLoading}
              />
              <FormField
                label='Price'
                type='number'
                name='price'
                value={product.price}
                disabled={isLoading}
              />
              <FormField
                label='Indirect Cost (%)'
                type='number'
                name='percentageOfIndirectCoast'
                value={product.percentageIndirectCost}
                disabled={isLoading}
              />
              <FormField
                label='Profit (%)'
                type='number'
                name='percentageOfProfit'
                value={product.percentageProfit}
                disabled={isLoading}
              />
              <SelectInput
                label='Category'
                name='categoryId'
                value={product.categoryId}
                options={categories}
                disabled={isLoading}
              />
              <SelectMultiple
                label='Materials'
                options={materials}
                handleChange={handleChange}
              />
            </Form>
          </>
      }
    </section>
  );
}
