import React from 'react';

import { 
    Button 
} from 'antd';

import { 
    PlusCircleOutlined,
    ZoomInOutlined
} from '@ant-design/icons';

export default function TableTopBar({addDocAction, serachDocAction}) {

    return(
        <div style={{width:"100%", marginLeft:5}}>
              <Button icon={<PlusCircleOutlined/>} type="link" size="small" onClick={addDocAction}>
                Add new module
              </Button>
              <Button icon={<ZoomInOutlined/>} type="link" size="small" onClick={serachDocAction}>
                Search data
              </Button>
        </div>
    )
}