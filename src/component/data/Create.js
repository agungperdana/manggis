import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

export class Create extends React.Component {

    constructor(props) {

        super(props);
    }

    render() {
        return(
            <Link exact to={this.props.path}>
                <Button icon={<PlusCircleOutlined/>} type="link" size="small">Add new</Button>
            </Link>
        );
    }
}