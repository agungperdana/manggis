import React from 'react';
import ApplicationUI from './ApplicationUI';
import Login from './Login';

function App() {

  const [token, setToken] = React.useState(null);

  if(token) {
    return (<ApplicationUI token={token}/>)
  }
  else {
    return (<Login setToken={setToken}/>);
  }
}

export default App;
