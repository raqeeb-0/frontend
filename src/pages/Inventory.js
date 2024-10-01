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
  PRODUCT_API,
  PURCHASE_ITEM_API
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


export const MaterialStock = () => {
  const { organizationId } = useParams();
  const {
    error,
    refresh,
    isLoading: isFetchingPurchaseItems,
    data
  } = useGet(`${PURCHASE_ITEM_API(organizationId)}?type=storable`);

  const purchaseItems = useMemo(() => {
    return data ? data.map((purchaseItem) => ({
      'id': purchaseItem.id,
      'name': purchaseItem.name,
      'quantity': purchaseItem.inventory.quantity,
      'last price/unit': purchaseItem.price,
    })) : [];
  }, [data]);

  if (isFetchingPurchaseItems) {
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

  if (purchaseItems.length === 0) {
    return (
      <section>
        <EmptyListPlaceholder
          listName='Materials'
          link={{
            path: '../purchase-items/list/create',
            name: 'Create Material',
          }}
        />
      </section>
    )
  }

  return (
    <section>
      <Header
        value='Material Stock'
        isEmptyList={purchaseItems.length === 0}
        link={{
          path: '../purchase-items/list/create',
          name: 'New Material',
        }}
      />
      <SearchInput resourceName='materials' />
      <ResourcesTable
        resourceName='material'
        resourcePath='../purchase-items/list'
        resources={purchaseItems}
      />
    </section>
  );
}

export const ProductInventory = () => {
  const { organizationId } = useParams();
  const {
    error,
    refresh,
    isLoading: isFetchingProducts,
    data
  } = useGet(PRODUCT_API(organizationId));

  const products = useMemo(() => {
    return data ? data.map((product) => ({
      'id': product.id,
      'name': product.name,
      'quantity': product.quantity,
      'price/unit': product.price,
    })) : [];
  }, [data]);

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

  if (products.length === 0) {
    return (
      <section>
        <EmptyListPlaceholder
          listName='products'
          link={{
            path: '../products/list/create',
            name: 'Create Product',
          }}
        />
      </section>
    );
  }

  return (
    <section>
      <Header
        value='Products'
        isEmptyList={products.length === 0}
        link={{
          path: '../products/list/create',
          name: 'New Product',
        }}
      />
      <SearchInput resourceName='products' />
      <ResourcesTable
        resourceName='product'
        resourcePath='../products/list'
        resources={products}
      />
    </section>
  );
}
