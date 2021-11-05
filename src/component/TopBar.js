import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Badge, 
    Tooltip,
    Avatar,
    Button,
    Dropdown,
    Menu
} from 'antd';
import { 
    AlertFilled,
    MessageFilled,
    SettingFilled,
    PoweroffOutlined,
    UserOutlined
} from '@ant-design/icons';

export default function TopBar({setToken, user}){

    const navigation = useHistory();

    const userMenu = (
        <Menu>
            <Menu.Item icon={<SettingFilled/>} onClick={()=>setToken(null)}>
                Preferences
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item title="Sign Out" onClick={()=>setToken(null)} icon={<PoweroffOutlined/>}>
                Sign Out
            </Menu.Item>
        </Menu>
    );

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
            <Dropdown overlay={userMenu}>
                <a>
                    <Avatar size="small" style={{ marginLeft:10, marginRight:5, backgroundColor: '#333333' }} icon={<UserOutlined/>} />
                    <span style={{fontWeight:500, color:"#333333", fontSize:12}}>{user?.name}</span>
                </a>
            </Dropdown>
        </div>
    )
}