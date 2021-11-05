import React from "react";

import { 
    Tooltip,
    Popconfirm,
    Button
} from 'antd';

import {
    DeleteFilled,
} from '@ant-design/icons';

export class DeleteButton extends React.Component {
    
    render() {
        return (
            <Tooltip placement="bottomLeft" title="Delete data">
                <Popconfirm title="Are you sure?" 
                            okText="Delete" 
                            cancelText="Cancel" 
                            onConfirm={delAction}>
                    <Button size="small" icon={<DeleteFilled/>} shape="circle" danger/>
                </Popconfirm>
            </Tooltip>
        )
    }
}