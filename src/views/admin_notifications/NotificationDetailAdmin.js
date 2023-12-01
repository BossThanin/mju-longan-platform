import Page from "../layouts/Page";
import ImagePreview from "../../components/ImagePreview";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getNotificationDetail} from "../../api/NotificationApi";
import CardFarmer from "../farmer/CardFarmer";
import cloudCheck from "../../assets/images/cloud-check.png"
import "../../assets/css/notification/notification_admin.css"

const NotificationDetailAdmin = () => {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [farmer, setFarmer] = useState(null);
  const [packageData, setPackage] = useState(null);
  const [isApprove, setApprove] = useState(false)
  const [show_confirm, setShowConfirm] = useState(false)

  useEffect(() => {
    getNotificationDetail(params.id)
      .then(res => {
        if(res.data && res.data.success) {
          let item = res.data.data;
          if(item && item.reference && item.reference.user) {
            setFarmer(item.reference.user)
          }
          if(item && item.reference && item.reference.package) {
            setPackage(item.reference.package)
          }
          setItem(res.data.data);
        }
      })
  }, []);

  const showConfirm = (is_approve) => {
    setApprove(is_approve)
    setShowConfirm(true);
  }

  return (
    <Page header={{title: 'รายละเอียดแพ็กเกจ', showLeftSide: true}}>
      <div className="h-100 overflow-y-auto">
        <div className="d-flex align-items-center justify-content-center" style={{height: '20%'}}>
          <ImagePreview src={farmer && farmer.full_picture_path}
                        styleImgBox={{width: 88, height: 88, border: '4px solid #008F44'}}
          />
          &emsp;
          <img className="me-3"/>

        </div>

        <div style={{height: '60%', background: '#F6F6F6', borderRadius: 12}}
             className="p-3">
          <CardFarmer farmer={farmer} />

        </div>

        {
          item && item.reference && !item.reference.approved_at &&
          <div style={{height: '20%'}} className="d-flex flex-column justify-content-end">
            <button className="btn btn-approve-package w-100 mb-2" onClick={() => showConfirm(true)}>
              <img src={cloudCheck} className="me-2"/>
              อนุมัติแพ็กเกจ
            </button>
            <button className="btn btn-reject-package w-100"
                    onClick={() => showConfirm(false)}>
              ไม่อนุมัติแพ็กเกจ
            </button>
          </div>
        }

      </div>

    </Page>
  )
}

export default NotificationDetailAdmin;
