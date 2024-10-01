import styles from '../components/app/styles/ResourcesTable.module.css';
import { DashboardLayout } from '../layouts';
import {
  Form,
  SearchInput,
  ErrorContainer,
  EmptyListPlaceholder
} from '../components/app';
import {
  Loader,
  FormField,
  ActionsMenu,
  PageHeader
} from '../components/common';
import { useForm, useNotify } from '../hooks';
import { ORG_API } from '../lib/endpoints';
import {
  useGet,
  useCreate,
  useUpdate,
  useDelete
} from '../hooks/useAPI';
import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom';
import { useEffect, useRef } from 'react';


export const Organization = () => {
  const {
    error,
    refresh,
    isLoading: isFetchingOrgs,
    data: organizations
  } = useGet(ORG_API);

  const { handleDelete, isDeleting } = useDelete(ORG_API, refresh);

  if (isFetchingOrgs || isDeleting ) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <ErrorContainer
          error={error}
          refresh={refresh}
        />
      </DashboardLayout>
    );
  }

  if (organizations.length === 0) {
    return (
      <DashboardLayout isEmptyList={organizations.length === 0}>
        <EmptyListPlaceholder
          listName='organizations'
          link={{
            path: '/organizations/create',
            name: 'Create Organization',
          }}
        />
      </DashboardLayout>
    );
  }

  return ( 
    <DashboardLayout isEmptyList={organizations.length === 0}>
      <PageHeader value='Overview' />
      <SearchInput resourceName='organizations' />
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th> Organization name </th>
            <th> Created At </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          organizations.map((org, index) => {
            return (
            <tr key={org.id} className={styles.tr}>
              <td>
                { index + 1 }
              </td>
              <td>
                <Link
                  to={`/organizations/${org.id}/app`}
                  className={styles.resourceLink}
                  data-id={org.id}
                >
                  { org.name }
                </Link>
              </td>
              <td>
                { org.createdAt.split('T')[0] }
              </td>
              <td>
                <ActionsMenu
                  updatePath={`/organizations/${org.id}/edit`}
                  data={{ id: org.id }}
                  handleDelete={handleDelete}
                />
              </td>
            </tr>
            );
          })
        }
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export const OrganizationCreate = () => {
  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { handleCreate, isCreating } = useCreate(
    ORG_API,
    () => navigate('/organizations/overview')
  );
    
  return (
    <DashboardLayout isEmptyList={true}>
      <PageHeader value='New Organization' />
      <Form
        legend='Organization Details'
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
                    min: 3,
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
    </DashboardLayout>
  );
}

export const OrganizationUpdate = () => {
  const { organizationId } = useParams();
  const {
    error,
    refresh,
    isLoading: isFetchingOrg,
    data: organization
  } = useGet(`${ORG_API}/${organizationId}`);

  const { errors, register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { handleUpdate, isUpdating } = useUpdate(
    `${ORG_API}/${organizationId}`,
    () => navigate('/organizations/overview')
  );

  if (isFetchingOrg) {
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
    <DashboardLayout isEmptyList={true}>
      <PageHeader value='Update Organization' />
      <Form
        legend='Organization Details'
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
            defaultValue={organization.name}
            {
              ...register(
                'name',
                {
                  required: true,
                  length: {
                    min: 3,
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
            defaultValue={organization.phone}
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
    </DashboardLayout>
  );
}
