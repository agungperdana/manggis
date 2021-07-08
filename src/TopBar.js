import React from 'react';
import { 
    Badge, 
    Tooltip,
    Avatar
} from 'antd';
import { 
    AlertFilled,
    MessageFilled,
    SettingFilled,
    PoweroffOutlined
} from '@ant-design/icons';

export default function TopBar({}){

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
                <a href="#">
                <Avatar icon={<PoweroffOutlined/>} 
                        style={{marginLeft:10, backgroundColor:"red"}} 
                        size="small"/>
                </a>
            </Tooltip>
        </div>
    )
}