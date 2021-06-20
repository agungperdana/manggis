import React from 'react';
import Navbar from './Navbar';
import Aside from './Aside';
import Content from './Content';
import Footer from './Footer';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function EntryPoint() {

    const [token, setToken] = React.useState(null);

    if(!token) {
        return <Login setToken={setToken}/>
    }


    return(
            <div>
                <Navbar/>
                <Aside/>
                <Content/>
                <Footer/>
            </div>
    )
}