import React from "react";

import { 
    Tooltip,
    Popconfirm,
    Button
} from 'antd';

import {
    DeleteFilled,
} from '@ant-design/icons';

export class Delete extends React.Component {
    
    constructor(props) {

        super(props);
        this.deleteRow = this.deleteRow.bind(this);
    }

    deleteRow(e) {

        this.props.doDelete(this.props.rowKey);
    }


    render() {
        return (
            <Tooltip placement="bottomLeft" title="Delete data">
                <Popconfirm title="Are you sure?" 
                            okText="Delete" 
                            cancelText="Cancel" 
                            onConfirm={this.deleteSelectedRow}>
                    <Button size="small" icon={<DeleteFilled/>} shape="circle" style={{marginLeft:3}} danger/>
                </Popconfirm>
            </Tooltip>
        )
    }
}