import { Button, Grid, Typography } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { RootState } from '../redux/store';
import { setUser } from '../redux/userSlice';
import { InputText } from './InputText';

interface Props {}

export const SignUp: React.FC<Props> = (props) => {
  const user = useSelector((state: RootState) => state.user.value);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [state, setState] = useState<{ name: string; email: string; password: string }>({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      try {
        await Auth.signUp({
          username: state.email,
          password: state.password,
          attributes: {
            name: state.name,
          },
        });
        dispatch(setUser({ name: state.name, email: state.email }));
        enqueueSnackbar(`Account created succesfully!`, { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(`Account creation failed. ${error}`, { variant: 'error' });
      }
    },
    [state, enqueueSnackbar, dispatch]
  );

  // if (!!user) return <Redirect to="/verify" />;

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <InputText
          id="signup-name"
          label="Name"
          type="text"
          variant="filled"
          onChange={(event) => setState((prev) => ({ ...prev, name: event.target.value }))}
          fullWidth
        />
      </Grid>
      <Grid item>
        <InputText
          id="signup-email"
          label="Email"
          type="email"
          variant="filled"
          onChange={(event) => setState((prev) => ({ ...prev, email: event.target.value }))}
          fullWidth
        />
      </Grid>
      <Grid item>
        <InputText
          id="signup-password"
          label="Password"
          type="password"
          variant="filled"
          onChange={(event) => setState((prev) => ({ ...prev, password: event.target.value }))}
          fullWidth
        />
      </Grid>
      <Grid item container alignItems="baseline">
        <Button
          id="signup-button"
          type="submit"
          color="secondary"
          variant="contained"
          size="large"
          style={{ marginTop: 11 }}
          onClick={handleSubmit}
        >
          Create Account
        </Button>
        <Link to="/login">
          <Typography variant="body1" style={{ color: '#fff', marginLeft: 12 }}>
            I already have an account.
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};
