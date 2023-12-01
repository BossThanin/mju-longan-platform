import {Modal, ModalBody} from "reactstrap";
import cloudCheckImg from "../../assets/images/cloud-check.png";
import {alertError, alertSuccess, showProgress} from "../../components/AlertDialogs";
import {approveUser} from "../../api/AuthApi";
import {useNavigate} from "react-router-dom";
import reject_icon from '../../assets/icons/reject_icon.png'
import approve_icon from '../../assets/icons/approve_icon.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const ModalConfirmApproveUser = ({modalIsOpen, closeModal, is_approve, user}) => {
    const navigate = useNavigate();
    const submitApproveOrReject = () => {
        showProgress('')
        let data = {
            id: user.id,
            is_approve
        }

        approveUser(data)
            .then(res => {
                if (res.data && res.data.success) {
                    alertSuccess()
                    setTimeout(() => {
                        navigate(-1)
                    }, 500)
                } else {
                    alertError()
                }
            })
    }

    return (
        <Modal isOpen={modalIsOpen}
               centered={true}
               scrollable={true}
               fade={true}
        >
            <div className="p-3">
                <ModalBody className={'position-relative'}>
                    <div className="text-center">
                        <div onClick={() => closeModal()} style={{position: 'absolute', right: 0, top: 0}}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <g clip-path="url(#clip0_1164_10762)">
                              <path d="M7.20988 6L11.7388 1.47109C11.8205 1.39216 11.8857 1.29775 11.9305 1.19336C11.9754 1.08896 11.999 0.976687 12 0.863076C12.001 0.749465 11.9793 0.636794 11.9363 0.531639C11.8933 0.426484 11.8297 0.33095 11.7494 0.250611C11.669 0.170273 11.5735 0.106739 11.4684 0.0637164C11.3632 0.020694 11.2505 -0.000954946 11.1369 3.23065e-05C11.0233 0.00101956 10.911 0.0246235 10.8066 0.0694668C10.7023 0.11431 10.6078 0.179495 10.5289 0.261217L6 4.79012L1.47109 0.261217C1.30972 0.105355 1.09358 0.0191112 0.869234 0.0210607C0.644888 0.0230102 0.430283 0.112997 0.27164 0.27164C0.112997 0.430283 0.0230102 0.644888 0.0210607 0.869234C0.0191112 1.09358 0.105355 1.30972 0.261217 1.47109L4.79012 6L0.261217 10.5289C0.179495 10.6078 0.11431 10.7023 0.0694668 10.8066C0.0246235 10.911 0.00101956 11.0233 3.23065e-05 11.1369C-0.000954946 11.2505 0.020694 11.3632 0.0637164 11.4684C0.106739 11.5735 0.170273 11.669 0.250611 11.7494C0.33095 11.8297 0.426484 11.8933 0.531639 11.9363C0.636794 11.9793 0.749465 12.001 0.863076 12C0.976687 11.999 1.08896 11.9754 1.19336 11.9305C1.29775 11.8857 1.39216 11.8205 1.47109 11.7388L6 7.20988L10.5289 11.7388C10.6903 11.8946 10.9064 11.9809 11.1308 11.9789C11.3551 11.977 11.5697 11.887 11.7284 11.7284C11.887 11.5697 11.977 11.3551 11.9789 11.1308C11.9809 10.9064 11.8946 10.6903 11.7388 10.5289L7.20988 6Z" fill="#848484"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_1164_10762">
                                <rect width="12" height="12" fill="white"/>
                              </clipPath>
                            </defs>
                          </svg>
                        </div>

                        <div>
                            <img src={!is_approve ? reject_icon : approve_icon} alt="" height={'50%'} width={'50%'}/>
                        </div>

                        <div className="mt-3">
                            <div className="w-100 d-flex justify-content-center align-items-center">
                                {
                                    is_approve ?
                                        <div className="px-3 py-2"
                                             style={{background: '#def7ec', borderRadius: 100}}>
                                            <span style={{color: 'green', fontSize: 18,}}>
                                                อนุมัติการลงทะเบียน&nbsp;
                                                <FontAwesomeIcon icon={faCheckCircle} style={{color: '#03AD54'}}/>

                                            </span>
                                        </div>
                                        :
                                        <div className="px-3 py-2"
                                             style={{background: '#fdd1d9', borderRadius: 100}}>
                                            <span style={{color: 'red', fontSize: 18,}}>
                                                ไม่อนุมัติการลงทะเบียน&nbsp;
                                                <FontAwesomeIcon icon={faTimesCircle} style={{color: '#ED2227'}}/>
                                            </span>
                                        </div>


                                }
                            </div>
                        </div>

                        <div className="mt-3">
                            <button type="button" className="btn btn-confirm-approve text-white w-100 d-flex justify-content-center align-items-center"
                                    onClick={() => submitApproveOrReject()}
                                    style={{background: '#0E572B', borderRadius: 50, padding: 13}}
                            >
                                <img src={cloudCheckImg} className="me-2"/>
                                <span>ยืนยัน</span>
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </div>
        </Modal>
    )
}

export default ModalConfirmApproveUser;
