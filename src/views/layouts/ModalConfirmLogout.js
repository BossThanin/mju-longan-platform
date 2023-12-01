import {Modal, ModalBody} from "reactstrap";
import {logout} from "../../api/AuthApi";
import {alertError, alertSuccess, showProgress} from "../../components/AlertDialogs";
import {setToken} from "../../api/Api";
import {actionSetAppToken, actionSetUser} from "../../redux/app";
import {useDispatch, useSelector} from "react-redux";
import {liff} from "@line/liff";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import logout_icon from '../../assets/icons/logout_icon.png'

const ModalConfirmLogout = ({modalIsOpen, closeModal}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => {
        return state.app && state.app.user;
    })
    const handleLogout = () => {
        showProgress('', 'ระบบกำลังนำท่านออกจากระบบ')
        logout()
            .then(res => {
                if(res.data && res.data.success) {
                    // if(user && user.type === 'FARMER') {
                    //     liff.logout()
                    // }
                    setToken(null)
                    dispatch(actionSetAppToken(null))
                    dispatch(actionSetUser(null))
                    navigate('/login')
                    alertSuccess('ออกจากระบบสำเร็จ')
                }else {
                    alertError('ออกจากระบบไม่สำเร็จ')
                }
        })
        console.log(logout())
    }

    return (
            <Modal isOpen={modalIsOpen}
                   centered={true}
                   scrollable={true}
                   fade={true}>
                <div className="p-3">
                    <ModalBody className={'position-relative'}>
                        <div className="text-center">
                            <div onClick={() => closeModal()} style={{position: 'absolute', right: 0, top: 0}}>
                                <button onClick={() => closeModal()} style={{background:"none", border:"none"}}>
                                    <FontAwesomeIcon icon="fa-solid fa-x" style={{color: '#848484'}}/>
                                </button>
                            </div>


                            <div style={{width: '100%'}} className="d-flex justify-content-center mt-2">
                                <div >
                                    <img src={logout_icon} alt="" width={220} height={150}/>
                                    <h1 style={{fontSize:18}} className={'text-color-primary fw-bold'}>ยืนยันออกจากระบบ !</h1>
                                </div>
                            </div>

                            <div className="w-100 mt-3">
                                <button className="btn btn-primary next-btn w-100" style={{fontSize: 18}} onClick={() => handleLogout()}>
                                    <FontAwesomeIcon icon={faRightFromBracket} /> ออกจากระบบ
                                </button>
                            </div>
                        </div>
                    </ModalBody>
                </div>
            </Modal>
    )
}

export default ModalConfirmLogout;
