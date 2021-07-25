import React from 'react';
import { 
    Modal
} from 'antd';

import { CheckCircleTwoTone } from '@ant-design/icons';

export default function PartyAddressPrint({visible, confirmAction, cancelAction, data}) {

    return(
        <Modal className="out" visible={visible} title="Review document" width={750} okText="Print" onOk={confirmAction} onCancel={cancelAction}>
            <table className="cont" style={{border:"none", width:"70%"}}>
            <tbody>
                <tr>
                    <td align="left" width={100}>Description</td>
                    <td width={10}>:</td>
                    <td align="left">{data?.description}</td>
                </tr>
                <tr>
                    <td align="left" width={100}>Location</td>
                    <td width={10}>:</td>
                    <td align="left">{data?.location?.name}</td>
                </tr>
                <tr>
                    <td align="left" width={100}>Postal</td>
                    <td width={10}>:</td>
                    <td align="left">{data?.postal}</td>
                </tr>
                <tr>
                    <td align="left">Type</td>
                    <td>:</td>
                    <td align="left">{data?.type}</td>
                </tr>
                <tr>
                    <td align="left">Active</td>
                    <td>:</td>
                    <td align="left">{data?.active?<CheckCircleTwoTone size="small" twoToneColor="#52c41a"/>:"---"}</td>
                </tr>

            </tbody>
            </table>
        </Modal>
    )
}