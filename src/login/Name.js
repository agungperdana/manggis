import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

export class Name extends React.Component {

    constructor(props) {
        super(props);
        
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    handleUsernameChange(e) {
        this.props.onUserNameChange(e.target.value);
    }

    render() {
        return(
            <Input  prefix={<UserOutlined/>} 
                    value={this.props.username}
                    onChange={this.handleUsernameChange} 
                    placeholder="Enter login name" 
                    style={{width:"100%", height:40, marginBottom:10}}/>
        )
    }
}