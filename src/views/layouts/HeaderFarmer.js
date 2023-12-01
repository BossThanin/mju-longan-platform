import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {store} from "../../redux/store";
import ModalConfirmLogout from "./ModalConfirmLogout";
import {getCountNotification} from "../../api/NotificationApi";
import HeaderImage from '../../assets/images/HeaderFarmer.jpg'
import '../../assets/css/HeaderFarmer.css'
import LogoWhite from "../../assets/images/LogoWhite";
import iconWhite from '../../assets/icons/icon_white.png'


function Header(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [count_noti, setCountNoti] = useState(0);
    const [showLogout, setShowLogoutConfirm] = useState(false);

    useEffect(() => {
        // console.log('store >>>>> ', store.getState())
        if (store && store.getState() && store.getState().app && store.getState().app.user) {
            setUser(store.getState().app.user)
        }

        countNotification()
    }, []);

    const countNotification = () => {
        getCountNotification()
            .then(res => {
                if (res.data && res.data.success) {
                    setCountNoti(res.data.data.count)
                }
            })
    }
    return (
        <>
            <div className={'HeaderImge'} style={{
                backgroundRepeat: "revert",
                position:"relative",
                overflow:"hidden",
            }}>

                {
                    props.HeadImage ?
                        <img src={HeaderImage} alt="" style={{
                            borderRadius:'0 0 60px 0',
                            height: '100%',
                            width: '100%',
                            objectFit: "cover",
                            position: "absolute",
                            zIndex:-1
                        }}/> : null
                }

                <div className={''} >
                    <div className={'d-flex justify-content-between align-items-center p-4'}>
                        {props.showBack ?
                            <div className='' onClick={() => navigate((-1))}>
                                <i className="fa-solid fa-chevron-left icon text-color-primary bg-second"></i>
                            </div>
                            :
                            <div className='icon_logout opacity-0'>
                                <i className="fa-solid fa-bell icon text-color-primary bg-second"></i>
                            </div>
                        }


                        {
                            props.HeadTitle ? (
                                <span className='fw-bold' style={{
                                    fontSize:18,
                                    color:'black',
                                }}>{props.HeadTitle}</span>
                            ) : (
                                <div className={'d-flex justify-content-center align-items-center'}>
                                    <img src={iconWhite} alt="" className={'m-0'}/>
                                    <span style={{
                                        fontSize:20,
                                        color:"white",
                                        fontWeight:"bold"
                                    }}>Longan Platform</span>
                                </div>

                            )
                        }



                        {props.showRight ? (
                            <>
                                {
                                    props.showNoti ? (
                                        <div className="right-side-menu">
                                            <div className=""
                                                 onClick={() => user.type === 'ADMIN' ? navigate('/admin_notification') : navigate('/farmer_notification')}>
                                                <i className="fa-solid fa-bell icon text-color-primary bg-second"></i>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={'d-none'}></div>
                                    )
                                }

                                {

                                    props.showSetting ? (
                                        user.type === 'ADMIN' ? (
                                                <Link to={'/app-manage'}>
                                                    <div className='icon_logout'>
                                                        <i className="fa-solid fa-gear icon text-light bg-pri " style={{fontSize:15}}></i>
                                                    </div>
                                                </Link>
                                            ) :
                                            <div className="right-side-menu" style={{opacity:0}}>
                                                <div className="">
                                                    <i className="fa-solid fa-bell icon text-color-primary bg-second"></i>
                                                </div>
                                            </div>
                                    ) : null

                                }


                                {props.showLogout ? (
                                    <div className='icon_logout' onClick={() => setShowLogoutConfirm(true)}>
                                        <i className="fa-solid fa-right-from-bracket icon text-color-danger bg-dan "></i>
                                    </div>
                                ) : (
                                    <div className='icon_logout d-none'></div>
                                )}
                                {showLogout &&
                                    <ModalConfirmLogout modalIsOpen={showLogout} closeModal={() => setShowLogoutConfirm(false)}/>}

                                {props.AddApp ? (
                                    <Link to={'/add-app'}>
                                        <div className='icon_AddApp'>
                                            <i className="fa-solid fa-plus icon text-white bg-pri "></i>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className='icon_logout d-none'></div>
                                )}
                            </>
                        ) : (
                            <div className="right-side-menu" style={{opacity:0}}>
                                <div className="">
                                    <i className="fa-solid fa-bell icon text-color-primary bg-second"></i>
                                </div>
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;