import React, { useState } from 'react';
import ApplicationUI from './ApplicationUI';
import { Login } from './login/Login';
import { jwtDecrypt } from 'jose';

export default function App(props) {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const sessionKey = "REMEMBER_ME_KEY";

  const onLoginSuccess = (token, user) => {
    setToken(token);
    setUser(user);
  }

  const rememberSomething = () => {

    try {

      let prof = localStorage.getItem(sessionKey);
      if(prof && prof.time && prof.token && prof.user) {

        setToken(prof.token);
        setUser(prof.user);
      }
    }
    catch(e) {}

    return token;
  }

  return(
    rememberSomething()? 
    <ApplicationUI token={token} user={user} sessionKey={sessionKey}/>:
    <Login loginSuccess={onLoginSuccess} sessionKey={sessionKey}/>
  );
}