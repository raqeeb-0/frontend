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


export const Signup = () => {
  const auth = useAuth();
  const { errors, register, handleSubmit } = useForm();

  return (
    <AuthLayout>
      <form
        noValidate
        onSubmit={(e) => handleSubmit(e, auth.handleSignup)}
        className={styles.form}
      >
        <IconBtn
          icon={<FcGoogle style={{fontSize: '1.5rem'}} />}
          value='Sign up with Google'
          handleClick={(e) => e.preventDefault()}
        />
        <FormSep />
        <FormField
          label='Email'
          type='text'
          placeholder='JohnDoe@gmail.com'
          {
            ...register(
              'email',
              {
                required: {},
                isEmail: {
                  message: 'Invalid email',
                },
              }
            )
          }
        />
        <FormField
          label='Username'
          type='text'
          placeholder='johndoe20'
          {
            ...register(
              'userName',
              {
                required: {},
              }
            )
          }
        />
        <FormField
          label='Phone Number'
          type='tel'
          placeholder='01xx xxxx xxx'
          {
            ...register(
              'phoneNumber',
              {
                required: {},
              }
            )
          }
        />
        <FormField
          label='Password'
          type='password'
          placeholder='••••••••'
          {
            ...register(
              'password',
              {
                required: {},
              }
            )
          }
        />
        <FormField
          label='Confirm Password'
          type='password'
          placeholder='••••••••'
          {
            ...register(
              'confirmPassword',
              {
                required: {},
              }
            )
          }
        />
        <Button
          type='submit'
          value='Sign up'
          disabled={auth.isLoading}
        />
      </form>
      <div>
        <span>Have an account? </span>
        <Link to='/auth/login'>
          Log in
        </Link>
      </div>
    </AuthLayout>
  );
}
