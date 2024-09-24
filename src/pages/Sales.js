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
  SALE_API,
  PRODUCT_API,
  CUSTOMER_API
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


export const Sales = () => {
  const {
    error,
    refresh,
    isLoading: isFetchingSales,
    data
  } = useGet(SALE_API);

  const { handleDelete, isDeleting } = useDelete(
    SALE_API,
    refresh
  );

  const sales = useMemo(() => {
    return data ? data.map((sale) => ({
      'id': sale.id,
      'ID': sale.id,
      'product': sale.product.name,
      'quantity': sale.quantity,
      'price': sale.price,
      'create at': sale.createdAt.split('T')[0],
    })) : [];
  }, [data]);

  if (isFetchingSales || isDeleting) {
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

  if (sales.length === 0) {
    return (
      <section>
        <EmptyListPlaceholder
          listName='sales'
          link={{
            path: '/app/sales/create',
            name: 'Create Sale',
          }}
        />
      </section>
    );
  }

  return (
    <section>
      <Header
        value='Sales'
        isEmptyList={sales.length === 0}
        link={{
          path: '/app/sales/create',
          name: 'New Sale',
        }}
      />
      <SearchInput resourceName='sales' />
      <ResourcesTable
        resourceName='sale'
        resourcePath='/sales'
        resources={sales}
        handleDelete={handleDelete}
      />
    </section>
  );
}

export const SaleCreate = () => {
  const {
    error: productsFetchError,
    refresh: refreshProducts,
    isLoading: isFetchingProducts,
    data: products
  } = useGet(PRODUCT_API);
  const {
    error: customersFetchError,
    refresh: refreshCustomers,
    isLoading: isFetchingCustomers,
    data: customers
  } = useGet(CUSTOMER_API);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isCreating, handleCreate } = useCreate(
    SALE_API,
    () => navigate('/app/sales')
  );

  const refresh = () => {
    refreshProducts();
    refreshCustomers();
  }

  if (isFetchingCustomers || isFetchingProducts) {
    return <Loader />;
  }

  if (productsFetchError || customersFetchError) {
    return (
      <ErrorContainer
        error={productsFetchError || customersFetchError}
        refresh={refresh}
      />
    );
  }

  return (
    <section>
      <PageHeader value='New Sale' />
      <Form
        legend='Sale Details'
        onSubmit={(e) => handleSubmit(e, handleCreate)}
        isLoading={isCreating}
      >
        <FormField error={errors.productId}>
          <label htmlFor='product'>Product</label>
          <select
            id='product'
            disabled={isCreating}
            {
              ...register(
                'productId',
                {
                  required: true,
                }
              )
            }
          >
            <option value=''>
              --Please choose a product--
            </option>
            <OptionsList options={products} />
          </select>
        </FormField>
        <FormField error={errors.quantity}>
          <label htmlFor='quantity'>Quantity</label>
          <input
            id='quantity'
            type='number'
            disabled={isCreating}
            {
              ...register(
                'quantity',
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
        <FormField error={errors.customerId}>
          <label htmlFor='customer'>Customer</label>
          <select
            id='customer'
            disabled={isCreating}
            {
              ...register(
                'customerId',
                {
                  required: true,
                }
              )
            }
          >
            <option value=''>
              --Please choose a customer--
            </option>
            <OptionsList options={customers} />
          </select>
        </FormField>
      </Form>
    </section>
  );
}

export const SaleUpdate = () => {
  const {
    error: productsFetchError,
    refresh: refreshProducts,
    isLoading: isFetchingProducts,
    data: products
  } = useGet(PRODUCT_API);
  const {
    error: customersFetchError,
    refresh: refreshCustomers,
    isLoading: isFetchingCustomers,
    data: customers
  } = useGet(CUSTOMER_API);

  const { saleId } = useParams();
  const {
    error: saleFetchError,
    refresh: refreshSale,
    isLoading: isFetchingSale,
    data: sale
  } = useGet(`${SALE_API}/${saleId}`);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isUpdating, handleUpdate } = useUpdate(
    `${SALE_API}/${saleId}`,
    () => navigate('/app/sales')
  );

  const refresh = () => {
    refreshCustomers();
    refreshProducts();
    refreshSale()
  }

  if (isFetchingCustomers || isFetchingProducts || isFetchingSale) {
    return <Loader />;
  }

  const error = productsFetchError || customersFetchError || saleFetchError;
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
      <PageHeader value='Edit Sale' />
      <Form
        legend='Sale Details'
        onSubmit={(e) => handleSubmit(e, handleUpdate)}
        isLoading={isUpdating}
      >
        <FormField error={errors.productId}>
          <label htmlFor='product'>Product</label>
          <select
            id='product'
            disabled={isUpdating}
            defaultValue={sale.product.id}
            {
              ...register(
                'productId',
                {
                  required: true,
                }
              )
            }
          >
            <option value=''>
              --Please choose a product--
            </option>
            <OptionsList options={products} />
          </select>
        </FormField>
        <FormField error={errors.quantity}>
          <label htmlFor='quantity'>Quantity</label>
          <input
            id='quantity'
            type='number'
            disabled={isUpdating}
            defaultValue={sale.quantity}
            {
              ...register(
                'quantity',
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
        <FormField error={errors.customerId}>
          <label htmlFor='customer'>Customer</label>
          <select
            id='customer'
            disabled={isUpdating}
            defaultValue={sale.customer.id}
            {
              ...register(
                'customerId',
                {
                  required: true,
                }
              )
            }
          >
            <option value=''>
              --Please choose a customer--
            </option>
            <OptionsList options={customers} />
          </select>
        </FormField>
      </Form>
    </section>
  );
}
