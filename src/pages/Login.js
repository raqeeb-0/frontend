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
import { useAuth, useForm } from '../hooks';


export const Login = () => {
  const { isLoading, handleLogin } = useAuth();
  const { errors, register, handleSubmit } = useForm();

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
        onSubmit={(e) => handleSubmit(e, handleLogin)}
        style={style}
      >
        <IconBtn
          icon={<FcGoogle style={{fontSize: '1.5rem'}} />}
          value='Log in with Google'
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
        <FormField error={errors.password}>
          <label htmlFor='password'>Password</label>
          <PasswordInput
            id='password'
            disabled={isLoading}
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
        <Link
          to='/auth/forgot-password'
          style={{
            alignSelf: 'flex-start',
            marginLeft: '10px',
          }}
        >
          Forgot password?
        </Link>
        <Button
          type='submit'
          value='Log in'
          disabled={isLoading}
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
