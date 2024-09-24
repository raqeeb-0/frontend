import {
  Form,
  Header,
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
  SUPPLIER_API,
  EXPENSE_PURCHASE_API
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
import { useState, useMemo } from 'react';


export const ExpensePurchases = () => {
  const {
    error,
    refresh,
    isLoading: isFetchingPurchases,
    data
  } = useGet(EXPENSE_PURCHASE_API);

  const { handleDelete, isDeleting } = useDelete(
    EXPENSE_PURCHASE_API,
    refresh
  );

  const purchases = useMemo(() => {
    return data ? data.map((purchase) => ({
      'id': purchase.id,
      'ID': purchase.id,
      'expense': purchase.expense.name,
      'price': purchase.price,
      'created at': purchase.createdAt.split('T')[0],
    })) : [];
  }, [data]);

  if (isFetchingPurchases || isDeleting) {
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

  if (purchases.length === 0) {
    return (
      <section>
        <EmptyListPlaceholder
          listName='purchases'
          link={{
            path: '/app/expense-purchases/create',
            name: 'Create Purchase',
          }}
        />
      </section>
    )
  }

  return (
    <section>
      <Header
        value='Expense Purchases'
        isEmptyList={purchases.length === 0}
        link={{
          path: '/app/expense-purchases/create',
          name: 'New Purchase',
        }}
      />
      <SearchInput resourceName='expense purchases' />
      <ResourcesTable
        resourceName='purchase'
        resourcePath='/expense-purchases'
        resources={purchases}
        handleDelete={handleDelete}
      />
    </section>
  );
}

export const ExpensePurchaseCreate = () => {
  const {
    error: expensesFetchError,
    refresh: refreshExpenses,
    isLoading: isFetchingExpenses,
    data: expenses
  } = useGet(EXPENSE_API);
  const {
    error: suppliersFetchError,
    refresh: refreshSuppliers,
    isLoading: isFetchingSuppliers,
    data: suppliers
  } = useGet(SUPPLIER_API);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isCreating, handleCreate } = useCreate(
    EXPENSE_PURCHASE_API,
    () => navigate('/app/expense-purchases')
  );

  const refresh = () => {
    refreshExpenses();
    refreshSuppliers();
  }

  if (isFetchingExpenses || isFetchingSuppliers) {
    return <Loader />;
  }

  if (expensesFetchError || suppliersFetchError) {
    return (
      <ErrorContainer
        error={expensesFetchError || suppliersFetchError}
        refresh={refresh}
      />
    );
  }

  return (
    <section>
      <Header
        value='New Expense Purchase'
        link={{
          path: '/app/material-purchases/create',
          name: 'Material Purchase',
        }}
      />
      <Form
        legend='Purchase Details'
        onSubmit={(e) => handleSubmit(e, handleCreate)}
        isLoading={isCreating}
      >
        <FormField error={errors.expenseId}>
          <label htmlFor='expense'>Expense</label>
          <select
            id='expense'
            disabled={isCreating}
            {
              ...register(
                'expenseId',
                {
                  required: true,
                }
              )
            }
          >
            <option value=''>
              --Please choose an expense--
            </option>
            <OptionsList options={expenses} />
          </select>
        </FormField>
        <FormField error={errors.price}>
          <label htmlFor='price'>Price/Unit</label>
          <input
            id='price'
            type='number'
            disabled={isCreating}
            {
              ...register(
                'price',
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
        <FormField error={errors.supplierId}>
          <label htmlFor='supplier'>Supplier</label>
          <select
            id='supplier'
            disabled={isCreating}
            {
              ...register(
                'supplierId',
                {
                  required: true,
                }
              )
            }
          >
            <option value=''>
              --Please choose a supplier--
            </option>
            <OptionsList options={suppliers} />
          </select>
        </FormField>
      </Form>
    </section>
  );
}

export const ExpensePurchaseUpdate = () => {
  const {
    error: expensesFetchError,
    refresh: refreshExpenses,
    isLoading: isFetchingExpenses,
    data: expenses
  } = useGet(EXPENSE_API);
  const {
    error: suppliersFetchError,
    refresh: refreshSuppliers,
    isLoading: isFetchingSuppliers,
    data: suppliers
  } = useGet(SUPPLIER_API);

  const { purchaseId } = useParams();
  const {
    error: purchaseFetchError,
    refresh: refreshPurchase,
    isLoading: isFetchingPurchase,
    data: purchase
  } = useGet(`${EXPENSE_PURCHASE_API}/${purchaseId}`)

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isUpdating, handleUpdate } = useUpdate(
    `${EXPENSE_PURCHASE_API}/${purchaseId}`,
    () => navigate('/app/expense-purchases')
  );

  const refresh = () => {
    refreshExpenses();
    refreshSuppliers();
    refreshPurchase();
  }

  if (isFetchingExpenses || isFetchingSuppliers || isFetchingPurchase) {
    return <Loader />;
  }

  const error = expensesFetchError || suppliersFetchError || purchaseFetchError;
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
      <PageHeader value='Edit Expense Purchase' />
      <Form
        legend='Purchase Details'
        onSubmit={(e) => handleSubmit(e, handleUpdate)}
        isLoading={isUpdating}
      >
        <FormField error={errors.expenseId}>
          <label htmlFor='expense'>Expense</label>
          <select
            id='expense'
            disabled={isUpdating}
            defaultValue={purchase.expense.id}
            {
              ...register(
                'expenseId',
                {
                  required: true,
                }
              )
            }
          >
            <option value=''>
              --Please choose a expense--
            </option>
            <OptionsList options={expenses} />
          </select>
        </FormField>
        <FormField error={errors.price}>
          <label htmlFor='price'>Price/Unit</label>
          <input
            id='price'
            type='number'
            disabled={isUpdating}
            defaultValue={purchase.price}
            {
              ...register(
                'price',
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
        <FormField error={errors.supplierId}>
          <label htmlFor='supplier'>Supplier</label>
          <select
            id='supplier'
            disabled={isUpdating}
            defaultValue={purchase.supplier.id}
            {
              ...register(
                'supplierId',
                {
                  required: true,
                }
              )
            }
          >
            <option value=''>
              --Please choose a supplier--
            </option>
            <OptionsList options={suppliers} />
          </select>
        </FormField>
      </Form>
    </section>
  );
}
