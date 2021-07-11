import React from 'react';
import { 
    Button
} from 'antd';
import { 
    CheckCircleFilled,
    LeftCircleFilled,
    PrinterFilled 
} from '@ant-design/icons';

export default function DataToolbar({saveAction, cancelAction, printAction}) {

    return (
        <div style={{width:"100%", marginLeft:5}}>
              <Button icon={<CheckCircleFilled/>} type="link" size="small" onClick={saveAction}>
                Save
              </Button>
              <Button icon={<LeftCircleFilled/>} type="link" size="small" onClick={cancelAction}>
                Cancel
              </Button>
              <Button icon={<PrinterFilled/>} type="link" size="small" onClick={printAction}>
                Print
              </Button>
        </div>
    );
}