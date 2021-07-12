import React from 'react';
import { Layout, Input, Checkbox, Button, Card, notification} from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';

export default function Login({setToken}) {

    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    const signIn = async () => {

        try {

            if(username && password) {
                let response = await fetch('https://127.0.0.1:8585/login', {
                    method: 'POST',
                    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                    body: JSON.stringify({username: username, password: password})
                });

                let json = await response.json();
                if(json.status) {
                    setToken(json.token);
                }
            }
            else {
                notification.error({
                    message:"Login failed", 
                    description:"Username and password can not be empty!"
                });
            }
        } catch (error) {
            notification.error({
                message:"Login failed", 
                description:error?.message
            });
        }
    }


    return (
        <Layout style={{backgroundColor:"#FFFFFF"}}>
            <div align="center" style={{margin:20, padding:20, backgroundColor:"#FFFFFF", width:"100%"}}>
                <Card title="Enter your login Information" bordered={true} style={{width:"35%", height:"35%", borderRadius:10, borderColor:"#BFBFBF"}}>
                    <Input prefix={<UserOutlined/>} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter login name" style={{width:"100%", height:40, marginBottom:10}}/>
                    <Input prefix={<KeyOutlined/>} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter login password" style={{width:"100%", height:40 , marginBottom:10}}/>
                    <Checkbox style={{marginBottom:10, width:"100%", textAlign:"left", color:"red"}}>Remember me</Checkbox>
                    <Button type="primary" htmlType="submit" style={{width:"100%", marginBottom:10}} onClick={()=>{signIn()}}>
                        Log in
                    </Button>
                    <a href="" style={{color:"red"}}>Forgot password</a>
                </Card>
            </div>
        </Layout>
    )
}