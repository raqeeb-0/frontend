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
  useDeleteExpensesCategory,
  useUpdateExpensesCategory,
  useCreateExpensesCategory,
  useGetExpensesCategory,
  useGetExpensesCategories
} from '../hooks/expensesCategories';


export const ExpensesCategories = () => {
  const {
    categories,
    refreshCategories,
    isLoading: isFetchingCategories
  } = useGetExpensesCategories();
  const {
    handleDelete,
    isLoading: isDeletingCategory
  } = useDeleteExpensesCategory();

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
              value='Expenses Categories'
              isEmptyList={categories.length === 0}
              link={{
                path: '/app/expenses/categories/create',
                name: 'New Category',
              }}
            />
            {
              categories.length === 0
                ?<EmptyListPlaceholder
                  listName='expenses categories'
                  link={{
                    path: '/app/expenses/categories/create',
                    name: 'Create Category',
                  }}
                />
                :<>
                  <SearchInput resourceName='categories' />
                  <ResourcesTable
                    resourceName='category'
                    resourcePath='/expenses/categories'
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


export const ExpensesCategoryCreate = () => {
  const { isLoading, handleCreate } = useCreateExpensesCategory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleCreate(payload);
  }

  return (
    <section>
      <PageHeader value='New Expense Category' />
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


export const ExpensesCategoryUpdate = () => {
  const { isLoading: isFetchingCategory, category } = useGetExpensesCategory();
  const { isLoading, handleUpdate } = useUpdateExpensesCategory();

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
            <PageHeader value='Update Expenses Category' />
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
