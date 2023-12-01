import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {login} from "../api/AuthApi";
import {setToken} from "../api/Api";
import {alertError, alertSuccess, dismissPopup, showProgress} from "../components/AlertDialogs";
import {useDispatch} from "react-redux";
import {actionSetAppToken, actionSetUser} from "../redux/app";
import LoginHeader from "./layouts/LoginHeader";
import Layout from "./layouts/Layout";
import IconBrand from "../assets/icons/IconBrand";
import FooterFarmer from "./layouts/FooterFarmer";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [is_remember, setCheckRemember] = useState(false);
    const dispatch = useDispatch();

    const submit = () => {
        showProgress('')
        let credentials = {
            email,
            password
        }
        login(credentials)
            .then(res => {
                resultLogin(res, false)
            })
    }

    const resultLogin = (res, is_login_line) => {
        console.log('res >>>>>>>>> ', res.data)
        if (res.data && res.data.success) {
            if (res.data.data && res.data.data.token) {
                setToken(res.data.data.token)
                dispatch(actionSetAppToken(res.data.data.token))
                let user = res.data.data.user;
                dispatch(actionSetUser(user))
                alertSuccess('เข้าสู่ระบบสำเร็จ')
                setTimeout(() => {
                    dismissPopup()
                    if (user.type === 'ADMIN') {
                        navigate('/farmer')
                    }
                    else {
                        navigate('/application')
                    }
                }, 1000)
            } else { alertError('เข้าสู่ระบบไม่สำเร็จ', res.data && res.data.message || '')}
        } else {alertError('เข้าสู่ระบบไม่สำเร็จ', res.data && res.data.message || '')}
    }

    return (
        <>
            <div className={'Container'}>
                <LoginHeader/>
                <Layout>
                    <div className={'d-block justify-content-center align-items-center'}>
                        <div className={'Brand d-flex justify-content-center align-items-center mt-5'}>
                            <IconBrand/>
                        </div>
                        <h3 className='fw-bold pt-5 text-center' style={{fontSize:20}}>เข้าสู่ระบบ</h3>
                        <div className='pt-1'>
                                <div className="form-group mb-3">
                                    <label className='text-color-gray form-label'>อีเมล</label>
                                    <div className='input-group'>
                                        <div className='input-group-text border-right-none' id="">
                                            <i className="fa-solid fa-envelope text-color-primary icon bg-second"></i>
                                        </div>
                                        <input className='form-control border-left-none'
                                               type="email"
                                               placeholder="ป้อนอีเมล"
                                               onChange={e => setEmail(e.target.value)}
                                               value={email}
                                               aria-describedby={'email'}
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-2">
                                    <label className='text-color-gray form-label'>รหัสผ่าน</label>
                                    <div className='input-group'>
                                        <div className='input-group-text border-right-none' id="">
                                            <i className="fa-solid fa-lock text-color-primary icon bg-second"></i>
                                        </div>
                                        <input className='form-control border-left-none'
                                               type="password"
                                               placeholder="ป้อนรหัสผ่าน"
                                               onChange={e => setPassword(e.target.value)}
                                               value={password}
                                               aria-describedby={'password'}
                                        />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='d-flex align-items-center'>
                                        <input type="checkbox" className='form-check-input'
                                               id={'remember_password'}
                                               checked={is_remember}
                                               onChange={()=>setCheckRemember(!is_remember)}
                                               name={'remember_password'}
                                        />
                                        &nbsp;
                                        <span className='text-muted' style={{fontSize:14}}>จดจำรหัสผ่าน</span>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 mt-4 ">
                                    <button className="btn btn-primary d-flex justify-content-center align-items-center" type="submit" onClick={() => submit()}>
                                        <span style={{fontSize:18}}>เข้าสู่ระบบ</span>
                                        &nbsp;&nbsp;
                                        <i className="fa-solid fa-right-to-bracket"></i>
                                    </button>
                                </div>

                            <div className='d-flex justify-content-center mt-3' style={{fontSize:14}}>
                                <span className='text-muted'>คุณยังไม่มีบัญชี ?</span>
                                &nbsp;
                                <Link to='/register' className='text-color-primary text-decoration-none'>สร้างบัญชี</Link>
                            </div>
                        </div>
                    </div>
                </Layout>
                <FooterFarmer/>
            </div>


        </>
    )
}

export default Login;
