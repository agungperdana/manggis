import React from 'react';

import { 
    Modal,
    DatePicker,
    Input,
    Select,
    Form,
    notification
} from 'antd';

import moment from 'moment';

export default function PartyClassificationEditForm({token, visible, partyCode, closeAction, data}) {

    const [formObj] = Form.useForm();
    const [start, setStart] = React.useState(moment(data?.start));
    const [end, setEnd] = React.useState(data?.end?moment(data.end):null);
    const [type, setType] = React.useState(data?.type);
    const [valueText, setValueText] = React.useState(data?.value);

    const update = async () => {

        try {

            if(start && type && valueText) {

                let response = await fetch('https://127.0.0.1:8585/partys/classifications/update', {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json', 
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer '+token,
                    },
                    body:JSON.stringify({
                        partyCode:partyCode,
                        partyClassificationId:data?.id,
                        end:end,
                    })
                });
            
                let json = await response.json();
                if(json.status) {
                    closeAction()
                }
            }
            else {notification.error({message:"Error", description:"Start, type or value is mandatory!"})}
        }
        catch(ex) {notification.error({message:"Error", description:ex?.message})}
    }

    return(
        <Modal visible={visible} okText="Submit" title="Edit Classification" onCancel={closeAction} onOk={()=>update()}>
            <Form size="small" form={formObj}>
                <Form.Item label="Sart Date" name="start" rules={[{ required: true }]}>
                    <DatePicker name="start"
                        onChange={(dt, txt)=>setStart(txt)} 
                        defaultValue={start} format="DD-MM-YYYY"/>
                </Form.Item>
                <Form.Item label="End Date" name="end">
                    <DatePicker name="end" format="DD-MM-YYYY" 
                                onChange={(dt, txt)=>setEnd(txt)} 
                                defaultValue={end?moment(end):null}/>
                </Form.Item>
                <Form.Item label="Type" name="type" rules={[{ required: true }]}>
                    <Select name="type" defaultValue={type} onChange={(txt)=>setType(txt)}>
                        <Select.Option value="INDUSTRY_CLASSIFICATION">Industry Classification</Select.Option>
                        <Select.Option value="SIZE_CLASSIFICATION">Size Classification</Select.Option>
                        <Select.Option value="INCOME_CLASSIFICATIONS">Income Classification</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Value" name="valueText" rules={[{ required: true }]}>
                    <Input name="valueTxt" defaultValue={valueText} onChange={(e)=>setValueText(e.target.value)}/>
                </Form.Item>
            </Form>
        </Modal>
    );
}