import { DashboardLayout } from '../layouts';
import { PageHeader, Loader } from '../components/common';
import {
  FormField,
  Form
} from '../components/app';
import { useGetOrg, useUpdateOrg } from '../hooks/orgs';


export const OrganizationUpdate = () => {
  const { isLoading: isFetchingOrg, org } = useGetOrg();
  const { isLoading, handleUpdate } = useUpdateOrg();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleUpdate(payload);
  }
    
  return (
    <DashboardLayout isEmptyList={true}>
      {
        isFetchingOrg
          ?<Loader />
          :<>
            <PageHeader value='Update Organization' />
            <Form
              legend='Organization Details'
              onSubmit={handleSubmit}
              isLoading={isLoading}
            >
              <FormField
                label='Name'
                type='text'
                name='orgName'
                value={org.name}
              />
              <FormField
                label='Phone number'
                type='text'
                name='phoneNumber'
                value={org.phoneNumber}
              />
            </Form>
          </>
      }
    </DashboardLayout>
  );
}
