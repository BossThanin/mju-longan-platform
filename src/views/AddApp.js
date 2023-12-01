import React, {useEffect, useState} from "react";
import Layout from '../views/layouts/Layout'
import {Link, useNavigate} from "react-router-dom";
import HeaderFarmer from "./layouts/HeaderFarmer";
import Footer from "./layouts/Footer";
import {alertError, alertSuccess, confirmPopupText, dismissPopup, showProgress} from "../components/AlertDialogs";
import {addApp, getRef} from "../api/ApplicationAPI";
import imageEmtry from '../assets/images/image_emtry.png'
import accept_icon from '../assets/icons/accept_icon.png'
function AddApp(){
    useEffect(()=>{
        hendlieRefresh();
    }, [])
    const [app, setApp] = useState({
        name:'',
        url: '',
        picture:'',
        background_style: '#617680',
        button_style: '#77929f'
    });
    const [file_preview, setFilePreview] = useState(null);
    const navigate = useNavigate();
    const [token, setToken] = useState({
        data:''
    });
    const [confirmtoken, setConfirmToken] = useState(false);


    const handleChangeFile = (e) => {
        setData('picture', e.target.files[0])
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (ev) {
                setFilePreview(ev.target.result)
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const handleRemoveFile = () => {
        setData('picture', null)
        setFilePreview(null)
    }

    const setData = (key, value) => {
        setApp(exitingData => ({
            ...exitingData,
            [key]: value
        }))
    }

    const hendlieRefresh = () => {
        getToken()
    }

    function getToken() {
        getRef()
            .then(res => {
                console.log('res data >>>', res.data);
                setToken({ data: res.data });
            })
            .catch(error => {
                console.error('Error getting token:', error);
            });
    }

    const submit = () => {
        confirmPopupText('บันทึก', 'คุณต้องการบันทึกหรือไม่' ,() =>{
            showProgress('')
            addApp(app)
                .then(res => {
                    if(res.data && res.data.success) {
                        alertSuccess('สร้างแอปพลิเคชั่นสำเร็จ', ' ')
                        setTimeout(() => {
                            dismissPopup()
                            navigate('/application')
                        }, 2000)
                    }else {
                        alertError('เกิดข้อผิดพลาด', res.data && res.data.message || '')
                    }
                })
        })
        console.log('app >>>> ', app)

    }




    return (
        <>

            <div className={'Container'}>
                <HeaderFarmer HeadTitle={'เพิ่มแอปพลิเคชั่น'} showBack={true}/>
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
                    <div className={'form-group'}>
                        <label className='text-color-gray form-label'>Token</label>
                        <div className="form-group mb-2">
                            <input className='form-control w-100' type="text" placeholder="" readOnly={true} value={token.data || ''} onChange={(e) => setToken({ data: e.target.value })}/>
                        </div>
                    </div>
                    <div className={'row gx-2'}>
                        <div className={'col-6'}>
                            <button className={'btn btn-warning'} style={{height:40}} onClick={hendlieRefresh} disabled={confirmtoken}>
                                <i className="fa-solid fa-rotate-left"></i>
                                <span className={'ms-1'}>เปลี่ยน</span>
                            </button>
                        </div>
                        <div className={'col-6'}>
                            <button className={'btn btn-primary'} style={{height:40}} onClick={()=>setConfirmToken(true)} disabled={confirmtoken}>
                                <i className="fa-solid fa-check"></i>
                                <span className={'ms-1'}>ยืนยัน</span>
                            </button>
                        </div>
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
                                <>
                                    <div className={'position-relative'}>
                                        <button onClick={() => handleRemoveFile()} className={'position-absolute btn-clear'} style={{right:10,top:12}}>
                                            <i className="fa-solid fa-minus icon text-color-danger bg-dan"></i>
                                        </button>
                                        <img src={file_preview ? file_preview : ''} className={'w-100'}/>
                                    </div>
                                </>
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
                                                   onChange={handleChangeFile}
                                            />
                                            <span style={{fontSize:16}}>อัปโหลดรูปภาพ</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>


                    {/*card preview*/}
                    <div className={'row'}>
                        <label className={'form-label text-color-gray'}>ตัวอย่างการแสดงผล</label>
                        <div className={'col-6'}>
                            <div className={'card card-in-home position-relative overflow-hidden'} style={{
                                width: '100%',
                                height: 200,
                                background: app.background_style,
                                padding: 0
                            }}>
                                <div style={{padding: '14px 15px'}}>
                                    <h6 style={{fontSize: 18, color: "white", marginBottom: 7,overflow:"hidden",
                                        textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                                        {app.name === '' ? (
                                            'ชื่อ Application'
                                        ) : (
                                            app.name
                                        )}
                                    </h6>
                                    <Link to={app.url} target={"_blank"}>
                                        <button className={'btn btn-in-home text-light'}
                                                style={{background: app.button_style}}>เลือก >
                                        </button>
                                    </Link>
                                </div>
                                <img src={file_preview ? file_preview : imageEmtry} alt={imageEmtry} className={''}
                                     style={{bottom: 0, right: 0, left: 0,objectFit:"cover"}} height={117} width={'100%'}/>
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
                    <button className={'btn btn-primary mt-3 d-flex justify-content-center align-items-center'} onClick={submit}>
                        <img src={accept_icon} alt=""/>&nbsp;
                        <span>ตกลง</span>
                    </button>

                </Layout>
                <Footer/>
            </div>
        </>
    )
}
export default AddApp;