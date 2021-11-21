import React from "react";

import { 
    Tooltip,
    Button
} from 'antd';

import {
    PrinterFilled
} from '@ant-design/icons';

export class Print extends React.Component {
    
    constructor(props) {

        super(props);
        this.openPrintWindow = this.openPrintWindow.bind(this);
    }

    openPrintWindow(e) {

        this.props.openPrintWindow(this.props.row);
    }

    render() {
        return (
            <Tooltip placement="bottomLeft" title="View data">
                <Button size="small" icon={<PrinterFilled/>} type="ghost" 
                        style={{marginLeft:3, backgroundColor:"#FFD300"}} 
                        shape="circle" block
                        onClick={this.openPrintWindow}/>
            </Tooltip>
        )
    }
}