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
  useDeleteMaterial,
  useUpdateMaterial,
  useCreateMaterial,
  useGetMaterial,
  useGetMaterials
} from '../hooks/materials';
import {
  useGetMaterialsCategories
} from '../hooks/materialsCategories';
import { useForm } from '../hooks/common';


export const Materials = () => {
  const {
    materials,
    refreshMaterials,
    isLoading: isFetchingMaterials
  } = useGetMaterials();
  const {
    handleDelete,
    isLoading: isDeletingMaterial
  } = useDeleteMaterial();

  const deleteHandler = (e) => {
    handleDelete(
      e.currentTarget.getAttribute('data-id'),
      refreshMaterials
    );
  }

  const isLoading = isFetchingMaterials || isDeletingMaterial;

  return (
    <section>
      {
        isLoading
          ?<Loader />
          :<>
            <Header
              value='Materials'
              isEmptyList={materials.length === 0}
              link={{
                path: '/app/materials/items/create',
                name: 'New Material',
              }}
            />
            {
              materials.length === 0
                ?<EmptyListPlaceholder
                  listName='materials'
                  link={{
                    path: '/app/materials/items/create',
                    name: 'Create Material',
                  }}
                />
                :<>
                  <SearchInput resourceName='materials' />
                  <ResourcesTable
                    resourceName='material'
                    resourcePath='/materials/items'
                    resources={materials}
                    handleDelete={deleteHandler}
                  />
                </>
            }
          </>
      }
    </section>
  );
}

export const MaterialCreate = () => {
  const { isLoading, handleCreate } = useCreateMaterial();
  const {
    categories,
    isLoading: isFetchingCategories
  } = useGetMaterialsCategories();
  const { errors, register, handleSubmit } = useForm();

  return (
    <section>
      {
        isFetchingCategories
          ?<Loader />
          :<>
            <PageHeader value='New Material' />
            <Form
              legend='Material Details'
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
              <FormField error={errors.price}>
                <label htmlFor='price'>Price/Unit</label>
                <input
                  id='price'
                  type='number'
                  disabled={isLoading}
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
                  disabled={isLoading}
                  {
                    ...register(
                      'categoryId',
                      {
                        required: true,
                      }
                    )
                  }
                >
                  <option value=''>--Please choose an option--</option>
                  {
                    categories.map((option, index) => {
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
            </Form>
          </>
      }
    </section>
  );
}

export const MaterialUpdate = () => {
  const {
    material,
    isLoading: isFetchingMaterial
  } = useGetMaterial();
  const {
    categories,
    isLoading: isFetchingCategories
  } = useGetMaterialsCategories();
  const { isLoading, handleUpdate } = useUpdateMaterial();
  const { errors, register, handleSubmit } = useForm();
    
  return (
    <section>
      {
        isFetchingMaterial || isFetchingCategories
          ?<Loader />
          :<>
            <PageHeader value='Update Material' />
            <Form
              legend='Material Details'
              onSubmit={(e) => handleSubmit(e, handleUpdate)}
              isLoading={isLoading}
            >
              <FormField error={errors.name}>
                <label htmlFor='materialName'>Name</label>
                <input
                  id='materialName'
                  type='text'
                  autoFocus='on'
                  autoComplete='on'
                  defaultValue={material.name}
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
              <FormField error={errors.categoryId}>
                <label htmlFor='categoryId'>Category</label>
                <select
                  id='categoryId'
                  disabled={isLoading}
                  defaultValue={material.categoryId}
                  {
                    ...register(
                      'categoryId',
                      {
                        required: true,
                      }
                    )
                  }
                >
                  <option value=''>--Please choose an option--</option>
                  {
                    categories.map((option, index) => {
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
            </Form>
          </>
      }
    </section>
  );
}
