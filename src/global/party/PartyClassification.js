import React from 'react';
import { useHistory } from 'react-router-dom';

import { 
    Table,
    notification
} from 'antd';

import moment from 'moment';
import RowToolbar from '../../component/RowToolbar';
import TableTopBar from '../../component/TableTopBar';

export default function PartyClassification({token, partyCode}) {

    const navigation = useHistory();

    const [data, setData] = React.useState([]);
    const [openSearch, setOpenSearch] = React.useState(false);
    const [searchKey, setSearchKey] = React.useState("");

    const loadData = async () => {

        try {
          let response = await fetch('https://127.0.0.1:8585/partys/get/'+partyCode, {
              method: 'GET',
              headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+token,
              }
          });
    
          let json = await response.json();
          if(json.status) {
              setData(json.result?.partyClassifications);
          }
        } 
        catch (error) {
              
          notification.error({
            message:"Error", 
            description:error?.message
          });
        }
    }

    React.useEffect(()=>{loadData()},[]);

    const column = [
        {title:"Start", dataIndex:"start", key:"start", width:130, render:(txt, row)=>(
            row.start?moment(new Date(row.start)).format("DD-MM-YYYY"):"---"
        )},
        {title:"End", dataIndex:"end", key:"end", width:130, render:(txt, row)=>(
            row.end?moment(new Date(row.end)).format("DD-MM-YYYY"):"---"
        )},
        {title:"Value", dataIndex:"value", key:"value"},
        {title:"Type", dataIndex:"type", key:"type", width:200},
        {title:"", dataIndex:"", key:"Action", width:100, render:(txt, row)=>(
          <RowToolbar delAction={()=>{}} 
                    editAction={()=>navigation.push("/global/party/edit", {rowData:row})}
                    printAction={()=>{}}/>
       )},
      ]

    return (
        <>
            <TableTopBar addDocAction={()=>navigation.push("/global/party/add")}
                         serachDocAction={setOpenSearch} 
                         reloadAction={()=>loadData()}/>
            <div style={{
                width:"99%",
                height:"99%",
                backgroundColor:"#FFFFFF", 
                padding:5,
                margin:10, 
                borderStyle:"solid",
                borderColor:"#BFBFBF",
                borderWidth:1,
                borderRadius:10,
                alignItems:"stretch"}}>
                
                <Table dataSource={data} columns={column} style={{width:"100%"}} size="small"/>
            </div>
        </>
    );
}