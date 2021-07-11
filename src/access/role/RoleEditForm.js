import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
    BlockOutlined,
} from '@ant-design/icons';
import DataToolbar from '../../component/DataToolbar';

export default function RoleEditForm({token}) {

  const navigation = useHistory();
  const location = useLocation();

  const [form] = Form.useForm();
  const [code, setCode] = React.useState(location?.state?.rowData?.code);
  const [name, setName] = React.useState(location?.state?.rowData?.name);
  const [note, setNote] = React.useState(location?.state?.rowData?.note);
  const [enabled, setEnabled] = React.useState(location?.state?.rowData?.enabled);

  const update = async () => {

    try {

      if(code && name) {

        let response = await fetch('https://127.0.0.1:8585/roles/edit', {
          method: 'PUT',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          },
          body:JSON.stringify({
            'code':code,
            'name':name,
            'note':note,
            'enabled':enabled
          })
        });

        let json = await response.json();
        if(json.status) {
          navigation.push("/access/roles/list");
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
        <Layout.Content style={{backgroundColor:"#FFFFFF"}}>
            <Breadcrumb style={{padding:10}}>
              <Breadcrumb.Item>
                <BuildOutlined/> Access
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <BlockOutlined/> Role
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Edit
              </Breadcrumb.Item>
            </Breadcrumb>
            <DataToolbar saveAction={update} 
                        cancelAction={()=>navigation.push("/access/role/list")}
                        printAction={()=>navigation.push("/access/role/list")}/>

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
                    <Input defaultValue={code} readOnly={true} onChange={(e)=>setCode(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input defaultValue={name}  onChange={(e)=>setName(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Enabled" name="enabled" rules={[{ required: true }]}>
                    <Checkbox checked={enabled} onChange={(e)=>setEnabled(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Description" name="note">
                    <Input defaultValue={note}  onChange={(e)=>setNote(e.target.value)}/>
                  </Form.Item>
                </Form>
            </div>
        </Layout.Content>
  )
}