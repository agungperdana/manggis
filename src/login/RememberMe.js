import React from "react";
import { Checkbox } from "antd";

export class RememberMe extends React.Component {

    constructor(props) {
        super(props);
        this.handleRemembermeChange = this.handleRemembermeChange.bind(this);
    }

    handleRemembermeChange(e) {
        this.props.handleRemembermeChange(e.target.checked);
    }

    render() {
        return (
            <Checkbox style={{marginBottom:10, width:"100%", textAlign:"left", color:"red"}}
                      checked={this.props.remember}
                      onChange={this.handleRemembermeChange}>
                          Remember me
            </Checkbox>
        )
    }
}