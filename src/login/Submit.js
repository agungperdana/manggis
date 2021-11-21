import { Button } from "antd";
import React, { Fragment } from "react";

export function Submit(props) {

    return(
        <Fragment>
            <Button type="primary" 
                    htmlType="submit" 
                    style={{width:"100%", marginBottom:10}} 
                    onClick={(e)=>props.doLogin()}>
                    Log in
            </Button>
            <a href="" style={{color:"red"}}>Forgot password</a>
        </Fragment>
    )
}