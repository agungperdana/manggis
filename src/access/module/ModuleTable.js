import React from "react";
import { AppstoreOutlined, BuildOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { Breadcrumb, Table } from "antd";
import { Fragment } from "react/cjs/react.production.min";
import { Edit } from "../../component/data/Edit";
import { Print } from "../../component/data/Print";
import { Delete } from "../../component/data/Delete";
import { Create } from "../../component/data/Create";
import { Search } from "../../component/data/Search";
import { Refresh } from "../../component/data/Refresh";

export default class ModuleTable extends React.Component {

    constructor(props) {

        super(props);

        this.doCreate = this.doCreate.bind(this);
        this.openSearchDialog = this.openSearchDialog.bind(this);
        this.doRefresh = this.doRefresh.bind(this);
        this.doEdit = this.doEdit.bind(this);
        this.doDelete = this.doDelete.bind(this);
        this.openPrintView = this.openPrintView.bind(this);
    }

    doEdit(row) {
        this.props.doEdit(row);
    }

    openPrintView(row) {

        this.props.openPrintView(row);
    }

    doDelete(key) {

        this.props.doDelete(key);
    }

    doCreate() {
        this.props.history.push("/access/module/add");
    }

    openSearchDialog() {
        this.props.openSearchDialog();
    }

    doRefresh() {
        this.props.refresh();
    }

    getColumn() {

        return [
            {title:"Code", dataIndex:"code", key:"Code"},
            {title:"Name", dataIndex:"name", key:"Name"},
            {title:"Description", dataIndex:"note", key:"Note"},
            {title:"Group", dataIndex:"group", key:"Group", width:100},
            {title:"Enabled", dataIndex:"enabled", key:"Locked", width:50, render:(txt)=>txt?<CheckCircleTwoTone size="small" twoToneColor="#52c41a"/>:"---"},
            {title:"", dataIndex:"", key:"Action", width:110, render:(txt, row)=>(
                <Fragment style={{padding:5}}>
                    <Edit row={row} path="/access/module/edit"/>
                    <Print row={row} openPrintWindow={this.openPrintView}/>
                    <Delete rowKey={row.code} doDelete={this.doDelete}/>
                </Fragment>
            )},
        ]
    }

    render() {

        return(
            <Fragment>
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>
                        <BuildOutlined/> Access
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <AppstoreOutlined/> Module
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        List
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Fragment>
                    <Create doCreate={this.doCreate} path="/access/module/add"/>
                    <Search openSearchDialog={this.openSearchDialog}/>
                    <Refresh refresh={this.doRefresh}/>
                </Fragment>
                <div className="table-container">                    
                    <Table dataSource={this.props.row_data} columns={this.getColumn()} className="full-width" size="small"/>
                </div>
            </Fragment>
        );
    }
}