
  import { account } from '@/appwrite';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FormControl, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Account } from 'appwrite';
  import { useState } from 'react';

  
  
  const PasswordRecoveryPage = () => {
    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [error, setError] = useState('');
  
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://glitch.zone'
        : 'http://localhost:3000';
  
    const handlePasswordRecovery = () => {
      const promise = account.createRecovery(
        email,
        `${baseUrl}/password_recovery_confirmation/`
      );
  
      promise
        .then((response) => {
          console.log(response); // Success
          setIsEmailSent(true);
          setError('');
        })
        .catch((error) => {
          console.log(error); // Failure
          setIsEmailSent(false);
          setError(
            'Failed to send the password recovery email. Please try again.'
          );
        });
    };
  
    return (
      <Card className='max-w-md mx-auto'
      >
        <h1  className='text-center font-bold text-4xl mb-4'>
          Password Recovery
        </h1>
        {isEmailSent ? (
          <p className='text-emerald-500'>
            Password recovery email has been sent to your email address.
          </p>
        ) : (
          <>
            <FormControl id="email" >
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            {error && (
              <p className='text-red-600'>
                {error}
              </p>
            )}
            <Button
             
              onClick={handlePasswordRecovery}
             
             
            >
              Recover Password
            </Button>
          </>
        )}
      </Card>
    );
  };
  
  export default PasswordRecoveryPage;