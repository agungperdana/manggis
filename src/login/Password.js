import React from "react";
import { KeyOutlined } from "@ant-design/icons";
import { Input } from "antd";

export function Password(props) {

    return(
        <Input  prefix={<KeyOutlined/>}
                value={props.password}
                onChange={(e)=>props.onPasswordChange(e.target.value)} 
                type="password" placeholder="Enter login password" 
                style={{width:"100%", height:40 , marginBottom:10}}/>
    )
}