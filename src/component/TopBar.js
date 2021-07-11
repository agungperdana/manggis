import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Badge, 
    Tooltip,
    Avatar,
    Button
} from 'antd';
import { 
    AlertFilled,
    MessageFilled,
    SettingFilled,
    PoweroffOutlined
} from '@ant-design/icons';

export default function TopBar({setToken}){

    const navigation = useHistory();

    return(
        <div align="right" style={{
            backgroundColor:"#8AAAE5",
            width:"100%", 
            padding:15}}>
            <Badge count={3} style={{alignSelf:"flex-end"}} size="small">
            <Tooltip placement="topLeft" title="Notification">
                <a href="#">
                <Avatar icon={<AlertFilled/>} size="small" style={{marginLeft:10, backgroundColor:"yellowgreen"}}/>
                </a>
            </Tooltip>
            </Badge>
            <Badge count={3} style={{alignSelf:"flex-end"}} size="small">
            <Tooltip placement="topLeft" title="Message">
                <a href="#">
                <Avatar icon={<MessageFilled/>} size="small" style={{marginLeft:10, backgroundColor:"brown"}}/>
                </a>
            </Tooltip>
            </Badge>
            <Tooltip placement="topLeft" title="Application settings">
                <a href="#">
                <Avatar icon={<SettingFilled/>} 
                        style={{marginLeft:10, backgroundColor:"green"}} 
                        size="small"/>
                </a>
            </Tooltip>
            <Tooltip placement="topLeft" title="Sign Out">
                <Button shape="circle" size="small" icon={<PoweroffOutlined/>} 
                        style={{marginLeft:10, backgroundColor:"#FF6961"}}
                        onClick={()=>setToken(null)}>
                </Button>
            </Tooltip>
        </div>
    )
}