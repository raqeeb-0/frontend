import {
  Form,
  Header,
  SearchInput,
  ResourcesTable,
  ErrorContainer,
  EmptyListPlaceholder
} from '../components/app';
import {
  Loader,
  FormField,
  PageHeader
} from '../components/common';
import { useForm }  from '../hooks';
import { CUSTOMER_API } from '../lib/endpoints';
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


export const Customers = () => {
  const {
    error,
    refresh,
    isLoading: isFetchingCustomers,
    data
  } = useGet(CUSTOMER_API);

  const { handleDelete, isDeleting } = useDelete(
    CUSTOMER_API,
    refresh
  );

  const customers = useMemo(() => {
    return data ? data.map((customer) => ({
      'id': customer.id,
      'name': customer.name,
      'account receivable': customer.accountReceivable,
      'joined at': customer.createdAt.split('T')[0],
    })) : [];
  }, [data]);

  if (isFetchingCustomers || isDeleting) {
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

  if (customers.length === 0) {
    return (
      <section>
        <EmptyListPlaceholder
          listName='customers'
          link={{
            path: '/app/customers/create',
            name: 'Create Customer',
          }}
        />
      </section>
    )
  }

  return (
    <section>
      <Header
        value='Customers'
        isEmptyList={customers.length === 0}
        link={{
          path: '/app/customers/create',
          name: 'New Customer',
        }}
      />
      <SearchInput resourceName='customers' />
      <ResourcesTable
        resourceName='customer'
        resourcePath='/customers'
        resources={customers}
        handleDelete={handleDelete}
      />
    </section>
  );
}

export const CustomerCreate = () => {
  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { handleCreate, isCreating } = useCreate(
    CUSTOMER_API,
    () => navigate('/app/customers')
  );

  return (
    <section>
      <PageHeader value='New Customer' />
      <Form
        legend='Customer Details'
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
        <FormField error={errors.phone}>
          <label htmlFor='phone'>Phone number</label>
          <input
            id='phone'
            type='tel'
            disabled={isCreating}
            {
              ...register(
                'phone',
                {
                  required: true,
                  phoneNumber: true,
                }
              )
            }
          />
        </FormField>
      </Form>
    </section>
  );
}

export const CustomerUpdate = () => {
  const { customerId } = useParams();
  const {
    error,
    refresh,
    isLoading: isFetchingCustomer,
    data: customer
  } = useGet(`${CUSTOMER_API}/${customerId}`);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { handleUpdate, isUpdating } = useUpdate(
    `${CUSTOMER_API}/${customerId}`,
    () => navigate('/app/customers')
  );

  if (isFetchingCustomer) {
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
      <PageHeader value='Edit Customer' />
      <Form
        legend='Customer Details'
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
            defaultValue={customer.name}
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
        <FormField error={errors.phone}>
          <label htmlFor='phone'>Phone number</label>
          <input
            id='phone'
            type='tel'
            disabled={isUpdating}
            defaultValue={customer.phone}
            {
              ...register(
                'phone',
                {
                  required: true,
                  phoneNumber: true,
                }
              )
            }
          />
        </FormField>
      </Form>
    </section>
  );
}
