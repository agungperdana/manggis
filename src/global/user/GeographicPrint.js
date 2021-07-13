import React from 'react';
import { 
    Modal,
} from 'antd';

import { 
    CheckCircleTwoTone
} from '@ant-design/icons';

export default function GeographicPrint({visible, confirmAction, cancelAction, data}) {

    return(
        <Modal className="out" visible={visible} title="Review document" width={750} okText="Print" onOk={confirmAction} onCancel={cancelAction}>
            <table className="cont" style={{border:"none", width:"70%"}}>
            <tbody>
                <tr>
                    <td align="left" width={100}>Email</td>
                    <td width={10}>:</td>
                    <td align="left">{data?.email}</td>
                </tr>
                <tr>
                    <td align="left">Name</td>
                    <td>:</td>
                    <td align="left">{data?.name}</td>
                </tr>
                <tr>
                    <td align="left">Enabled</td>
                    <td>:</td>
                    <td align="left">{data?.enabled?"Yes":"No"}</td>
                </tr>
                <tr>
                    <td align="left">Locked</td>
                    <td>:</td>
                    <td align="left">{data?.locked?"Yes":"No"}</td>
                </tr>
            </tbody>
            </table>
            <br/>
            <table width="100%">
            <thead style={{
                        borderTopColor:"BFBFBF", 
                        borderTopWidth:1, 
                        borderTopStyle:"solid",
                        borderBottomColor:"BFBFBF", 
                        borderBottomWidth:1, 
                        borderBottomStyle:"solid"}}>
                <th width={200} align="left">Code</th>
                <th align="left">Name</th>
                <th width={100}>Enabled</th>
            </thead>
            <tbody>
                {
                    data?.roles?.map(row=>{
                        return(
                            <tr>
                                <td align="left">{row.roleCode}</td>
                                <td align="left">{row.roleName}</td>
                                <td align="center">{row.enabled?<CheckCircleTwoTone size="small" twoToneColor="#52c41a"/>:"---"}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
        </Modal>
    )
}