import React from 'react';

export default class Aside extends React.Component {

    render() {

        return(
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <a href="index3.html" className="brand-link">
                        <img src="img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: .8}}/>
                        <span className="brand-text font-weight-light" style={{color:"#EF9D10F"}}>Manggis</span>
                    </a>

                    <div className="sidebar">
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image"/>
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">Alexander Pierce</a>
                            </div>
                        </div>

                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"/>
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li className="nav-item">
                                    <a href="#" className="nav-link active">
                                        <i className="nav-icon fas fa-address-book"></i>
                                        <p>
                                            Access
                                            <i className="fas fa-angle-left right"></i>
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="pages/forms/general.html" className="nav-link">
                                                <i className="far fa-check-square nav-icon"></i>
                                                <p>Protected Resource</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/forms/editors.html" className="nav-link">
                                                <i className="far fa-check-square nav-icon"></i>
                                                <p>Role</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/forms/editors.html" className="nav-link">
                                                <i className="far fa-check-square nav-icon"></i>
                                                <p>User</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fas fa-globe"></i>
                                        <p>
                                            General
                                            <i className="fas fa-angle-left right"></i>
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="pages/forms/advanced.html" className="nav-link">
                                                <i className="far fa-check-square nav-icon"></i>
                                                <p>Geographic</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fas fa-users"></i>
                                        <p>
                                            CRM
                                            <i className="fas fa-angle-left right"></i>
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="pages/forms/advanced.html" className="nav-link">
                                                <i className="far fa-check-square nav-icon"></i>
                                                <p>Customer</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/forms/advanced.html" className="nav-link">
                                                <i className="far fa-check-square nav-icon"></i>
                                                <p>Supplier</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
        )
    }
}