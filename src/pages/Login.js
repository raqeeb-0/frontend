import styles from './styles/form.module.css';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AuthLayout } from '../layouts';
import {
  IconBtn,
  FormSep,
  FormField,
  Button
} from '../components/auth';
import { useAuth, useForm } from '../hooks/common';


export const Login = () => {
  const { isLoading, handleLogin } = useAuth();
  const { errors, register, handleSubmit } = useForm();

  return (
    <AuthLayout>
      <form
        noValidate
        onSubmit={(e) => handleSubmit(e, handleLogin)}
        className={styles.form}
      >
        <IconBtn
          icon={<FcGoogle style={{fontSize: '1.5rem'}} />}
          value='Log in with Google'
        />
        <FormSep />
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
              },
            )
          }
        />
        <FormField
          label='Password'
          type='password'
          disabled={isLoading}
          placeholder='••••••••'
          {
            ...register(
              'password',
              {
                required: true,
                length: {
                  min: 8,
                  max: 50,
                },
              }
            )
          }
        />
        <Link
          to='/auth/forgot-password'
          className={styles.forgotPasswordLink}
        >
          Forgot password?
        </Link>
        <Button
          type='submit'
          value='Log in'
          disabled={isLoading}
        />
      </form>
      <div>
        <span>Don't have an account? </span>
        <Link to='/auth/signup'>
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
}
