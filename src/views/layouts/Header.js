import {useNavigate} from "react-router-dom";
import {store} from "../../redux/store";
import {useEffect, useState} from "react";
import ModalConfirmLogout from "./ModalConfirmLogout";
import {getCountNotification} from "../../api/NotificationApi";

function Header(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [count_noti, setCountNoti] = useState(0);
  const [showLogout, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    console.log('store >>>>> ', store.getState())
    if( store && store.getState() && store.getState().app && store.getState().app.user) {
      setUser(store.getState().app.user)
    }

    countNotification()
  }, []);

  const countNotification = () => {
    getCountNotification()
      .then(res => {
        if(res.data && res.data.success) {
          setCountNoti(res.data.data.count)
        }
      })
  }

  return (
    <header>
      <div onClick={() => navigate(-1)} className="d-flex" style={{width: '22%'}}>
        {

        }
      </div>

      <div className="d-flex text-nowrap overflow-hidden justify-content-center" style={{width: '56%'}}>
        <p className="text-nowrap overflow-hidden text-ellipsis mb-0">
          {props.title || ''}
        </p>
      </div>

      <div className="d-flex justify-content-end" style={{width: '22%'}}>
        {
          props.showNoti &&
          <div className="right-side-menu">
            <div className="position-relative">

              { count_noti > 0 && <div className="notification-dot">noti</div> }
            </div>
          </div>
        }

        {
          user && user.type === 'ADMIN' &&
          <div className="ms-2 right-side-menu">
          </div>
        }

          {
              user && user.type === 'FARMER' && props.showLogout &&
              <div className="ms-2 right-side-menu">
                  <button onClick={() => setShowLogoutConfirm(true)}>
                      55
                  </button>

              </div>
          }

          {
              showLogout && <ModalConfirmLogout modalIsOpen={showLogout} closeModal={() => setShowLogoutConfirm(false)}/>
          }


      </div>
    </header>
  )
}

export default Header;
