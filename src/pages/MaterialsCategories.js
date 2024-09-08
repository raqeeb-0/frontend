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
import { useForm } from '../hooks/common';
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


const materialCategoriesEndpoint = 'org/m/categories';

export const MaterialsCategories = () => {
  const {
    refresh,
    isLoading,
    data: categories
  } = useGet(materialCategoriesEndpoint);

  const { handleDelete, isDeleting } = useDelete(
    materialCategoriesEndpoint,
    refresh
  );

  if (isLoading || isDeleting) {
    return (
      <section>
        <Loader />
      </section>
    );
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
    materialCategoriesEndpoint,
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
  const { errors, register, handleSubmit } = useForm();

  const { categoryId } = useParams();
  const { data: category, isLoading } = useGet(
    `${materialCategoriesEndpoint}/${categoryId}`
  );

  const navigate = useNavigate();
  const { handleUpdate, isUpdating } = useUpdate(
    `${materialCategoriesEndpoint}/${categoryId}`,
    () => navigate('/app/materials/categories')
  );

  if (isLoading) {
    return (
      <section>
        <Loader />
      </section>
    );
  }
    
  return (
    <section>
      <PageHeader value='Update Materials Category' />
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
