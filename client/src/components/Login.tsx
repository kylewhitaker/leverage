import { Button, Grid, Typography } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setUser } from '../redux/userSlice';
import { InputText } from './InputText';

interface Props {}

export const Login: React.FC<Props> = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      try {
        const signInResult = await Auth.signIn({
          username: state.email,
          password: state.password,
        });
        dispatch(
          setUser({
            id: signInResult.username,
            name: signInResult.attributes.name,
            email: signInResult.attributes.email,
          })
        );
        history.push('/contacts');
      } catch (error) {
        if (JSON.stringify(error).includes('UserNotConfirmedException')) {
          enqueueSnackbar(`Account login failed. Please verify your email.`, { variant: 'info' });
        } else {
          enqueueSnackbar(`Account login failed. ${error}`, { variant: 'error' });
        }
      }
    },
    [state, enqueueSnackbar, dispatch, history]
  );

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <InputText
          id="login-email"
          label="Email"
          type="email"
          variant="filled"
          onChange={(event) => setState((prev) => ({ ...prev, email: event.target.value }))}
          fullWidth
        />
      </Grid>
      <Grid item>
        <InputText
          id="login-password"
          label="Password"
          type="password"
          variant="filled"
          onChange={(event) => setState((prev) => ({ ...prev, password: event.target.value }))}
          fullWidth
        />
      </Grid>
      <Grid item container alignItems="baseline">
        <Button
          id="login-button"
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          style={{ marginTop: 11 }}
          onClick={handleSubmit}
        >
          Sign in
        </Button>
        <Link to="/">
          <Typography variant="body1" style={{ color: '#fff', marginLeft: 12 }}>
            I don't have an account yet.
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};
