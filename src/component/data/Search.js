import React from "react";
import { ZoomInOutlined } from "@ant-design/icons";
import { Button } from "antd";

export class Search extends React.Component {

    constructor(props) {

        super(props);
        this.openSearchDialog = this.openSearchDialog.bind(this);
    }

    openSearchDialog() {
        this.props.openSearchDialog();
    }

    render() {

        return(
            <Button icon={<ZoomInOutlined/>} 
                    type="link" 
                    size="small" 
                    onClick={this.openSearchDialog}>
                Search data
            </Button>
        );
    }
}