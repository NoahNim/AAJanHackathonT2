import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import { Home } from './components/Home/Home';
import { LoginForm } from './components/Auth/LoginForm';
import { api } from './redux/app/services/api';
import { store } from './redux/app/store';
import { restoreUser } from './redux/features/auth/userSlice';
import { getCookie } from './redux/app/hooks';

function App() {
  const dispatch = useDispatch();
  const storedUser = getCookie('user');

  useEffect(() => {
    if (storedUser !== undefined) {
      const parsedUser = JSON.parse(storedUser);

      const res = store.dispatch(api.endpoints.restoreUser.initiate(parsedUser)).unwrap()
      res.then((res) => {
        const user = { user: res.user, token: res.token }
        dispatch(restoreUser(user))
      })
    }
  })

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// "proxy": "http://localhost:5000",