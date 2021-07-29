import React from 'react';
import { 
    Modal,
} from 'antd';

import moment from 'moment';

export default function MaritalStatusPrint({visible, confirmAction, cancelAction, data}) {

    return(
        <Modal className="out" visible={visible} title="Review document" width={750} okText="Print" onOk={confirmAction} onCancel={cancelAction}>
            <table className="cont" style={{border:"none", width:"70%"}}>
            <tbody>
                <tr>
                    <td align="left" width={100}>Start</td>
                    <td width={10}>:</td>
                    <td align="left">{data?.start?moment(data.start).format('DD-MM-YYYY'):"---"}</td>
                </tr>
                <tr>
                    <td align="left">End</td>
                    <td>:</td>
                    <td align="left">{data?.end?moment(data.end).format('DD-MM-YYYY'):"---"}</td>
                </tr>
                <tr>
                    <td align="left">Type</td>
                    <td>:</td>
                    <td align="left">{data?.type}</td>
                </tr>
            </tbody>
            </table>
        </Modal>
    )
}