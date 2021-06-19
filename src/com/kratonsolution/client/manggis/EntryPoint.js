import React from 'react';
import Navbar from './Navbar';
import Aside from './Aside';
import Content from './Content';
import Footer from './Footer';

export default class EntryPoint extends React.Component {

    render() {
        return(
            <div>
                <Navbar/>
                <Aside/>
                <Content/>
                <Footer/>
            </div>
        )
    }
}