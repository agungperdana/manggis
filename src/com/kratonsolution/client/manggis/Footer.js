import React from 'react';

export default class Footer extends React.Component {

    render() {
        return(
            <div className="footer">
                <div className="footer-inner">
                    <div className="container">
                        <div className="row">
                            <div className="span12"> 
                                &copy; 2013 
                                <a href="http://www.egrappler.com/">
                                    Bootstrap Responsive Admin Template
                                </a>. 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}