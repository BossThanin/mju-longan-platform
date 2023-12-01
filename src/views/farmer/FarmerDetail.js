import Page from "../layouts/Page";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteFarmerById, getFarmerDetail} from "../../api/FarmerApi";
import defaultUserImg from "../../assets/images/default_user.png";
import {alertError, alertSuccess, confirmPopupText, dismissPopup, showProgress} from "../../components/AlertDialogs";
import {updateFarmer} from "../../api/FarmerApi";
import KeydownRegexNumber from "../../helper/KeydownRegexNumber";
import setInputNumberForDevice from "../../helper/SetInputNumberForDevice";
import ValidateMimeType from "../../helper/ValidateMimeType";
import Layout from "../layouts/Layout";
import HeaderFarmer from "../layouts/HeaderFarmer";

import "../../assets/css/farmer_detail.css"
import Footer from "../layouts/Footer";
import FooterFarmer from "../layouts/FooterFarmer";
import {store} from "../../redux/store";

function FarmerDetail() {
    const routeParams = useParams();
    const [user, setUserData] = useState(null);
    const [file_preview, setFilePreview] = useState();
    const navigate = useNavigate();
    const [userType, setUserType] = useState();

    useEffect(() => {
        setUserType(store.getState().app.user.type)
        setInputNumberForDevice()
        getDetail()
    }, []);

    const getDetail = () => {
        showProgress('')
        getFarmerDetail(routeParams.id)
            .then(res => {
                if (res && res.data.success) {
                    console.log(res.data)
                    setUserData(res.data.data);
                    setFilePreview(res.data.data.full_picture_path)
                    dismissPopup()
                }
            })
    }

    const handleChangeFile = (e) => {
        let is_valid = ValidateMimeType(e.target.files[0]);
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
        updateFarmer(user)
            .then(res => {
                if (res.data && res.data.success) {
                    alertSuccess('แก้ไขข้อมูลสำเร็จ')
                    setTimeout(() => {
                        dismissPopup()
                        navigate('/farmer')
                    }, 1000)
                } else {
                    alertError('แก้ไขข้อมูลไม่สำเร็จ', res.data && res.data.message || '')
                }
            })
    }

    return (
        <div className={'Container'}>
            <HeaderFarmer HeadTitle={'โปรไฟล์'} showLogout={true} showRight={true} showBack={true}/>
            <Layout>
                <div className="farmer-user-container d-flex flex-column justify-content-between">
                    <div>
                        <label htmlFor="user-image" className="w-100 mb-2 d-flex justify-content-center">
                            <div className="user-image-outer">
                                <div className="user-image-box mb-3">
                                    <img src={file_preview ? file_preview : defaultUserImg} alt="user image" className={'h-100 w-100'} style={{objectFit:"cover"}}/>

                                    <div className="icon-edit-user-image">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13"
                                             viewBox="0 0 14 13" fill="none">
                                            <path
                                                d="M8.5 1.97656L9.48438 0.96875C10.0703 0.382812 11.0312 0.382812 11.6172 0.96875L12.5312 1.88281C13.1172 2.46875 13.1172 3.42969 12.5312 4.01562L6.36719 10.1797C5.24219 11.3047 3.8125 12.0781 2.24219 12.3828L1.65625 12.5C1.46875 12.5469 1.28125 12.4766 1.16406 12.3359C1.02344 12.2188 0.953125 12.0312 1 11.8438L1.11719 11.2578C1.42188 9.6875 2.19531 8.25781 3.32031 7.13281L7.70312 2.75L7.375 2.44531C7.16406 2.23438 6.8125 2.23438 6.60156 2.44531L4.1875 4.83594C3.97656 5.07031 3.625 5.07031 3.41406 4.83594C3.17969 4.625 3.17969 4.27344 3.41406 4.03906L5.80469 1.64844C6.46094 0.992188 7.51562 0.992188 8.17188 1.64844L8.5 1.97656ZM8.5 3.54688L4.11719 7.92969C3.20312 8.84375 2.57031 9.96875 2.26562 11.2344C3.53125 10.9297 4.65625 10.2969 5.57031 9.38281L9.95312 5L8.5 3.54688Z"
                                                fill="white"/>
                                        </svg>
                                    </div>
                                </div>

                                <input
                                    type="file" accept="image/*"
                                       id="user-image"
                                       style={{display: "none"}}
                                       onChange={handleChangeFile}
                                />
                            </div>
                        </label>

                        <div className="mb-2">
                            <label className="form-label">ชื่อผู้ใช้งาน</label>
                            <input type="text" className="form-control"
                                   placeholder="ชื่อ-สกุล"
                                   aria-label="name"
                                   onChange={(e) => setData(e.target.name, e.target.value)}
                                   value={user && user.name || ''}
                                   name="name"
                                   aria-describedby="name"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">อีเมล</label>
                            <input type="email" className="form-control"
                                   placeholder="อีเมล"
                                   aria-label="email"
                                   onChange={(e) => setData(e.target.name, e.target.value)}
                                   value={user && user.email || ''}
                                   name="email"
                                   disabled={true}
                                   aria-describedby="email"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="form-label">เบอร์โทรศัพท์</label>
                            <input type="number" className="form-control"
                                   placeholder="เบอร์โทรศัพท์"
                                   aria-label="phone"
                                   onChange={(e) => setData(e.target.name, e.target.value)}
                                   onKeyDown={KeydownRegexNumber}
                                   value={user && user.phone || ''}
                                   name="phone"
                                   aria-describedby="phone"
                            />
                        </div>

                        <div className={'mb-2'}>
                            <label className={'form-label'}>รหัสผ่าน</label>
                            <input type="password" className={'form-control'}
                                   aria-label={'password'}
                                   value={user && user.password}
                                   name={'password'}
                                   onChange={(e) => setData(e.target.name, e.target.value)}
                                   aria-describedby="password"
                            />
                        </div>

                        <div className={'mb-2'}>
                            <label className={'form-label'}>ยืนยันรหัสผ่าน</label>
                            <input type="password" className={'form-control'}
                                   aria-label={'password_confirmation'}
                                   value={user && user.password_confirmation}
                                   name={'password_confirmation'}
                                   onChange={(e) => setData(e.target.name, e.target.value)}
                                   aria-describedby="password"
                            />
                        </div>
                    </div>
                    <Link to={'/farm/add'} className={'btn btn-outline-primary'}>เพิ่มสวน</Link>
                    <div>
                        <button type="submit"
                                className="btn btn-primary next-btn w-100 d-flex justify-content-center align-items-center p-3 mt-3"
                                onClick={() => submit()}
                                id="btn-submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21"
                                 fill="none">
                                <path
                                    d="M5.125 13C4.77344 13 4.5 12.7266 4.5 12.375C4.5 12.0625 4.77344 11.75 5.125 11.75H13.875C14.1875 11.75 14.5 12.0625 14.5 12.375C14.5 12.7266 14.1875 13 13.875 13H5.125ZM5.125 9.25C4.77344 9.25 4.5 8.97656 4.5 8.625C4.5 8.3125 4.77344 8 5.125 8H13.875C14.1875 8 14.5 8.3125 14.5 8.625C14.5 8.97656 14.1875 9.25 13.875 9.25H5.125ZM5.125 16.75C4.77344 16.75 4.5 16.4766 4.5 16.125C4.5 15.8125 4.77344 15.5 5.125 15.5H10.125C10.4375 15.5 10.75 15.8125 10.75 16.125C10.75 16.4766 10.4375 16.75 10.125 16.75H5.125ZM15.75 0.5C17.1172 0.5 18.25 1.63281 18.25 3V18C18.25 19.4062 17.1172 20.5 15.75 20.5H3.25C1.84375 20.5 0.75 19.4062 0.75 18V3C0.75 1.63281 1.84375 0.5 3.25 0.5H15.75ZM17 18V5.5H2V18C2 18.7031 2.54688 19.25 3.25 19.25H15.75C16.4141 19.25 17 18.7031 17 18ZM17 4.25V3C17 2.33594 16.4141 1.75 15.75 1.75H3.25C2.54688 1.75 2 2.33594 2 3V4.25H17Z"
                                    fill="white"/>
                            </svg>
                            &emsp;
                            <span className="me-1">บันทึก</span>&nbsp;
                        </button>
                    </div>
                </div>
            </Layout>
            {
                userType === 'FARMER' ?  <FooterFarmer/> : <Footer/>
            }
        </div>

    )
}

export default FarmerDetail;
