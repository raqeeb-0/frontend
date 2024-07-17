import styles from './styles/form.module.css';
import { useState, useEffect } from 'react';
import {
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AuthLayout } from '../layouts';
import {
  IconBtn,
  FormSep,
  FormField,
  Button
} from '../components/auth';
import { useAuth } from '../hooks/common';


export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    auth.handleLogin(payload);
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className={styles.form}>
        <IconBtn
          icon={<FcGoogle style={{fontSize: '1.5rem'}} />}
          value='Log in with Google'
        />
        <FormSep />
        <FormField
          label='Email'
          type='text'
          name='email'
          placeholder='JohnDoe@gmail.com'
        />
        <FormField
          label='Password'
          type='password'
          name='password'
          placeholder='••••••••'
        />
        <Button
          type='submit'
          value='Log in'
          disabled={auth.isLoading}
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
