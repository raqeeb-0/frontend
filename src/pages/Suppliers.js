import {
  Form,
  Header,
  FormField,
  SelectInput,
  SearchInput,
  ResourcesTable,
  EmptyListPlaceholder
} from '../components/app';
import {
  Loader,
  PageHeader
} from '../components/common';
import {
  useDeleteSupplier,
  useUpdateSupplier,
  useCreateSupplier,
  useGetSupplier,
  useGetSuppliers
} from '../hooks/suppliers';


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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleCreate(payload);
  }

  return (
    <section>
      <PageHeader value='New Supplier' />
      <Form
        legend='Supplier Details'
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <FormField
          label='Name'
          type='text'
          name='name'
          disabled={isLoading}
        />
        <FormField
          label='Phone Number'
          type='text'
          name='phone'
          disabled={isLoading}
        />
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleUpdate(payload);
  }
    
  return (
    <section>
      {
        isFetchingSupplier
          ?<Loader />
          :<>
            <PageHeader value='Update Supplier' />
            <Form
              legend='Supplier Details'
              onSubmit={handleSubmit}
              isLoading={isLoading}
            >
              <FormField
                label='Name'
                type='text'
                name='name'
                value={supplier.name}
                disabled={isLoading}
              />
              <FormField
                label='Phone Number'
                type='text'
                name='phone'
                value={supplier.phone}
                disabled={isLoading}
              />
            </Form>
          </>
      }
    </section>
  );
}
