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
    AppstoreOutlined,
} from '@ant-design/icons';

import DataToolbar from '../../component/DataToolbar';
import ModulePrint from './ModulePrint';

export default function ModuleEditForm({token}) {

  const navigation = useHistory();
  const location = useLocation();

  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [code, setCode] = React.useState(location?.state?.rowData?.code);
  const [name, setName] = React.useState(location?.state?.rowData?.name);
  const [note, setNote] = React.useState(location?.state?.rowData?.note);
  const [group, setGroup] = React.useState(location?.state?.rowData?.group);
  const [enabled, setEnabled] = React.useState(location?.state?.rowData?.enabled);

  const update = async () => {

    try {

      if(code && name && group) {

        let response = await fetch('https://127.0.0.1:8585/modules/edit', {
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
      <>
        <Layout.Content style={{backgroundColor:"#FFFFFF"}}>
            <Breadcrumb style={{padding:10}}>
              <Breadcrumb.Item>
                <BuildOutlined/> Access
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <AppstoreOutlined/> Module
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Edit
              </Breadcrumb.Item>
            </Breadcrumb>
            <DataToolbar saveAction={update} 
                        cancelAction={()=>navigation.push("/access/module/list")}
                        printAction={()=>setVisible(true)}/>

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
                  <Form.Item label="Group" name="group" rules={[{ required: true }]}>
                    <Select defaultValue={group} onSelect={(value)=>setGroup(value)}>
                      <Select.Option value="SYSTEM">SYSTEM</Select.Option>
                      <Select.Option value="SECURITY">SECURITY</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Enabled" name="enabled" rules={[{ required: true }]}>
                    <Checkbox defaultChecked={enabled} onChange={(e)=>setEnabled(e.target.checked)}/>
                  </Form.Item>
                  <Form.Item label="Description" name="note">
                    <Input defaultValue={note}  onChange={(e)=>setNote(e.target.value)}/>
                  </Form.Item>
                </Form>
            </div>
        </Layout.Content>
        <ModulePrint visible={visible} confirmAction={()=>{}} cancelAction={() => setVisible(false)} data={location?.state?.rowData}/>
      </>
  )
}