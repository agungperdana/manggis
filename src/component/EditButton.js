import React from "react";

import { 
    Tooltip,
    Button
} from 'antd';

import {
    EditFilled,
} from '@ant-design/icons';

export class EditButton extends React.Component {
    
    render() {
        return (
            <Tooltip placement="bottomLeft" title="Edit data">
                <Button size="small" icon={<EditFilled/>} 
                        type="primary" style={{marginLeft:3}} 
                        shape="circle" block
                        onClick={editAction}/>
            </Tooltip>
        )
    }
}