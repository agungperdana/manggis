import React from 'react';
import { 
  useHistory, 
  useLocation,
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';
import { 
    Layout,
    Breadcrumb,
    notification,
    Form,
    Input,
    Select,
    DatePicker,
    Tabs
} from 'antd';

import { 
  BankFilled,
  ContactsFilled,
    ContainerFilled,
    GlobalOutlined,
    GoldFilled,
    InfoCircleFilled,
    InteractionFilled,
    SlidersFilled,
} from '@ant-design/icons';

import moment from 'moment';

import DataToolbar from '../../component/DataToolbar';
import PartyPrint from './PartyPrint';

import PartyClassification from './classification/PartyClassification';
import PartyClassificationAddForm from './classification/PartyClassificationAddForm';
import PartyClassificationEditForm from './classification/PartyClassificationEditForm';

import PartyContact from './contact/PartyContact';
import PartyContactAddForm from './contact/PartyContactAddForm';
import PartyContactEditForm from './contact/PartyContactEditForm';

import PartyAddress from './address/PartyAddress';
import PartyAddressAddForm from './address/PartyAddressAddForm';
import PartyAddressEditForm from './address/PartyAddressEditForm';

import PartyRole from './role/PartyRole';
import PartyRoleAddForm from './role/PartyRoleAddForm';
import PartyRoleEditForm from './role/PartyRoleEditForm';

export default function PartyEditForm({token}) {

  const navigation = useHistory();
  const location = useLocation();
  const {url, path} = useRouteMatch();

  const [form] = Form.useForm();
  const [code, setCode] = React.useState(location?.state?.rowData?.code);
  const [name, setName] = React.useState(location?.state?.rowData?.name);
  const [type, setType] = React.useState(location?.state?.rowData?.type);
  const [birthPlace, setBirthPlace] = React.useState(location?.state?.rowData?.birthPlace.code);
  const [birthDate, setBirthDate] = React.useState(
                                        location?.state?.rowData?.birthDate?
                                        new Date(location?.state?.rowData?.birthDate)
                                        :null);
  const [gender, setGender] = React.useState(location?.state?.rowData?.gender);
  const [taxCode, setTaxCode] = React.useState(location?.state?.rowData?.taxCode);
  const [visible, setVisible] = React.useState(false);
  const [geographics, setGeographics] = React.useState([]);

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

  const update = async () => {

    try {

      if(code && name && type) {
        let response = await fetch('https://127.0.0.1:8585/partys/update', {
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
      <>
        <Layout.Content style={{backgroundColor:"#FFFFFF"}}>
            <Breadcrumb style={{padding:10}}>
              <Breadcrumb.Item>
                <GlobalOutlined/> Global
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <GoldFilled/> Party
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Edit
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span style={{fontWeight:500, color:"red"}}>{code +" - "+name}</span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Tabs type="card" onTabClick={(key)=>navigation.push("/global/party/edit/"+key)} style={{width:"99%", height:"95%", margin:5}}>
              <Tabs.TabPane tab={<span><InfoCircleFilled/>Info</span>} key="InfoTab">
                <DataToolbar saveAction={()=>{update()}}
                          cancelAction={()=>navigation.push("/global/party/list")}
                          printAction={()=>setVisible(true)}/>

                <div style={{
                              width:"99%", 
                              height:"88%",
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
                      
                      <Form.Item label="Code" name="code" rules={[{ required: true }]}>
                        <Input defaultValue={code} onChange={(e)=>setCode(e.target.value)}/>
                      </Form.Item>
                      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                        <Input defaultValue={name} onChange={(e)=>setName(e.target.value)}/>
                      </Form.Item>
                      <Form.Item label="type" name="type" rules={[{ required: true }]}>
                        <Select defaultValue={type} onChange={(txt)=>setType(txt)}>
                          <Select.Option value="PERSON">Person</Select.Option>
                          <Select.Option value="ORGANIZATION">Organization</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="taxCode" name="taxCode">
                        <Input defaultValue={taxCode
                        } onChange={(e)=>setTaxCode(e.target.value)}/>
                      </Form.Item>
                      <Form.Item label="birthPlace" name="birthPlace" rules={[{ required: true }]}>
                        <Select defaultValue={birthPlace} onChange={(txt)=>setBirthPlace(txt)}>
                          {
                            geographics.map(geo=>{
                              return (<Select.Option value={geo.code}>{geo.name}</Select.Option>)
                            })
                          }
                        </Select>
                      </Form.Item>
                      <Form.Item label="birthDate" name="birthDate">
                        <DatePicker defaultValue={birthDate?moment(birthDate, 'YYYY-MM-DD'):null} format="YYYY-MM-DD" onChange={(mom, txt)=>setBirthDate(txt)}/>
                      </Form.Item>
                      {
                        (type && type==='PERSON')?
                        <Form.Item label="gender" name="gender">
                          <Select defaultValue={gender} onChange={(txt)=>setGender(txt)}>
                            <Select.Option value="MALE">Male</Select.Option>
                            <Select.Option value="FEMALE">Female</Select.Option>
                          </Select>
                        </Form.Item>
                        :<></>
                      }
                    </Form>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span><BankFilled/>Classification</span>} key="classification">
                <Switch>
                  <Route exact path="/global/party/edit/classification">
                    <PartyClassification token={token} partyCode={code}/>
                  </Route>
                  <Route exact path="/global/party/edit/classification/add">
                    <PartyClassificationAddForm token={token} partyCode={code}/>
                  </Route>
                  <Route exact path="/global/party/edit/classification/edit">
                    <PartyClassificationEditForm token={token} partyCode={code}/>
                  </Route>
                </Switch>
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span><ContactsFilled/>Contact</span>} key="contact">
                <Switch>
                  <Route exact path="/global/party/edit/contact">
                    <PartyContact token={token} partyCode={code}/>
                  </Route>
                  <Route exact path="/global/party/edit/contact/add">
                    <PartyContactAddForm token={token} partyCode={code}/>
                  </Route>
                  <Route exact path="/global/party/edit/contact/edit">
                    <PartyContactEditForm token={token} partyCode={code}/>
                  </Route>
                </Switch>
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span><ContainerFilled/>Address</span>} key="address">
                  <Route exact path="/global/party/edit/address">
                    <PartyAddress token={token} partyCode={code}/>
                  </Route>
                  <Route exact path="/global/party/edit/address/add">
                    <PartyAddressAddForm token={token} partyCode={code}/>
                  </Route>
                  <Route exact path="/global/party/edit/address/edit">
                    <PartyAddressEditForm token={token} partyCode={code}/>
                  </Route>
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span><SlidersFilled/>Role</span>} key="role">
                  <Route exact path="/global/party/edit/role">
                    <PartyRole token={token} partyCode={code}/>
                  </Route>
                  <Route exact path="/global/party/edit/role/add">
                    <PartyRoleAddForm token={token} partyCode={code}/>
                  </Route>
                  <Route exact path="/global/party/edit/role/edit">
                    <PartyRoleEditForm token={token} partyCode={code}/>
                  </Route>
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span><InteractionFilled/>Relationship</span>} key="RelationshipTab"></Tabs.TabPane>
            </Tabs>
        </Layout.Content>
        <PartyPrint cancelAction={()=>setVisible(false)} visible={visible} data={location?.state?.rowData}/>
      </>
  )
}