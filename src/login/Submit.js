import { Button } from "antd";
import React, { Fragment } from "react";

export class Submit extends React.Component {

    constructor(props) {

        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        this.props.doLogin();
    }

    render() {
        return(
            <Fragment>
                <Button type="primary" 
                        htmlType="submit" 
                        style={{width:"100%", marginBottom:10}} 
                        onClick={this.onSubmit}>
                        Log in
                </Button>
                <a href="" style={{color:"red"}}>Forgot password</a>
            </Fragment>
        )
    }
}