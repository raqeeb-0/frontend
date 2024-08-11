import { DashboardLayout } from '../layouts';
import { PageHeader, Loader } from '../components/common';
import {
  Form
} from '../components/app';
import {
  FormField
} from '../components/common';
import {
  useUpdateOrg,
  useCreateOrg,
  useGetOrg
} from '../hooks/orgs';
import { useForm } from '../hooks/common';


export const OrganizationCreate = () => {
  const { isLoading, handleCreate } = useCreateOrg();
  const { errors, register, handleSubmit } = useForm();
    
  return (
    <DashboardLayout isEmptyList={true}>
      <PageHeader value='New Organization' />
      <Form
        legend='Organization Details'
        onSubmit={(e) => handleSubmit(e, handleCreate)}
        isLoading={isLoading}
      >
        <FormField error={errors.orgName}>
          <label htmlFor='orgName'>Name</label>
          <input
            id='orgName'
            type='text'
            autoFocus='on'
            autoComplete='on'
            disabled={isLoading}
            {
              ...register(
                'orgName',
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
        <FormField error={errors.phoneNumber}>
          <label htmlFor='phoneNumber'>Phone number</label>
          <input
            id='phoneNumber'
            type='tel'
            disabled={isLoading}
            {
              ...register(
                'phoneNumber',
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
  const { isLoading: isFetchingOrg, org } = useGetOrg();
  const { isLoading, handleUpdate } = useUpdateOrg();
  const { errors, register, handleSubmit } = useForm();
    
  return (
    <DashboardLayout isEmptyList={true}>
      {
        isFetchingOrg
          ?<Loader />
          :<>
            <PageHeader value='Update Organization' />
            <Form
              legend='Organization Details'
              onSubmit={(e) => handleSubmit(e, handleUpdate)}
              isLoading={isLoading}
            >
              <FormField error={errors.orgName}>
                <label htmlFor='orgName'>Name</label>
                <input
                  id='orgName'
                  type='text'
                  autoFocus='on'
                  autoComplete='on'
                  disabled={isLoading}
                  defaultValue={org.name}
                  {
                    ...register(
                      'orgName',
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
              <FormField error={errors.phoneNumber}>
                <label htmlFor='phoneNumber'>Phone number</label>
                <input
                  id='phoneNumber'
                  type='tel'
                  disabled={isLoading}
                  defaultValue={org.phoneNumber}
                  {
                    ...register(
                      'phoneNumber',
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
    </DashboardLayout>
  );
}
