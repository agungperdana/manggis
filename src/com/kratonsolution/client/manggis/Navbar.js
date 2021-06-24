import React from 'react';

export default class Navbar extends React.Component {

    render() {

        return(
            <div className="navbar navbar-fixed-top">
                <div className="navbar-inner">
                    <div className="container"> 
                        <a className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span> 
                        </a>
                        <a className="brand" href="index.html">
                            <i className="icon-leaf">&nbsp;</i>MANGGIS
                        </a>
                        <div className="nav-collapse">
                            <ul className="nav pull-right">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="icon-cog"></i>&nbsp;
                                        Account <b className="caret"></b>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="javascript:;">Settings</a></li>
                                        <li><a href="javascript:;">Help</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="icon-user"></i>&nbsp;EGrappler.com <b className="caret"></b></a>
                                        <ul className="dropdown-menu">
                                            <li><a href="javascript:;">Profile</a></li>
                                            <li><a href="javascript:;">Logout</a></li>
                                        </ul>
                                </li>
                            </ul>
                            <form className="navbar-search pull-right">
                               <input type="text" className="search-query" placeholder="Search"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}