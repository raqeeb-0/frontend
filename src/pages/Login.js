import styles from './styles/form.module.css';
import { useState, useEffect } from 'react';
import {
  Link,
  Form,
  useActionData
} from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AuthLayout } from '../layouts';
import {
  IconBtn,
  FormSep,
  FormField,
  Button
} from '../components/auth';
import { Notification } from '../components/common';


export const Login = () => {
  const error = useActionData();
  const [showNotification, setShowNotification] = useState(false);

  const handleClose = () => setShowNotification(false);

  useEffect(() => {
    let timer;
    if (error?.message) {
      setShowNotification(true);
      timer = setTimeout(() => setShowNotification(false), 3000);
    }

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <AuthLayout>
      <Form method='post' className={styles.form} replace>
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
        />
      </Form>
      <div>
        <span>Don't have an account? </span>
        <Link to='/auth/signup'>
          Sign up
        </Link>
      </div>
      <Notification
        message={error?.message && error.message}
        type={'error'}
        active={showNotification}
        handleClose={handleClose}
      />
    </AuthLayout>
  );
}
