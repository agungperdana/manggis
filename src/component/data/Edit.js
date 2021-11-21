import React from "react";

import { 
    Tooltip,
    Button
} from 'antd';

import {
    EditFilled,
} from '@ant-design/icons';
import { Link } from "react-router-dom";

export class Edit extends React.Component {
    
    constructor(props) {

        super(props);

        this.openEditWindow = this.openEditWindow.bind(this);
    }

    openEditWindow(e) {

        this.props.openEditWindow(this.props.row);
    }

    render() {
        return (
            <Tooltip placement="bottomLeft" title="Edit data">
                <Link to={{pathname:this.props.path, state:{row:this.props.row}}}>
                <Button size="small" icon={<EditFilled/>} 
                        type="primary" style={{marginLeft:3}} 
                        shape="circle" block/>
                </Link>
            </Tooltip>
        )
    }
}