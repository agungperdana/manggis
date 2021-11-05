import React from 'react';
import { 
    Modal,
} from 'antd';

export default function GeographicPrint({visible, confirmAction, cancelAction, data}) {

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
                    <td align="left">Parent</td>
                    <td>:</td>
                    <td align="left">{data?.parent}</td>
                </tr>
                <tr>
                    <td align="left">Description</td>
                    <td>:</td>
                    <td align="left">{data?.note}</td>
                </tr>
            </tbody>
            </table>
        </Modal>
    )
}