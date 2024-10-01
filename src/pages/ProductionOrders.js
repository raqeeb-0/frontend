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
import { useForm }  from '../hooks';
import {
  PRODUCT_API,
  PRODUCTION_ORDER_API
} from '../lib/endpoints';
import {
  useGet,
  useCreate,
  useUpdate
} from '../hooks/useAPI';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import { useMemo } from 'react';


export const ProductionOrders = () => {
  const { organizationId } = useParams();
  const {
    error,
    refresh,
    isLoading: isFetchingProductionOrders,
    data
  } = useGet(PRODUCTION_ORDER_API(organizationId));

  const productionOrders = useMemo(() => {
    return data ? data.map((productionOrder) => ({
      'id': productionOrder.id,
      'ID': productionOrder.id,
      'product': productionOrder.product.name,
      'count': productionOrder.count,
      'status': productionOrder.status,
      'create at': productionOrder.createdAt.split('T')[0],
    })): [];
  }, [data]);

  if (isFetchingProductionOrders) {
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

  if (productionOrders.length === 0) {
    return (
      <section>
        <EmptyListPlaceholder
          listName='orders'
          link={{
            path: 'create',
            name: 'Create Order',
          }}
        />
      </section>
    )
  }

  return (
    <section>
      <Header
        value='Production Orders'
        isEmptyList={productionOrders.length === 0}
        link={{
          path: 'create',
          name: 'New Order',
        }}
      />
      <SearchInput resourceName='production-orders' />
      <ResourcesTable
        resourceName='order'
        resourcePath='production-orders'
        resources={productionOrders}
      />
    </section>
  );
}

export const ProductionOrderCreate = () => {
  const { organizationId } = useParams();
  const {
    error,
    refresh,
    isLoading: isFetchingProducts,
    data: products
  } = useGet(PRODUCT_API(organizationId));

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isCreating, handleCreate } = useCreate(
    PRODUCTION_ORDER_API(organizationId),
    () => navigate(-1)
  );

  if (isFetchingProducts) {
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
      <PageHeader value='New ProductionOrder' />
      <Form
        legend='ProductionOrder Details'
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
        <FormField error={errors.count}>
          <label htmlFor='count'>Count</label>
          <input
            id='count'
            type='number'
            disabled={isCreating}
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
    </section>
  );
}

export const ProductionOrderUpdate = () => {
  // const {
  //   error: productsFetchError,
  //   refresh: refreshProducts,
  //   isLoading: isFetchingProducts,
  //   data: products
  // } = useGet(PRODUCT_API);

  const { organizationId, productionOrderId } = useParams();
  // const {
  //   error: productionOrderFetchError,
  //   refresh: refreshProductionOrder,
  //   isLoading: isFetchingProductionOrder,
  //   data: productionOrder
  // } = useGet(`${PRODUCTION_ORDER_API}/${productionOrderId}`);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isUpdating, handleUpdate } = useUpdate(
    `${PRODUCTION_ORDER_API(organizationId)}/${productionOrderId}`,
    () => navigate(-1)
  );

  // const refresh = () => {
  //   refreshProducts();
  //   refreshProductionOrder();
  // }

  // if (isFetchingProducts || isFetchingProductionOrder) {
  //   return <Loader />;
  // }

  // if (productsFetchError || productionOrderFetchError) {
  //   return (
  //     <ErrorContainer
  //       error={productsFetchError || productionOrderFetchError}
  //       refresh={refresh}
  //     />
  //   );
  // }

  const statusOptions =
    ['pending', 'executing', 'fulfilled', 'cancelled'];
    
  return (
    <section>
      <PageHeader value='Edit Order Status' />
      <Form
        legend='Order Details'
        onSubmit={(e) => handleSubmit(e, handleUpdate)}
        isLoading={isUpdating}
      >
        <FormField error={errors.status}>
          <label htmlFor='status'>Status</label>
          <select
            id='status'
            disabled={isUpdating}
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
            <OptionsList options={statusOptions} />
          </select>
        </FormField>
      </Form>
    </section>
  );
}
