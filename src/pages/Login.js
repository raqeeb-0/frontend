import styles from './styles/form.module.css';
import { AuthLayout } from '../layouts/AuthLayout';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { IconBtn } from '../components/IconBtn';
import { FormSep } from '../components/FormSep';
import { FormField } from '../components/FormField';
import { Button } from '../components/Button';
import { useState } from 'react';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  return (
    <AuthLayout>
      <form className={styles.form}>
        <IconBtn
          icon={<FcGoogle style={{fontSize: '1.5rem'}} />}
          value='Log in with Google'
          handleClick={(e) => e.preventDefault()}
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
          value='Log in'
          onClick={(e) => e.preventDefault()}
        />
      </form>
      <div>
        <span>Don't have an account? </span>
        <Link to='/signup'>
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
}
