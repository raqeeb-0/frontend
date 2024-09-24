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
import { MATERIAL_CATEGORY_API } from '../lib/endpoints';
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


export const MaterialsCategories = () => {
  const {
    error,
    refresh,
    isLoading: isFetchingCategories,
    data
  } = useGet(MATERIAL_CATEGORY_API);

  const { handleDelete, isDeleting } = useDelete(
    MATERIAL_CATEGORY_API,
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
          listName='material categories'
          link={{
            path: '/app/materials/categories/create',
            name: 'Create Category',
          }}
        />
      </section>
    );
  }

  return (
    <section>
      <Header
        value='Materials Categories'
        isEmptyList={categories.length === 0}
        link={{
          path: '/app/materials/categories/create',
          name: 'New Category',
        }}
      />
      <SearchInput resourceName='categories' />
      <ResourcesTable
        resourceName='category'
        resourcePath='/materials/categories'
        resources={categories}
        handleDelete={handleDelete}
      />
    </section>
  );
}


export const MaterialsCategoryCreate = () => {
  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { handleCreate, isCreating } = useCreate(
    MATERIAL_CATEGORY_API,
    () => navigate('/app/materials/categories')
  );

  return (
    <section>
      <PageHeader value='New Material Category' />
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


export const MaterialsCategoryUpdate = () => {
  const { categoryId } = useParams();
  const {
    error,
    refresh,
    isLoading: isFetchingCategory,
    data: category
  } = useGet(`${MATERIAL_CATEGORY_API}/${categoryId}`);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { handleUpdate, isUpdating } = useUpdate(
    `${MATERIAL_CATEGORY_API}/${categoryId}`,
    () => navigate('/app/materials/categories')
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
      <PageHeader value='Edit Materials Category' />
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
