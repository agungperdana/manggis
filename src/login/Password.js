import React from "react";
import { KeyOutlined } from "@ant-design/icons";
import { Input } from "antd";

export class Password extends React.Component {

    constructor(props) {
        super(props);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handlePasswordChange(e) {
        this.props.onPasswordChange(e.target.value);
    }

    render() {
        return(
            <Input  prefix={<KeyOutlined/>}
                    value={this.props.password}
                    onChange={this.handlePasswordChange} 
                    type="password" placeholder="Enter login password" 
                    style={{width:"100%", height:40 , marginBottom:10}}/>
        )
    }
}