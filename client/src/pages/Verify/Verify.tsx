import { Box, Button, Grid, Typography } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { RootState } from '../../redux/store';
import './Verify.css';

interface Props {}

export const Verify: React.FC<Props> = (props) => {
  const user = useSelector((state: RootState) => state.user.value);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleDone = useCallback(() => {
    history.push('/login');
  }, [history]);

  const handleResend = useCallback(async () => {
    if (!!user) {
      await Auth.resendSignUp(user.email);
      enqueueSnackbar('Verification email resent', { variant: 'info' });
    } else {
      enqueueSnackbar('Unable to resend verification', { variant: 'error' });
    }
  }, [enqueueSnackbar, user]);

  if (!user) return <Redirect to="/" />;

  return (
    <Box className="bg-img">
      <Grid container height="100vh" p={2}>
        <Grid item sm={3} md={5} lg={6}></Grid>
        <Grid container item xs={12} sm={6} md={5} lg={4} xl={3} spacing={1} direction="column" justifyContent="center">
          <Grid item>
            <Typography variant="h1" className="title">
              rolladex
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" className="subtitle">
              Welcome <span style={{ fontWeight: 600, textShadow: '0 0 2px blue' }}>{user?.name}</span>!
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" className="subtitle">
              Before we may begin, please <u>verify your email address</u>.
            </Typography>
          </Grid>
          <Grid item marginTop={2}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              style={{ margin: '0 5px 0 0' }}
              onClick={handleResend}
            >
              Resend
            </Button>
            <Button
              variant="contained"
              size="large"
              color="primary"
              style={{ margin: '0 0 0 5px' }}
              onClick={handleDone}
            >
              Done
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
