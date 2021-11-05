import React from 'react';
import { 
    useHistory,
    useLocation 
} from 'react-router-dom';
import { 
    Layout,
    Breadcrumb,
    notification,
    Form,
    Input,
    Select,
    DatePicker
} from 'antd';

import moment from 'moment';

import DataToolbar from '../../../component/DataToolbar';
import PartyClassificationPrint from './PartyClassificationPrint';

export default function PartyClassificationEditForm({token, partyCode}) {

  const navigation = useHistory();
  const location = useLocation();

  const [form] = Form.useForm();
  const [start, setStart] = React.useState(location?.state?.data?.start?moment(location.state.data.start):null);
  const [end, setEnd] = React.useState(location?.state?.data?.end?moment(location.state.data.end):null);
  const [type, setType] = React.useState(location?.state?.data?.type);
  const [value, setValue] = React.useState(location?.state?.data?.value);
  const [visible, setVisible] = React.useState(false);

  const create = async () => {

    try {

      if(end) {
        let response = await fetch('https://127.0.0.1:8585/partys/classifications/update', {
          method: 'PUT',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          },
          body:JSON.stringify({
            partyCode:partyCode,
            partyClassificationId:location?.state?.data?.id,
            end:end
          })
        });

        let json = await response.json();
        if(json.status) {
          
        }
      }
    } 
    catch (error) {
          
      notification.error({
        message:"Error", 
        description:error?.message
      });
    }

    navigation.push("/global/party/edit/classification");
  }

  return (
      <>
        <Layout.Content style={{backgroundColor:"#FFFFFF"}}>
            <DataToolbar saveAction={create}
                        cancelAction={()=>navigation.push("/global/party/edit/classification")}
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

                <Form style={{width:"60%", alignSelf:"flex-start", padding:3}} 
                      labelCol={{span:8}} 
                      wrapperCol={{span:16}} 
                      form={form}>
                  
                  <Form.Item label="Sart Date" name="start">
                    <DatePicker name="start" value={start?moment(start):null}
                        onChange={(dt, txt)=>setStart(moment(dt).format("YYYY-MM-DD"))} 
                        defaultValue={start?moment(start):null} format="DD-MM-YYYY"/>
                    </Form.Item>
                    <Form.Item label="End Date" name="end" rules={[{ required: true }]}>
                        <DatePicker name="end" format="DD-MM-YYYY" 
                                    defaultValue={end?moment(end):null}
                                    onChange={(dt, txt)=>setEnd(moment(dt).format("YYYY-MM-DD"))}/>
                    </Form.Item>
                    <Form.Item label="Type" name="type">
                        <Select name="type" defaultValue={type} onChange={(txt)=>setType(txt)}>
                            <Select.Option value="INDUSTRY_CLASSIFICATION">Industry Classification</Select.Option>
                            <Select.Option value="SIZE_CLASSIFICATION">Size Classification</Select.Option>
                            <Select.Option value="INCOME_CLASSIFICATIONS">Income Classification</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Value" name="valueText">
                        <Input name="valueTxt" defaultValue={value} onChange={(e)=>setValue(e.target.value)}/>
                    </Form.Item>
                </Form>
            </div>
        </Layout.Content>
        <PartyClassificationPrint visible={visible} data={location.state.data} cancelAction={()=>setVisible(false)}/>
    </>
  )
}