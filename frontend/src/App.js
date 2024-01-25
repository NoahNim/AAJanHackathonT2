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
import { restoreUser } from './redux/features/auth/userSlice';
import { useRestoreUserMutation } from './redux/app/services/api';

function App() {
  const dispatch = useDispatch();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/2dFSZfDxBFn2/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
