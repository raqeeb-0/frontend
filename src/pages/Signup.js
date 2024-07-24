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
import { useAuth } from '../hooks/common';


export const Signup = () => {
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    auth.handleSignup(payload);
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className={styles.form}>
        <IconBtn
          icon={<FcGoogle style={{fontSize: '1.5rem'}} />}
          value='Sign up with Google'
          handleClick={(e) => e.preventDefault()}
        />
        <FormSep />
        <FormField
          label='Email'
          type='text'
          name='email'
          placeholder='JohnDoe@gmail.com'
        />
        <FormField
          label='Username'
          type='text'
          name='userName'
          placeholder='johndoe20'
        />
        <FormField
          label='Phone Number'
          type='tel'
          name='phoneNumber'
          placeholder='01xx xxxx xxx'
        />
        <FormField
          label='Password'
          type='password'
          name='password'
          placeholder='••••••••'
        />
        <FormField
          label='Confirm Password'
          type='text'
          name='confirmPassword'
          placeholder='••••••••'
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
