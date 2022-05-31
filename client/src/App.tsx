import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Contacts } from './pages/Contacts/Contacts';
import { Home } from './pages/Home/Home';
import { Verify } from './pages/Verify/Verify';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/contacts" render={() => <Contacts />} />
        <Route path="/verify" render={() => <Verify />} />
        <Route path="/login" render={() => <Home isLogin />} />
        <Route path="/" render={() => <Home />} />
      </Switch>
    </Router>
  );
}

export default App;
