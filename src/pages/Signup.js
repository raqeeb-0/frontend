import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AuthLayout } from '../layouts';
import {
  IconBtn,
  FormSep,
  PasswordInput,
  Button
} from '../components/auth';
import {
  FormField
} from '../components/common';
import { useAuth, useForm } from '../hooks/common';
import { useState } from 'react';


export const Signup = () => {
  const { isLoading, handleSignup } = useAuth();
  const { errors, register, handleSubmit } = useForm();

  const [password, setPassword] = useState('');
  const onPasswordValueChange = (value) => setPassword(value);

  const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '300px',
    marginBottom: '30px',
  }

  return (
    <AuthLayout>
      <form
        noValidate
        onSubmit={(e) => handleSubmit(e, handleSignup)}
        style={style}
      >
        <IconBtn
          icon={<FcGoogle style={{fontSize: '1.5rem'}} />}
          value='Sign up with Google'
          handleClick={(e) => e.preventDefault()}
        />
        <FormSep />
        <FormField error={errors.email}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='text'
            autoFocus='on'
            autoComplete='on'
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
        </FormField>
        <FormField error={errors.userName}>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            autoComplete='on'
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
        </FormField>
        <FormField error={errors.phoneNumber}>
          <label htmlFor='phoneNumber'>Phone Number</label>
          <input
            id='phoneNumber'
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
        </FormField>
        <FormField error={errors.password}>
          <label htmlFor='password'>Password</label>
          <PasswordInput
            id='password'
            disabled={isLoading}
            onPasswordValueChange={onPasswordValueChange}
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
        </FormField>
        <FormField error={errors.confirmPassword}>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <PasswordInput
            id='confirmPassword'
            disabled={isLoading}
            placeholder='••••••••'
            {
              ...register(
                'confirmPassword',
                {
                  required: true,
                  matched: {
                    value: password,
                    message: 'Passwords do not match',
                  }
                }
              )
            }
          />
        </FormField>
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
