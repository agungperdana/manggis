import React from "react";
import { DeleteButton } from "../../component/DeleteButton";
import { EditButton } from "../../component/EditButton";
import { PrintButton } from "../../component/PrintButton";

class CSRow extends React.Component {

    render() {

        const data = this.props.rowData
        const del = <DeleteButton/>
        const edit = <EditButton/>
        const print = <PrintButton/>

        return (<></>)
    }
}