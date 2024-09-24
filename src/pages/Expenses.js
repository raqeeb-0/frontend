import {
  Header,
  Form,
  SearchInput,
  OptionsList,
  ResourcesTable,
  ErrorContainer,
  EmptyListPlaceholder
} from '../components/app';
import {
  Loader,
  FormField,
  PageHeader
} from '../components/common';
import { useForm } from '../hooks';
import {
  EXPENSE_API,
  EXPENSE_CATEGORY_API
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


export const Expenses = () => {
  const {
    error,
    refresh,
    isLoading: isFetchingExpenses,
    data
  } = useGet(EXPENSE_API);

  const { handleDelete, isDeleting } = useDelete(
    EXPENSE_API,
    refresh
  );

  const expenses = useMemo(() => {
    return data ? data.map((expense) => ({
      'id': expense.id,
      'name': expense.name,
      'last purchase price': expense.price,
      'category': expense.category.name,
      'created at': expense.createdAt.split('T')[0],
    })) : [];
  }, [data]);

  if (isFetchingExpenses || isDeleting) {
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

  if (expenses.length === 0) {
    return (
      <section>
        <EmptyListPlaceholder
          listName='expenses'
          link={{
            path: '/app/expenses/units/create',
            name: 'Create Expense',
          }}
        />
      </section>
    )
  }

  return (
    <section>
      <Header
        value='Expenses'
        isEmptyList={expenses.length === 0}
        link={{
          path: '/app/expenses/units/create',
          name: 'New Expense',
        }}
      />
      <SearchInput resourceName='expenses' />
      <ResourcesTable
        resourceName='expense'
        resourcePath='/expenses/units'
        resources={expenses}
        handleDelete={handleDelete}
      />
    </section>
  );
}

export const ExpenseCreate = () => {
  const {
    error,
    refresh,
    isLoading: isFetchingCategories,
    data: categories
  } = useGet(EXPENSE_CATEGORY_API);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isCreating, handleCreate } = useCreate(
    EXPENSE_API,
    () => navigate('/app/expenses/units')
  );

  if (isFetchingCategories) {
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

  return (
    <section>
      <PageHeader value='New Expense' />
      <Form
        legend='Expense Details'
        onSubmit={(e) => handleSubmit(e, handleCreate)}
        isLoading={isCreating}
      >
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
        <FormField error={errors.categoryId}>
          <label htmlFor='categoryId'>Category</label>
          <select
            id='categoryId'
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
      </Form>
    </section>
  );
}

export const ExpenseUpdate = () => {
  const {
    error: categoriesFetchError,
    refresh: refreshCategories,
    isLoading: isFetchingCategories,
    data: categories
  } = useGet(EXPENSE_CATEGORY_API);

  const { expenseId } = useParams();
  const {
    error: expenseFetchError,
    refresh: refreshExpense,
    isLoading: isFetchingExpense,
    data: expense
  } = useGet(`${EXPENSE_API}/${expenseId}`);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isUpdating, handleUpdate } = useUpdate(
    `${EXPENSE_API}/${expenseId}`,
    () => navigate('/app/expenses/units')
  );

  const refresh = () => {
    refreshCategories();
    refreshExpense();
  }

  if (isFetchingCategories || isFetchingExpense) {
    return <Loader />;
  }

  if (categoriesFetchError || expenseFetchError) {
    return (
      <ErrorContainer
        error={categoriesFetchError || expenseFetchError}
        refresh={refresh}
      />
    );
  }

  return (
    <section>
      <PageHeader value='Edit Expense' />
      <Form
        legend='Expense Details'
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
            disabled={isUpdating}
            defaultValue={expense.category.id}
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
      </Form>
    </section>
  );
}
