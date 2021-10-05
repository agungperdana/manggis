import React from 'react';
import { 
    Modal,
} from 'antd';

import moment from 'moment';

export default function CitizenshipPrint({visible, confirmAction, cancelAction, data}) {

    return(
        <Modal className="out" visible={visible} title="Review document" width={750} okText="Print" onOk={confirmAction} onCancel={cancelAction}>
            <table className="cont" style={{border:"none", width:"70%"}}>
            <tbody>
                <tr>
                    <td align="left" width={185}>Start</td>
                    <td width={10}>:</td>
                    <td align="left">{data?.start?moment(data.start).format('DD-MM-YYYY'):"---"}</td>
                </tr>
                <tr>
                    <td align="left">End</td>
                    <td>:</td>
                    <td align="left">{data?.end?moment(data.end).format('DD-MM-YYYY'):"---"}</td>
                </tr>
                <tr>
                    <td align="left">Passport Number</td>
                    <td>:</td>
                    <td align="left">{data?.passportNumber}</td>
                </tr>
                <tr>
                    <td align="left">Passport Issued Date</td>
                    <td>:</td>
                    <td align="left">{data?.passportIssuedDate?moment(data.passportIssuedDate).format('DD-MM-YYYY'):"---"}</td>
                </tr>
                <tr>
                    <td align="left">Passport Expired Date</td>
                    <td>:</td>
                    <td align="left">{data?.passportExpiredDate?moment(data.passportExpiredDate).format('DD-MM-YYYY'):"---"}</td>
                </tr>
                <tr>
                    <td align="left">Country</td>
                    <td>:</td>
                    <td align="left">{data?.country?.name}</td>
                </tr>
            </tbody>
            </table>
        </Modal>
    )
}