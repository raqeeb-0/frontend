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
  useDeleteProductionOrder,
  useUpdateProductionOrder,
  useCreateProductionOrder,
  useGetProductionOrder,
  useGetProductionOrders
} from '../hooks/productionOrders';
import {
  useGetProducts
} from '../hooks/products';
import { useForm }  from '../hooks/common';


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
  const { errors, register, handleSubmit } = useForm();

  return (
    <section>
      {
        isFetchingProducts
          ?<Loader />
          :<>
            <PageHeader value='New ProductionOrder' />
            <Form
              legend='ProductionOrder Details'
              onSubmit={(e) => handleSubmit(e, handleCreate)}
              isLoading={isLoading}
            >
              <FormField error={errors.productId}>
                <label htmlFor='product'>Product</label>
                <select
                  id='product'
                  disabled={isLoading}
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
                  {
                    products.map((option, index) => {
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
              <FormField error={errors.count}>
                <label htmlFor='count'>Count</label>
                <input
                  id='count'
                  type='number'
                  disabled={isLoading}
                  {
                    ...register(
                      'count',
                      {
                        required: true,
                        length: {
                          min: 1,
                          max: 10,
                        },
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
  const { errors, register, handleSubmit } = useForm();

  const statusOptions =
    ['Pending', 'Executing', 'Fulfilled', 'Cancelled'];
    
  return (
    <section>
      {
        isFetchingProductionOrder || isFetchingProducts
          ?<Loader />
          :<>
            <PageHeader value='Update Order Status' />
            <Form
              legend='Order Details'
              onSubmit={(e) => handleSubmit(e, handleUpdate)}
              isLoading={isLoading}
            >
              <FormField error={errors.status}>
                <label htmlFor='status'>Status</label>
                <select
                  id='status'
                  disabled={isLoading}
                  {
                    ...register(
                      'status',
                      {
                        required: true,
                      }
                    )
                  }
                >
                  <option value=''>
                    --Please choose a status--
                  </option>
                  {
                    statusOptions.map((option, index) => {
                      return (
                        <option
                          key={index}
                          value={option}
                        >
                          { option }
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
