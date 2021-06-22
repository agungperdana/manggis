import React from 'react';

export default function Login({setToken}) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(()=>{
        
        document.body.classList.add('bg-gradient-primary');
    },[]);

    const signIn = async () => {

        try {

            console.log('username['+username+'], password['+password+']')

            let response = await fetch('https://192.168.1.104:8585/login', {
                method: 'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({username: username, password: password})
            });

            let json = await response.json();
            if(json.status) {
                setToken(json.token);
            }
        
        } catch (error) {
            console.log(error)
        }
    }    

    return (
    
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form>
                                            <div className="form-group">
                                                <input type="email" onChange={(e)=>setUsername(e.target.value)} 
                                                        className="form-control form-control-user" placeholder="Enter Username or Email Address..."/>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" onChange={(e)=>setPassword(e.target.value)} 
                                                        className="form-control form-control-user" placeholder="Password"/>
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck"/>
                                                    <label className="custom-control-label" for="customCheck">Remember
                                                        Me</label>
                                                </div>
                                            </div>
                                            <a href="index.html" onClick={(e)=>{
                                                e.preventDefault()
                                                signIn()
                                            }} className="btn btn-primary btn-user btn-block">
                                                Login
                                            </a>
                                        </form>
                                        <hr/>
                                        <div className="text-center">
                                            <a className="small" href="forgot-password.html">Forgot Password?</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}