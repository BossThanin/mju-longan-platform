
import {useState} from "react";

import defaultUserImg from "../assets/images/default_user.png"
import {registerUser} from "../api/AuthApi"
import {alertError, alertRegisterSuccess, alertSuccess, dismissPopup, showProgress} from "../components/AlertDialogs";
import {useNavigate} from "react-router-dom";
import KeydownRegexNumber from "../helper/KeydownRegexNumber";
import ValidateMimeType from "../helper/ValidateMimeType";
import HeaderFarmer from "./layouts/HeaderFarmer";
import Layout from "./layouts/Layout";
import FooterFarmer from "./layouts/FooterFarmer";

function Register() {
    const [user, setUserData] = useState({type: 'FARMER'});
    const [file_preview, setFilePreview] = useState(null);
    const navigate = useNavigate();

    const handleChangeFile = (e) => {
        let is_valid = ValidateMimeType(e.target.files[0])
        if (!is_valid) {
            alertError('', 'ไฟล์ต้องเป็นประเภท .png หรือ .jpg เท่านั้น')
            return
        }

        setData('picture', e.target.files[0])
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (ev) {
                setFilePreview(ev.target.result)
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const setData = (key, value) => {
        if (key === 'phone' && value.length > 10) {
            return;
        }

        setUserData(exitingData => ({
            ...exitingData,
            [key]: value
        }))
    }

    const submit = () => {
        console.log('user >>>> ', user)
        showProgress('')
        registerUser(user)
            .then(res => {
                if (res.data && res.data.success) {
                    // alertSuccess('สมัครสมาชิกสำเร็จ', 'กรุณารอการอนุมัติจากผู้ดูแลระบบ')
                    alertRegisterSuccess('ลงทะเบียนสำเร็จ !','กรุณารอการอนุมัติจากผู้ดูแลระบบ');
                    setTimeout(() => {
                        dismissPopup()
                        navigate('/login')
                    }, 2000)
                } else {
                    alertError('สมัครสมาชิกไม่สำเร็จ', res.data && res.data.message || '')
                }
            })
    }

    return (
        <>

            <div className={'Container'}>
                <HeaderFarmer HeadTitle={'ลงทะเบียน'} showBack={true}/>
                <Layout>
                    <div className={'FORM'}>
                        <div className={'form-group mb-3'}>
                            <label htmlFor="user-image" className="w-100 mb-2 d-flex justify-content-center">
                                <div className="user-image-outer position-relative">
                                    <div className="user-image-box mb-3">
                                        <img src={file_preview ? file_preview : defaultUserImg} alt="user image"
                                             width={60} height={60} className={'rounded-circle'}/>
                                        <div className="icon-edit-user-image"
                                             style={{
                                                 padding: '5px 10px',
                                                 background: "#008F44",
                                                 position: "absolute",
                                                 right: 0,
                                                 bottom: '14px',
                                                 zIndex: 1,
                                                 borderRadius: 50
                                             }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13"
                                                 viewBox="0 0 14 13" fill="none">
                                                <path
                                                    d="M8.5 1.97656L9.48438 0.96875C10.0703 0.382812 11.0312 0.382812 11.6172 0.96875L12.5312 1.88281C13.1172 2.46875 13.1172 3.42969 12.5312 4.01562L6.36719 10.1797C5.24219 11.3047 3.8125 12.0781 2.24219 12.3828L1.65625 12.5C1.46875 12.5469 1.28125 12.4766 1.16406 12.3359C1.02344 12.2188 0.953125 12.0312 1 11.8438L1.11719 11.2578C1.42188 9.6875 2.19531 8.25781 3.32031 7.13281L7.70312 2.75L7.375 2.44531C7.16406 2.23438 6.8125 2.23438 6.60156 2.44531L4.1875 4.83594C3.97656 5.07031 3.625 5.07031 3.41406 4.83594C3.17969 4.625 3.17969 4.27344 3.41406 4.03906L5.80469 1.64844C6.46094 0.992188 7.51562 0.992188 8.17188 1.64844L8.5 1.97656ZM8.5 3.54688L4.11719 7.92969C3.20312 8.84375 2.57031 9.96875 2.26562 11.2344C3.53125 10.9297 4.65625 10.2969 5.57031 9.38281L9.95312 5L8.5 3.54688Z"
                                                    fill="white"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <input type="file" accept="image/*" id="user-image" style={{display: "none"}}
                                           onChange={handleChangeFile}/>
                                </div>
                            </label>
                        </div>
                        <div className={'form-group mb-3'}>
                            <label htmlFor="" className={'form-label'}>ประเภทผู้ใช้</label>
                            <select name="type" id="" className={'form-select form-control'}
                                    defaultValue={'FARMER'}
                                    onChange={(e) => setData(e.target.name, e.target.value)}
                            >
                                <option value="FARMER">เกษตรกร</option>
                                <option value="ADMIN">ผู้ดูแลระบบ</option>
                            </select>
                        </div>
                        <div className={'form-group mb-3'}>
                            <label className={'form-label'}>ชื่อผู้ใช้</label>
                            <input type="text" className={'form-control'} placeholder={'ระบุชื่อผู้ใช้'}
                                   name={'name'}
                                   value={user && user.name || ''}
                                   onChange={(e) => setData(e.target.name, e.target.value, e)}
                                   maxLength={255}
                                   aria-describedby={'name'}
                            />
                        </div>
                        <div className={'form-group mb-3'}>
                            <label className={'form-label'}>อีเมล</label>
                            <input type="email" className={'form-control'} placeholder={'ระบุอีเมล'}
                                   name={'email'}
                                   value={user && user.email || ''}
                                   onChange={(e) => setData(e.target.name, e.target.value)}
                                   maxLength={255}
                                   aria-describedby={'email'}
                            />
                        </div>
                        <div className={'form-group mb-3'}>
                            <label className={'form-label'}>เบอร์โทรศัพท์</label>
                            <input type="number" className={'form-control'} placeholder={'เบอร์โทรศัพท์'}
                                   name={'phone'}
                                   value={user && user.phone || ''}
                                   onChange={(e) => setData(e.target.name, e.target.value)}
                                   onKeyDown={KeydownRegexNumber}
                                   maxLength={255}
                                   aria-describedby={'phone'}
                            />
                        </div>
                        <div className={'form-group mb-3'}>
                            <label className={'form-label'}>รหัสผ่าน</label>
                            <input type="password" className={'form-control'} placeholder={'รหัสผ่าน'}
                                   name={'password'}
                                   value={user && user.password || ''}
                                   onChange={(e) => setData(e.target.name, e.target.value)}
                                   maxLength={255}
                                   aria-describedby={'password'}
                            />
                        </div>
                        <div className={'form-group mb-3'}>
                            <label className={'form-label'}>ยืนยันรหัสผ่าน</label>
                            <input type="password" className={'form-control'} placeholder={'ยืนยันรหัสผ่าน'}
                                   name={'password_confirmation'}
                                   value={user && user.password_confirmation || ''}
                                   onChange={(e) => setData(e.target.name, e.target.value)}
                                   maxLength={255}
                                   aria-describedby={'password_confirmation'}
                            />
                        </div>

                        <div className={'register-detail mb-3'} style={{
                            width:'100%',
                            height:'100%',
                            padding:14,
                            backgroundColor:'#F6FAFF',
                            borderRadius:16,

                        }}>
                            <h1 style={{fontSize:14}} className={'text-color-primary fw-bold'}>รหัสผ่านประกอบด้วย:</h1>
                            <p style={{fontSize:14}} className={'m-0'}>
                                1. ตัวเลข (0-9) <br/>
                                2. ตัวพิมพ์ใหญ่ (A-Z) <br/>
                                3. ตัวพิมพ์เล็ก (a-z) <br/>
                                4. อักขระพิเศษ เช่น _ - ' () @ # <br/>
                                5. รหัสผ่านต้องมีจำนวนอย่างน้อย 8 ตัวอักษร ประกอบด้วยข้อ 1-4 อย่างน้อยอย่างละ 1 ตัวอักษร
                            </p>
                        </div>
                        <button type={"submit"} className={'btn btn-primary'} onClick={() => submit()}>ตกลง</button>
                    </div>
                </Layout>
                <FooterFarmer/>
            </div>
        </>
    )
}

export default Register;
