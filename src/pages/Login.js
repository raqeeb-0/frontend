import styles from './styles/form.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AuthLayout } from '../layouts';
import {
  IconBtn,
  FormSep,
  FormField,
  Button
} from '../components';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
  }

  return (
    <AuthLayout>
      <form className={styles.form} onSubmit={handleSubmit}>
        <IconBtn
          icon={<FcGoogle style={{fontSize: '1.5rem'}} />}
          value='Log in with Google'
        />
        <FormSep />
        <FormField
          label='Email'
          type='text'
          name='email'
          value={email}
          placeholder='JohnDoe@gmail.com'
          handleChange={handleEmail}
        />
        <FormField
          label='Password'
          type='password'
          name='password'
          value={password}
          placeholder='••••••••'
          handleChange={handlePassword}
        />
        <Button
          type='submit'
          value='Log in'
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
