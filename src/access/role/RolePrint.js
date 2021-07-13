import React from 'react';
import { 
    Modal,
} from 'antd';

import { 
    CheckCircleTwoTone
} from '@ant-design/icons';

import './RolePrint.css';

export default function RolePrint({visible, confirmAction, cancelAction, data}) {

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
                    <td align="left">Enabled</td>
                    <td>:</td>
                    <td align="left">{data?.enabled?"Yes":"No"}</td>
                </tr>
                <tr>
                    <td align="left">Description</td>
                    <td>:</td>
                    <td align="left">{data?.note}</td>
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
                <th width={65}>Read</th>
                <th width={65}>Add</th>
                <th width={65}>Edit</th>
                <th width={65}>Delete</th>
                <th width={65}>Print</th>
            </thead>
            <tbody>
                {
                    data?.modules?.map(row=>{
                        return(
                            <tr>
                                <td align="left">{row.moduleCode}</td>
                                <td align="left">{row.moduleName}</td>
                                <td align="center">{row.read?<CheckCircleTwoTone size="small" twoToneColor="#52c41a"/>:"---"}</td>
                                <td align="center">{row.add?<CheckCircleTwoTone size="small" twoToneColor="#52c41a"/>:"---"}</td>
                                <td align="center">{row.edit?<CheckCircleTwoTone size="small" twoToneColor="#52c41a"/>:"---"}</td>
                                <td align="center">{row.delete?<CheckCircleTwoTone size="small" twoToneColor="#52c41a"/>:"---"}</td>
                                <td align="center">{row.print?<CheckCircleTwoTone size="small" twoToneColor="#52c41a"/>:"---"}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
        </Modal>
    )
}