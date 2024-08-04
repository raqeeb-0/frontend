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
import { useState, useEffect } from 'react';


export const Signup = () => {
  const { isLoading, handleSignup } = useAuth();
  const { register, handleSubmit } = useForm();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) =>
    setConfirmPassword(e.target.value);

  return (
    <AuthLayout>
      <form
        noValidate
        onSubmit={(e) => {
          if (confirmPassword === '') {
            setPasswordError('required');
          }

          if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
          }
          handleSubmit(e, handleSignup)
        }}
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
        <FormField
          label='Username'
          type='text'
          disabled={isLoading}
          placeholder='johndoe20'
          {
            ...register(
              'userName',
              {
                required: true,
                length: {
                  min: 3,
                  max: 20,
                },
                username: true,
              }
            )
          }
        />
        <FormField
          label='Phone Number'
          type='tel'
          disabled={isLoading}
          placeholder='01xx xxxx xxx'
          {
            ...register(
              'phoneNumber',
              {
                required: true,
                phoneNumber: true,
              }
            )
          }
        />
        <FormField
          label='Password'
          type='password'
          disabled={isLoading}
          handlePassword={handlePassword}
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
        <FormField
          label='Confirm Password'
          type='password'
          disabled={isLoading}
          handlePassword={handleConfirmPassword}
          placeholder='••••••••'
          error={passwordError}
          required
          onFocus={() => setPasswordError('')}
        />
        <Button
          type='submit'
          value='Sign up'
          disabled={isLoading}
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
