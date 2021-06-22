import React from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

export default function EntryPoint() {

    const [token, setToken] = React.useState(null);

    if(!token) {
        return <Login setToken={setToken}/>
    }
    else {
        return <Dashboard token={token}/>
    }
}