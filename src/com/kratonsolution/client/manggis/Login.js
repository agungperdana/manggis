import React from 'react';

export default function Login({setToken}) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(()=>{
        
        document.body.classList.remove('body');
        document.body.classList.add('body-sign');
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
    
        <div className="center-sign">
			<div className="panel panel-sign">
				<div className="panel-title-sign mt-xl text-right">
					<h2 className="title text-uppercase text-bold m-none">
                        <i className="fa fa-user mr-xs"></i> Sign In
                    </h2>
				</div>
				<div className="panel-body">
						<div className="form-group mb-lg">
							<label>Username</label>
							<div className="input-group input-group-icon">
								<input name="username" onChange={(e)=>setUsername(e.target.value)} type="text" className="form-control input-lg" />
								<span className="input-group-addon">
									<span className="icon icon-lg">
										<i className="fa fa-user"></i>
									</span>
								</span>
							</div>
						</div>

						<div className="form-group mb-lg">
							<div className="clearfix">
								<label className="pull-left">Password</label>
								<a href="pages-recover-password.html" className="pull-right">Lost Password?</a>
							</div>
							<div className="input-group input-group-icon">
								<input name="pwd" onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control input-lg" />
									<span className="input-group-addon">
										<span className="icon icon-lg">
											<i className="fa fa-lock"></i>
										</span>
									</span>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-8">
									<div className="checkbox-custom checkbox-default">
										<input id="RememberMe" name="rememberme" type="checkbox"/>
										<label htmlFor="RememberMe">Remember Me</label>
									</div>
								</div>
								<div className="col-sm-4 text-right">
									<button type="submit" onClick={()=>signIn()} className="btn btn-primary hidden-xs">Sign In</button>
								</div>
							</div>
				</div>
			</div>

			<p className="text-center text-muted mt-md mb-md">&copy; Copyright 2018. All rights reserved. Template by <a href="https://colorlib.com">Colorlib</a>.</p>
		</div>
    )
}