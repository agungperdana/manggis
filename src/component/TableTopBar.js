import React from 'react';

import { 
    Button
} from 'antd';

import { 
  CloudSyncOutlined,
    PlusCircleOutlined,
    ZoomInOutlined
} from '@ant-design/icons';

export default function TableTopBar({addDocAction, serachDocAction, reloadAction}) {

    return(
        <div style={{width:"100%", marginLeft:5}}>
              <Button icon={<PlusCircleOutlined/>} type="link" size="small" onClick={addDocAction}>
                Add new
              </Button>
              <Button icon={<ZoomInOutlined/>} type="link" size="small" onClick={serachDocAction}>
                Search data
              </Button>
              <Button icon={<CloudSyncOutlined/>} type="link" size="small" onClick={reloadAction}>
                Reload data
              </Button>
        </div>
    )
}