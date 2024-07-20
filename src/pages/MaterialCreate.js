import {
  PageHeader
} from '../components/common';
import {
  FormField,
  Form
} from '../components/app';
import { useCreateMaterial } from '../hooks/materials';


export const MaterialCreate = () => {
  const { isLoading, handleCreate } = useCreateMaterial();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleCreate(payload);
  }

  return (
    <main>
      <PageHeader value='New Material' />
      <Form
        legend='Material Details'
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <FormField
          label='Name'
          type='text'
          name='name'
        />
      </Form>
    </main>
  );
}
