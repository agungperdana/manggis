import React, { useState } from "react";
import { Card, Layout, notification } from "antd";
import Name from "./Name";
import { Password } from "./Password";
import { Submit } from "./Submit";
import { RememberMe } from "./RememberMe";
import { SERVER_ADDRESS, SERVER_HEADER, SERVER_METHOD_POST } from "../component/ServerConstant";
import * as jose from "jose";

export function Login(props) {

    const[username, setUsername] = useState(null);
    const[password, setPassword] = useState(null);
    const[remember, setRemember] = useState(false)

    const loginSuccess = (token, user) => {
        props.loginSuccess(token, user);
    }

    const doLogin = () => {
        
        try {

            if(username && password) {
                fetch(SERVER_ADDRESS+'/login' , {
                    method: SERVER_METHOD_POST,
                    headers: SERVER_HEADER,
                    body: JSON.stringify({username: username, password: password})
                })
                .then(response => response.json())
                .then(data => {

                    if(data.status) {
                        
                        loginSuccess(data.token, data.user);

                        if(remember) {

                            jose.jwtDecrypt(data.token, password, {})
                                .then(out => out.payload)
                                .then(payload => {console.log(payload)})

                            // localStorage.setItem(props.sessionKey, key);
                        }
                    }
                })
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

    return(
        <Layout style={{backgroundColor:"#FFFFFF"}}>
                <div align="center" style={{margin:20, padding:20, backgroundColor:"#FFFFFF", width:"100%"}}>
                    <Card title="Enter your login Information" bordered={true} style={{width:"35%", height:"35%", borderRadius:10, borderColor:"#BFBFBF"}}>
                        <Name username={username} onUserNameChange={setUsername}/>
                        <Password password={password} onPasswordChange={setPassword}/>
                        <RememberMe remember={remember} handleRemembermeChange={setRemember}/>
                        <Submit doLogin={doLogin}/>
                    </Card>
                </div>
        </Layout>
    );
}