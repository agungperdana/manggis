import React from 'react';
import { 
    useHistory,
    useLocation 
} from 'react-router-dom';
import { 
    Layout,
    notification,
    Form,
    Select,
    DatePicker
} from 'antd';

import moment from 'moment';

import DataToolbar from '../../../component/DataToolbar';
import PartyRelationshipPrint from './PartyRelationshipPrint';

export default function PartyRelationshipEditForm({token, partyCode}) {

  const navigation = useHistory();
  const location = useLocation();

  const [form] = Form.useForm();
  const [start, setStart] = React.useState(moment(location?.state?.data?.start));
  const [end, setEnd] = React.useState(location?.state?.data?.end?moment(location?.state?.data?.end):null);
  const [type, setType] = React.useState(location?.state?.data?.type);
  const [toParty, setToParty] = React.useState(location?.state?.data?.toPartyCode);
  const [visible, setVisible] = React.useState(false);
  const [partys, setPartys] = React.useState([]);

  const loadParty = async () => {
    try {
      let response = await fetch('https://127.0.0.1:8585/partys/all-partys/0/1000', {
          method: 'GET',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          }
        });

        let json = await response.json();
        if(json.status) {
          setPartys(json.result);
        }
    }catch(e){}
  }

  React.useEffect(()=>{loadParty()}, []);

  const update = async () => {

    try {

      if(end) {
        let response = await fetch('https://127.0.0.1:8585/partys/relationships/update', {
          method: 'PUT',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          },
          body:JSON.stringify({
            partyCode:partyCode,
            relationshipId:location?.state?.data?.id,
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

    navigation.push("/global/party/edit/relationship");
  }

  return (
      <>
        <Layout.Content style={{backgroundColor:"#FFFFFF"}}>
            <DataToolbar saveAction={update}
                        cancelAction={()=>navigation.push("/global/party/edit/relationship")}
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
                    <DatePicker name="start" value={start?start:null}
                        onChange={(dt, txt)=>setStart(moment(dt).format("YYYY-MM-DD"))} 
                        defaultValue={start?moment(start):null} format="DD-MM-YYYY"/>
                    </Form.Item>
                    <Form.Item label="End Date" name="end" rules={[{ required: true }]}>
                        <DatePicker name="end" format="DD-MM-YYYY" 
                                    defaultValue={end?moment(end):null}
                                    onChange={(dt, txt)=>setEnd(moment(dt).format("YYYY-MM-DD"))}/>
                    </Form.Item>
                    <Form.Item label="To Party" name="toParty">
                        <Select name="toParty" defaultValue={toParty} onChange={(txt)=>setToParty(txt)}>
                        {
                          partys.map((party)=>{
                            return(<Select.Option key={party.code} value={party.code}>{party.name}</Select.Option>)
                          })
                        }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Type" name="type">
                        <Select name="type" defaultValue={type} onChange={(txt)=>setType(txt)}>
                          <Select.Option value="EMPLOYMENT_RELATIONSHIP">Employment Relationship</Select.Option>
                            <Select.Option value="CUSTOMER_RELATIONSHIP">Customer Relationship</Select.Option>
                            <Select.Option value="SUPPLIER_RELATIONSHIP">Supplier Relationship</Select.Option>
                            <Select.Option value="CONTACT_PERSON_RELATIONSHIP">Contact Person Relationship</Select.Option>
                            <Select.Option value="ORGANIZATION_ROLLUP">Organization Rollup</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        </Layout.Content>
        <PartyRelationshipPrint visible={visible} data={location.state.data} cancelAction={()=>setVisible(false)}/>
    </>
  )
}