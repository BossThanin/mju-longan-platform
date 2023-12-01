import {debounce} from "lodash";
import {alertError, alertSuccess, confirmPopupText, dismissPopup, showProgress} from "../../components/AlertDialogs";
import {useEffect, useState} from "react";
import userDefaultImg from "../../assets/images/default_user.png";
import {useNavigate} from "react-router-dom";
import {deleteUserById, getUserList} from "../../api/AuthApi";
import HeaderFarmer from "../layouts/HeaderFarmer";
import Layout from "../layouts/Layout";
import '../../assets/css/farmer.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPenAlt,
    faTrash,
    faChevronRight, faUsers
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../layouts/Footer";
import {store} from "../../redux/store";

function FarmerList() {
    const [search, setSearch] = useState('');
    const [type, setType] = useState('FARMER');
    const [users, setUser] = useState([]);
    const navigate = useNavigate();
    const auth = store.getState().app.user.type


    useEffect(() => {
        getListData('', type)
    }, []);

    function getListData(search = '', type = 'FARMER') {
        if (auth === 'FARMER'){
            navigate('/application')
        }else{
            // showProgress('')
            showProgress('')

            let filter = {
                search, type
            }

            getUserList(filter)
                .then(res => {
                    if (res.data && res.data.success) {
                        const data = res.data.data;
                        setUser(data)
                    }
                }).finally(() => {
                dismissPopup()
            })
        }

    }


    const debounceSearch = debounce((v) => {
        setSearch(v)
        getListData(v, type)
    }, 800)

    function renderStatus(item) {
        let data = {};
        switch (item.status) {
            case 'approved':
                data = {
                    background: '#C7F4CE', icon_color: '#46AD4A', icon: '', label: 'ตรวจสอบสำเร็จ'
                }
                break;
            case 'failed':
                data = {
                    background: '#FDD1D9', icon_color: '#D73D47', icon: '', label: 'ตรวจสอบไม่สำเร็จ'
                }
                break;
            case 'rejected':
                data = {
                    background: '#FDD1D9', icon_color: '#D73D47', icon: '', label: 'ไม่อนุมัติ'
                }
                break;
            default:
                data = {
                    background: '#FFFCB5', icon_color: '#EBD300', icon: '', label: 'รอตรวจสอบ'
                }
                break;
        }

        return (<div className="farmer-status-badge" style={{background: data.background}}>
            <span>{data.label}</span>
        </div>)
    }

    const deleteUser = (id) => {
        confirmPopupText('', 'คุณต้องการลบบัญชีนี้ใช่หรือไม่', () => {
            showProgress('')
            deleteUserById(id)
                .then(res => {
                    if (res.data && res.data.success) {
                        alertSuccess('ลบข้อมูลสำเร็จ')
                        setTimeout(() => {
                            setType('FARMER')
                            setTimeout(() => {
                                dismissPopup()
                                getListData('', 'FARMER')
                            }, 800)
                        }, 1000)
                    } else {
                        alertError('ลบข้อมูลไม่สำเร็จ', res.data && res.data.message || '')
                    }
                })
        })
    }

    const getStatusBg = (status) => {
        switch (status) {
            case 'approved':
                return '#46AD4A';
            case 'rejected':
                return '#D73D47';
            default:
                return '#EBD300';
        }
    }

    const handleTab = (tab) => {
        setType(tab)
        setSearch('')
        getListData('', tab)
    }

    return (<div className={'Container'}>
        <HeaderFarmer HeadTitle={'ผู้ใช้งาน'} showLogout={false} showBack={false} showNoti={true} showRight={true}/>
        <Layout>
            <div className="farmer-list-container" style={users && users.length === 0 ? {display: 'grid'} : {}}>
                <div style={users && users.length === 0 ? {alignSelf: 'start'} : {}}>
                    <div className="input-group mb-3">
                        <div className="input-group-text border-right-none" id="search">
                            <i className="fa-solid fa-search text-color-primary icon bg-second"></i>
                        </div>
                        <input type="search" className="form-control border-left-none" placeholder="ค้นหา" aria-label="search" onChange={(e) => debounceSearch(e.target.value)} aria-describedby="search"/>
                    </div>
                    <div className="d-flex align-items-center justify-content-around flex-1 mb-3">
                        <div style={type === 'FARMER' ? {color: '#004B8A', borderBottom: '2px solid #004B8A'
                        } : {color: '#BEBEBE', borderBottom: '1px solid lightgrey'}} className="d-flex align-items-center flex-1 justify-content-center p-2" onClick={() => handleTab('FARMER')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M8 1C8.1875 1 8.3125 0.9375 8.46875 0.8125C8.6875 0.6875 8.9375 0.5 9.5 0.5C10.5938 0.5 11.3125 2.34375 11.75 3.96875C10.875 4.25 9.65625 4.5 8 4.5C6.34375 4.5 5.09375 4.25 4.25 3.96875C4.65625 2.34375 5.375 0.5 6.5 0.5C7.0625 0.5 7.28125 0.6875 7.5 0.8125C7.65625 0.9375 7.78125 1 8 1ZM1.25 3.5625C1.46875 3.46875 1.75 3.53125 1.875 3.71875C2.0625 3.9375 2.59375 4.40625 3.59375 4.8125C4.59375 5.1875 6.03125 5.5 8 5.5C9.9375 5.5 11.375 5.1875 12.375 4.8125C13.375 4.40625 13.9062 3.9375 14.0938 3.71875C14.2188 3.53125 14.5 3.46875 14.7188 3.5625C14.9375 3.6875 15.0312 3.9375 14.9688 4.15625C14.6562 5.03125 13.875 6.125 12.6875 6.96875C12.4688 7.15625 12.25 7.28125 12 7.4375C12 7.46875 12 7.5 12 7.5C12 9.71875 10.1875 11.5 8 11.5C5.78125 11.5 4 9.71875 4 7.5C4 7.5 4 7.46875 4 7.4375C3.75 7.3125 3.5 7.15625 3.28125 6.96875C2.09375 6.125 1.3125 5.03125 1 4.1875C0.9375 3.9375 1.03125 3.6875 1.25 3.5625ZM4.125 12.5H11.8438C13.3438 12.5 14.625 13.6562 14.8125 15.1562L14.8438 15.375C14.9375 16 14.4688 16.5 13.8438 16.5H2.125C1.53125 16.5 1.0625 16 1.125 15.375L1.15625 15.1562C1.34375 13.6562 2.625 12.5 4.125 12.5Z"
                                      fill={type === 'FARMER' ? '#004B8A' : '#BEBEBE'}
                                />
                            </svg>
                            &nbsp;
                            เกษตรกร
                        </div>
                        <div style={type === 'ADMIN' ? {color: '#004B8A', borderBottom: '2px solid #004B8A'
                        } : {type: '#BEBEBE', borderBottom: '1px solid lightgrey'}}
                             className="d-flex align-items-center justify-content-center flex-1 p-2"
                             onClick={() => handleTab('ADMIN')}>
                            ผู้ดูแลระบบ
                        </div>
                    </div>
                </div>

                <div className="farmers-list" style={users && users.length === 0 ? {alignSelf: 'start'} : {}}>
                    {
                        users && users.length > 0
                            ? users.map((user, index) => (
                                <div className="farmer-box p-3 mb-2 d-flex align-items-center justify-content-between" style={{border: '1px solid', borderColor: getStatusBg(user.status)}} key={`farmer-${index}`}>
                                    <div className="badge-tab-status" style={{background: getStatusBg(user.status)}}></div>
                                    <div className="w-100 ps-2 pe-3">
                                        <div className="d-flex align-items-center justify-content-between w-100">
                                            <div className="d-flex align-items-center w-75 me-3">
                                                <div className="w-25 me-2">
                                                    <div className="image-farmer">
                                                        <img src={user.full_picture_path || userDefaultImg} alt="farmer image" className="w-100 h-100"/>
                                                    </div>
                                                </div>

                                                <div style={{fontSize: 14, color: '#292727'}} className="w-75">
                                                    <p className="text-nowrap overflow-hidden mb-0 text-ellipsis">
                                                        {user.name}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-center w-25">
                                                <div className="d-flex align-items-center mt-2">
                                                    <div onClick={() => navigate(`/user/${user.id}`)} className="me-2" style={{padding: '5px 8px', borderRadius: 12, background: '#FFE6001A'}}>
                                                        <FontAwesomeIcon icon={faPenAlt} style={{color: '#EFBA00', fontSize: 15}}/>
                                                    </div>

                                                    <div onClick={() => deleteUser(user.id)} style={{padding: '5px 9px', borderRadius: 12, background: '#FF83831A'}}>
                                                        <FontAwesomeIcon icon={faTrash} style={{color: '#D73D47', fontSize: 15}}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            user && user.type === 'FARMER' ?
                                                <div className="info-farmer">
                                                    <div className="d-flex align-items-center justify-content-between"
                                                         style={{color: '#222222'}}>
                                                        <div className="w-100">
                                                            <div className="mt-2">
                                                                <div
                                                                    className="d-flex align-items-center justify-content-between"
                                                                    style={{fontSize: 12}}>
                                                                    <div className="d-flex align-items-center me-2" style={{fontSize: 12}}>
                                                                        <img src={''} className="me-2"/>
                                                                        <span>{user.count_of_farm} สวน</span>
                                                                    </div>
                                                                    <div onClick={() => navigate(`/user/${user.id}/approve`)}>
                                                                        {renderStatus(user)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <div className="w-100 d-flex justify-content-end mt-3">
                                                    <div onClick={() => navigate(`/user/${user.id}/approve`)} style={{width: 'fit-content'}}>
                                                        {renderStatus(user)}
                                                    </div>
                                                </div>
                                        }

                                    </div>

                                    {
                                        type === 'FARMER' &&
                                        <div onClick={() => navigate(`/user/${user.id}/approve`)}>
                                            <FontAwesomeIcon icon={faChevronRight} style={{color: '#727178'}}/>
                                        </div>
                                    }
                                </div>
                            ))
                            :
                            <div className="text-center">
                                <FontAwesomeIcon icon={faUsers} className="main-green-color mb-3" size="6x"/>
                                <h2 className="main-green-color">ไม่พบข้อมูลรายการ{`${type === 'FARMER' ? 'เกษตรกร' : 'ผู้ดูแลระบบ'}`}</h2>
                            </div>
                    }
                </div>
            </div>
        </Layout>
        <Footer/>

    </div>)
}

export default FarmerList;
