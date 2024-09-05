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
  useDeleteMaterialsCategory,
  useUpdateMaterialsCategory,
  useCreateMaterialsCategory,
  useGetMaterialsCategory,
  useGetMaterialsCategories
} from '../hooks/materialsCategories';
import { useForm } from '../hooks/common';
import { DataRepository } from '../repositories/dataRepository';
import { useState, useEffect } from 'react';


const materialCategoriesRepo = new DataRepository('org/m/categories');

export const MaterialsCategories = () => {
  /*const {
    categories,
    refreshCategories,
    isLoading: isFetchingCategories
  } = useGetMaterialsCategories();
  const {
    handleDelete,
    isLoading: isDeletingCategory
  } = useDeleteMaterialsCategory();

  const deleteHandler = (e) => {
    handleDelete(
      e.currentTarget.getAttribute('data-id'),
      refreshCategories
    );
  }

  const isLoading = isFetchingCategories || isDeletingCategory;*/
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchCategories = async () => {
      const response = await materialCategoriesRepo.getAllItems();
      console.log(response.data);
      setCategories(response.data);
      setIsLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <section>
      {
        isLoading
          ? <Loader />
          : <>
              <Header
                value='Materials Categories'
                isEmptyList={categories.length === 0}
                link={{
                  path: '/app/materials/categories/create',
                  name: 'New Category',
                }}
              />
              {
                categories.length === 0
                  ? <EmptyListPlaceholder
                      listName='material categories'
                      link={{
                        path: '/app/materials/categories/create',
                        name: 'Create Category',
                      }}
                    />
                  : <>
                      <SearchInput resourceName='categories' />
                      <ResourcesTable
                        resourceName='category'
                        resourcePath='/materials/categories'
                        resources={categories}
                      />
                    </>
              }
            </>
      }
    </section>
  );
}


export const MaterialsCategoryCreate = () => {
  const { isLoading, handleCreate } = useCreateMaterialsCategory();
  const { errors, register, handleSubmit } = useForm();

  return (
    <section>
      <PageHeader value='New Material Category' />
      <Form
        legend='Category Details'
        onSubmit={(e) => handleSubmit(e, handleCreate)}
        isLoading={isLoading}
      >
        <FormField error={errors.name}>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            autoFocus='on'
            autoComplete='on'
            disabled={isLoading}
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
  const { isLoading, handleUpdate } = useUpdateMaterialsCategory();
  const {
    category,
    isLoading: isFetchingCategory
  } = useGetMaterialsCategory();
  const { errors, register, handleSubmit } = useForm();
    
  return (
    <section>
      {
        isFetchingCategory
          ?<Loader />
          :<>
            <PageHeader value='Update Materials Category' />
            <Form
              legend='Category Details'
              onSubmit={(e) => handleSubmit(e, handleUpdate)}
              isLoading={isLoading}
            >
              <FormField error={errors.name}>
                <label htmlFor='name'>Name</label>
                <input
                  id='name'
                  type='text'
                  autoFocus='on'
                  autoComplete='on'
                  disabled={isLoading}
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
          </>
      }
    </section>
  );
}
