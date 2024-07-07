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


export const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => setEmail(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
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
            value='Sign up with Google'
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
            label='Username'
            type='text'
            name='username'
            value={username}
            placeholder='johndoe20'
            handleChange={handleUsername}
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
            value='Sign up'
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
