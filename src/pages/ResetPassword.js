import { useParams } from 'react-router-dom';
import { AuthLayout } from '../layouts';
import {
  PasswordInput,
  Button
} from '../components/auth';
import {
  FormField
} from '../components/common';
import { useAuth, useForm } from '../hooks/common';
import { useState } from 'react';


export const ResetPassword = () => {
  const { isLoading, handleResetPassword } = useAuth();
  const { errors, register, handleSubmit } = useForm();

  const [password, setPassword] = useState('');
  const onPasswordValueChange = (value) => setPassword(value);

  const { token } = useParams();
  const boundToken = handleResetPassword.bind(null, token);

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    border: '1px solid var(--primary-clr)',
    borderRadius: '32px',
    width: '340px',
    padding: '40px 20px 50px 20px',
  }

  return (
    <AuthLayout>
      <form
        noValidate
        onSubmit={(e) => handleSubmit(e, boundToken)}
        style={formStyle}
      >
        <p style={{ marginBottom: '15px' }}>
          Type in your new password.
        </p>
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
          value='Submit'
          disabled={isLoading}
        />
      </form>
    </AuthLayout>
  );
}
