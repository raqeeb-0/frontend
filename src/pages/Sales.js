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
  useDeleteSale,
  useUpdateSale,
  useCreateSale,
  useGetSale,
  useGetSales
} from '../hooks/sales';
import {
  useGetProducts
} from '../hooks/products';
import {
  useGetCustomers
} from '../hooks/customers';


export const Sales = () => {
  const {
    sales,
    refreshSales,
    isLoading: isFetchingSales
  } = useGetSales();
  const {
    handleDelete,
    isLoading: isDeletingSale
  } = useDeleteSale();

  const deleteHandler = (e) => {
    handleDelete(
      e.currentTarget.getAttribute('data-id'),
      refreshSales
    );
  }

  const isLoading = isFetchingSales || isDeletingSale;

  return (
    <section>
      {
        isLoading
          ?<Loader />
          :<>
            <Header
              value='Sales'
              isEmptyList={sales.length === 0}
              link={{
                path: '/app/sales/create',
                name: 'New Sale',
              }}
            />
            {
              sales.length === 0
                ?<EmptyListPlaceholder
                  listName='sales'
                  link={{
                    path: '/app/sales/create',
                    name: 'Create Sale',
                  }}
                />
                :<>
                  <SearchInput resourceName='sales' />
                  <ResourcesTable
                    resourceName='sale'
                    resourcePath='/sales'
                    resources={sales}
                    handleDelete={deleteHandler}
                  />
                </>
            }
          </>
      }
    </section>
  );
}

export const SaleCreate = () => {
  const { isLoading, handleCreate } = useCreateSale();
  const {
    customers,
    isLoading: isFetchingCustomers
  } = useGetCustomers();
  const {
    products,
    isLoading: isFetchingProducts
  } = useGetProducts();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    payload.quantity = parseInt(payload.quantity);
    payload.total = parseInt(payload.total);
    handleCreate(payload);
  }

  return (
    <section>
      {
        isFetchingProducts || isFetchingCustomers
          ?<Loader />
          :<>
            <PageHeader value='New Sale' />
            <Form
              legend='Sale Details'
              onSubmit={handleSubmit}
              isLoading={isLoading}
            >
              <SelectInput
                label='Product'
                name='productId'
                options={products}
                disabled={isLoading}
              />
              <FormField
                label='Quantity'
                type='number'
                name='quantity'
                disabled={isLoading}
              />
              <FormField
                label='Total'
                type='number'
                name='total'
                disabled={isLoading}
              />
              <SelectInput
                label='Customer'
                name='customerId'
                options={customers}
                disabled={isLoading}
              />
            </Form>
          </>
      }
    </section>
  );
}

export const SaleUpdate = () => {
  const {
    sale,
    isLoading: isFetchingSale
  } = useGetSale();
  const {
    products,
    isLoading: isFetchingProducts
  } = useGetProducts();
  const {
    customers,
    isLoading: isFetchingCustomers
  } = useGetCustomers();
  const { isLoading, handleUpdate } = useUpdateSale();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleUpdate(payload);
  }
    
  return (
    <section>
      {
        isFetchingSale || isFetchingProducts || isFetchingCustomers
          ?<Loader />
          :<>
            <PageHeader value='Update Order Status' />
            <Form
              legend='Order Details'
              onSubmit={handleSubmit}
              isLoading={isLoading}
            >
              <SelectInput
                label='Product'
                name='productId'
                value={sale.productId}
                options={products}
                disabled={isLoading}
              />
              <FormField
                label='Quantity'
                type='number'
                name='quantity'
                value={sale.quantity}
                disabled={isLoading}
              />
              <FormField
                label='Total'
                type='number'
                name='total'
                value={sale.price}
                disabled={isLoading}
              />
              <SelectInput
                label='Customer'
                name='customerId'
                value={sale.customerId}
                options={customers}
                disabled={isLoading}
              />
            </Form>
          </>
      }
    </section>
  );
}
