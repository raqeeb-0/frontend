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
import { useForm } from '../hooks';
import { PURCHASE_ITEM_CATEGORY_API } from '../lib/endpoints';
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


export const PurchaseItemsCategories = () => {
  const { organizationId } = useParams();
  const {
    error,
    refresh,
    isLoading: isFetchingCategories,
    data
  } = useGet(PURCHASE_ITEM_CATEGORY_API(organizationId));

  const { handleDelete, isDeleting } = useDelete(
    PURCHASE_ITEM_CATEGORY_API(organizationId),
    refresh
  );

  const categories = useMemo(() => {
    return data ? data.map((category) => ({
      'id': category.id,
      'name': category.name,
      'created at': category.createdAt.split('T')[0],
    })) : [];
  }, [data]);

  if (isFetchingCategories || isDeleting) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorContainer
        error={error}
        refresh={refresh}
      />
    )
  }

  if (categories.length === 0) {
    return (
      <section>
        <EmptyListPlaceholder
          listName='purchase item categories'
          link={{
            path: 'create',
            name: 'Create Category',
          }}
        />
      </section>
    );
  }

  return (
    <section>
      <Header
        value='Purchase Item Categories'
        isEmptyList={categories.length === 0}
        link={{
          path: 'create',
          name: 'New Category',
        }}
      />
      <SearchInput resourceName='categories' />
      <ResourcesTable
        resourceName='category'
        resourcePath='purchase-items/categories'
        resources={categories}
        handleDelete={handleDelete}
      />
    </section>
  );
}


export const PurchaseItemsCategoryCreate = () => {
  const { errors, register, handleSubmit } = useForm();

  const { organizationId } = useParams();
  const navigate = useNavigate();
  const { handleCreate, isCreating } = useCreate(
    PURCHASE_ITEM_CATEGORY_API(organizationId),
    () => navigate(-1)
  );

  return (
    <section>
      <PageHeader value='New Purchase Item Category' />
      <Form
        legend='Category Details'
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
      </Form>
    </section>
  );
}


export const PurchaseItemsCategoryUpdate = () => {
  const { organizationId, categoryId } = useParams();
  const {
    error,
    refresh,
    isLoading: isFetchingCategory,
    data: category
  } = useGet(`${PURCHASE_ITEM_CATEGORY_API(organizationId)}/${categoryId}`);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { handleUpdate, isUpdating } = useUpdate(
    `${PURCHASE_ITEM_CATEGORY_API(organizationId)}/${categoryId}`,
    () => navigate(-1)
  );

  if (isFetchingCategory) {
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
      <PageHeader value='Edit Purchase Item Category' />
      <Form
        legend='Category Details'
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
            defaultValue={category.name}
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
      </Form>
    </section>
  );
}
