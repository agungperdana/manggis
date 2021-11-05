import React, { Fragment } from "react";
import { Card, Layout, notification } from "antd";
import { Name } from "./Name";
import { Password } from "./Password";
import { Submit } from "./Submit";
import { RememberMe } from "./RememberMe";
import { ServerConstant, SERVER_ADDRESS, SERVER_HEADER, SERVER_METHOD_POST } from "../component/ServerConstant";

export class Login extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

            username:"",
            password:"",
            remember:false
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRemembermeChange = this.handleRemembermeChange.bind(this);
        this.doLogin = this.doLogin.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);
    }

    handleUsernameChange(typedUserName) {
        this.setState({username:typedUserName});
    }

    handlePasswordChange(typedPassword) {
        this.setState({password:typedPassword});
    }

    handleRemembermeChange(checked) {
        this.setState({remember:checked});
    }

    loginSuccess(token, user) {
        this.props.loginSuccess(token, user);
    }

    async doLogin() {
        
        try {

            if(this.state.username && this.state.password) {
                let response = await fetch(SERVER_ADDRESS , {
                    method: SERVER_METHOD_POST,
                    headers: SERVER_HEADER,
                    body: JSON.stringify({username: this.state.username, password: this.state.password})
                });

                let json = await response.json();
                if(json.status) {
                    this.loginSuccess(json.token, json.user);
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

    render() {
        return(
            <Layout style={{backgroundColor:"#FFFFFF"}}>
                <div align="center" style={{margin:20, padding:20, backgroundColor:"#FFFFFF", width:"100%"}}>
                    <Card title="Enter your login Information" bordered={true} style={{width:"35%", height:"35%", borderRadius:10, borderColor:"#BFBFBF"}}>
                        <Name username={this.state.username} onUserNameChange={this.handleUsernameChange}/>
                        <Password password={this.state.password} onPasswordChange={this.handlePasswordChange}/>
                        <RememberMe remember={this.state.remember} onRememberMeChange={this.handleRemembermeChange}/>
                        <Submit doLogin={this.doLogin}/>
                    </Card>
                </div>
            </Layout>
        )
    }
}