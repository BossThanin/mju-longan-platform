import Page from "../layouts/Page";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {dismissPopup, showProgress} from "../../components/AlertDialogs";
import {getNotificationList} from "../../api/NotificationApi";
import {store} from "../../redux/store";
import moment from "moment";

const NotificationFarmer = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = store && store.getState().app && store.getState().app.user

    if(user && user.id) {
      showProgress('')
      getNotificationList(user.id)
        .then(r => {
          if(r.data && r.data.success) {
            setNotifications(r.data.data)
          }
        }).finally(res => {
        dismissPopup()
      })
    }

  }, []);

  const getStyleNoti = (item) => {
    let colors= {
      badge: '#FFFCB5',
      bg_icon: '#EBD300',
      background: '#EFBA00',
      label: 'รออนุมัติแพ็กเกจ',
      icon: ''
    };

    if(item.status) {
      switch (item.status) {
        case 'approved':
          return colors = {
            badge: '#C7F4CE',
            bg_icon: '#46AD4A',
            background: '#008F44',
            label: 'อนุมัติแพ็กเกจ',
            icon: ''
          };
        case 'rejected':
          return colors = {
            badge: '#FDD1D9',
            bg_icon: '#ED2227',
            background: '#ED2227',
            label: 'ไม่อนุมัติแพ็กเกจ',
            icon: ''
          };
        default:
          return colors;
      }
    }

    return colors;
  }

  return (
    <Page header={{title: 'NOTIFICATIONS', showLeftSide: true}}>
      <div className="h-100 notification-farmer-container align-items-start"
           style={notifications.length === 0 ? {display: 'grid', textAlign: 'center'} : {}}
      >
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
                       style={{background: getStyleNoti(notification.user_package_logs).background, border: `1px solid ${getStyleNoti(notification.user_package_logs).background}`}}
                  >
                    <div className="noti-info-icon d-flex justify-content-center">
                      <div className="icon-box">
                        gdfsgdsfgdfsfgds
                      </div>
                    </div>
                    <div className="noti-info-package p-2 d-flex justify-content-between align-items-center">
                      <div>
                        <div style={{fontSize: 14}}>รายการเพิ่มแพ็กเกจสวนลำไย</div>
                        <div style={{fontSize: 20, fontWeight: 'bold'}}>
                          {
                            notification.reference && notification.reference.package && notification.reference.package.name
                          }
                        </div>
                        <div className="d-flex align-items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
                            <path d="M2.875 0C3.0625 0 3.25 0.1875 3.25 0.375V1.5H7.75V0.375C7.75 0.1875 7.91406 0 8.125 0C8.3125 0 8.5 0.1875 8.5 0.375V1.5H9.25C10.0703 1.5 10.75 2.17969 10.75 3V4.52344C10.6094 4.52344 10.4922 4.5 10.375 4.5C10.2344 4.5 10.1172 4.52344 10 4.52344V4.5H1V10.5C1 10.9219 1.32812 11.25 1.75 11.25H7.1875C7.42188 11.5547 7.67969 11.7891 7.98438 12H1.75C0.90625 12 0.25 11.3438 0.25 10.5V3C0.25 2.17969 0.90625 1.5 1.75 1.5H2.5V0.375C2.5 0.1875 2.66406 0 2.875 0ZM9.25 2.25H1.75C1.32812 2.25 1 2.60156 1 3V3.75H10V3C10 2.60156 9.64844 2.25 9.25 2.25ZM10.3516 6.75C10.5625 6.75 10.7266 6.9375 10.7266 7.125V8.25H11.5C11.6875 8.25 11.875 8.4375 11.875 8.625C11.875 8.83594 11.6875 9 11.5 9H10.3516C10.1641 9 9.97656 8.83594 9.97656 8.625V7.125C9.97656 6.9375 10.1641 6.75 10.3516 6.75ZM7 8.625C7 6.77344 8.5 5.25 10.375 5.25C12.2266 5.25 13.75 6.77344 13.75 8.625C13.75 10.5 12.2266 12 10.375 12C8.5 12 7 10.5 7 8.625ZM10.375 11.25C11.8047 11.25 13 10.0781 13 8.625C13 7.19531 11.8047 6 10.375 6C8.92188 6 7.75 7.19531 7.75 8.625C7.75 10.0781 8.92188 11.25 10.375 11.25Z" fill="#727178"/>
                          </svg>&nbsp;

                          <span style={{fontSize: 10}}>
                            {
                              notification.reference
                              && notification.reference.created_at
                              && moment(notification.reference.created_at).add('543', 'years').format('DD/MM/YYYY')
                            }
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="badge-approved-status"
                             style={{background: getStyleNoti(notification.user_package_logs).badge}}
                        >
                          <span className="me-2">
                            <div style={{
                              borderRadius: 50,
                              width: 20,
                              height: 20,
                              background: getStyleNoti(notification.user_package_logs).bg_icon}}
                                 className="d-flex align-items-center justify-content-center"
                            >
                              dfasfsadfsadfsa
                            </div>
                          </span>
                          <span style={{fontSize: 12}}>{getStyleNoti(notification.user_package_logs).label}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            : <div>
              fdfasfsafasffsa
              <div className="main-green-color mt-3 fw-bold" style={{fontSize: 20}}>
                ยังไม่มีข้อมูลการแจ้งเตือน
              </div>
            </div>
        }
      </div>
    </Page>
  )
}

export default NotificationFarmer;
