import { Box, Button, TextField } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useCallback, useState } from 'react';

interface Props {}

export const SignUp: React.FC<Props> = (props) => {
  const [state, setState] = useState<{ email: string; password: string }>({ email: '', password: '' });

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      try {
        const signUpResult = await Auth.signUp({
          username: state.email,
          password: state.password,
        });
        console.log(signUpResult);
      } catch (error) {
        console.log('error:', error);
      }
    },
    [state]
  );

  return (
    <Box display="flex" flexDirection="column" maxWidth="400px">
      <TextField
        id="signup-email"
        label="Email"
        type="email"
        variant="outlined"
        style={{ margin: '1rem' }}
        onChange={(event) => setState((prev) => ({ ...prev, email: event.target.value }))}
      />
      <TextField
        id="signup-password"
        label="Password"
        type="password"
        variant="outlined"
        style={{ margin: '1rem' }}
        onChange={(event) => setState((prev) => ({ ...prev, password: event.target.value }))}
      />
      <Button type="submit" variant="contained" style={{ margin: '2rem' }} onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};
