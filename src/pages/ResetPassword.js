import styles from './styles/ForgotPassword.module.css';
import { useParams } from 'react-router-dom';
import { AuthLayout } from '../layouts';
import {
  FormField,
  Button
} from '../components/auth';
import { useAuth } from '../hooks/common';


export const ResetPassword = () => {
  const auth = useAuth();
  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    auth.handleResetPassword(token, payload);
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className={styles.form}>
        <p>Type in your new password.</p>
        <FormField
          label='Password'
          type='password'
          name='password'
          disabled={auth.isLoading}
        />
        <Button
          type='submit'
          value='Submit'
          disabled={auth.isLoading}
        />
      </form>
    </AuthLayout>
  );
}
