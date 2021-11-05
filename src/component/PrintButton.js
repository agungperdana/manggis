import React from "react";

import { 
    Tooltip,
    Button
} from 'antd';

import {
    PrinterFilled
} from '@ant-design/icons';

export class PrintButton extends React.Component {
    
    render() {
        return (
            <Tooltip placement="bottomLeft" title="View data">
                <Button size="small" icon={<PrinterFilled/>} type="ghost" 
                        style={{marginLeft:3, backgroundColor:"#FFD300"}} 
                        shape="circle" block
                        onClick={printAction}/>
            </Tooltip>
        )
    }
}