import React from 'react';
import { 
    Modal,
} from 'antd';

import moment from 'moment';

export default function PartyPrint({visible, confirmAction, cancelAction, data}) {

    return(
        <Modal className="out" visible={visible} title="Review document" width={750} okText="Print" onOk={confirmAction} onCancel={cancelAction}>
            <table className="cont" style={{border:"none", width:"70%"}}>
            <tbody>
                <tr>
                    <td align="left" width={100}>Code</td>
                    <td width={10}>:</td>
                    <td align="left">{data?.code}</td>
                </tr>
                <tr>
                    <td align="left">Name</td>
                    <td>:</td>
                    <td align="left">{data?.name}</td>
                </tr>
                <tr>
                    <td align="left">Type</td>
                    <td>:</td>
                    <td align="left">{data?.type}</td>
                </tr>
                <tr>
                    <td align="left">Birth Place</td>
                    <td>:</td>
                    <td align="left">{data?.birthPlace.name}</td>
                </tr>
                <tr>
                    <td align="left">Birth Date</td>
                    <td>:</td>
                    <td align="left">{moment(data?.birthDate).format("DD-MM-YYYY")}</td>
                </tr>
                <tr>
                    <td align="left">Tax</td>
                    <td>:</td>
                    <td align="left">{data?.taxCode}</td>
                </tr>
                {
                    data?.type === 'PERSON'?
                    (
                        <tr>
                            <td align="left">Gender</td>
                            <td>:</td>
                            <td align="left">{data?.gender}</td>
                        </tr>
                    ):<></>
                }
            </tbody>
            </table>
        </Modal>
    )
}