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
  useDeletePurchase,
  useUpdatePurchase,
  useCreatePurchase,
  useGetPurchase,
  useGetPurchases
} from '../hooks/purchases';
import {
  useGetMaterials
} from '../hooks/materials';
import {
  useGetSuppliers
} from '../hooks/suppliers';


export const Purchases = () => {
  const {
    purchases,
    refreshPurchases,
    isLoading: isFetchingPurchases
  } = useGetPurchases();
  const {
    handleDelete,
    isLoading: isDeletingPurchase
  } = useDeletePurchase();

  const deleteHandler = (e) => {
    handleDelete(
      e.currentTarget.getAttribute('data-id'),
      refreshPurchases
    );
  }

  const isLoading = isFetchingPurchases || isDeletingPurchase;

  return (
    <section>
      {
        isLoading
          ?<Loader />
          :<>
            <Header
              value='Purchases'
              isEmptyList={purchases.length === 0}
              link={{
                path: '/app/purchases/create',
                name: 'New Purchase',
              }}
            />
            {
              purchases.length === 0
                ?<EmptyListPlaceholder
                  listName='purchases'
                  link={{
                    path: '/app/purchases/create',
                    name: 'Create Purchase',
                  }}
                />
                :<>
                  <SearchInput resourceName='purchases' />
                  <ResourcesTable
                    resourceName='purchase'
                    resourcePath='/purchases'
                    resources={purchases}
                    handleDelete={deleteHandler}
                  />
                </>
            }
          </>
      }
    </section>
  );
}

export const PurchaseCreate = () => {
  const { isLoading, handleCreate } = useCreatePurchase();
  const {
    suppliers,
    isLoading: isFetchingSuppliers
  } = useGetSuppliers();
  const {
    materials,
    isLoading: isFetchingMaterials
  } = useGetMaterials();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    payload.quantity = parseInt(payload.quantity);
    payload.price = parseInt(payload.price);
    handleCreate(payload);
  }

  return (
    <section>
      {
        isFetchingMaterials || isFetchingSuppliers
          ?<Loader />
          :<>
            <PageHeader value='New Purchase' />
            <Form
              legend='Purchase Details'
              onSubmit={handleSubmit}
              isLoading={isLoading}
            >
              <SelectInput
                label='Material'
                name='materialId'
                options={materials}
                disabled={isLoading}
              />
              <FormField
                label='Quantity'
                type='number'
                name='quantity'
                disabled={isLoading}
              />
              <FormField
                label='Price'
                type='number'
                name='price'
                disabled={isLoading}
              />
              <input
                type='hidden'
                name='purchaseType'
                value='Material'
              />
              <SelectInput
                label='Supplier'
                name='providerId'
                options={suppliers}
                disabled={isLoading}
              />
            </Form>
          </>
      }
    </section>
  );
}

export const PurchaseUpdate = () => {
  const {
    purchase,
    isLoading: isFetchingPurchase
  } = useGetPurchase();
  const {
    materials,
    isLoading: isFetchingMaterials
  } = useGetMaterials();
  const {
    suppliers,
    isLoading: isFetchingSuppliers
  } = useGetSuppliers();
  const { isLoading, handleUpdate } = useUpdatePurchase();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    payload.quantity = parseInt(payload.quantity);
    payload.price = parseInt(payload.price);
    handleUpdate(payload);
  }
    
  return (
    <section>
      {
        isFetchingPurchase || isFetchingMaterials || isFetchingSuppliers
          ?<Loader />
          :<>
            <PageHeader value='Update Order Status' />
            <Form
              legend='Order Details'
              onSubmit={handleSubmit}
              isLoading={isLoading}
            >
              <SelectInput
                label='Material'
                name='materialId'
                value={purchase.materialId}
                options={materials}
                disabled={isLoading}
              />
              <FormField
                label='Quantity'
                type='number'
                name='quantity'
                value={purchase.quantity}
                disabled={isLoading}
              />
              <FormField
                label='Price'
                type='number'
                name='price'
                value={purchase.price}
                disabled={isLoading}
              />
              <input 
                type='hidden'
                name='purchaseType'
                value='MATERIAL'
              />
              <SelectInput
                label='Supplier'
                name='providerId'
                value={purchase.providerId}
                options={suppliers}
                disabled={isLoading}
              />
            </Form>
          </>
      }
    </section>
  );
}
