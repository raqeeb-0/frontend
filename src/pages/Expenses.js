import {
  Header,
  Form,
  FormField,
  SelectInput,
  SearchInput,
  ResourcesTable,
  EmptyListPlaceholder
} from '../components/app';
import {
  Loader,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleCreate(payload);
  }

  return (
    <section>
      {
        isFetchingCategories
          ?<Loader />
          :<>
            <PageHeader value='New Expense' />
            <Form
              legend='Expense Details'
              onSubmit={handleSubmit}
              isLoading={isLoading}
            >
              <FormField
                label='Name'
                type='text'
                name='name'
                disabled={isLoading}
              />
              <SelectInput
                label='Category'
                name='categoryId'
                options={categories}
                disabled={isLoading}
              />
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleUpdate(payload);
  }
    
  return (
    <section>
      {
        isFetchingExpense || isFetchingCategories
          ?<Loader />
          :<>
            <PageHeader value='Update Expense' />
            <Form
              legend='Expense Details'
              onSubmit={handleSubmit}
              isLoading={isLoading}
            >
              <FormField
                label='Name'
                type='text'
                name='name'
                value={expense.name}
                disabled={isLoading}
              />
              <SelectInput
                label='Category'
                name='categoryId'
                value={expense.categoryId}
                options={categories}
                disabled={isLoading}
              />
            </Form>
          </>
      }
    </section>
  );
}
