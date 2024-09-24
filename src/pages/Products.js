import {
  Form,
  Header,
  SearchInput,
  OptionsList,
  ResourcesTable,
  SelectMultiple,
  ErrorContainer,
  EmptyListPlaceholder
} from '../components/app';
import {
  Loader,
  FormField,
  PageHeader,
  ImageUploader
} from '../components/common';
import { useForm } from '../hooks';
import {
  PRODUCT_API,
  MATERIAL_API,
  PRODUCT_CATEGORY_API
} from '../lib/endpoints';
import {
  useGet,
  useCreate,
  useUpdate,
  useDelete
} from '../hooks/useAPI';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import { useMemo } from 'react';


export const Products = () => {
  const {
    error,
    refresh,
    isLoading: isFetchingProducts,
    data
  } = useGet(PRODUCT_API);

  const { handleDelete, isDeleting } = useDelete(
    PRODUCT_API,
    refresh
  );

  const products = useMemo(() => {
    return data ? data.map((product) => ({
      'id': product.id,
      'name': product.name,
      'price/unit': product.price,
      'quantity': product.quantity,
      'category': product.category.name,
      'create at': product.createdAt.split('T')[0],
    })) : [];
  }, [data]);

  if (isFetchingProducts || isDeleting) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorContainer
        error={error}
        refresh={refresh}
      />
    );
  }

  if (products.length === 0) {
    return (
      <section>
        <EmptyListPlaceholder
          listName='products'
          link={{
            path: '/app/products/items/create',
            name: 'Create Product',
          }}
        />
      </section>
    );
  }

  return (
    <section>
      <Header
        value='Products'
        isEmptyList={products.length === 0}
        link={{
          path: '/app/products/items/create',
          name: 'New Product',
        }}
      />
      <SearchInput resourceName='products' />
      <ResourcesTable
        resourceName='product'
        resourcePath='/products/items'
        resources={products}
        handleDelete={handleDelete}
      />
    </section>
  );
}

export const ProductCreate = () => {
  const {
    error: categoriesFetchError,
    refresh: refreshCategories,
    isLoading: isFetchingCategories,
    data: categories
  } = useGet(PRODUCT_CATEGORY_API);
  const {
    error: materialsFetchError,
    refresh: refreshMaterials,
    isLoading: isFetchingMaterials,
    data: materials
  } = useGet(MATERIAL_API);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isCreating, handleCreate } = useCreate(
    PRODUCT_API,
    () => navigate('/app/products/items')
  );

  const refresh = () => {
    refreshCategories();
    refreshMaterials();
  }

  if (isFetchingCategories || isFetchingMaterials) {
    return <Loader />;
  }

  if (categoriesFetchError || materialsFetchError) {
    return (
      <ErrorContainer
        error={categoriesFetchError || materialsFetchError}
        refresh={refresh}
      />
    );
  }

  return (
    <section>
      <PageHeader value='New Product' />
      <Form
        legend='Product Details'
        onSubmit={(e) => handleSubmit(e, handleCreate)}
        isLoading={isCreating}
      >
        <ImageUploader />
        <FormField error={errors.name}>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            autoFocus='on'
            autoComplete='on'
            disabled={isCreating}
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
            disabled={isCreating}
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
            disabled={isCreating}
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
        <FormField error={errors.categoryId}>
          <label htmlFor='category'>Category</label>
          <select
            id='category'
            disabled={isCreating}
            {
              ...register(
                'categoryId',
                {
                  required: true,
                }
              )
            }
          >
            <option value=''>
              --Please choose a category--
            </option>
            <OptionsList options={categories} />
          </select>
        </FormField>
        <SelectMultiple
          label='Materials'
          id='materials'
          options={materials}
          error={errors.materials}
          registerObj={
            register(
              'materials',
              {
                required: true,
              }
            )
          }
        />
      </Form>
    </section>
  );
}

export const ProductUpdate = () => {
  const {
    error: categoriesFetchError,
    refresh: refreshCategories,
    isLoading: isFetchingCategories,
    data: categories
  } = useGet(PRODUCT_CATEGORY_API);
  const {
    error: materialsFetchError,
    refresh: refreshMaterials,
    isLoading: isFetchingMaterials,
    data: materials
  } = useGet(MATERIAL_API);

  const { productId } = useParams();
  const {
    error: productFetchError,
    refresh: refreshProduct,
    isLoading: isFetchingProduct,
    data: product
  } = useGet(`${PRODUCT_API}/${productId}`);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isUpdating, handleUpdate } = useUpdate(
    `${PRODUCT_API}/${productId}`,
    () => navigate('/app/products/items')
  );

  const refresh = () => {
    refreshCategories();
    refreshMaterials();
    refreshProduct();
  }

  if (isFetchingCategories || isFetchingMaterials || isFetchingProduct) {
    return <Loader />;
  }

  const error = categoriesFetchError || materialsFetchError || productFetchError;
  if (error) {
    return (
      <ErrorContainer
        error={error}
        refresh={refresh}
      />
    );
  }
  return (
    <section>
      <PageHeader value='Edit Product' />
      <Form
        legend='Product Details'
        onSubmit={(e) => handleSubmit(e, handleUpdate)}
        isLoading={isUpdating}
      >
        <FormField error={errors.name}>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            autoFocus='on'
            autoComplete='on'
            disabled={isUpdating}
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
            disabled={isUpdating}
            defaultValue={product.indirectCostPercent}
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
            disabled={isUpdating}
            defaultValue={product.profitPercent}
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
        <FormField error={errors.categoryId}>
          <label htmlFor='category'>Category</label>
          <select
            id='category'
            disabled={isUpdating}
            defaultValue={product.category.id}
            {
              ...register(
                'categoryId',
                {
                  required: true,
                }
              )
            }
          >
            <option value=''>
              --Please choose a category--
            </option>
            <OptionsList options={categories} />
          </select>
        </FormField>
        <SelectMultiple
          label='Materials'
          id='materials'
          options={materials}
          error={errors.materials}
          defaultValue={product.materials}
          registerObj={
            register(
              'materialInfo',
              {
                required: true,
              }
            )
          }
        />
        <span>{errors.materialInfo}</span>
      </Form>
    </section>
  );
}
