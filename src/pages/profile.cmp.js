import React from 'react';
import http   from '../services/http.svc';

class ProfileComponent extends React.Component {

    constructor(props) {
        super(props);
    }
     
    render(){

        var vm = this;

        console.log(this.props.user)
        let url = 'http://localhost:3100/';

        function getUserData(){
            console.log('USER LOADED')
            let config = {
                method: 'GET',
                service: 'users',
                params: {
                    id: vm.props.user._id
                },
                headers: {
                    Authorization: 'Bearer ' + http.getToken()
                }
            }
            http.request(url, config).then(
                res => {
                    
                },
                err => {
                    
                }
            );
        }

        vm.getUserData = getUserData;

        return <div id="player">
            <h1>Profile</h1>
            {vm.props.user ? (
                <table>
                    <tr>
                        <td>Name:</td>
                        <td>
                            <p>{vm.props.user.name}</p>

                        </td>
                    </tr>
                </table>
            ):(
                <p>Loading</p>
            )

            }
            <button className="btn" onClick={()=>vm.getUserData()}>GET</button>
        </div>
    }

}

export default ProfileComponent;