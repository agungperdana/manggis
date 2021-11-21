import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Layout,
    Breadcrumb,
    notification,
    Form,
    Input,
    Select,
    Checkbox
} from 'antd';

import { 
    BuildOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
import DataToolbar from '../../component/DataToolbar';

export default function ModuleAddForm({token}) {

  const navigation = useHistory();
  const [form] = Form.useForm();
  const [code, setCode] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [note, setNote] = React.useState(null);
  const [group, setGroup] = React.useState(null);
  const [enabled, setEnabled] = React.useState(true);

  const create = async () => {

    try {

      if(code && name && group) {

        let response = await fetch('https://127.0.0.1:8585/modules/create', {
          method: 'POST',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          },
          body:JSON.stringify({
            'code':code,
            'name':name,
            'note':note,
            'group':group,
            'enabled':enabled
          })
        });

        let json = await response.json();
        if(json.status) {
          navigation.push("/access/module/list");
        }
      }
      else {
        notification.error({
          message:"Error", 
          description:"code, name or group field cannot be empty."
        });
      }     
    } 
    catch (error) {
          
      notification.error({
        message:"Error", 
        description:error?.message
      });
    }
  }

  return (
        <Layout.Content className="content">
            <Breadcrumb className="breadcrumb">
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
            <DataToolbar saveAction={create}
                        cancelAction={()=>navigation.push("/access/module/list")}
                        printAction={()=>navigation.push("/access/module/list")}/>

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

                <Form style={{width:"60%", alignSelf:"flex-start"}} 
                      labelCol={{span:8}} 
                      wrapperCol={{span:16}} 
                      form={form}>
                  
                  <Form.Item label="Code" name="code" rules={[{ required: true }]}>
                    <Input onChange={(e)=>setCode(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input onChange={(e)=>setName(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Group" name="group" rules={[{ required: true }]}>
                    <Select onSelect={(value)=>setGroup(value)}>
                      <Select.Option value="SYSTEM">SYSTEM</Select.Option>
                      <Select.Option value="SECURITY">SECURITY</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Enabled" name="enabled" rules={[{ required: true }]}>
                    <Checkbox checked={enabled} onChange={(e)=>setEnabled(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Description" name="note">
                    <Input onChange={(e)=>setNote(e.target.value)}/>
                  </Form.Item>
                </Form>
            </div>
        </Layout.Content>
  )
}