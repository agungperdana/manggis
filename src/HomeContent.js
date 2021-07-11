import React from 'react';
import { 
    Layout,
    Breadcrumb,
    Space
} from 'antd';

import { 
    HomeFilled
} from '@ant-design/icons';

export default function HomeContent({}) {

    return (
        <Layout.Content style={{backgroundColor:"#FFFFFF"}}>
            <Breadcrumb style={{padding:10}}>
              <Breadcrumb.Item>
                <HomeFilled/>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Dashboard
              </Breadcrumb.Item>
            </Breadcrumb>
            <Space style={{
                          width:"99%", 
                          height:"95%",
                          backgroundColor:"#FFFFFF", 
                          padding:5,
                          margin:5, 
                          borderStyle:"solid",
                          borderColor:"#BFBFBF",
                          borderWidth:1,
                          borderRadius:10}}>
              askfjlasjlfkjaslkflkasfklaslkflk
            </Space>
        </Layout.Content>
    )
}