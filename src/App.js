import React from 'react';
import ApplicationUI from './ApplicationUI';
import Login from './Login';

function App() {

  const [token, setToken] = React.useState(null);
  const [user, setUser] = React.useState({});

  if(token) {
    return (<ApplicationUI token={token} setToken={setToken} user={user}/>)
  }
  else {
    return (<Login setToken={setToken} setUser={setUser}/>);
  }
}

export default App;
