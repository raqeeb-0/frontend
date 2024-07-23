import {
  Header,
  FormField,
  Form,
  ResourcesTable,
  EmptyListPlaceholder
} from '../components/app';
import {
  SearchInput,
  Loader,
  PageHeader
} from '../components/common';
import {
  useDeleteMaterialsCategory,
  useUpdateMaterialsCategory,
  useCreateMaterialsCategory,
  useGetMaterialsCategory,
  useGetMaterialsCategories
} from '../hooks/materialsCategories';


export const MaterialsCategories = () => {
  const {
    categories,
    refreshCategories,
    isLoading: isFetchingCategories
  } = useGetMaterialsCategories();
  const {
    handleDelete,
    isLoading: isDeletingCategory
  } = useDeleteMaterialsCategory();

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
              value='Materials Categories'
              isEmptyList={categories.length === 0}
              link={{
                path: '/app/materials/categories/create',
                name: 'New Category',
              }}
            />
            {
              categories.length === 0
                ?<EmptyListPlaceholder
                  listName='material categories'
                  link={{
                    path: '/app/materials/categories/create',
                    name: 'Create Category',
                  }}
                />
                :<>
                  <SearchInput resourceName='materials' />
                  <ResourcesTable
                    resourceName='category'
                    resourcePath='/materials/categories'
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


export const MaterialsCategoryCreate = () => {
  const { isLoading, handleCreate } = useCreateMaterialsCategory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleCreate(payload);
  }

  return (
    <section>
      <PageHeader value='New Material Category' />
      <Form
        legend='Category Details'
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <FormField
          label='Name'
          type='text'
          name='name'
        />
      </Form>
    </section>
  );
}


export const MaterialsCategoryUpdate = () => {
  const { isLoading: isFetchingCategory, category } = useGetMaterialsCategory();
  const { isLoading, handleUpdate } = useUpdateMaterialsCategory();

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
            <PageHeader value='Update Materials Category' />
            <Form
              legend='Category Details'
              onSubmit={handleSubmit}
              isLoading={isLoading}
            >
              <FormField
                label='Name'
                type='text'
                name='name'
                value={category.name}
              />
            </Form>
          </>
      }
    </section>
  );
}
