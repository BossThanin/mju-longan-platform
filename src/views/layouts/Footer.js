import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {store} from "../../redux/store";
import FooterFarmer from "./FooterFarmer";

function Footer() {
    const navigate = useNavigate();
    const [menuActive, setMenuActive] = useState('home');
    const user = store && store.getState().app && store.getState().app.user
    const location = useLocation();
    const footer_routes = ['/home', '/application',`/farmer/${user.id}`];



    function handleClickMenu(menu) {
        if (menu === 'home' && user.type === 'ADMIN') {
            navigate('/farmer')
        }else if(menu === 'profile'){
            navigate(`/farmer/${user.id}`)
        }
        else {
            navigate('/application')
        }
    }

    function fillColor(menu) {
        return menuActive === menu ? '#0E5590' : '#727178';
    }

    useEffect(() => {
        if (footer_routes.includes(location.pathname)) {
            setMenuActive(location.pathname.replace('/', ''))
        }
    }, []);
    return (

            (user.type === 'ADMIN') ? (
                <footer className={'d-flex justify-content-evenly py-2 px-lg-5'} style={{boxShadow: '0px -23px 39px -23px rgba(0,0,0,0.1)'}}>
                    <div className="flex-1 text-center cursor-pointer px-4" onClick={() => handleClickMenu('home')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="75" height="24" viewBox="0 0 75 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M36.6861 1.21065C37.0472 0.929784 37.5529 0.929784 37.914 1.21065L46.914 8.21065C47.1576 8.4001 47.3 8.69141 47.3 9V20C47.3 20.7957 46.984 21.5587 46.4214 22.1213C45.8588 22.6839 45.0957 23 44.3 23H30.3C29.5044 23 28.7413 22.6839 28.1787 22.1213C27.6161 21.5587 27.3 20.7957 27.3 20V9C27.3 8.69141 27.4425 8.4001 27.6861 8.21065L36.6861 1.21065ZM29.3 9.48908V20C29.3 20.2652 29.4054 20.5196 29.5929 20.7071C29.7805 20.8946 30.0348 21 30.3 21H44.3C44.5653 21 44.8196 20.8946 45.0072 20.7071C45.1947 20.5196 45.3 20.2652 45.3 20V9.48908L37.3 3.26686L29.3 9.48908Z"
                                  fill={fillColor('home')}/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M33.3 12C33.3 11.4477 33.7478 11 34.3 11H40.3C40.8523 11 41.3 11.4477 41.3 12V22C41.3 22.5523 40.8523 23 40.3 23C39.7478 23 39.3 22.5523 39.3 22V13H35.3V22C35.3 22.5523 34.8523 23 34.3 23C33.7478 23 33.3 22.5523 33.3 22V12Z"
                                  fill={fillColor('home')}/>
                        </svg>
                        <div className="mt-2" style={{color: fillColor('home')}}>ผู้ใช้งาน</div>
                    </div>

                    <div className="flex-1 text-center cursor-pointer px-4" onClick={() => handleClickMenu('application')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 20" fill="none">
                            <g clipPath="url(#clip0_400_428)">
                                <path
                                    d="M19.2333 14.3421C19.2333 17.0066 17.0386 19.1667 14.3314 19.1667C11.6241 19.1667 9.4294 17.0066 9.4294 14.3421C9.4294 11.6776 11.6241 9.51755 14.3314 9.51755C17.0386 9.51755 19.2333 11.6776 19.2333 14.3421Z"
                                    fill="white"/>
                                <path
                                    d="M12.9588 16.0146C13.1885 16.2735 13.4958 16.454 13.8364 16.53C14.1638 16.6435 14.5228 16.6307 14.8411 16.4942C15.1594 16.3577 15.4133 16.1076 15.5518 15.7943C15.7208 15.2007 15.1152 14.5523 14.3347 14.3653C13.5543 14.1782 12.9512 13.534 13.1176 12.9363C13.2559 12.6228 13.5099 12.3726 13.8282 12.2361C14.1465 12.0996 14.5056 12.0869 14.8331 12.2005C15.17 12.2754 15.4746 12.4525 15.7039 12.7068"
                                    fill="white"/>
                                <path d="M2.56665 9.51755L7.46861 5.65791L11.3902 6.62282L18.2529 0.833344" fill="white"/>
                                <path d="M15.1088 0.833344H18.2529V3.92782" fill="white"/>
                                <path
                                    d="M12.9588 16.0146C13.1885 16.2735 13.4958 16.454 13.8364 16.53C14.1638 16.6435 14.5228 16.6307 14.8411 16.4942C15.1594 16.3577 15.4133 16.1076 15.5518 15.7943C15.7208 15.2007 15.1152 14.5523 14.3347 14.3653C13.5543 14.1782 12.9512 13.534 13.1176 12.9363C13.2559 12.6228 13.5099 12.3726 13.8282 12.2361C14.1465 12.0996 14.5056 12.0869 14.8331 12.2005C15.17 12.2754 15.4746 12.4525 15.7039 12.7068M14.3727 16.5824V17.1784M14.3727 11.4474V12.1473M2.56665 9.51755L7.46861 5.6579L11.3902 6.62282L18.2529 0.833344M18.2529 0.833344H15.1088M18.2529 0.833344V3.92782M6.48822 18.2018V12.4123M2.56665 18.2018V14.3421M19.2333 14.3421C19.2333 17.0066 17.0386 19.1667 14.3314 19.1667C11.6241 19.1667 9.4294 17.0066 9.4294 14.3421C9.4294 11.6776 11.6241 9.51755 14.3314 9.51755C17.0386 9.51755 19.2333 11.6776 19.2333 14.3421Z"
                                    stroke={fillColor('application')} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_400_428">
                                    <rect width="20" height="20" fill="white" transform="translate(0.899963)"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <div className="mt-2" style={{color: fillColor('application')}}>แอปพลิเคชั่น</div>
                    </div>

                    <div className="flex-1 text-center cursor-pointer px-4" onClick={() => handleClickMenu('profile')}>
                        <img src={user.full_picture_path} alt="" height={25} width={25} className={'rounded-circle'}/>
                        <div className="mt-2" style={{color: fillColor(`farmer/${user.id}`)}}>โปรไฟล์</div>
                    </div>

                </footer>
            ) : (
                <FooterFarmer/>
            )


    )
}

export default Footer;
