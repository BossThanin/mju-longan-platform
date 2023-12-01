import Swal from "sweetalert2";
import resgister_success_icon from '../assets/icons/register_success_icon.png'

import '../assets/css/AlertDialogs.css'

const defaultConfig = {
    confirmButtonText: 'ตกลง',
}
export const unCancelableOptions = {
    allowEscapeKey: false,
    showCloseButton: false,
    allowOutsideClick: false,
}

export const alertSuccess = (title = 'บันทึกข้อมูลสำเร็จ', text = '') => {
    Swal.fire({
        icon: 'success',
        title,
        text,
        showConfirmButton: false,
        timer: 3000,
        ...defaultConfig,
        confirmButtonColor: '#0e572b'
    })
}

export const alertRegisterSuccess = (title = 'ลงทะเบียนสำเร็จ !', text = '') => {
    Swal.fire({
        title: title,
        text: text,
        imageUrl: resgister_success_icon,
        imageWidth: 162,
        imageHeight: 135,
        imageAlt: "Custom image",
        confirmButtonText:'ตกลง',
        showCloseButton:true,
        confirmButtonColor: '#0e572b',
        customClass: {
            confirmButton: 'custom-confirm-button-class',
        },
    }).then(result => {
        if (result.isConfirmed) {
            // navigator(-1);
        }
    })
}

export const alertError = (title = 'บันทึกข้อมูลไม่สำเร็จ', text = '', success = null) => {
    Swal.fire({
        icon: 'error',
        title:'<span style="color:red;font-size: 18px; font-weight: bold">'+ title + '</span>',
        html: '<span style="font-size: 16px;">' + text + '</span>', // Set your desired font size here
        ...defaultConfig,
        cancelButtonColor: '#FDD1D9',
        confirmButtonColor: '#0e572b',

    }).then(result => {
        if (result.isConfirmed) {
            success && success()
        }
    })
}

export const showProgress = (title = 'กำลังดำเนินการ', text = '') => {
    Swal.fire({
        title,
        text,
        didOpen() {
            Swal.showLoading(null)
        },
        ...unCancelableOptions
    })
}

export const confirmPopupText = (title = '', text = '', success = null) => {
    Swal.fire({
        icon:'warning',
        title: title == ' ' ? false : title,
        text,
        showCancelButton: true,
        confirmButtonColor: '#0e572b',
        confirmButtonText:'ยืนยัน',
        cancelButtonText:'ปิด',
    }).then(result => {
        if (result.isConfirmed) {
            success && success()
        }
    })
}

export const confirmPopupHTML = ({
     title = '',
     html = '',
     isShowConfirm = true,
     success = null,
     isAllowOutsideClick = false
}) => {
    Swal.fire({
        html,
        title,
        showConfirmButton: isShowConfirm,
        allowOutsideClick: isAllowOutsideClick,
        cancelButtonColor: '#FDD1D9',
        confirmButtonColor: '#0e572b',
    }).then(result => {
        if (result.isConfirmed) {
            success && success()
        }
    })
}

export const dismissPopup = () => {
    Swal.close()
}
