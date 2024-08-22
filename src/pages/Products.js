import {
  Form,
  Header,
  SearchInput,
  ResourcesTable,
  SelectMultiple,
  EmptyListPlaceholder
} from '../components/app';
import {
  Loader,
  FormField,
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
import { useForm } from '../hooks/common';
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
  const { errors, register, handleSubmit } = useForm();

  return (
    <section>
      {
        isFetchingCategories || isFetchingMaterials
          ?<Loader />
          :<>
            <PageHeader value='New Product' />
            <Form
              legend='Product Details'
              onSubmit={(e) => handleSubmit(e, handleCreate)}
              isLoading={isLoading}
            >
              <FormField error={errors.name}>
                <label htmlFor='name'>Name</label>
                <input
                  id='name'
                  type='text'
                  autoFocus='on'
                  autoComplete='on'
                  disabled={isLoading}
                  {
                    ...register(
                      'name',
                      {
                        required: true,
                        length: {
                          min: 2,
                          max: 50,
                        },
                      }
                    )
                  }
                />
              </FormField>
              <FormField error={errors.indirectCostPercent}>
                <label htmlFor='indirectCostPercent'>Indirect Cost (%)</label>
                <input
                  id='indirectCostPercent'
                  type='number'
                  disabled={isLoading}
                  {
                    ...register(
                      'indirectCostPercent',
                      {
                        required: true,
                        length: {
                          min: 1,
                          max: 15,
                        },
                      }
                    )
                  }
                />
              </FormField>
              <FormField error={errors.profitPercent}>
                <label htmlFor='profitPercent'>Profit (%)</label>
                <input
                  id='profitPercent'
                  type='number'
                  disabled={isLoading}
                  {
                    ...register(
                      'profitPercent',
                      {
                        required: true,
                        length: {
                          min: 1,
                          max: 15,
                        }
                      }
                    )
                  }
                />
              </FormField>
              <FormField error={errors.category}>
                <label htmlFor='category'>Category</label>
                <select
                  id='category'
                  disabled={isLoading}
                  {
                    ...register(
                      'category',
                      {
                        required: true,
                      }
                    )
                  }
                >
                  <option value=''>
                    --Please choose a product category--
                  </option>
                  {
                    categories.map((option, index) => {
                      return (
                        <option
                          key={index}
                          value={option.id? option.id: option}
                        >
                          { option.name? option.name: option }
                        </option>
                      );
                    })
                  }
                </select>
              </FormField>
              <SelectMultiple
                label='Materials'
                id='materials'
                options={materials}
                registerObj={
                  register(
                    'materialsList',
                    {
                      required: true,
                    }
                  )
                }
              />
              <span>{errors.materialsList}</span>
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
  const { errors, register, handleSubmit } = useForm();

  return (
    <section>
      {
        isFetchingProduct || isFetchingCategories || isFetchingMaterials
          ?<Loader />
          :<>
            <PageHeader value='Update Product' />
            <Form
              legend='Product Details'
              onSubmit={(e) => handleSubmit(e, handleUpdate)}
              isLoading={isLoading}
            >
              <FormField error={errors.name}>
                <label htmlFor='name'>Name</label>
                <input
                  id='name'
                  type='text'
                  autoFocus='on'
                  autoComplete='on'
                  disabled={isLoading}
                  defaultValue={product.name}
                  {
                    ...register(
                      'name',
                      {
                        required: true,
                        length: {
                          min: 2,
                          max: 50,
                        },
                      }
                    )
                  }
                />
              </FormField>
              <FormField error={errors.indirectCostPercent}>
                <label htmlFor='indirectCostPercent'>Indirect Cost (%)</label>
                <input
                  id='indirectCostPercent'
                  type='number'
                  disabled={isLoading}
                  defaultValue={product.percentageIndirectCost}
                  {
                    ...register(
                      'indirectCostPercent',
                      {
                        required: true,
                        length: {
                          min: 1,
                          max: 15,
                        },
                      }
                    )
                  }
                />
              </FormField>
              <FormField error={errors.profitPercent}>
                <label htmlFor='profitPercent'>Profit (%)</label>
                <input
                  id='profitPercent'
                  type='number'
                  disabled={isLoading}
                  defaultValue={product.percentageProfit}
                  {
                    ...register(
                      'profitPercent',
                      {
                        required: true,
                        length: {
                          min: 1,
                          max: 15,
                        }
                      }
                    )
                  }
                />
              </FormField>
              <FormField error={errors.category}>
                <label htmlFor='category'>Category</label>
                <select
                  id='category'
                  disabled={isLoading}
                  defaultValue={product.categoryId}
                  {
                    ...register(
                      'category',
                      {
                        required: true,
                      }
                    )
                  }
                >
                  <option value=''>
                    --Please choose a product category--
                  </option>
                  {
                    categories.map((option, index) => {
                      return (
                        <option
                          key={index}
                          value={option.id? option.id: option}
                        >
                          { option.name? option.name: option }
                        </option>
                      );
                    })
                  }
                </select>
              </FormField>
              <SelectMultiple
                label='Materials'
                id='materials'
                options={materials}
                defaultValue={
                  product.billOfMaterials?.map(item => ({
                    id: item.material.id,
                    name: item.material.name,
                    count: item.materialCount
                  }))
                }
                registerObj={
                  register(
                    'materialsList',
                    {
                      required: true,
                    }
                  )
                }
              />
              <span>{errors.materialsList}</span>
            </Form>
          </>
      }
    </section>
  );
}
