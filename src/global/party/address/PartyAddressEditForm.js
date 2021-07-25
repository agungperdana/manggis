import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { 
    Layout,
    notification,
    Form,
    Input,
    Select,
    Checkbox
} from 'antd';

import DataToolbar from '../../../component/DataToolbar';
import PartyAddressPrint from './PartyAddressPrint';

export default function PartyAddressEditForm({token, partyCode}) {

  const navigation = useHistory();
  const loc = useLocation();

  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [enabled, setEnabled] = React.useState(loc?.state?.data?.active);
  const [type, setType] = React.useState(loc?.state?.data?.type);
  const [value, setValue] = React.useState(loc?.state?.data?.description);
  const [postal, setPostal] = React.useState(loc?.state?.data?.postal);
  const [location, setLocation] = React.useState(loc?.state?.data?.location?.code);
  const [geo, setGeo] = React.useState([]);

  const loadGeographic = async () => {
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
          setGeo(json.result);
        }
    }
    catch(e) {}
  }

  React.useEffect(()=>{loadGeographic()},[]);

  const update = async () => {

    try {

      if(value && type && token && partyCode) {
        let response = await fetch('https://127.0.0.1:8585/partys/addresses/update', {
          method: 'PUT',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          },
          body:JSON.stringify({
            partyCode:partyCode,
            addressId:loc?.state?.data?.id,
            postal:postal,
            active:enabled
          })
        });

        let json = await response.json();
        if(json.status) {
          navigation.push("/global/party/edit/address");
        }
      }
      else {
        notification.error({
          message:"Error", 
          description:"address/type field cannot be empty."
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
            <DataToolbar saveAction={update}
                        cancelAction={()=>navigation.push("/global/party/edit/address")}
                        printAction={()=>setVisible(true)}/>

            <div style={{
                          width:"99%", 
                          height:"99%",
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
                            <Select.Option value="HOME">Home</Select.Option>
                            <Select.Option value="OFFICE">Office</Select.Option>
                            <Select.Option value="WAREHOUSE">Warehouse</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                        <Input name="address" defaultValue={value} onChange={(e)=>setValue(e.target.value)}/>
                    </Form.Item>
                    <Form.Item label="Location" name="location" rules={[{ required: true }]}>
                      <Select name="location" defaultValue={location} onChange={(txt)=>setLocation(txt)}>
                        {
                          geo.map((dat)=>{
                            return(
                              <Select.Option key={dat.code} value={dat.code}>{dat.name}</Select.Option>
                            );
                          })
                        }
                      </Select>
                    </Form.Item>
                    <Form.Item label="Postal" name="postal" rules={[{ required: true }]}>
                        <Input name="postal" defaultValue={postal} onChange={(e)=>setPostal(e.target.value)}/>
                    </Form.Item>
                    <Form.Item label="enabled" name="enabled">
                        <Checkbox checked={enabled} onChange={(e)=>setEnabled(e.target.checked)}/>
                    </Form.Item>
                </Form>
            </div>
            <PartyAddressPrint data={loc?.state?.data} visible={visible} cancelAction={()=>setVisible(false)}/>
        </Layout.Content>
  )
}