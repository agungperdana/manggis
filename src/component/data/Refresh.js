import { CloudSyncOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

export class Refresh extends React.Component {

    constructor(props) {

        super(props);
        this.doRefresh = this.doRefresh.bind(this);
    }

    doRefresh() {
        this.props.refresh();
    }

    render() {
        return(
            <Button icon={<CloudSyncOutlined/>} 
                    type="link" 
                    size="small" 
                    onClick={this.doRefresh}>
                Reload data
            </Button>
        );
    }
}