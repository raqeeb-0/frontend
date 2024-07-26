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
  useDeleteProductionOrder,
  useUpdateProductionOrder,
  useCreateProductionOrder,
  useGetProductionOrder,
  useGetProductionOrders
} from '../hooks/productionOrders';
import {
  useGetProducts
} from '../hooks/products';


export const ProductionOrders = () => {
  const {
    productionOrders,
    refreshProductionOrders,
    isLoading: isFetchingProductionOrders
  } = useGetProductionOrders();
  /*const {
    handleDelete,
    isLoading: isDeletingProductionOrder
  } = useDeleteProductionOrder();

  const deleteHandler = (e) => {
    handleDelete(
      e.currentTarget.getAttribute('data-id'),
      refreshProductionOrders
    );
  }*/

  const isLoading = isFetchingProductionOrders/* || isDeletingProductionOrder*/;

  return (
    <section>
      {
        isLoading
          ?<Loader />
          :<>
            <Header
              value='Production Orders'
              isEmptyList={productionOrders.length === 0}
              link={{
                path: '/app/production-orders/create',
                name: 'New Order',
              }}
            />
            {
              productionOrders.length === 0
                ?<EmptyListPlaceholder
                  listName='orders'
                  link={{
                    path: '/app/production-orders/create',
                    name: 'Create Order',
                  }}
                />
                :<>
                  <SearchInput resourceName='production-orders' />
                  <ResourcesTable
                    resourceName='order'
                    resourcePath='/production-orders'
                    resources={productionOrders}
                  />
                </>
            }
          </>
      }
    </section>
  );
}

export const ProductionOrderCreate = () => {
  const { isLoading, handleCreate } = useCreateProductionOrder();
  const {
    products,
    isLoading: isFetchingProducts
  } = useGetProducts();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    payload.productCount = parseInt(payload.productCount);
    handleCreate(payload);
  }

  return (
    <section>
      {
        isFetchingProducts
          ?<Loader />
          :<>
            <PageHeader value='New ProductionOrder' />
            <Form
              legend='ProductionOrder Details'
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
                label='count'
                type='number'
                name='productCount'
                disabled={isLoading}
              />
            </Form>
          </>
      }
    </section>
  );
}

export const ProductionOrderUpdate = () => {
  const {
    productionOrder,
    isLoading: isFetchingProductionOrder
  } = useGetProductionOrder();
  const {
    products,
    isLoading: isFetchingProducts
  } = useGetProducts();
  const { isLoading, handleUpdate } = useUpdateProductionOrder();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleUpdate(payload);
  }
    
  return (
    <section>
      {
        isFetchingProductionOrder || isFetchingProducts
          ?<Loader />
          :<>
            <PageHeader value='Update Order Status' />
            <Form
              legend='Order Details'
              onSubmit={handleSubmit}
              isLoading={isLoading}
            >
              <SelectInput
                label='Status'
                name='status'
                value={productionOrder.status}
                options={['Pending', 'Executing', 'Fulfilled', 'Cancelled']}
                disabled={isLoading}
              />
            </Form>
          </>
      }
    </section>
  );
}
