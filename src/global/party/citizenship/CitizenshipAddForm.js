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

export default function CitizenshipAddForm({token, partyCode}) {

  const navigation = useHistory();
  const [form] = Form.useForm();
  const [start, setStart] = React.useState(moment());
  const [end, setEnd] = React.useState(null);
  const [passportNumber, setPassportNumber] = React.useState(null);
  const [passportIssuedDate, setPassportIssuedDate] = React.useState(null);
  const [passportExpiredDate, setPassportExpiredDate] = React.useState(null);
  const [countryCode, setCountryCode] = React.useState(null);
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

  const create = async () => {

    try {

      if(start && countryCode && token && partyCode) {
        let response = await fetch('https://127.0.0.1:8585/partys/citizenships/create', {
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
            passportNumber:passportNumber,
            passportIssuedDate:passportIssuedDate,
            passportExpiredDate:passportExpiredDate,
            countryCode:countryCode
          })
        });

        let json = await response.json();
        if(json.status) {
          navigation.push("/global/party/edit/citizenship");
        }
      }
      else {
        notification.error({
          message:"Error", 
          description:"start/country field cannot be empty."
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

  React.useEffect(()=>{loadGeographic()}, []);

  return (
        <Layout.Content style={{backgroundColor:"#FFFFFF"}}>
            <DataToolbar saveAction={create}
                        cancelAction={()=>navigation.push("/global/party/edit/citizenship")}
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
                                    onChange={(dt, txt)=>setEnd(moment(dt).format("YYYY-MM-DD"))}/>
                    </Form.Item>
                    <Form.Item label="Passport Number" name="passportNumber">
                        <Input name="passportNumber" onChange={(e)=>setPassportNumber(e.target.value)}/>
                    </Form.Item>
                    <Form.Item label="Passport Issued Date" name="passportIssuedDate">
                        <DatePicker name="passportIssuedDate" format="DD-MM-YYYY" 
                                    onChange={(dt, txt)=>setPassportIssuedDate(moment(dt).format("YYYY-MM-DD"))}/>
                    </Form.Item>
                    <Form.Item label="Passport Expired Date" name="passportExpiredDate">
                        <DatePicker name="passportExpiredDate" format="DD-MM-YYYY" 
                                    onChange={(dt, txt)=>setPassportExpiredDate(moment(dt).format("YYYY-MM-DD"))}/>
                    </Form.Item>
                    <Form.Item label="Country Code" name="countryCode" rules={[{ required: true }]}>
                      <Select name="countryCode" onChange={(txt)=>setCountryCode(txt)}>
                        {
                          geo.map((dat)=>{
                            
                            return(
                              dat.type === "COUNTRY"?
                              <Select.Option key={dat.code} value={dat.code}>{dat.name}</Select.Option>:null
                            );
                          })
                        }
                      </Select>
                    </Form.Item>
                </Form>
            </div>
        </Layout.Content>
  )
}