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
  SUPPLIER_API,
  MATERIAL_PURCHASE_API
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
import { useState, useMemo } from 'react';


export const MaterialPurchases = () => {
  const {
    error,
    refresh,
    isLoading: isFetchingPurchases,
    data
  } = useGet(MATERIAL_PURCHASE_API);

  const { handleDelete, isDeleting } = useDelete(
    MATERIAL_PURCHASE_API,
    refresh
  );

  const purchases = useMemo(() => {
    return data ? data.map((purchase) => ({
      'id': purchase.id,
      'ID': purchase.id,
      'material': purchase.material.name,
      'quantity': purchase.quantity,
      'price': purchase.price,
      'created at': purchase.createdAt.split('T')[0],
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

  if (purchases.length === 0) {
    return (
      <section>
        <EmptyListPlaceholder
          listName='purchases'
          link={{
            path: '/app/material-purchases/create',
            name: 'Create Purchase',
          }}
        />
      </section>
    )
  }

  return (
    <section>
      <Header
        value='Material Purchases'
        isEmptyList={purchases.length === 0}
        link={{
          path: '/app/material-purchases/create',
          name: 'New Purchase',
        }}
      />
      <SearchInput resourceName='material purchases' />
      <ResourcesTable
        resourceName='purchase'
        resourcePath='/material-purchases'
        resources={purchases}
        handleDelete={handleDelete}
      />
    </section>
  );
}

export const MaterialPurchaseCreate = () => {
  const {
    error: materialsFetchError,
    refresh: refreshMaterials,
    isLoading: isFetchingMaterials,
    data: materials
  } = useGet(MATERIAL_API);
  const {
    error: suppliersFetchError,
    refresh: refreshSuppliers,
    isLoading: isFetchingSuppliers,
    data: suppliers
  } = useGet(SUPPLIER_API);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isCreating, handleCreate } = useCreate(
    MATERIAL_PURCHASE_API,
    () => navigate('/app/material-purchases')
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
      <Header
        value='New Material Purchase'
        link={{
          path: '/app/expense-purchases/create',
          name: 'Expense Purchase',
        }}
      />
      <Form
        legend='Purchase Details'
        onSubmit={(e) => handleSubmit(e, handleCreate)}
        isLoading={isCreating}
      >
        <FormField error={errors.materialId}>
          <label htmlFor='material'>Material</label>
          <select
            id='material'
            disabled={isCreating}
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
            disabled={isCreating}
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
      </Form>
    </section>
  );
}

export const MaterialPurchaseUpdate = () => {
  const {
    error: materialsFetchError,
    refresh: refreshMaterials,
    isLoading: isFetchingMaterials,
    data: materials
  } = useGet(MATERIAL_API);
  const {
    error: suppliersFetchError,
    refresh: refreshSuppliers,
    isLoading: isFetchingSuppliers,
    data: suppliers
  } = useGet(SUPPLIER_API);

  const { purchaseId } = useParams();
  const {
    error: purchaseFetchError,
    refresh: refreshPurchase,
    isLoading: isFetchingPurchase,
    data: purchase
  } = useGet(`${MATERIAL_PURCHASE_API}/${purchaseId}`)

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { isUpdating, handleUpdate } = useUpdate(
    `${MATERIAL_PURCHASE_API}/${purchaseId}`,
    () => navigate('/app/material-purchases')
  );

  const refresh = () => {
    refreshMaterials();
    refreshSuppliers();
    refreshPurchase();
  }

  if (isFetchingMaterials || isFetchingSuppliers || isFetchingPurchase) {
    return <Loader />;
  }

  const error = materialsFetchError || suppliersFetchError || purchaseFetchError;
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
            defaultValue={purchase.material.id}
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
            defaultValue={purchase.quantity}
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
            defaultValue={purchase.price}
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
            defaultValue={purchase.supplier.id}
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
