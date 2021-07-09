import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Layout,
    Breadcrumb,
    Button,
    notification,
    Form,
    Input,
    Select,
    Checkbox
} from 'antd';

import { 
    BuildOutlined,
    AppstoreOutlined,
    CheckCircleFilled,
    LeftCircleFilled
} from '@ant-design/icons';

export default function ModuleAddForm({token}) {

  const navigation = useHistory();
  const [form] = Form.useForm();

  return (
        <Layout.Content style={{backgroundColor:"#FFFFFF"}}>
            <Breadcrumb style={{padding:10}}>
              <Breadcrumb.Item>
                <BuildOutlined/> Access
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <AppstoreOutlined/> Module
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Add new
              </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{width:"100%", marginLeft:5}}>
              <Button icon={<CheckCircleFilled/>} type="link" size="small">
                Save
              </Button>
              <Button icon={<LeftCircleFilled/>} type="link" size="small" onClick={()=>navigation.push("/access/module/list")}>
                Cancel
              </Button>
            </div>
            <div style={{
                          width:"99%", 
                          height:"95%",
                          backgroundColor:"#FFFFFF", 
                          padding:10,
                          margin:5, 
                          borderStyle:"solid",
                          borderColor:"#BFBFBF",
                          borderWidth:1,
                          borderRadius:10,
                          flexWrap:"wrap",
                          alignContent:"flex-start"}}>

                <Form style={{width:"60%", alignSelf:"flex-start"}} labelCol={{span:8}} wrapperCol={{span:16}} form={form}>
                  <Form.Item label="Code" rules={[{ required: true }]}>
                    <Input/>
                  </Form.Item>
                  <Form.Item label="Name" rules={[{ required: true }]}>
                    <Input/>
                  </Form.Item>
                  <Form.Item label="Description">
                    <Input/>
                  </Form.Item>
                  <Form.Item label="Group" rules={[{ required: true }]}>
                    <Select>
                      <Select.Option value="SYSTEM">SYSTEM</Select.Option>
                      <Select.Option value="SECURITY">SECURITY</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Enabled" rules={[{ required: true }]}>
                    <Checkbox checked={true}/>
                  </Form.Item>
                </Form>
            </div>
        </Layout.Content>
  )
}