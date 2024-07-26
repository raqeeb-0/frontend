import styles from './styles/ForgotPassword.module.css';
import { AuthLayout } from '../layouts';
import {
  FormField,
  Button
} from '../components/auth';
import { useAuth } from '../hooks/common';


export const ForgotPassword = () => {
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    auth.handleForgotPassword(payload);
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className={styles.form}>
        <p>
          Enter the email associated with your account to change your password.
        </p>
        <FormField
          label='Email'
          type='text'
          name='email'
          disabled={auth.isLoading}
        />
        <Button
          type='submit'
          value='Next'
          disabled={auth.isLoading}
        />
      </form>
    </AuthLayout>
  );
}
