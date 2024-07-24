import {
  Form,
  Header,
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
  useDeleteCustomer,
  useUpdateCustomer,
  useCreateCustomer,
  useGetCustomer,
  useGetCustomers
} from '../hooks/customers';


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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleCreate(payload);
  }

  return (
    <section>
      <PageHeader value='New Customer' />
      <Form
        legend='Customer Details'
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <FormField
          label='Name'
          type='text'
          name='name'
          disabled={isLoading}
        />
        <FormField
          label='Phone Number'
          type='text'
          name='phone'
          disabled={isLoading}
        />
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleUpdate(payload);
  }
    
  return (
    <section>
      {
        isFetchingCustomer
          ?<Loader />
          :<>
            <PageHeader value='Update Customer' />
            <Form
              legend='Customer Details'
              onSubmit={handleSubmit}
              isLoading={isLoading}
            >
              <FormField
                label='Name'
                type='text'
                name='name'
                value={customer.name}
                disabled={isLoading}
              />
              <FormField
                label='Phone Number'
                type='text'
                name='phone'
                value={customer.phone}
                disabled={isLoading}
              />
            </Form>
          </>
      }
    </section>
  );
}
