import Header from "../layouts/HeaderFarmer";
import Layout from "../layouts/Layout";
import Footer from "../layouts/Footer";
import {useEffect, useState} from "react";
import {deleteApp, getAppLists, showApp} from "../../api/ApplicationAPI";
import '../../assets/css/setting.css'
import {faEye, faEyeSlash, faMagnifyingGlass, faPenAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useNavigate} from "react-router-dom";
import {alertError, alertSuccess, confirmPopupText, dismissPopup, showProgress} from "../../components/AlertDialogs";
import {debounce} from "lodash";



function Setting() {
    const [search, setSearch] = useState('');
    useEffect(() => {
        getApps(search)
    }, []);

    const debounceSearch = debounce((v) => {
        setSearch(v)
        getApps(v)
    }, 800)


    const [applications, setApplication] = useState([]);

    const navigate = useNavigate();

    function getApps(search) {
        showProgress('')
        getAppLists(search)

            .then(res => {
                const Apps = res.data
                setApplication(Apps)
                // console.log(res.data)
                // console.log('res data success')
            }).finally(() => {
            dismissPopup()
        })
    }


    const changeStatusApp = (id,data) => {
        showProgress('')
        showApp(id,data)
            .then(res => {
                if (res.data && res.data.success) {
                    // alertSuccess('สำเร็จ')
                    setTimeout(() => {
                        dismissPopup()
                        getApps(search)
                    }, 1000)
                } else {
                    alertError('ไม่สำเร็จ', res.data && res.data.message || '')
                }
            })
    }

    const Delete = (id) => {
        confirmPopupText('ลบแอปพลิเคชั่น', 'คุณต้องการลบแอปพลิเคชั่นหรือไม่' ,()=>{
            showProgress('')
            deleteApp(id)
                .then(res => {
                    if (res.data && res.data.success) {
                        alertSuccess('สำเร็จ')
                        setTimeout(() => {
                            dismissPopup()
                            getApps()
                        }, 1000)
                    } else {
                        alertError('ไม่สำเร็จ', res.data && res.data.message || '')
                    }
                })
        })

    }


    return (
        <>
            <div className={'Container'}>
                <Header HeadTitle={'จัดการแอปพลิเคชั่น'} AddApp={true} showBack={true} showRight={true}/>
                <Layout>
                    <div className={'d-flex'}>
                        <div className={'input-group mb-3'} style={{width: '100%'}}>
                            <div className={'input-group-text'}>
                                <FontAwesomeIcon icon={faMagnifyingGlass}
                                                 className={'text-color-primary icon bg-second'}/>
                            </div>
                            <input type="text" className={'form-control'} placeholder={'ค้นหา'} onChange={(e) => debounceSearch(e.target.value)}/>
                        </div>
                    </div>
                    <div className={'row'}>
                        {applications.length > 0 ? (
                            applications.sort((a, b) => a.id - b.id) .map((data, index) => (
                                <div className={'col-12 col-lg-4'}>
                                    <div className={'card-setting'} style={{border: `solid 2px ${data.background_style}`}}>
                                        {/*<div className={'d-flex p-3 align-items-center'}>*/}
                                        {/*    <div className="row gx-3">*/}
                                        {/*        <div className="col-4">*/}
                                        {/*            <div className={'me-2'} style={{borderRadius: 20,width:'300' ,height:'200'}}>*/}
                                        {/*                <img src={data.full_picture_path} alt="no image" width={29} height={29} style={{objectFit:"cover"}}/>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className={'col-8'}>*/}
                                        {/*            <div>*/}
                                        {/*                <h1 style={{*/}
                                        {/*                    fontSize: 20,*/}
                                        {/*                    fontWeight: "bold",*/}
                                        {/*                    color: data.background_style*/}
                                        {/*                }}>{data.name}</h1>*/}
                                        {/*                <p style={{marginBottom: 0,fontSize:14}} className={'text-nowrap overflow-hidden'}>*/}
                                        {/*                    <span style={{fontWeight: "bold"}}>URL : </span>*/}
                                        {/*                    <Link to={data.url} target={"_blank"} className={'URL'}>{data.url}</Link>*/}
                                        {/*                </p>*/}
                                        {/*                <div className={'d-flex'} style={{marginTop: 10}}>*/}
                                        {/*                    {data.show_status === true ?*/}
                                        {/*                        <p style={{background: '#c7f4ce'}} className={'status'}>แสดงผลอยู่</p> :*/}
                                        {/*                        <p style={{background: '#ffcccc'}}*/}
                                        {/*                           className={'status'}>ถูกปิดการมองเห็น</p>}*/}
                                        {/*                </div>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}

                                        {/*</div>*/}
                                        <div className={'card-content p-3 d-flex justify-content-evenly align-items-center overflow-hidden'} style={{maxWidth:'100%',height:'100%'}}>
                                            <div className={'overflow-hidden'} style={{width:'40%', height:"100px",borderRadius:14,boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
                                                <img src={data.full_picture_path} alt="no image" width={'100%'} height={'100%'} style={{objectFit:"cover",}}/>
                                            </div>
                                            <div className={'overflow-hidden ms-3'} style={{width:'60%' ,whiteSpace:"nowrap",textOverflow:"ellipsis"}}>
                                                <h3 className={'p-0 mb-2 fw-bold'} style={{fontSize:18,color:data.background_style}}>{data.name}</h3>
                                                <Link to={data.url} target={"_blank"} className={'text-decoration-none text-muted mb-2'} style={{fontSize:14}}>
                                                    <span className={'fw-bold text-dark'}>ลิ้งค์ : </span> {data.url}
                                                </Link>
                                                <div className={'d-flex'}>
                                                    <div className={'mt-1 px-2 py-1'} style={{background:data.show_status === true ? '#D9EDDE' : '#FDD1D9',borderRadius:50}}>
                                                        {data.show_status === true ? (
                                                            <p className={'m-0 p-0'} style={{fontSize:12,color:'#0E572B'}}>แสดงผลอยู่</p>
                                                        ) : (
                                                            <p className={'p-0 m-0'} style={{fontSize:12,color:'#CB262D'}}>ถูกปิดการมองเห็น</p>
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className={'footer'} style={{
                                            borderTop: `solid 2px ${data.background_style}`,
                                            background: data.background_style
                                        }}>
                                            <div className={'icon-setting'} style={{background: '#fffce5'}}>
                                                <FontAwesomeIcon className={'me-1'} icon={faPenAlt} style={{color: '#efba00'}}/>
                                                <span onClick={() => navigate(`/edit-app/${data.id}`)}
                                                      className={'icon-setting-title'} style={{color: '#bc9200'}}>แก้ไข</span>
                                            </div>


                                            <div onClick={() => changeStatusApp(data.id,data)}>
                                                {
                                                    data.show_status === true ?
                                                        <button className={'icon-setting'} style={{background: '#e5e5e5'}}>
                                                            <FontAwesomeIcon className={'me-1'} icon={faEyeSlash}
                                                                             style={{color: '#626262', fontSize: 15,}}/>
                                                            <span className={'icon-setting-title'}
                                                                  style={{color: '#626262'}}>ซ่อน</span>
                                                        </button>
                                                        :
                                                        <button className={'icon-setting'} style={{background: '#e5e5e5'}}>
                                                            <FontAwesomeIcon className={'me-1'} icon={faEye}
                                                                             style={{color: '#626262', fontSize: 15,}}/>
                                                            <span className={'icon-setting-title'}
                                                                  style={{color: '#626262'}}>แสดง</span>
                                                        </button>
                                                }
                                            </div>

                                            <button className={'icon-setting'} style={{background: '#fff2f2'}} onClick={()=>{Delete(data.id)}}>
                                                <FontAwesomeIcon className={'me-1'} icon={faTrash}
                                                                 style={{color: '#d73d47', fontSize: 15, background: '#fff2f2'}}/>
                                                <span className={'icon-setting-title'} style={{color: '#d73d47'}}>ลบ</span>
                                            </button>

                                        </div>
                                    </div>
                                </div>

                            ))
                        ):(
                            <div className='position-relative text-center' style={{height:'30vh'}}>
                                <h2 className='position-absolute' style={{ top:'50%',left:'50%',transform:'translate(-50%, -50%)'}}>ไม่พบข้อมูลแอปพลิเคชัน</h2>
                            </div>
                        )}
                    </div>


                </Layout>
                <Footer/>
                {/*<FooterFarmer/>*/}
            </div>
        </>
    )
}

export default Setting;