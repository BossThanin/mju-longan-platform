import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import setInputNumberForDevice from "../helper/SetInputNumberForDevice";
import {EditApp, getAppDetail} from "../api/ApplicationAPI";
import ValidateMimeType from "../helper/ValidateMimeType";
import {alertError, alertSuccess, confirmPopupText, dismissPopup, showProgress} from "../components/AlertDialogs";
import HeaderFarmer from "./layouts/HeaderFarmer";
import Layout from "./layouts/Layout";
import imageEmtry from "../assets/images/image_emtry.png";
import Footer from "./layouts/Footer";
import accept_icon from "../assets/icons/accept_icon.png";

function UpdateApp(){
    const routeParams = useParams();
    const [app, setApp] = useState(null);
    const [file_preview, setFilePreview] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        setInputNumberForDevice()
        getDetail()
    }, []);

    const getDetail = () => {
        showProgress('')
        getAppDetail(routeParams.id)
            .then(res => {
                if (res && res.data.success) {
                    setApp(res.data.data);
                    console.log(res.data)
                    setFilePreview(res.data.data.full_picture_path)
                }else{
                    console.log('fail')
                }
            }).finally(()=>{
                dismissPopup()
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

        setApp(exitingData => ({
            ...exitingData,
            [key]: value
        }))
    }

    const removeImage = () =>{
        setData('picture',null)
        setFilePreview(null)
    }

    const submit = () => {
        confirmPopupText(' ','คุณต้องการแก้ไขหรือไม่',()=>{
            showProgress('')
            EditApp(app)
                .then(res => {
                    if (res.data && res.data.success) {
                        alertSuccess('แก้ไขข้อมูลสำเร็จ')
                        setTimeout(() => {
                            dismissPopup()
                            navigate('/app-manage')
                        }, 1000)
                    } else {
                        alertError('แก้ไขข้อมูลไม่สำเร็จ', res.data && res.data.message || '')
                    }
                })
        })

    }
    return (
        <>
            <div className={'Container'}>
                <HeaderFarmer HeadTitle={'แก้ไขแอปพลิเคชั่น'} showBack={true} showNoti={true}/>
                <Layout>
                    <div className="form-group mb-2">
                        <label className='text-color-gray form-label'>ชื่อ Application</label>
                        <input className='form-control'
                               type="text"
                               placeholder="ระบุชื่อ Application"
                               name={'name'}
                               onChange={(e) => setData(e.target.name, e.target.value, e)}
                               value={app && app.name || ''}
                        />
                    </div>

                    <div className={'form-group mb-2'}>
                        <label className={'text-color-gray form-label'}>URL</label>
                        <input className={'form-control'}
                               type="text"
                               placeholder={'ระบุ URL'}
                               name={'url'}
                               onChange={(e) => setData(e.target.name, e.target.value, e)}
                               value={app && app.url || ''}
                        />
                    </div>

                    <div className={'form-group'}>
                        <label className={'form-label text-color-gray'}>รูปหน้าปก</label>
                        <div className={'mb-2 overflow-hidden'} style={{borderRadius:12,border:'1px solid #B4D1C1' ,height:200}}>
                            {file_preview ? (
                                <div className={'position-relative'}>
                                    <button onClick={() => removeImage()} className={'position-absolute btn-clear'} style={{right:10,top:12}}>
                                        <i className="fa-solid fa-minus icon text-color-danger bg-dan"></i>
                                    </button>
                                    <img src={file_preview ? file_preview : ''} className={'w-100'}/>
                                </div>
                            ):(
                                <>
                                    <div className={'w-100 d-flex justify-content-center align-items-center mt-3'}>
                                        <div className={'p-5 bg-second2 rounded-circle d-flex align-items-center justify-content-center'} style={{height:50,width:50}} >
                                            <i className="fa-solid fa-image text-color-primary" style={{fontSize:30}}></i>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="custom-file position-relative d-flex justify-content-center">
                                        <button className={'btn btn-warning text-light'} style={{height:40 ,width:'50%'}}>
                                            <i className="fa-solid fa-image"></i>
                                            &nbsp;
                                            <input type={'file'} style={{opacity:0,right:30}} className={'position-absolute'}
                                                   id={'user-image'}
                                                   onChange={handleChangeFile}
                                            />
                                            <span style={{fontSize:16}}>อัปโหลดรูปภาพ</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    card preview
                    <div className={'row'}>
                        <label className={'form-label text-color-gray'}>ตัวอย่างการแสดงผล</label>
                        <div className={'col-6'}>
                            <div className={'card card-in-home position-relative overflow-hidden'} style={{
                                width: '100%',
                                height: 200,
                                background: app && app.background_style || '',
                                padding: 0
                            }}>
                                <div style={{padding: '14px 15px'}}>
                                    <h6 style={{fontSize: 18, color: "white", marginBottom: 7}}>{app && app.name || ''}</h6>
                                    <Link to={app && app.url || ''} target={"_blank"}>
                                        <button className={'btn btn-in-home text-light'}
                                                style={{background: app && app.button_style || ''}}>เลือก >
                                        </button>
                                    </Link>
                                </div>
                                <img src={file_preview ? file_preview : imageEmtry} alt="no image" className={''}
                                     style={{bottom: 0, right: 0, left: 0}} height={117} width={'100%'}/>
                            </div>
                        </div>
                        {/*input color customize card*/}
                        <div className="col-6">
                            <div className="row">
                                <div className={'col-12'}>
                                    <label className={'form-label'}>เลือกสีพื้นหลัง</label>
                                    <div className={'d-flex justify-content-start'}>
                                        <input type="color" className={'w-100 p-0'}
                                               name={'background_style'}
                                               onChange={(e) => setData(e.target.name, e.target.value, e)}
                                               value={app && app.background_style || ''}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className={'col-12'}>
                                    <label className={'form-label'}>เลือกสีปุ่ม</label>
                                    <div className={'d-flex justify-content-start'}>
                                        <input type="color" className={'w-100 p-0'}
                                               name={'button_style'}
                                               onChange={(e) => setData(e.target.name, e.target.value, e)}
                                               value={app && app.button_style || ''}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className={'btn btn-primary mt-3'} onClick={submit}>
                        <img src={accept_icon} alt=""/>&nbsp;
                        <span>ตกลง</span>
                    </button>
                </Layout>
                <Footer/>
            </div>
        </>
    )
}

export default UpdateApp