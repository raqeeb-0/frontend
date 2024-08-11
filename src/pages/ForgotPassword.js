import { AuthLayout } from '../layouts';
import {
  FormField,
  Button
} from '../components/auth';
import { useAuth, useForm } from '../hooks/common';


export const ForgotPassword = () => {
  const { isLoading, handleForgotPassword } = useAuth();
  const { errors, register, handleSubmit } = useForm();
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
        onSubmit={(e) => handleSubmit(e, handleForgotPassword)}
        style={formStyle}
      >
        <p style={{ marginBottom: '15px' }}>
          Enter the email associated with
          your account to change your password.
        </p>
        <FormField error={errors.email}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='text'
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
        <Button
          type='submit'
          value='Next'
          disabled={isLoading}
        />
      </form>
    </AuthLayout>
  );
}
