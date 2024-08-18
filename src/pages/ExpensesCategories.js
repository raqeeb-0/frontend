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
  useDeleteExpensesCategory,
  useUpdateExpensesCategory,
  useCreateExpensesCategory,
  useGetExpensesCategory,
  useGetExpensesCategories
} from '../hooks/expensesCategories';
import { useForm } from '../hooks/common';


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
  const { errors, register, handleSubmit } = useForm();

  return (
    <section>
      <PageHeader value='New Expense Category' />
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


export const ExpensesCategoryUpdate = () => {
  const { isLoading, handleUpdate } = useUpdateExpensesCategory();
  const {
    category,
    isLoading: isFetchingCategory
  } = useGetExpensesCategory();
  const { errors, register, handleSubmit } = useForm();
    
  return (
    <section>
      {
        isFetchingCategory
          ?<Loader />
          :<>
            <PageHeader value='Update Expenses Category' />
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
