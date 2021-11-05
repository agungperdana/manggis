import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
    BlockOutlined,
} from '@ant-design/icons';
import DataToolbar from '../../component/DataToolbar';
import RolePrint from './RolePrint';

export default function RoleEditForm({token}) {

  const navigation = useHistory();
  const location = useLocation();
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [code, setCode] = React.useState(location?.state?.rowData?.code);
  const [name, setName] = React.useState(location?.state?.rowData?.name);
  const [note, setNote] = React.useState(location?.state?.rowData?.note);
  const [enabled, setEnabled] = React.useState(location?.state?.rowData?.enabled);
  const [modules, setModules] = React.useState([]);

  const roleMods = async () => {

    if(location?.state?.rowData?.modules) {
      
      let objs = [];
      location.state.rowData.modules.map(row=>{
        objs.push({
          moduleCode:row.moduleCode,
          moduleName:row.moduleName,
          moduleGroup:row.moduleGroup,
          read:row.read,
          add:row.add,
          edit:row.edit,
          delete:row.delete,
          print:row.print
        })
      });

      objs.sort();
      setModules(objs)
    }
  }

  React.useEffect(()=>{roleMods()},[])

  const create = async () => {

    try {

      if(code && name) {

        let response = await fetch('https://127.0.0.1:8585/roles/update', {
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
            'enabled':enabled,
            'modules':modules
          })
        });

        let json = await response.json();
        if(json.status) {
          navigation.push("/access/role/list");
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

  const column = [
    {title:"Code", dataIndex:"moduleCode", key:"Code", width:200},
    {title:"Name", dataIndex:"moduleName", key:"Name"},
    {title:"Read", dataIndex:"", key:"read", width:65, render:(text, row)=><Checkbox defaultChecked={modules.find(md=>md.moduleCode===row.moduleCode)?.read} onChange={(e)=>modules.find(md=>md.moduleCode===row.moduleCode).read=e.target.checked}/>},
    {title:"Add", dataIndex:"", key:"add", width:65, render:(text, row)=><Checkbox defaultChecked={modules.find(md=>md.moduleCode===row.moduleCode)?.add} onChange={(e)=>modules.find(md=>md.moduleCode===row.moduleCode).add=e.target.checked}/>},
    {title:"Edit", dataIndex:"", key:"edit", width:65, render:(text, row)=><Checkbox defaultChecked={modules.find(md=>md.moduleCode===row.moduleCode)?.edit} onChange={(e)=>modules.find(md=>md.moduleCode===row.moduleCode).edit=e.target.checked}/>},
    {title:"Delete", dataIndex:"", key:"delete", width:65, render:(text, row)=><Checkbox defaultChecked={modules.find(md=>md.moduleCode===row.moduleCode)?.delete} onChange={(e)=>modules.find(md=>md.moduleCode===row.moduleCode).delete=e.target.checked}/>},
    {title:"Print", dataIndex:"", key:"print", width:65, render:(text, row)=><Checkbox defaultChecked={modules.find(md=>md.moduleCode===row.moduleCode)?.print} onChange={(e)=>modules.find(md=>md.moduleCode===row.moduleCode).print=e.target.checked}/>}
  ]

  return (
      <>
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
            <DataToolbar saveAction={create}
                        cancelAction={()=>navigation.push("/access/role/list")}
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
                    <Input defaultValue={code} onChange={(e)=>setCode(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input defaultValue={name} onChange={(e)=>setName(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Enabled" name="enabled" rules={[{ required: true }]}>
                    <Checkbox defaultChecked={enabled} onChange={(e)=>setEnabled(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Description" name="note">
                    <Input defaultValue={note} onChange={(e)=>setNote(e.target.value)}/>
                  </Form.Item>
                </Form>
                <Table dataSource={modules} 
                        columns={column} 
                        style={{width:"100%"}} 
                        size="small"/>
            </div>
        </Layout.Content>
        <RolePrint visible={visible} data={location?.state?.rowData} cancelAction={()=>setVisible(false)}/>
      </>
  )
}