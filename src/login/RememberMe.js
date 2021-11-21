import React from "react";
import { Checkbox } from "antd";

export function RememberMe(props) {

    return (
        <Checkbox style={{marginBottom:10, width:"100%", textAlign:"left", color:"red"}}
                  checked={props.remember}
                  onChange={(e)=>props.handleRemembermeChange(e.target.checked)}>
                      Remember me
        </Checkbox>
    )
}