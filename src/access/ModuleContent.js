import React from 'react';
import { 
    Layout,
    Breadcrumb,
    Space
} from 'antd';

import { 
    AppstoreOutlined,
    BuildOutlined
} from '@ant-design/icons';

export default function ModuleContent({}) {

    return (
        <Layout.Content style={{backgroundColor:"#FFFFFF"}}>
            <Breadcrumb style={{padding:10}}>
              <Breadcrumb.Item>
                <BuildOutlined/> Access
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <AppstoreOutlined/> Module
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
              Module
            </Space>
        </Layout.Content>
    )
}