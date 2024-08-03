import styles from './styles/ForgotPassword.module.css';
import { AuthLayout } from '../layouts';
import {
  FormField,
  Button
} from '../components/auth';
import { useAuth, useForm } from '../hooks/common';


export const ForgotPassword = () => {
  const { isLoading, handleForgotPassword } = useAuth();
  const { errors, register, handleSubmit } = useForm();

  return (
    <AuthLayout>
      <form
        noValidate
        onSubmit={(e) => handleSubmit(e, handleForgotPassword)}
        className={styles.form}
      >
        <p>
          Enter the email associated with
          your account to change your password.
        </p>
        <FormField
          label='Email'
          type='text'
          disabled={isLoading}
          placeholder='JohnDoe@gmail.com'
          {
            ...register(
              'email',
              {
                required: true,
                email: true,
                length: {
                  min: 15,
                  max: 50,
                },
              }
            )
          }
        />
        <Button
          type='submit'
          value='Next'
          disabled={isLoading}
        />
      </form>
    </AuthLayout>
  );
}
