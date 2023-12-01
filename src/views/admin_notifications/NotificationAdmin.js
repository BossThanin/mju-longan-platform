import Page from "../layouts/Page";
import {useEffect, useState} from "react";
import {getNotificationList} from "../../api/NotificationApi";
import {dismissPopup, showProgress} from "../../components/AlertDialogs";
import ImagePreview from "../../components/ImagePreview";
import {useNavigate} from "react-router-dom";


const NotificationAdmin = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    showProgress('')
    getNotificationList()
      .then(r => {
        if(r.data && r.data.success) {
          setNotifications(r.data.data)
        }
      }).finally(res => {
        dismissPopup()
    })
  }, []);

  const getTitle = (notify_type) => {
    switch (notify_type) {
      case 'package':
        return 'รายการเพิ่มแพ็กเกจสวน'
      default:
        return '';
    }
  }

  return (
    <Page header={{title: 'NOTIFICATIONS', showLeftSide: true}}>
      <div className="notification-admin-container align-items-start"
           style={notifications.length === 0 ? {display: 'grid', textAlign: 'center'} : {}}>
        <div className="main-blue-color d-flex mb-3 align-items-center">
          <div className="vertical-line me-1"></div>
          รายการแจ้งเตือน
        </div>

        {
          notifications && notifications.length > 0
            ? <div className="notification-list">
              {
                notifications.map((notification) => (
                  <div className="notification-box d-flex align-items-center mb-2"
                       style={notification.reference && notification.reference.approved_at ? {background: '#EDEFF3', border: '1px solid #EDEFF3'} : {}}
                       onClick={() => navigate(`/admin_notification/${notification.id}`)}
                  >
                    <div className="noti-info-icon d-flex justify-content-center">
                      <div className="icon-box">
                        hello
                      </div>
                    </div>
                    <div className="noti-info-user p-3 d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <ImagePreview src={notification.reference && notification.reference.user && notification.reference.user.full_picture_path}/>
                        <div className="ms-2">
                          <div>{getTitle(notification.notify_type)}</div>
                          <div>
                            <img className="me-2"/>
                            <span style={{fontSize: 12}}>
                              {notification.reference && notification.reference.user && notification.reference.user.name}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        jol
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            : <div>
              <div className="main-green-color mt-3 fw-bold" style={{fontSize: 20}}>
                ยังไม่มีข้อมูลการแจ้งเตือน
              </div>
            </div>
        }
      </div>
    </Page>
  )
}

export default NotificationAdmin;
