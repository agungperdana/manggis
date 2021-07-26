import React from 'react';
import { 
  useHistory, 
  useLocation 
} from 'react-router-dom';
import { 
    Layout,
    notification,
    Form,
    Input,
    Select,
    Checkbox
} from 'antd';

import DataToolbar from '../../../component/DataToolbar';
import PartyContactPrint from './PartyContactPrint';

export default function PartyContactEditForm({token, partyCode}) {

  const navigation = useHistory();
  const location = useLocation();
  
  const [form] = Form.useForm();
  const [enabled, setEnabled] = React.useState(location?.state?.data?.active);
  const [type, setType] = React.useState(location?.state?.data?.type);
  const [value, setValue] = React.useState(location?.state?.data?.contact);
  const [visible, setVisible] = React.useState(false);

  const update = async () => {

    try {

      if(token && partyCode) {
        let response = await fetch('https://127.0.0.1:8585/partys/contacts/update', {
          method: 'PUT',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          },
          body:JSON.stringify({
            partyCode:partyCode,
            contactId:location?.state?.data?.id,
            active:enabled
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
          description:"Update failed"
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
            <DataToolbar saveAction={update}
                         cancelAction={()=>navigation.push("/global/party/edit/contact")}
                         printAction={()=>{setVisible(true)}}/>

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
                        <Select name="type" defaultValue={type} onChange={(txt)=>setType(txt)}>
                            <Select.Option value="CELL_PHONE">Cell Phone</Select.Option>
                            <Select.Option value="HOME_PHONE">Home Phone</Select.Option>
                            <Select.Option value="OFFICE_PHONE">Office Phone</Select.Option>
                            <Select.Option value="PAGER">Pager</Select.Option>
                            <Select.Option value="EMAIL">Email</Select.Option>
                            <Select.Option value="POSTBOX">Post Box</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Value" name="valueText" rules={[{ required: true }]}>
                        <Input name="valueTxt" defaultValue={value} onChange={(e)=>setValue(e.target.value)}/>
                    </Form.Item>
                    <Form.Item label="enabled" name="enabled">
                        <Checkbox checked={enabled} onChange={(e)=>setEnabled(e.target.checked)}/>
                    </Form.Item>
                </Form>
            </div>
        </Layout.Content>
        <PartyContactPrint visible={visible} 
                          data={location?.state?.data} 
                          cancelAction={()=>setVisible(false)}/>
      </>
  )
}