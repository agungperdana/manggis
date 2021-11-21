import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

export default function Name(props) {

    return(
        <Input  prefix={<UserOutlined/>} 
                value={props.username}
                onChange={(e)=>props.onUserNameChange(e.target.value)} 
                placeholder="Enter login name" 
                style={{width:"100%", height:40, marginBottom:10}}/>
    )
}