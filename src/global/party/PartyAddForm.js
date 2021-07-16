import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Layout,
    Breadcrumb,
    notification,
    Form,
    Input,
    Select,
    DatePicker
} from 'antd';

import { 
    GlobalOutlined,
    GoldFilled,
} from '@ant-design/icons';

import DataToolbar from '../../component/DataToolbar';

export default function PartyAddForm({token}) {

  const navigation = useHistory();
  const [form] = Form.useForm();
  const [code, setCode] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [gender, setGender] = React.useState(null);
  const [birthDate, setBirthDate] = React.useState(null);
  const [taxCode, setTaxCode] = React.useState(null);
  const [geographics, setGeographics] = React.useState([]);
  const [birthPlace, setBirthPlace] = React.useState(null);

  const loadGeographic = async () => {

    try {
      let response = await fetch('https://127.0.0.1:8585/geographics/all-geographics/0/1000', {
        method: 'GET',
        headers: {
          Accept: 'application/json', 
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+token,
        },
      });

      let json = await response.json();
      if(json.status) {
        setGeographics(json.result);
      }
    } 
    catch (error) {}
  }

  React.useEffect(()=>{loadGeographic()}, []);

  const create = async () => {

    try {

      if(code && name && type) {
        let response = await fetch('https://127.0.0.1:8585/partys/create', {
          method: 'POST',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          },
          body:JSON.stringify({
            'code':code,
            'name':name,
            'type':type,
            'gender':gender,
            'birthPlace':birthPlace,
            'birthDate':birthDate,
            'taxCode':taxCode
          })
        });

        let json = await response.json();
        if(json.status) {
          navigation.push("/global/party/list");
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
                <GoldFilled/> Party
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Add new
              </Breadcrumb.Item>
            </Breadcrumb>
            <DataToolbar saveAction={create}
                        cancelAction={()=>navigation.push("/global/party/list")}
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
                      <Select.Option value="PERSON">Person</Select.Option>
                      <Select.Option value="ORGANIZATION">Organization</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="taxCode" name="taxCode">
                    <Input onChange={(e)=>setTaxCode(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="birthPlace" name="birthPlace" rules={[{ required: true }]}>
                    <Select onChange={(txt)=>setBirthPlace(txt)}>
                      {
                        geographics.map(geo=>{
                          return (<Select.Option value={geo.code}>{geo.name}</Select.Option>)
                        })
                      }
                      
                    </Select>
                  </Form.Item>
                  <Form.Item label="birthDate" name="birthDate">
                    <DatePicker format="YYYY-MM-DD" onChange={(mom, txt)=>setBirthDate(txt)}/>
                  </Form.Item>
                  {
                    (type && type==='PERSON')?
                    <Form.Item label="gender" name="gender">
                      <Select onChange={(txt)=>setGender(txt)}>
                        <Select.Option value="MALE">Male</Select.Option>
                        <Select.Option value="FEMALE">Female</Select.Option>
                      </Select>
                    </Form.Item>
                    :<></>
                  }
                </Form>
            </div>
        </Layout.Content>
  )
}