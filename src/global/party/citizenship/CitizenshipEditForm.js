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
    DatePicker
} from 'antd';

import moment from 'moment';

import DataToolbar from '../../../component/DataToolbar';
import CitizenshipPrint from './CitizenshipPrint';

export default function CitizenshipEditForm({token, partyCode}) {

  const navigation = useHistory();
  const location = useLocation();

  const [form] = Form.useForm();
  const [start, setStart] = React.useState(moment(location?.state?.data?.start));
  const [end, setEnd] = React.useState(location?.state?.data?.end);
  const [passportNumber, setPassportNumber] = React.useState(location?.state?.data?.passportNumber);
  const [passportIssuedDate, setPassportIssuedDate] = React.useState(location?.state?.data?.passportIssuedDate);
  const [passportExpiredDate, setPassportExpiredDate] = React.useState(location?.state?.data?.passportExpiredDate);
  const [countryCode, setCountryCode] = React.useState(location?.state?.data?.country);
  const [visible, setVisible] = React.useState(false);

  const update = async () => {

    try {
        
        let response = await fetch('https://127.0.0.1:8585/partys/citizenships/update', {
          method: 'PUT',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          },
          body:JSON.stringify({
            partyCode:partyCode,
            citizenshipId:location?.state?.data?.id,
            end:end,
            passportNumber:passportNumber,
            passportIssuedDate:passportIssuedDate,
            passportExpiredDate:passportExpiredDate
          })
        });

        let json = await response.json();
        if(json.status) {
          
        }
    } 
    catch (error) {
          
      notification.error({
        message:"Error", 
        description:error?.message
      });
    }

    navigation.push("/global/party/edit/citizenship");
  }

  return (
      <>
        <Layout.Content style={{backgroundColor:"#FFFFFF"}}>
            <DataToolbar saveAction={update}
                        cancelAction={()=>navigation.push("/global/party/edit/citizenship")}
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
                    <Form.Item label="End Date" name="end">
                        <DatePicker name="end" format="DD-MM-YYYY" 
                                    defaultValue={end?moment(end):null}
                                    onChange={(dt, txt)=>setEnd(moment(dt).format("YYYY-MM-DD"))}/>
                    </Form.Item>
                    <Form.Item label="Passport Number" name="passportNumber">
                        <Input name="passportNumber" onChange={(e)=>setPassportNumber(e.target.value)} defaultValue={passportNumber}/>
                    </Form.Item>
                    <Form.Item label="Passport Issued Date" name="passportIssuedDate">
                        <DatePicker name="passportIssuedDate" format="DD-MM-YYYY" 
                                    onChange={(dt, txt)=>setPassportIssuedDate(moment(dt).format("YYYY-MM-DD"))}
                                    defaultValue={passportIssuedDate?moment(passportIssuedDate):null}/>
                    </Form.Item>
                    <Form.Item label="Passport Expired Date" name="passportExpiredDate">
                        <DatePicker name="passportExpiredDate" format="DD-MM-YYYY" 
                                    onChange={(dt, txt)=>setPassportExpiredDate(moment(dt).format("YYYY-MM-DD"))}
                                    defaultValue={passportExpiredDate?moment(passportExpiredDate):null}/>
                    </Form.Item>
                    <Form.Item label="Country Code" name="countryCode" rules={[{ required: true }]}>
                      <Select name="countryCode" defaultValue={countryCode.code}>
                        <Select.Option key={countryCode.code} value={countryCode.code}>{countryCode.name}</Select.Option>
                      </Select>
                    </Form.Item>
                </Form>
            </div>
        </Layout.Content>
        <CitizenshipPrint visible={visible} data={location.state.data} cancelAction={()=>setVisible(false)}/>
    </>
  )
}