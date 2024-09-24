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
  MATERIAL_API,
  MATERIAL_CATEGORY_API
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


export const Materials = () => {
  const {
    error,
    refresh,
    isLoading: isFetchingMaterials,
    data
  } = useGet(MATERIAL_API);

  const { handleDelete, isDeleting } = useDelete(
    MATERIAL_API,
    refresh
  );

  const materials = useMemo(() => {
    return data ? data.map((material) => ({
      'id': material.id,
      'name': material.name,
      'price/unit': material.price,
      'quantity': material.quantity,
      'category': material.category.name,
      'create at': material.createdAt.split('T')[0],
    })) : [];
  }, [data]);

  if (isFetchingMaterials || isDeleting) {
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

  if (materials.length === 0) {
    return (
      <section>
        <EmptyListPlaceholder
          listName='materials'
          link={{
            path: '/app/materials/items/create',
            name: 'Create Material',
          }}
        />
      </section>
    )
  }

  return (
    <section>
      <Header
        value='Materials'
        isEmptyList={materials.length === 0}
        link={{
          path: '/app/materials/items/create',
          name: 'New Material',
        }}
      />
      <SearchInput resourceName='materials' />
      <ResourcesTable
        resourceName='material'
        resourcePath='/materials/items'
        resources={materials}
        handleDelete={handleDelete}
      />
    </section>
  );
}

export const MaterialCreate = () => {
  const {
    error,
    refresh,
    isLoading: isFetchingCategories,
    data: categories
  } = useGet(MATERIAL_CATEGORY_API);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isCreating, handleCreate } = useCreate(
    MATERIAL_API,
    () => navigate('/app/materials/items')
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
      <PageHeader value='New Material' />
      <Form
        legend='Material Details'
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

export const MaterialUpdate = () => {
  const {
    error: categoriesFetchError,
    refresh: refreshCategories,
    isLoading: isFetchingCategories,
    data: categories
  } = useGet(MATERIAL_CATEGORY_API);

  const { materialId } = useParams();
  const {
    error: materialFetchError,
    refresh: refreshMaterial,
    isLoading: isFetchingMaterial,
    data: material
  } = useGet(`${MATERIAL_API}/${materialId}`);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isUpdating, handleUpdate } = useUpdate(
    `${MATERIAL_API}/${materialId}`,
    () => navigate('/app/materials/items')
  );

  const refresh = () => {
    refreshCategories();
    refreshMaterial();
  }

  if (isFetchingCategories || isFetchingMaterial) {
    return <Loader />;
  }

  if (categoriesFetchError || materialFetchError) {
    return (
      <ErrorContainer
        error={categoriesFetchError || materialFetchError}
        refresh={refresh}
      />
    );
  }
    
  return (
    <section>
      <PageHeader value='Edit Material' />
      <Form
        legend='Material Details'
        onSubmit={(e) => handleSubmit(e, handleUpdate)}
        isLoading={isUpdating}
      >
        <FormField error={errors.name}>
          <label htmlFor='materialName'>Name</label>
          <input
            id='materialName'
            type='text'
            autoFocus='on'
            autoComplete='on'
            defaultValue={material.name}
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
            defaultValue={material.category.id}
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
