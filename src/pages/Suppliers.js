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
  useDeleteSupplier,
  useUpdateSupplier,
  useCreateSupplier,
  useGetSupplier,
  useGetSuppliers
} from '../hooks/suppliers';
import { useForm }  from '../hooks/common';


export const Suppliers = () => {
  const {
    suppliers,
    refreshSuppliers,
    isLoading: isFetchingSuppliers
  } = useGetSuppliers();
  const {
    handleDelete,
    isLoading: isDeletingSupplier
  } = useDeleteSupplier();

  const deleteHandler = (e) => {
    handleDelete(
      e.currentTarget.getAttribute('data-id'),
      refreshSuppliers
    );
  }

  const isLoading = isFetchingSuppliers || isDeletingSupplier;

  return (
    <section>
      {
        isLoading
          ?<Loader />
          :<>
            <Header
              value='Suppliers'
              isEmptyList={suppliers.length === 0}
              link={{
                path: '/app/suppliers/create',
                name: 'New Supplier',
              }}
            />
            {
              suppliers.length === 0
                ?<EmptyListPlaceholder
                  listName='suppliers'
                  link={{
                    path: '/app/suppliers/create',
                    name: 'Create Supplier',
                  }}
                />
                :<>
                  <SearchInput resourceName='suppliers' />
                  <ResourcesTable
                    resourceName='supplier'
                    resourcePath='/suppliers'
                    resources={suppliers}
                    handleDelete={deleteHandler}
                  />
                </>
            }
          </>
      }
    </section>
  );
}

export const SupplierCreate = () => {
  const { isLoading, handleCreate } = useCreateSupplier();
  const { errors, register, handleSubmit } = useForm();

  return (
    <section>
      <PageHeader value='New Supplier' />
      <Form
        legend='Supplier Details'
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
        <FormField error={errors.phone}>
          <label htmlFor='phone'>Phone number</label>
          <input
            id='phone'
            type='tel'
            disabled={isLoading}
            {
              ...register(
                'phone',
                {
                  required: true,
                  phoneNumber: true,
                }
              )
            }
          />
        </FormField>
      </Form>
    </section>
  );
}

export const SupplierUpdate = () => {
  const {
    supplier,
    isLoading: isFetchingSupplier
  } = useGetSupplier();
  const { isLoading, handleUpdate } = useUpdateSupplier();
  const { errors, register, handleSubmit } = useForm();
    
  return (
    <section>
      {
        isFetchingSupplier
          ?<Loader />
          :<>
            <PageHeader value='Update Supplier' />
            <Form
              legend='Supplier Details'
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
                  defaultValue={supplier.name}
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
              <FormField error={errors.phone}>
                <label htmlFor='phone'>Phone number</label>
                <input
                  id='phone'
                  type='tel'
                  disabled={isLoading}
                  defaultValue={supplier.phone}
                  {
                    ...register(
                      'phone',
                      {
                        required: true,
                        phoneNumber: true,
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
