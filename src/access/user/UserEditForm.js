import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { 
    Layout,
    Breadcrumb,
    notification,
    Form,
    Input,
    Checkbox,
    Table,
    Button
} from 'antd';

import { 
    BuildOutlined,
    UserOutlined,
} from '@ant-design/icons';

import DataToolbar from '../../component/DataToolbar';
import UserPrint from './UserPrint';

export default function UserEditForm({token}) {

  const navigation = useHistory();
  const location = useLocation();
  const [form] = Form.useForm();
  const [email, setEmail] = React.useState(location?.state?.rowData?.email);
  const [name, setName] = React.useState(location?.state?.rowData?.name);
  const [locked, setLocked] = React.useState(location?.state?.rowData?.locked);
  const [enabled, setEnabled] = React.useState(location?.state?.rowData?.enabled);
  const [roles, setRoles] = React.useState(location?.state?.rowData?.roles);
  const [visible, setVisible] = React.useState(false);

  const create = async () => {

    try {
      console.log(roles);

      if(email && name) {
        let response = await fetch('https://127.0.0.1:8585/users/update', {
          method: 'PUT',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          },
          body:JSON.stringify({
            'email':email,
            'name':name,
            'enabled':enabled,
            'locked':locked,
            'roles':roles
          })
        });

        let json = await response.json();
        if(json.status) {
          navigation.push("/access/user/list");
        }
      }
      else {
        notification.error({
          message:"Error", 
          description:"email/name field cannot be empty."
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

  const column = [
    {title:"Code", dataIndex:"roleCode", key:"Code", width:200},
    {title:"Name", dataIndex:"roleName", key:"Name"},
    {title:"Enabled", dataIndex:"enabled", key:"enabled", width:100, render:(text, row)=><Checkbox defaultChecked={row.enabled} onChange={(e)=>roles.find(md=>md.roleCode===row.roleCode).enabled=e.target.checked}/>},
  ]

  return (
      <>
        <Layout.Content style={{backgroundColor:"#FFFFFF"}}>
            <Breadcrumb style={{padding:10}}>
              <Breadcrumb.Item>
                <BuildOutlined/> Access
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <UserOutlined/> User
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Edit
              </Breadcrumb.Item>
            </Breadcrumb>
            <DataToolbar saveAction={create}
                        cancelAction={()=>navigation.push("/access/user/list")}
                        printAction={()=>setVisible(true)}/>

            <div style={{
                          width:"99%", 
                          height:"88%",
                          backgroundColor:"#FFFFFF", 
                          padding:10,
                          margin:5, 
                          borderStyle:"solid",
                          borderColor:"#BFBFBF",
                          borderWidth:1,
                          borderRadius:10,
                          flexWrap:"wrap",
                          alignContent:"flex-start"}}>

                <Form style={{width:"60%", alignSelf:"flex-start", padding:3}} 
                      labelCol={{span:8}} 
                      wrapperCol={{span:16}} 
                      form={form}
                      size="small">
                  
                  <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                    <Input defaultValue={email} onChange={(e)=>setEmail(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input defaultValue={name} onChange={(e)=>setName(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Password" name="password">
                    <Button type="link" onClick={()=>navigation.push("/access/user/add")}>Change Password</Button>
                  </Form.Item>
                  <Form.Item label="Enabled" name="enabled">
                    <Checkbox defaultChecked={enabled} onChange={(e)=>setEnabled(e.target.checked)}/>
                  </Form.Item>
                  <Form.Item label="Locked" name="locked">
                    <Checkbox defaultChecked={locked} onChange={(e)=>setLocked(e.target.checked)}/>
                  </Form.Item>
                </Form>
                <Table dataSource={roles} 
                        columns={column} 
                        style={{width:"100%"}} 
                        size="small"/>
            </div>
        </Layout.Content>
        <UserPrint visible={visible} confirmAction={()=>{}} cancelAction={() => setVisible(false)} data={location?.state?.rowData}/>
      </>
  )
}