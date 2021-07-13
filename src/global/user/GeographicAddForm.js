import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Layout,
    Breadcrumb,
    notification,
    Form,
    Input,
    Checkbox,
    Table
} from 'antd';

import { 
    BuildOutlined,
    UserOutlined,
} from '@ant-design/icons';
import DataToolbar from '../../component/DataToolbar';

export default function GeographicAddForm({token}) {

  const navigation = useHistory();
  const [form] = Form.useForm();
  const [email, setEmail] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [rePassword, setRePassword] = React.useState(null);
  const [locked, setLocked] = React.useState(false);
  const [enabled, setEnabled] = React.useState(true);
  const [roles, setRoles] = React.useState([]);

  const getRoles = async () => {
    try {

      let response = await fetch('https://127.0.0.1:8585/roles/all-roles/0/1000', {
          method: 'GET',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          }
        });

        let json = await response.json();
        if(json.status) {
          
          let mods = [];

          json.result.map(obj=>{

            if(obj.enabled) {
              mods.push({
                roleCode:obj?.code,
                roleName:obj?.name,
                enabled:false
              });
            }            
          })

          mods.sort();
          setRoles(mods);
        }
    } 
    catch (error) {}
  }

  React.useEffect(()=>{getRoles()},[])

  const create = async () => {

    try {

      if(email && name && password && rePassword && (password === rePassword)) {
        let response = await fetch('https://127.0.0.1:8585/users/create', {
          method: 'POST',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          },
          body:JSON.stringify({
            'email':email,
            'name':name,
            'password':password,
            'rePassword':rePassword,
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
          description:"email/name/password field cannot be empty."
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
    {title:"Enabled", dataIndex:"", key:"enabled", width:65, render:(text, row)=><Checkbox onChange={(e)=>roles.find(md=>md.roleCode===row.roleCode).enabled=e.target.checked}/>},
  ]

  return (
        <Layout.Content style={{backgroundColor:"#FFFFFF"}}>
            <Breadcrumb style={{padding:10}}>
              <Breadcrumb.Item>
                <BuildOutlined/> Access
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <UserOutlined/> User
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Add new
              </Breadcrumb.Item>
            </Breadcrumb>
            <DataToolbar saveAction={create}
                        cancelAction={()=>navigation.push("/access/user/list")}
                        printAction={()=>{}}/>

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

                <Form style={{width:"60%", alignSelf:"flex-start", padding:3}} 
                      labelCol={{span:8}} 
                      wrapperCol={{span:16}} 
                      form={form}>
                  
                  <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                    <Input onChange={(e)=>setEmail(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input onChange={(e)=>setName(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                    <Input.Password onChange={(e)=>setPassword(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Re Type Password" name="rePassword" rules={[{ required: true }]}>
                    <Input.Password onChange={(e)=>setRePassword(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Enabled" name="enabled" rules={[{ required: true }]}>
                    <Checkbox checked={enabled} onChange={(e)=>setEnabled(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Locked" name="locked" rules={[{ required: true }]}>
                    <Checkbox checked={locked} onChange={(e)=>setLocked(e.target.value)}/>
                  </Form.Item>
                </Form>
                <Table dataSource={roles} 
                        columns={column} 
                        style={{width:"100%"}} 
                        size="small"/>
            </div>
        </Layout.Content>
  )
}