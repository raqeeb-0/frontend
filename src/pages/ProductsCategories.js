import {
  Form,
  Header,
  FormField,
  SearchInput,
  ResourcesTable,
  EmptyListPlaceholder
} from '../components/app';
import {
  Loader,
  PageHeader
} from '../components/common';
import {
  useDeleteProductsCategory,
  useUpdateProductsCategory,
  useCreateProductsCategory,
  useGetProductsCategory,
  useGetProductsCategories
} from '../hooks/productsCategories';


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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleCreate(payload);
  }

  return (
    <section>
      <PageHeader value='New Product Category' />
      <Form
        legend='Category Details'
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <FormField
          label='Name'
          type='text'
          name='name'
          disabled={isLoading}
        />
      </Form>
    </section>
  );
}


export const ProductsCategoryUpdate = () => {
  const { isLoading: isFetchingCategory, category } = useGetProductsCategory();
  const { isLoading, handleUpdate } = useUpdateProductsCategory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleUpdate(payload);
  }
    
  return (
    <section>
      {
        isFetchingCategory
          ?<Loader />
          :<>
            <PageHeader value='Update Products Category' />
            <Form
              legend='Category Details'
              onSubmit={handleSubmit}
              isLoading={isLoading}
            >
              <FormField
                label='Name'
                type='text'
                name='name'
                disabled={isLoading}
                value={category.name}
              />
            </Form>
          </>
      }
    </section>
  );
}
