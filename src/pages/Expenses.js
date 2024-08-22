import {
  Header,
  Form,
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
  useDeleteExpense,
  useUpdateExpense,
  useCreateExpense,
  useGetExpense,
  useGetExpenses
} from '../hooks/expenses';
import {
  useGetExpensesCategories
} from '../hooks/expensesCategories';
import { useForm } from '../hooks/common';


export const Expenses = () => {
  const {
    expenses,
    refreshExpenses,
    isLoading: isFetchingExpenses
  } = useGetExpenses();
  const {
    handleDelete,
    isLoading: isDeletingExpense
  } = useDeleteExpense();

  const deleteHandler = (e) => {
    handleDelete(
      e.currentTarget.getAttribute('data-id'),
      refreshExpenses
    );
  }

  const isLoading = isFetchingExpenses || isDeletingExpense;

  return (
    <section>
      {
        isLoading
          ?<Loader />
          :<>
            <Header
              value='Expenses'
              isEmptyList={expenses.length === 0}
              link={{
                path: '/app/expenses/units/create',
                name: 'New Expense',
              }}
            />
            {
              expenses.length === 0
                ?<EmptyListPlaceholder
                  listName='expenses'
                  link={{
                    path: '/app/expenses/units/create',
                    name: 'Create Expense',
                  }}
                />
                :<>
                  <SearchInput resourceName='expenses' />
                  <ResourcesTable
                    resourceName='expense'
                    resourcePath='/expenses/units'
                    resources={expenses}
                    handleDelete={deleteHandler}
                  />
                </>
            }
          </>
      }
    </section>
  );
}

export const ExpenseCreate = () => {
  const { isLoading, handleCreate } = useCreateExpense();
  const {
    categories,
    isLoading: isFetchingCategories
  } = useGetExpensesCategories();
  const { errors, register, handleSubmit } = useForm();

  return (
    <section>
      {
        isFetchingCategories
          ?<Loader />
          :<>
            <PageHeader value='New Expense' />
            <Form
              legend='Expense Details'
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
              <FormField error={errors.categoryId}>
                <label htmlFor='categoryId'>Category</label>
                <select
                  id='categoryId'
                  disabled={isLoading}
                  {
                    ...register(
                      'categoryId',
                      {
                        required: true,
                      }
                    )
                  }
                >
                  <option value=''>--Please choose an option--</option>
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
            </Form>
          </>
      }
    </section>
  );
}

export const ExpenseUpdate = () => {
  const {
    expense,
    isLoading: isFetchingExpense
  } = useGetExpense();
  const {
    categories,
    isLoading: isFetchingCategories
  } = useGetExpensesCategories();
  const { isLoading, handleUpdate } = useUpdateExpense();
  const { errors, register, handleSubmit } = useForm();
    
  return (
    <section>
      {
        isFetchingExpense || isFetchingCategories
          ?<Loader />
          :<>
            <PageHeader value='Update Expense' />
            <Form
              legend='Expense Details'
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
                  defaultValue={expense.name}
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
              <FormField error={errors.categoryId}>
                <label htmlFor='categoryId'>Category</label>
                <select
                  id='categoryId'
                  disabled={isLoading}
                  defaultValue={expense.categoryId}
                  {
                    ...register(
                      'categoryId',
                      {
                        required: true,
                      }
                    )
                  }
                >
                  <option value=''>--Please choose an option--</option>
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
            </Form>
          </>
      }
    </section>
  );
}
