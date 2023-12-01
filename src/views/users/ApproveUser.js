import Page from "../layouts/Page";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getUserById} from "../../api/AuthApi";
// import defaultUserImg from "../../assets/images/default_user.png";
import ImagePreview from "../../components/ImagePreview";
import cloudCheck from "../../assets/images/cloud-check.png";
import ModalConfirmApproveUser from "./ModalConfirmApproveUser";
import Layout from "../layouts/Layout";
import HeaderFarmer from "../layouts/HeaderFarmer";
import Footer from "../layouts/Footer";
import '../../assets/css/approve_user.css'
import {faCheckCircle, faExclamationCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ApproveUser = () => {
    const routeParams = useParams();
    const [user, setUserData] = useState(null);
    const [file_preview, setFilePreview] = useState();
    const [show_confirm, showConfirm] = useState(false);
    const [is_approve, setIsApprove] = useState(false);

    useEffect(() => {
        getUserDetail()
    }, []);

    function renderStatus(item) {
        let data = {};
        switch (item.status) {
            case 'approved':
                data = {
                    background: '#C7F4CE',
                    icon_color: '#46AD4A',
                    icon: faCheckCircle,
                    label: 'ตรวจสอบสำเร็จ',
                }
                break;
            case 'failed':
                data = {
                    background: '#FDD1D9',
                    icon_color: '#D73D47',
                    icon: faTimesCircle,
                    label: 'ตรวจสอบไม่สำเร็จ'
                }
                break;
            case 'rejected':
                data = {
                    background: '#FDD1D9',
                    icon_color: '#D73D47',
                    icon: faTimesCircle,
                    label: 'ไม่อนุมัติ'
                }
                break;
            default:
                data = {
                    background: '#FFFCB5',
                    icon_color: '#EBD300',
                    icon: faExclamationCircle,
                    label: 'รอตรวจสอบ'
                }
                break;
        }

        return (
            <div className="user-badge-status" style={{background: data.background}}>
                <FontAwesomeIcon icon={data.icon} style={{color: data.icon_color}}></FontAwesomeIcon>&nbsp;
                <span>{data.label}</span>
            </div>
        )
    }

    const getUserDetail = () => {
        console.log('getUserDetail')
        getUserById(routeParams.id)
            .then(res => {
                if (res.data && res.data.success) {
                    setUserData(res.data.data);
                    setFilePreview(res.data.data.full_picture_path)
                }
            })
    }

    const renderUserTypeStr = () => {
        return user && user.type === 'ADMIN' ? 'ผู้ดูแลระบบ' : 'เกษตรกร'
    }

    const handleActionUser = (is_approve) => {
        setIsApprove(is_approve)
        showConfirm(true)
    }

    return (
        <div className={'Container'}>
            <HeaderFarmer HeadTitle={'รายละเอียด'} showBack={true}/>
            <Layout>
                <div className="approve-user-container h-100">
                    <div className="d-flex justify-content-between flex-column h-100 overflow-y-scroll">
                        <div>
                            <div className="d-flex flex-column align-items-center justify-content-center mb-2">
                                <ImagePreview src={file_preview}
                                              styleImgBox={{width: 100, height: 100}}
                                />

                                <div className="mt-3">
                                    {user && renderStatus(user)}
                                </div>
                            </div>

                            <div className="detail-box">
                                <span className="title-color">ประเภท : </span>
                                <span>{renderUserTypeStr()}</span>
                            </div>

                            <div className="detail-box">
                                <div className="d-flex align-items-center mb-2">
                                    <div className="vertical-line me-1"></div>
                                    <span style={{color: '#004B8A'}}>ข้อมูล{`${renderUserTypeStr()}`}</span>
                                </div>

                                <div className="mb-2">
                                    <span className="title-color">ชื่อ : </span>
                                    <span>{user && user.name}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="title-color">อีเมล : </span>
                                    <span>{user && user.email}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="title-color">เบอร์โทรศัพท์ : </span>
                                    <span>{user && user.phone ? user.phone : '-'}</span>
                                </div>
                            </div>
                        </div>

                        {
                            user && user.status === 'pending' &&
                            <div style={{height: '20%'}} className="d-flex flex-column justify-content-end">
                                <button className="btn btn-primary w-100 mb-2"
                                        onClick={() => handleActionUser(true)}>
                                    <img src={cloudCheck} className="me-2"/>
                                    อนุมัติ
                                </button>
                                <button className="btn btn-outline-danger w-100"
                                        onClick={() => handleActionUser(false)}>
                                    <FontAwesomeIcon icon={faTimesCircle} className="me-2" size="lg"/>
                                    ไม่อนุมัติ
                                </button>
                            </div>
                        }
                    </div>

                    {
                        show_confirm &&
                        <ModalConfirmApproveUser
                            is_approve={is_approve}
                            modalIsOpen={show_confirm}
                            closeModal={() => showConfirm(false)}
                            user={user}
                        />
                    }

                </div>
            </Layout>
            <Footer/>
        </div>

    )
}

export default ApproveUser;
