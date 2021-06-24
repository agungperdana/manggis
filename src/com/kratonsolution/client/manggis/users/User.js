import React from 'react';

export default function User({token}) {

    const [users, setUsers] = React.useState([]);

    const getUsersData = async () => {

        if(token) {
            try {
                let response = await fetch('https://192.168.1.104:8585/users/all-users/0/50', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json', 
                        'Content-Type': 'application/json',
                        Authorization:'Bearer '+token
                    }
                });
    
                let json = await response.json();
                if(json.status) {
                    setUsers(json.result);
                    console.log('User.js :'+json.result)
                }
                else {
                    console.log('User.js :'+json.status)
                }
            
            } catch (error) {
                console.log(error)
            }
        }
    } 

    React.useEffect(()=>{getUsersData()},[]);

    return(        

        <table className="table table-bordered table-striped mb-none" 
                id="datatable-tabletools" 
                data-swf-path="assets/vendor/jquery-datatables/extras/TableTools/swf/copy_csv_xls_pdf.swf">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Enabled</th>
                <th>Expired</th>
                <th>Locaked</th>
            </tr>
        </thead>
        <tbody>
                                    {
                                        users.map((user=>{
                                            return (<tr>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.enabled?"Yes":"No"}</td>
                                                <td>{user.expired?"Yes":"No"}</td>
                                                <td>{user.locaked?"Yes":"No"}</td>
                                            </tr>)
                                        }))
                                    }
        </tbody>
        </table>
    )
}