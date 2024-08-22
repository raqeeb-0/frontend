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
  useDeleteCustomer,
  useUpdateCustomer,
  useCreateCustomer,
  useGetCustomer,
  useGetCustomers
} from '../hooks/customers';
import { useForm }  from '../hooks/common';


export const Customers = () => {
  const {
    customers,
    refreshCustomers,
    isLoading: isFetchingCustomers
  } = useGetCustomers();
  const {
    handleDelete,
    isLoading: isDeletingCustomer
  } = useDeleteCustomer();

  const deleteHandler = (e) => {
    handleDelete(
      e.currentTarget.getAttribute('data-id'),
      refreshCustomers
    );
  }

  const isLoading = isFetchingCustomers || isDeletingCustomer;

  return (
    <section>
      {
        isLoading
          ?<Loader />
          :<>
            <Header
              value='Customers'
              isEmptyList={customers.length === 0}
              link={{
                path: '/app/customers/create',
                name: 'New Customer',
              }}
            />
            {
              customers.length === 0
                ?<EmptyListPlaceholder
                  listName='customers'
                  link={{
                    path: '/app/customers/create',
                    name: 'Create Customer',
                  }}
                />
                :<>
                  <SearchInput resourceName='customers' />
                  <ResourcesTable
                    resourceName='customer'
                    resourcePath='/customers'
                    resources={customers}
                    handleDelete={deleteHandler}
                  />
                </>
            }
          </>
      }
    </section>
  );
}

export const CustomerCreate = () => {
  const { isLoading, handleCreate } = useCreateCustomer();
  const { errors, register, handleSubmit } = useForm();

  return (
    <section>
      <PageHeader value='New Customer' />
      <Form
        legend='Customer Details'
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
        <FormField error={errors.phone}>
          <label htmlFor='phone'>Phone number</label>
          <input
            id='phone'
            type='tel'
            disabled={isLoading}
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
  const {
    customer,
    isLoading: isFetchingCustomer
  } = useGetCustomer();
  const { isLoading, handleUpdate } = useUpdateCustomer();
  const { errors, register, handleSubmit } = useForm();
    
  return (
    <section>
      {
        isFetchingCustomer
          ?<Loader />
          :<>
            <PageHeader value='Update Customer' />
            <Form
              legend='Customer Details'
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
                  disabled={isLoading}
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
          </>
      }
    </section>
  );
}
