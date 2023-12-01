import React from 'react'
import HeaderLogin from '../../assets/images/HeaderLogin.png'


function LoginHeader() {
    function logout(){
        console.log('logout is interactive');
    }
    return (
        <div className="HeaderBG">
                <img src={HeaderLogin} style={{ borderRadius: '0px 0px 100px 0px', height: 150, width: '100%', objectFit: "cover" }} alt="" />
            </div>
    )
}

export default LoginHeader