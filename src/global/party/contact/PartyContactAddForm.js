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

import DataToolbar from '../../../component/DataToolbar';

export default function PartyContactAddForm({token, partyCode}) {

  const navigation = useHistory();
  const [form] = Form.useForm();
  const [enabled, setEnabled] = React.useState(false);
  const [type, setType] = React.useState(null);
  const [value, setValue] = React.useState(null);

  const create = async () => {

    try {

      if(value && type && token && partyCode) {
        let response = await fetch('https://127.0.0.1:8585/partys/contacts/create', {
          method: 'POST',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          },
          body:JSON.stringify({
            partyCode:partyCode,
            active:enabled,
            type:type,
            contact:value
          })
        });

        let json = await response.json();
        if(json.status) {
          navigation.push("/global/party/edit/contact");
        }
      }
      else {
        notification.error({
          message:"Error", 
          description:"start/value/type field cannot be empty."
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
            <DataToolbar saveAction={create}
                        cancelAction={()=>navigation.push("/global/party/edit/contact")}
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
                      form={form}
                      size="small">
                  
                    <Form.Item label="Type" name="type" rules={[{ required: true }]}>
                        <Select name="type" onChange={(txt)=>setType(txt)}>
                            <Select.Option value="CELL_PHONE">Cell Phone</Select.Option>
                            <Select.Option value="HOME_PHONE">Home Phone</Select.Option>
                            <Select.Option value="OFFICE_PHONE">Office Phone</Select.Option>
                            <Select.Option value="PAGER">Pager</Select.Option>
                            <Select.Option value="EMAIL">Email</Select.Option>
                            <Select.Option value="POSTBOX">Post Box</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Value" name="valueText" rules={[{ required: true }]}>
                        <Input name="valueTxt" onChange={(e)=>setValue(e.target.value)}/>
                    </Form.Item>
                    <Form.Item label="enabled" name="enabled">
                        <Checkbox onChange={(e)=>setEnabled(e.target.checked)}/>
                    </Form.Item>
                </Form>
            </div>
        </Layout.Content>
  )
}