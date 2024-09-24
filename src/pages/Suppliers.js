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
import { useForm }  from '../hooks';
import { SUPPLIER_API } from '../lib/endpoints';
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


export const Suppliers = () => {
  const {
    error,
    refresh,
    isLoading: isFetchingSuppliers,
    data
  } = useGet(SUPPLIER_API);

  const { handleDelete, isDeleting } = useDelete(
    SUPPLIER_API,
    refresh
  );

  const suppliers = useMemo(() => {
    return data ? data.map((supplier) => ({
      'id': supplier.id,
      'name': supplier.name,
      'account payable': supplier.accountPayable,
      'joined at': supplier.createdAt.split('T')[0],
    })) : [];
  }, [data]);

  if (isFetchingSuppliers || isDeleting) {
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

  if (suppliers.length === 0) {
    return (
      <section>
        <EmptyListPlaceholder
          listName='suppliers'
          link={{
            path: '/app/suppliers/create',
            name: 'Create Supplier',
          }}
        />
      </section>
    )
  }

  return (
    <section>
      <Header
        value='Suppliers'
        isEmptyList={suppliers.length === 0}
        link={{
          path: '/app/suppliers/create',
          name: 'New Supplier',
        }}
      />
      <SearchInput resourceName='suppliers' />
      <ResourcesTable
        resourceName='supplier'
        resourcePath='/suppliers'
        resources={suppliers}
        handleDelete={handleDelete}
      />
    </section>
  );
}

export const SupplierCreate = () => {
  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isCreating, handleCreate } = useCreate(
    SUPPLIER_API,
    () => navigate('/app/suppliers')
  );

  return (
    <section>
      <PageHeader value='New Supplier' />
      <Form
        legend='Supplier Details'
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
        <FormField error={errors.phone}>
          <label htmlFor='phone'>Phone number</label>
          <input
            id='phone'
            type='tel'
            disabled={isCreating}
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
  const { supplierId } = useParams();
  const {
    error,
    refresh,
    isLoading: isFetchingSupplier,
    data: supplier
  } = useGet(`${SUPPLIER_API}/${supplierId}`);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isUpdating, handleUpdate } = useUpdate(
    `${SUPPLIER_API}/${supplierId}`,
    () => navigate('/app/suppliers')
  );

  if (isFetchingSupplier) {
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
      <PageHeader value='Edit Supplier' />
      <Form
        legend='Supplier Details'
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
            disabled={isUpdating}
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
    </section>
  );
}
