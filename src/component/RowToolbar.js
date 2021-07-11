import React from 'react';
import { 
    Tooltip,
    Popconfirm,
    Button
} from 'antd';

import {
    DeleteFilled,
    EditFilled,
    PrinterFilled
} from '@ant-design/icons';

export default function RowToolbar({delAction, editAction, printAction}) {

    return(
        <div>
            <Tooltip placement="bottomLeft" title="Delete data">
                <Popconfirm title="Are you sure?" 
                            okText="Delete" 
                            cancelText="Cancel" 
                            onConfirm={delAction}>
                    <Button size="small" icon={<DeleteFilled/>} shape="circle" danger/>
                </Popconfirm>
            </Tooltip>

            <Tooltip placement="bottomLeft" title="Edit data">
                <Button size="small" icon={<EditFilled/>} 
                        type="primary" style={{marginLeft:3}} 
                        shape="circle" block
                        onClick={editAction}/>
            </Tooltip>
            <Tooltip placement="bottomLeft" title="View data">
                <Button size="small" icon={<PrinterFilled/>} type="ghost" 
                        style={{marginLeft:3, backgroundColor:"#FFD300"}} 
                        shape="circle" block
                        onClick={printAction}/>
            </Tooltip>
        </div>
    );
}