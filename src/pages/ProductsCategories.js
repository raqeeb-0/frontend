import {
  Form,
  Header,
  SearchInput,
  ResourcesTable,
  EmptyListPlaceholder
} from '../components/app';
import {
  Loader,
  FormField,
  PageHeader
} from '../components/common';
import {
  useDeleteProductsCategory,
  useUpdateProductsCategory,
  useCreateProductsCategory,
  useGetProductsCategory,
  useGetProductsCategories
} from '../hooks/productsCategories';
import { useForm } from '../hooks/common';


export const ProductsCategories = () => {
  const {
    categories,
    refreshCategories,
    isLoading: isFetchingCategories
  } = useGetProductsCategories();
  const {
    handleDelete,
    isLoading: isDeletingCategory
  } = useDeleteProductsCategory();

  const deleteHandler = (e) => {
    handleDelete(
      e.currentTarget.getAttribute('data-id'),
      refreshCategories
    );
  }

  const isLoading = isFetchingCategories || isDeletingCategory;

  return (
    <section>
      {
        isLoading
          ?<Loader />
          :<>
            <Header
              value='Products Categories'
              isEmptyList={categories.length === 0}
              link={{
                path: '/app/products/categories/create',
                name: 'New Category',
              }}
            />
            {
              categories.length === 0
                ?<EmptyListPlaceholder
                  listName='product categories'
                  link={{
                    path: '/app/products/categories/create',
                    name: 'Create Category',
                  }}
                />
                :<>
                  <SearchInput resourceName='categories' />
                  <ResourcesTable
                    resourceName='category'
                    resourcePath='/products/categories'
                    resources={categories}
                    handleDelete={deleteHandler}
                  />
                </>
            }
          </>
      }
    </section>
  );
}


export const ProductsCategoryCreate = () => {
  const { isLoading, handleCreate } = useCreateProductsCategory();
  const { errors, register, handleSubmit } = useForm();

  return (
    <section>
      <PageHeader value='New Product Category' />
      <Form
        legend='Category Details'
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
      </Form>
    </section>
  );
}


export const ProductsCategoryUpdate = () => {
  const { isLoading, handleUpdate } = useUpdateProductsCategory();
  const {
    category,
    isLoading: isFetchingCategory
  } = useGetProductsCategory();
  const { errors, register, handleSubmit } = useForm();

  return (
    <section>
      {
        isFetchingCategory
          ?<Loader />
          :<>
            <PageHeader value='Update Products Category' />
            <Form
              legend='Category Details'
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
                  defaultValue={category.name}
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
            </Form>
          </>
      }
    </section>
  );
}
