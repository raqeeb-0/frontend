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


export const Signup = () => {
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
        />
      </Form>
      <div>
        <span>Have an account? </span>
        <Link to='/auth/login'>
          Log in
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
