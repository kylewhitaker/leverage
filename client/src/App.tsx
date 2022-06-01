import { Auth } from 'aws-amplify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AwsUser } from './core/interfaces';
import { mapUser } from './core/mapUser.util';
import { Contacts } from './pages/Contacts/Contacts';
import { Home } from './pages/Home/Home';
import { NewContact } from './pages/NewContact/NewContact';
import { Verify } from './pages/Verify/Verify';
import { RootState } from './redux/store';
import { clearUser, setUser } from './redux/userSlice';

function App() {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      Auth.currentAuthenticatedUser()
        .then((currentUser: AwsUser) => dispatch(setUser(mapUser(currentUser))))
        .catch((err) => {
          console.log(err);
          dispatch(clearUser());
        });
    }
  }, [user, dispatch]);

  const isVerifiedUser = !!user?.id;
  const mustVerifyUser = !!user && !user.id;

  return (
    <Router>
      <Switch>
        <Route path="/new-contact">{isVerifiedUser ? <NewContact /> : <Redirect to="/" />}</Route>
        <Route path="/contacts">{isVerifiedUser ? <Contacts /> : <Redirect to="/" />}</Route>
        <Route path="/verify">{mustVerifyUser ? <Verify /> : <Redirect to="/" />}</Route>
        <Route path="/login">{isVerifiedUser ? <Redirect to="/contacts" /> : <Home isLogin />}</Route>
        <Route path="/">
          {isVerifiedUser ? <Redirect to="/contacts" /> : mustVerifyUser ? <Redirect to="/verify" /> : <Home />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
