import React from 'react';
import { 
    Modal 
} from 'antd';

import './ModulePrint.css';

export default function ModulePrint({visible, confirmAction, cancelAction, data}) {

    return(
        <Modal className="out" visible={visible} title="Review document" width={750} okText="Print" onOk={confirmAction} onCancel={cancelAction}>
            <table className="cont" style={{border:"none", width:"70%"}}>
            <tbody>
                <tr>
                    <td align="left">Code</td>
                    <td>:</td>
                    <td>{data?.code}</td>
                </tr>
                <tr>
                    <td align="left">Name</td>
                    <td>:</td>
                    <td>{data?.name}</td>
                </tr>
                <tr>
                    <td align="left">Group</td>
                    <td>:</td>
                    <td>{data?.group}</td>
                </tr>
                <tr>
                    <td align="left">Enabled</td>
                    <td>:</td>
                    <td>{data?.enabled?"Yes":"No"}</td>
                </tr>
                <tr>
                    <td align="left">Description</td>
                    <td>:</td>
                    <td>{data?.note}</td>
                </tr>
            </tbody>
            </table>
        </Modal>
    )
}

const printStyle = "@media print{ .out:{overflow:hidden, heigh:0}, .cont:{display:block}}";