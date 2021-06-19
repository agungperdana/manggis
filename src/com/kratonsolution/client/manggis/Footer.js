import React from 'react';

export default class Footer extends React.Component {

    render() {
        return(
            <footer className="main-footer">
                <div className="float-right d-none d-sm-block">
                    <b>Version 3.1.0</b> 
                </div>
                <div>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.All rights reserved.</div> 
            </footer>
        )
    }
}