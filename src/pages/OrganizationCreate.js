import { DashboardLayout } from '../layouts';
import { PageHeader } from '../components/common';
import {
  FormField,
  Form
} from '../components/app';
import { useCreateOrg } from '../hooks/orgs';


export const OrganizationCreate = () => {
  const { isLoading, handleCreate } = useCreateOrg();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleCreate(payload);
  }
    
  return (
    <DashboardLayout isEmptyList={true}>
      <PageHeader value='New Organization' />
      <Form
        legend='Organization Details'
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <FormField
          label='Name'
          type='text'
          name='orgName'
        />
        <FormField
          label='Phone number'
          type='text'
          name='phoneNumber'
        />
      </Form>
    </DashboardLayout>
  );
}
