import {
  Form,
  Header,
  InputTable,
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
  SUPPLIER_API,
  INVOICE_API
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


export const Invoices = () => {
  const { organizationId } = useParams();
  const {
    error,
    refresh,
    isLoading: isFetchingPurchases,
    data
  } = useGet(INVOICE_API(organizationId));

  const { handleDelete, isDeleting } = useDelete(
    INVOICE_API(organizationId),
    refresh
  );

  const invoices = useMemo(() => {
    return data ? data.map((invoice) => ({
      'id': invoice.id,
      'invoice number': invoice.invoiceNumber,
      'invoice total': invoice.totalAmount,
      'supplier': invoice.supplier.name,
      'effective date': invoice.effectiveDate,
      'created at': invoice.createdAt.split('T')[0],
    })) : [];
  }, [data]);

  if (isFetchingPurchases || isDeleting) {
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

  if (invoices.length === 0) {
    return (
      <section>
        <EmptyListPlaceholder
          listName='invoices'
          link={{
            path: 'create',
            name: 'Create Purchase',
          }}
        />
      </section>
    )
  }

  return (
    <section>
      <Header
        value='Invoices'
        isEmptyList={invoices.length === 0}
        link={{
          path: 'create',
          name: 'New Invoice',
        }}
      />
      <SearchInput resourceName='invoices' />
      <ResourcesTable
        resourceName='invoice'
        resourcePath='invoices'
        resources={invoices}
        handleDelete={handleDelete}
      />
    </section>
  );
}

export const InvoiceCreate = () => {
  const { organizationId } = useParams();
  const {
    error: materialsFetchError,
    refresh: refreshMaterials,
    isLoading: isFetchingMaterials,
    data: materials
  } = useGet(PURCHASE_ITEM_API(organizationId));
  const {
    error: suppliersFetchError,
    refresh: refreshSuppliers,
    isLoading: isFetchingSuppliers,
    data: suppliers
  } = useGet(SUPPLIER_API(organizationId));

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isCreating, handleCreate } = useCreate(
    INVOICE_API(organizationId),
    () => navigate(-1)
  );

  const refresh = () => {
    refreshMaterials();
    refreshSuppliers();
  }

  if (isFetchingMaterials || isFetchingSuppliers) {
    return <Loader />;
  }

  if (materialsFetchError || suppliersFetchError) {
    return (
      <ErrorContainer
        error={materialsFetchError || suppliersFetchError}
        refresh={refresh}
      />
    );
  }

  return (
    <section>
      <PageHeader value='New Invoice' />
      <Form
        legend='Invoice'
        onSubmit={(e) => handleSubmit(e, handleCreate)}
        isLoading={isCreating}
      >
        <FormField error={errors.invoiceNumber}>
          <label htmlFor='invoiceNumber'>Invoice Number</label>
          <input
            id='invoiceNumber'
            type='text'
            autoFocus='on'
            autoComplete='on'
            disabled={isCreating}
            {
              ...register(
                'invoiceNumber',
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
        <FormField error={errors.supplierId}>
          <label htmlFor='supplier'>Supplier</label>
          <select
            id='supplier'
            disabled={isCreating}
            {
              ...register(
                'supplierId',
                {
                  required: true,
                }
              )
            }
          >
            <option value=''>
              --Please choose a supplier--
            </option>
            <OptionsList options={suppliers} />
          </select>
        </FormField>
        <FormField error={errors.effectiveDate}>
          <label htmlFor='effectiveDate'>Effective Date</label>
          <input
            id='effectiveDate'
            type='date'
            disabled={isCreating}
            {
              ...register(
                'effectiveDate',
                {
                  required: true,
                }
              )
            }
          />
        </FormField>
        <div style={{gridColumn: 'span 2'}}>
          <InputTable
            tableContents={[
              {
                label: 'items',
                input: <select disabled={isCreating}>
                    <option value=''>
                      --Please choose a material--
                    </option>
                    <OptionsList options={materials} />
                  </select>,
              },
              {
                label: 'quantity',
                input: <input
                    type='number'
                    disabled={isCreating}
                  />,
              },
              {
                label: 'price',
                input: <input
                    type='number'
                    disabled={isCreating}
                  />,
              },
              {
                label: 'amount',
                input: <input
                    type='number'
                    disabled={isCreating}
                  />,
              }
            ]}
          />
        </div>
      </Form>
    </section>
  );
}

export const InvoiceUpdate = () => {
  const { organizationId, invoiceId } = useParams();
  const {
    error: materialsFetchError,
    refresh: refreshMaterials,
    isLoading: isFetchingMaterials,
    data: materials
  } = useGet(PURCHASE_ITEM_API(organizationId));
  const {
    error: suppliersFetchError,
    refresh: refreshSuppliers,
    isLoading: isFetchingSuppliers,
    data: suppliers
  } = useGet(SUPPLIER_API(organizationId));

  const {
    error: invoiceFetchError,
    refresh: refreshPurchase,
    isLoading: isFetchingPurchase,
    data: invoice
  } = useGet(`${INVOICE_API(organizationId)}/${invoiceId}`)

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isUpdating, handleUpdate } = useUpdate(
    `${INVOICE_API(organizationId)}/${invoiceId}`,
    () => navigate(-1)
  );

  const refresh = () => {
    refreshMaterials();
    refreshSuppliers();
    refreshPurchase();
  }

  if (isFetchingMaterials || isFetchingSuppliers || isFetchingPurchase) {
    return <Loader />;
  }

  const error = materialsFetchError || suppliersFetchError || invoiceFetchError;
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
      <PageHeader value='Edit Material Purchase' />
      <Form
        legend='Purchase Details'
        onSubmit={(e) => handleSubmit(e, handleUpdate)}
        isLoading={isUpdating}
      >
        <FormField error={errors.materialId}>
          <label htmlFor='material'>Material</label>
          <select
            id='material'
            disabled={isUpdating}
            defaultValue={invoice.material.id}
            {
              ...register(
                'materialId',
                {
                  required: true,
                }
              )
            }
          >
            <option value=''>
              --Please choose a material--
            </option>
            <OptionsList options={materials} />
          </select>
        </FormField>
        <FormField error={errors.quantity}>
          <label htmlFor='quantity'>Quantity</label>
          <input
            id='quantity'
            type='number'
            disabled={isUpdating}
            defaultValue={invoice.quantity}
            {
              ...register(
                'quantity',
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
        <FormField error={errors.price}>
          <label htmlFor='price'>Price/Unit</label>
          <input
            id='price'
            type='number'
            disabled={isUpdating}
            defaultValue={invoice.price}
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
        <FormField error={errors.supplierId}>
          <label htmlFor='supplier'>Supplier</label>
          <select
            id='supplier'
            disabled={isUpdating}
            defaultValue={invoice.supplier.id}
            {
              ...register(
                'supplierId',
                {
                  required: true,
                }
              )
            }
          >
            <option value=''>
              --Please choose a supplier--
            </option>
            <OptionsList options={suppliers} />
          </select>
        </FormField>
      </Form>
    </section>
  );
}
