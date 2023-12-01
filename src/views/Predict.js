import HeaderFarmer from "./layouts/HeaderFarmer";
import Layout from "./layouts/Layout";
import Footer from "./layouts/Footer";
import cardExample from '../assets/images/cardExample.png'
import cardExample1 from '../assets/images/cardExample1.png'
import {Link, useNavigate} from "react-router-dom";
import {store} from "../redux/store";
import {useCallback, useEffect, useState} from "react";
import {getAppLists} from "../api/ApplicationAPI";
import {dismissPopup, showProgress} from "../components/AlertDialogs";
import FooterFarmer from "./layouts/FooterFarmer";
import {getUserById} from "../api/AuthApi";

function Predict() {

    const [applications, setApplication] = useState([])
    const [userId, setUserId] = useState();
    const [userType, setUserType] = useState();
    const navigate = useNavigate();
    const [user, setUser] = useState({});


    useEffect(() => {
        getUserAndApp()
    }, [])

    function getUserAndApp() {
        setUserType(store.getState().app.user.type)
        const user_id = store.getState().app.user.id
        setUserId(user_id)
        showProgress('')
        getAppLists('')
            .then(res => {
                const data = res.data;
                setApplication(data)
            }).finally(()=>{
                getUserById(user_id).then(res => {
                    const datauser = res.data.data
                    setUser(datauser)
                }).finally(()=>{
                    dismissPopup()
                })
        })
    }

    const styleTextOverflow = {
        overflow:"hidden",
        textOverflow:"ellipsis",
        whiteSpace:"nowrap"
    }

    console.log(store.getState().app.user)

    return (
        <>
            <div className={'Container'}>
                <HeaderFarmer showSetting={true} HeadImage={true} showRight={true} />
                <Layout>
                    <div className={'py-2 px-3 d-flex justify-content-between align-items-center bg-second2'}
                         style={{borderRadius: 20}}>
                        <div className={'d-flex'}>
                            <div className={'me-2 profileImage'}>
                                <img src={user.full_picture_path} alt="" width={45} height={45} style={{borderRadius: 100}}/>
                            </div>
                            <div className={'d-grid align-items-center'}>
                                <h6 className={'p-0 m-0'}
                                    style={{
                                        overflow:"hidden",
                                        textOverflow:"ellipsis",
                                        whiteSpace:"nowrap"
                                    }}
                                >สวัสดีคุณ {user.name}</h6>
                                <div className={'text-muted p-0 m-0'} style={{fontSize:12}} onClick={()=> {navigate('/home')}}>จำนวนสวน {user.count_of_farm} สวน </div>
                            </div>
                        </div>

                        <div onClick={()=> navigate(`/user/${userId}`)}>
                            <i className="fa-solid fa-pen icon bg-second text-color-primary text-sm" ></i>
                        </div>
                    </div>
                    <div className={'CARD mt-3'}>
                        <div className={'row g-3'}>
                            {applications.length > 0 ? (
                                applications.sort((a, b) => a.id - b.id) .map((data, index) => (
                                        data.show_status && (
                                            <div className={'col-6 col-lg-2 '} key={index}>
                                                <div className={'card card-in-home position-relative overflow-hidden'} style={{
                                                    width: '100%',
                                                    height: 200,
                                                    background: data.background_style,
                                                    padding: 0
                                                }}>
                                                    <div style={{padding: '14px 15px'}}>
                                                        <h6 style={{fontSize: 18, color: "white", marginBottom: 7,overflow:"hidden",
                                                            textOverflow:"ellipsis",
                                                            whiteSpace:"nowrap"}}>{data.name}</h6>
                                                        <Link to={data.url} target={"_blank"}>
                                                            <button className={'btn btn-in-home text-light'}
                                                                    style={{background: data.button_style}}>เลือก >
                                                            </button>
                                                        </Link>
                                                    </div>
                                                    <img src={data.full_picture_path} alt="no image" className={''}
                                                         style={{bottom: 0, right: 0, left: 0,objectFit:"cover"}} height={117} width={'100%'}/>
                                                </div>
                                            </div>
                                        )

                                    ))
                            ):(
                                <div className='position-relative text-center' style={{height:'30vh'}}>
                                    <h2 className='position-absolute' style={{ top:'50%',left:'50%',transform:'translate(-50%, -50%)'}}>ไม่พบข้อมูลแอปพลิเคชัน</h2>
                                </div>
                            )}

                        </div>

                    </div>
                </Layout>
                {
                    userType === 'FARMER' ?  <FooterFarmer/> : <Footer/>
                }


            </div>
        </>
    )


}

export default Predict;
