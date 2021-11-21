import React from 'react';
import { 
    Modal 
} from 'antd';

import './ModulePrint.css';

export default class ModulePrint extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible:this.props.visible
        };

        this.doPrint = this.doPrint.bind(this);
        this.doClose = this.doClose.bind(this);
    }

    doClose() {
        this.setState({visible:false});
    }

    doPrint() {
        this.props.doPrint();
    }

    render() {
        return(
            <Modal className="out" visible={this.state.visible} title="Review document" width={750} okText="Print" onOk={this.doPrint} onCancel={this.doClose}>
                <table className="cont" style={{border:"none", width:"70%"}}>
                <tbody>
                    <tr>
                        <td align="left">Code</td>
                        <td>:</td>
                        <td>{this.props.data?.code}</td>
                    </tr>
                    <tr>
                        <td align="left">Name</td>
                        <td>:</td>
                        <td>{this.props.data?.name}</td>
                    </tr>
                    <tr>
                        <td align="left">Group</td>
                        <td>:</td>
                        <td>{this.props.data?.group}</td>
                    </tr>
                    <tr>
                        <td align="left">Enabled</td>
                        <td>:</td>
                        <td>{this.props.data?.enabled?"Yes":"No"}</td>
                    </tr>
                    <tr>
                        <td align="left">Description</td>
                        <td>:</td>
                        <td>{this.props.data?.note}</td>
                    </tr>
                </tbody>
                </table>
            </Modal>
        ) 
    }
}

const printStyle = "@media print{ .out:{overflow:hidden, heigh:0}, .cont:{display:block}}";