import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Layout,
    notification,
    Form,
    Input,
    Select,
    DatePicker
} from 'antd';

import moment from 'moment';
import DataToolbar from '../../../component/DataToolbar';

export default function PartyClassificationAddForm({token, partyCode}) {

  const navigation = useHistory();
  const [form] = Form.useForm();
  const [start, setStart] = React.useState(moment().format("YYYY-MM-DD"));
  const [end, setEnd] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [value, setValue] = React.useState(null);

  const create = async () => {

    try {

      if(start && type && value && token && partyCode) {
        let response = await fetch('https://127.0.0.1:8585/partys/classifications/create', {
          method: 'POST',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          },
          body:JSON.stringify({
            partyCode:partyCode,
            start:start,
            end:end,
            type:type,
            value:value
          })
        });

        let json = await response.json();
        if(json.status) {
          navigation.push("/global/party/edit/classification");
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
                        cancelAction={()=>navigation.push("/global/party/edit/classification")}
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
                  
                  <Form.Item label="Sart Date" name="start" rules={[{ required: true }]}>
                    <DatePicker name="start"
                        onChange={(dt, txt)=>setStart(moment(dt).format("YYYY-MM-DD"))} 
                        defaultValue={moment()} format="DD-MM-YYYY"/>
                    </Form.Item>
                    <Form.Item label="End Date" name="end">
                        <DatePicker name="end" format="DD-MM-YYYY" 
                                    onChange={(dt, txt)=>setEnd(txt)}/>
                    </Form.Item>
                    <Form.Item label="Type" name="type" rules={[{ required: true }]}>
                        <Select name="type" onChange={(txt)=>setType(txt)}>
                            <Select.Option value="INDUSTRY_CLASSIFICATION">Industry Classification</Select.Option>
                            <Select.Option value="SIZE_CLASSIFICATION">Size Classification</Select.Option>
                            <Select.Option value="INCOME_CLASSIFICATIONS">Income Classification</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Value" name="valueText" rules={[{ required: true }]}>
                        <Input name="valueTxt" onChange={(e)=>setValue(e.target.value)}/>
                    </Form.Item>
                </Form>
            </div>
        </Layout.Content>
  )
}