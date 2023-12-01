
import {useEffect, useState} from "react";
import '../../assets/css/createFarm.css'
import {addFarm} from "../../api/FarmsApi";
import {
    alertError,
    alertSuccess,
    showProgress
} from "../../components/AlertDialogs";
import {useNavigate} from "react-router-dom";
import {store} from "../../redux/store";
import {checkMaxPackage} from "../../api/FarmerApi";
import SetInputNumberForDevice from "../../helper/SetInputNumberForDevice";
import KeydownRegexNumber from "../../helper/KeydownRegexNumber";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera, faLocationDot, faPen} from "@fortawesome/free-solid-svg-icons";
import {faImage} from "@fortawesome/free-regular-svg-icons";
import ModalGoogleMap from "../../components/ModalGoogleMap";
import ValidateMimeType from "../../helper/ValidateMimeType";
import Layout from "../layouts/Layout";
import HeaderFarmer from "../layouts/HeaderFarmer";
import Footer from "../layouts/Footer";
import agree from '../../assets/icons/accept_icon.png'

function CreateFarm() {
    const [farm, setFarmData] = useState({name: '', amount_of_rai: 0, amount_of_square_wa: 0, amount_of_tree: '', file: '', amount_of_square_meters: 0, polygons: null})
    const [file_preview, setFilePreview] = useState(null)
    const [showPackage, setShowPackage] = useState(false)
    const navigate = useNavigate();
    const [showMap, setShowMap] = useState(false)

    useEffect(() => {
        SetInputNumberForDevice()
        checkPackage()
    }, [farm]);

    const checkPackage = () => {
        const user = store.getState() && store.getState().app && store.getState().app.user;
        if(user && user.type === 'FARMER') {
            checkMaxPackage(user.id)
                .then(res => {
                    if(res.data && res.data.success) {
                        setShowPackage(res.data.data.is_over_package);
                    }
                })
        }
    }

    const submitAddFarm = () => {
        farm.amount_of_rai = farm.amount_of_rai === '' || farm.amount_of_rai === null ? 0 : farm.amount_of_rai
        farm.amount_of_square_wa = farm.amount_of_square_wa === '' || farm.amount_of_square_wa === null ? 0 : farm.amount_of_square_wa
        if(farm.amount_of_rai == 0 && farm.amount_of_square_wa == 0) {
            alertError('บันทึกข้อมูลไม่สำเร็จ', 'กรุณากรอกขนาดพื้นที่ไร่')
            return
        }else if(farm.amount_of_tree == 0) {
            alertError('บันทึกข้อมูลไม่สำเร็จ', 'จำนวนต้นต้องมากกว่า 0')
            return
        }

        showProgress('')
        addFarm(farm)
            .then(res => {
                if(res.data && res.data.success) {
                    alertSuccess()
                    setTimeout(() => {
                        navigate('/application')
                    }, 1500)
                }else {
                    let message = (res.data && res.data.message) || ''
                    alertError('บันทึกข้อมูลไม่สำเร็จ', message)
                }
            })
    }

    const handleChangeFile = (e) => {
        let is_valid = ValidateMimeType(e.target.files[0])
        if(!is_valid) {
            alertError('', 'ไฟล์ต้องเป็นประเภท .png หรือ .jpg เท่านั้น')
            return
        }
        setData('file', e.target.files[0])
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (ev) {
                setFilePreview(ev.target.result)
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const closeModalPackage = () => {
        setShowPackage(false)
        navigate(-1)
    }

    const setData = (name, value) => {
        console.log('name >>> ', name)
        console.log('value >>> ', value)
        if(name === 'amount_of_square_wa') {
            if(parseFloat(value) >= 400) { // 1 ไร่ = 400 ตารางวา
                let amount_of_rai = parseInt(farm.amount_of_rai) > 0 ? parseInt(farm.amount_of_rai) : 0;
                let new_amount_of_rai = parseInt(value) > 0 ? parseInt(parseInt(value) / 400) : 0;
                value = value % 400;
                setData('amount_of_rai',  amount_of_rai + new_amount_of_rai)
            }
        }

        setFarmData(exitingData => ({
            ...exitingData,
            [name]: value
        }))
    }

    const handleShowMap = () => {
        if(farm && (!farm.name || farm.name == '')) {
            alertError('ข้อผิดพลาด', 'กรุณากรอกชื่อสวนก่อนวาดขอบเขตของสวน')
            return
        }

        setShowMap(true)
    }

    return (
        <div className={'Container'}>
            <HeaderFarmer HeadTitle={'เพิ่มสวน'} showRight={false} showBack={true}/>
            <Layout>
                <div className="create-farm-container">

                    <div className={'form-group'}>
                        <label className="form-label">ชื่อสวน</label>
                        <input className="form-control"
                               value={farm.name}
                               placeholder="ระบุชื่อสวน"
                               name="name"
                               onChange={(e) => setData(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className={'form-group'}>
                        <label className="form-label">ตำแหน่งสวน</label>
                        <div className="input-group">
                            <input type="email" className="form-control"
                                   placeholder="ระบุตำแหน่งสวน"
                                   aria-label="pin_location"
                                   name="location"
                                   onChange={(e) => setData(e.target.name, e.target.value)}
                                   value={farm && farm.location || ''}
                                   disabled
                                   aria-describedby="pin_location"/>
                            <span className="input-group-text" onClick={() => handleShowMap()} id="pin_location">
                                <FontAwesomeIcon icon={faLocationDot} className="text-color-primary icon"/>
                            </span>
                        </div>
                    </div>
                    <div className={'form-group'}>
                        <label className={'form-label'}>ขนาดพื้นที่</label>
                        <div className={'row gx-3'}>
                            <div className="col-6">
                                <div className={'input-group'}>
                                    <input className="form-control"
                                           value={farm.amount_of_rai}
                                           name="amount_of_rai"
                                           placeholder="ระบุ"
                                           type="number"
                                           onKeyDown={KeydownRegexNumber}
                                           onChange={(e) => setData(e.target.name, e.target.value)}
                                    />
                                    <span className="input-group-text" id="amount_of_rai">ไร่</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-group">
                                    <input className="form-control"
                                           value={farm.amount_of_square_wa}
                                           name="amount_of_square_wa"
                                           placeholder="ระบุ"
                                           onKeyDown={KeydownRegexNumber}
                                           type="number"
                                           onChange={(e) => setData(e.target.name, e.target.value)}
                                    />
                                    <span className="input-group-text" id="amount_of_square_wa">ตร.ว.</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="form-group mb-3">
                        <label className="form-label">จำนวนต้น</label>
                        <div className="input-group">
                            <input className="form-control"
                                   value={farm.amount_of_tree}
                                   name="amount_of_tree"
                                   placeholder="ระบุจำนวนต้น"
                                   type="number"
                                   onKeyDown={KeydownRegexNumber}
                                   onChange={(e) => setData(e.target.name, e.target.value)}
                            />
                            <span className="input-group-text" id="amount_of_tree">ต้น</span>
                        </div>
                    </div>

                    <div className="mb-3 p-3 border-rounded">
                        <div className="d-flex align-items-center mb-3 justify-content-between">
                            <div className="d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M15.5 7.84375C15.8125 8.34375 16 8.90625 16 9.5C16 10.3438 15.6875 11.0625 15.125 11.625C14.5312 12.2188 13.8125 12.5 13 12.5H8.5V16C8.5 16.2812 8.25 16.5 8 16.5C7.71875 16.5 7.5 16.2812 7.5 16V12.5H3C2.15625 12.5 1.4375 12.2188 0.875 11.625C0.28125 11.0625 0 10.3438 0 9.5C0 8.90625 0.15625 8.34375 0.46875 7.84375C0.8125 7.34375 1.25 7 1.8125 6.75C1.53125 6.25 1.4375 5.75 1.5 5.21875C1.5625 4.6875 1.78125 4.21875 2.125 3.84375C2.5 3.46875 2.9375 3.1875 3.4375 3.0625C3.625 3.03125 3.8125 3 3.96875 3C4.3125 3 4.65625 3.09375 5 3.21875C5.0625 2.46875 5.40625 1.8125 5.96875 1.28125C6.53125 0.78125 7.21875 0.5 8 0.5C8.75 0.5 9.4375 0.78125 10 1.28125C10.5625 1.8125 10.9062 2.46875 11 3.21875C11.3125 3.09375 11.6562 3 12 3C12.1562 3 12.3438 3.03125 12.5312 3.0625C13.0312 3.1875 13.4688 3.46875 13.8438 3.84375C14.1875 4.21875 14.4062 4.6875 14.4688 5.21875C14.5312 5.75 14.4375 6.25 14.1875 6.75C14.1875 6.75 15.1562 7.34375 15.5 7.84375ZM14.4062 10.9375C14.8125 10.5312 15 10.0938 15 9.5C15 9.09375 14.875 8.75 14.6562 8.40625C14.5312 8.21875 14.0312 7.84375 13.6562 7.625L12.8438 7.125L13.2812 6.28125C13.4688 5.96875 13.5312 5.6875 13.4688 5.34375C13.4375 5.03125 13.3125 4.75 13.0938 4.53125C12.875 4.28125 12.625 4.125 12.2812 4.0625C12.1875 4.03125 12.0938 4 12 4C11.7812 4 11.5938 4.0625 11.375 4.15625L10.125 4.71875L10 3.34375C9.9375 2.8125 9.71875 2.375 9.34375 2.03125C8.9375 1.6875 8.5 1.5 8 1.5C7.46875 1.5 7.03125 1.6875 6.65625 2.03125C6.25 2.40625 6.03125 2.8125 5.96875 3.34375L5.84375 4.71875L4.5625 4.15625C4.375 4.0625 4.1875 4 3.96875 4C3.875 4 3.78125 4.03125 3.6875 4.0625C3.34375 4.125 3.09375 4.28125 2.875 4.53125C2.65625 4.75 2.53125 5.03125 2.5 5.34375C2.4375 5.65625 2.5 5.9375 2.6875 6.25L3.28125 7.25L2.21875 7.6875C1.8125 7.84375 1.53125 8.09375 1.3125 8.40625C1.09375 8.75 1 9.125 1 9.5C1 10.0938 1.15625 10.5312 1.5625 10.9375C1.96875 11.3438 2.40625 11.5 3 11.5H7.5V9.1875L5.59375 6.8125C5.40625 6.625 5.46875 6.28125 5.6875 6.125C5.875 5.9375 6.1875 6 6.375 6.1875L7.5 7.59375V5C7.5 4.75 7.71875 4.5 7.96875 4.5C8.25 4.5 8.5 4.75 8.5 5V9.3125L9.625 8.15625C9.8125 7.96875 10.1562 7.96875 10.3438 8.15625C10.5312 8.34375 10.5312 8.6875 10.3438 8.875L8.5 10.7188V11.5H13C13.5625 11.5 14 11.3438 14.4062 10.9375Z" fill="#028C41"/>
                                </svg>&nbsp;
                                <span className="ms-2">รูปสวนลำไย</span>
                            </div>

                            {
                                file_preview &&
                                <label htmlFor="edit-upload-image-farm">
                                    <FontAwesomeIcon icon={faPen} style={{color: '#028C41'}}/>
                                    <input type="file" accept="image/*"
                                           id="edit-upload-image-farm"
                                           style={{display:"none"}}
                                           onChange={handleChangeFile}
                                    />
                                </label>
                            }
                        </div>

                        {
                            !file_preview ?
                                <label htmlFor="upload-image-farm" className="w-100">
                                    <div className="farm-img-box">
                                        <div className="container-img mb-2">
                                            <div className="image-icon">
                                                <FontAwesomeIcon icon={faImage} style={{color: '#008F44', fontSize: 36}}/>
                                            </div>
                                        </div>

                                        <div style={{color: '#A9A6A6'}} className="mb-2">
                                            ถ่ายภาพ/อัปโหลดรูปภาพ
                                        </div>

                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="btn-add-image d-flex justify-content-center align-items-center">
                                                <FontAwesomeIcon icon={faCamera} style={{marginTop: -3}}/>
                                                <div className="ms-1">เพิ่มรูปภาพ</div>
                                            </div>
                                        </div>

                                        <input type="file" accept="image/*"
                                               id="upload-image-farm"
                                               style={{display:"none"}}
                                               onChange={handleChangeFile}/>
                                    </div>
                                </label>
                                : <div className="preview-image">
                                    <img src={file_preview} alt={"farm image"}  id="file-preview"/>
                                </div>
                        }

                    </div>

                    <div className="d-flex justify-content-center align-items-center w-100">
                        <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                                onClick={() => submitAddFarm()}
                                type="button">

                            <img src={agree} alt={'icon'} className="me-2"/>
                            ตกลง
                        </button>
                    </div>
                </div>

                {
                    showMap && <ModalGoogleMap modalIsOpen={showMap}
                                               setArea={(area) => setData('amount_of_square_meters', area)}
                                               setPolygon={(boundary) => setData('polygons', boundary)}
                                               setLocation={(place_name) => setData('location', place_name)}
                                               closeModal={() => setShowMap(false)}
                                               drawingModes={['marker', 'polygon']}
                                               propMarkerName={farm && farm.name}
                                               propMarker={farm && farm.location}
                                               isCreateFarm={true}
                                               propPolygons={farm && farm.polygons}
                    />
                }
            </Layout>
            <Footer/>
        </div>
    )
}

export default CreateFarm;
