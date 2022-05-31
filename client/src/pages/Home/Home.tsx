import { Box, Grid, Typography } from '@mui/material';
import { Login } from '../../components/Login';
import { SignUp } from '../../components/SignUp';
import './Home.css';

interface Props {
  isLogin?: boolean;
}

export const Home: React.FC<Props> = (props) => {
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
              Keep your contacts in one place. Access them anywhere, anytime.
            </Typography>
          </Grid>
          <Grid item marginTop="36px">
            {!!props.isLogin ? <Login /> : <SignUp />}
          </Grid>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Box>
  );
};
