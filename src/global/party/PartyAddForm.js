import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Layout,
    Breadcrumb,
    notification,
    Form,
    Input,
    Select
} from 'antd';

import { 
    CompassOutlined,
    GlobalOutlined,
} from '@ant-design/icons';
import DataToolbar from '../../component/DataToolbar';

export default function PartyAddForm({token}) {

  const navigation = useHistory();
  const [form] = Form.useForm();
  const [code, setCode] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [note, setNote] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [parent, setParent] = React.useState(null);
  const [parents, setParents] = React.useState([]);

  const getParents = async () => {
    try {

      let response = await fetch('https://127.0.0.1:8585/geographics/all-geographics/0/1000', {
          method: 'GET',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          }
        });

        let json = await response.json();
        if(json.status) {
          setParents(json.result);          
        }
    } 
    catch (error) {}
  }

  React.useEffect(()=>{getParents()},[])

  const create = async () => {

    try {

      if(code && name && type) {
        let response = await fetch('https://127.0.0.1:8585/geographics/create', {
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
            'type':type,
            'parent':parent,
          })
        });

        let json = await response.json();
        if(json.status) {
          navigation.push("/global/geographic/list");
        }
      }
      else {
        notification.error({
          message:"Error", 
          description:"code/name/type field cannot be empty."
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
                <GlobalOutlined/> Global
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <CompassOutlined/> Geographic
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Add new
              </Breadcrumb.Item>
            </Breadcrumb>
            <DataToolbar saveAction={create}
                        cancelAction={()=>navigation.push("/global/geographic/list")}
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
                  
                  <Form.Item label="Code" name="code" rules={[{ required: true }]}>
                    <Input onChange={(e)=>setCode(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input onChange={(e)=>setName(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="type" name="type" rules={[{ required: true }]}>
                    <Select onChange={(txt)=>setType(txt)}>
                      <Select.Option value="COUNTRY">Negara</Select.Option>
                      <Select.Option value="PROVINCE">Provinsi</Select.Option>
                      <Select.Option value="CITY">Kota</Select.Option>
                      <Select.Option value="REGENCY">Kabupaten</Select.Option>
                      <Select.Option value="DISTRICT">Kecamatan</Select.Option>
                      <Select.Option value="SUBDISTRICT">Kelurahan</Select.Option>
                      <Select.Option value="VILLAGE">Desa</Select.Option>
                      <Select.Option value="BACKWOODS">Dusun</Select.Option>
                      <Select.Option value="HAMLET">RW</Select.Option>
                      <Select.Option value="NEIGHBOURHOOD">RT</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Note" name="note">
                    <Input onChange={(e)=>setNote(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="parent" name="parent">
                    <Select onChange={(txt)=>setParent(txt)}>
                      {
                        parents?.map(ob=>{
                          return (<Select.Option key={ob.code} value={ob.code}>{ob.code+"-"+ob.name}</Select.Option>)
                        })
                      }                      
                    </Select>
                  </Form.Item>
                </Form>
            </div>
        </Layout.Content>
  )
}