import './style/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import Cookies from "js-cookie";
import { useContext, useState, useEffect } from 'react';
import Register from './components/Register.js';
import login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import NavigationBar from './components/NavgationBar';
import Logout from './components/Logout';
import ErrorPage from './components/ErrorPage';
import PoliceForm from './components/PoliceForm';
import Profile from './components/Profile';
import userContext from './Context/userContext';


function App() {
  const [user, setUser] = useState({ name: null, id: null });
  const [nav, setNav] = useState(true);
  const [challans, setChallans] = useState({})
  const [logged, setLogged] = useState(false);
  // alert(Cookies.get('person'))
  // alert(document.cookie)

  useEffect(async () => {
    try {
      const res = await fetch("http://localhost:7100/getData", {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const data = await res.json();
      console.log('data in app :>> ', data);
      if (Cookies.get('person') === 'superAdmin') {
        setUser({ name: data.name, id: data.superId });
      }
      if (Cookies.get('person') === 'admin') {
        setUser({ name: data.aName, id: data.aId });
      }
      if (Cookies.get('person') === 'police') {
        setUser({ name: data.pName, id: data.pId });
      }
      if (Cookies.get('person') === 'user') {
        setUser({ name: data[0].user, id: data[0].licenseNo });
      }
      if (Cookies.get('person')) { setLogged(true) } else { setLogged(false) }
    } catch (err) {
      console.log('err in app :>> ', err);
    }
  }, [])
  console.log('user in app :>> ', user);
  console.log('challans in app  :>> ', challans);

  return (
    <>
      <userContext.Provider value={{ user, setUser, nav, setNav, logged, setLogged, challans, setChallans }}>
        <Router>
          <div>
            {nav && <NavigationBar />}
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/register' component={Cookies.get('person') === 'admin' ? Register : ErrorPage} />
              <Route exact path='/login/:person' component={login} />
              <Route exact path='/logout' component={Logout} />
              <Route exact path='/dashboard' component={Cookies.get('person') === 'admin' || 'superAdmin' ? Dashboard : ErrorPage} />
              <Route exact path='/policeForm' component={Cookies.get('person') === 'police' ? PoliceForm : ErrorPage} />
              <Route exact path='/profile' component={Cookies.get('person') === 'user' ? Profile : ErrorPage} />
            </Switch>
          </div>
        </Router>
      </userContext.Provider>

    </>
  );
}

export default App;
