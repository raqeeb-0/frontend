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
  PURCHASE_ITEM_API,
  PURCHASE_ITEM_CATEGORY_API
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


export const PurchaseItems = () => {
  const { organizationId } = useParams();
  const {
    error,
    refresh,
    isLoading: isFetchingPurchaseItems,
    data
  } = useGet(`${PURCHASE_ITEM_API(organizationId)}`);

  const { handleDelete, isDeleting } = useDelete(
    PURCHASE_ITEM_API(organizationId),
    refresh
  );

  const purchaseItems = useMemo(() => {
    return data ? data.map((purchaseItem) => ({
      'id': purchaseItem.id,
      'name': purchaseItem.name,
      'type': purchaseItem.type,
      'category': purchaseItem.category.name,
      'create at': purchaseItem.createdAt.split('T')[0],
    })) : [];
  }, [data]);

  if (isFetchingPurchaseItems || isDeleting) {
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
          listName='Purchase Items'
          link={{
            path: 'create',
            name: 'Create Item',
          }}
        />
      </section>
    )
  }

  return (
    <section>
      <Header
        value='Purchase Items'
        isEmptyList={purchaseItems.length === 0}
        link={{
          path: 'create',
          name: 'New Item',
        }}
      />
      <SearchInput resourceName='items' />
      <ResourcesTable
        resourceName='item'
        resourcePath='purchase-items/list'
        resources={purchaseItems}
        handleDelete={handleDelete}
      />
    </section>
  );
}

export const PurchaseItemCreate = () => {
  const { organizationId } = useParams();
  const {
    error,
    refresh,
    isLoading: isFetchingCategories,
    data: categories
  } = useGet(PURCHASE_ITEM_CATEGORY_API(organizationId));

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isCreating, handleCreate } = useCreate(
    PURCHASE_ITEM_API(organizationId),
    () => navigate(-1)
  );

  if (isFetchingCategories) {
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
      <PageHeader value='New Purchase Item' />
      <Form
        legend='Purchase Item Details'
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
        <FormField error={errors.type}>
          <label htmlFor='type'>Type</label>
          <select
            id='type'
            disabled={isCreating}
            {
              ...register(
                'type',
                {
                  required: true,
                }
              )
            }
          >
            <option value=''>
              --Please choose a type--
            </option>
            <OptionsList options={['storable', 'consumable', 'service']} />
          </select>
        </FormField>
        <FormField error={errors.categoryId}>
          <label htmlFor='categoryId'>Category</label>
          <select
            id='categoryId'
            disabled={isCreating}
            {
              ...register(
                'categoryId',
                {
                  required: true,
                }
              )
            }
          >
            <option value=''>
              --Please choose a category--
            </option>
            <OptionsList options={categories} />
          </select>
        </FormField>
      </Form>
    </section>
  );
}

export const PurchaseItemUpdate = () => {
  const { organizationId, purchaseItemId } = useParams();
  const {
    error: categoriesFetchError,
    refresh: refreshCategories,
    isLoading: isFetchingCategories,
    data: categories
  } = useGet(PURCHASE_ITEM_CATEGORY_API(organizationId));

  const {
    error: purchaseItemFetchError,
    refresh: refreshPurchaseItem,
    isLoading: isFetchingPurchaseItem,
    data: purchaseItem
  } = useGet(`${PURCHASE_ITEM_API(organizationId)}/${purchaseItemId}`);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isUpdating, handleUpdate } = useUpdate(
    `${PURCHASE_ITEM_API(organizationId)}/${purchaseItemId}`,
    () => navigate(-1)
  );

  const refresh = () => {
    refreshCategories();
    refreshPurchaseItem();
  }

  if (isFetchingCategories || isFetchingPurchaseItem) {
    return <Loader />;
  }

  if (categoriesFetchError || purchaseItemFetchError) {
    return (
      <ErrorContainer
        error={categoriesFetchError || purchaseItemFetchError}
        refresh={refresh}
      />
    );
  }
    
  return (
    <section>
      <PageHeader value='Edit Purchase Item' />
      <Form
        legend='Purchase Item Details'
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
            defaultValue={purchaseItem.name}
            disabled={isUpdating}
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
        <FormField error={errors.categoryId}>
          <label htmlFor='categoryId'>Category</label>
          <select
            id='categoryId'
            disabled={isUpdating}
            defaultValue={purchaseItem.category.id}
            {
              ...register(
                'categoryId',
                {
                  required: true,
                }
              )
            }
          >
            <option value=''>
              --Please choose a category--
            </option>
            <OptionsList options={categories} />
          </select>
        </FormField>
      </Form>
    </section>
  );
}
