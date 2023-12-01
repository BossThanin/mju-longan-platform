import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Page from "../layouts/Page";
import {getFarmList} from "../../api/FarmsApi";
import {dismissPopup, showProgress} from "../../components/AlertDialogs";
import {getFarmerDetail} from "../../api/FarmerApi";
import CardFarmer from "../farmer/CardFarmer";
import {useSelector} from "react-redux";

function Farms({data, styleListContainer={}}) {
  const [farms, setFarms] = useState([]);
  const [farmer, setFarmer] = useState(null);
  const navigate = useNavigate();
  const routeParams = useParams();
  const [farmerId, setFarmerId] = useState();

  const user = useSelector(state => {
    return state && state.app && state.app.user
  })

  useEffect(  () => {
    let farmer_id = routeParams.id || ''
    setFarmerId(farmer_id);
    showProgress('')
    if(routeParams.id) {
      getFarmerData()
      getFarms()
    }else {
      getFarms()
    }
  }, [data]);

  const getFarmerData = () => {
    getFarmerDetail(routeParams.id)
      .then(res => {
        if(res.data && res.data.success) {
          setFarmer(res.data.data);
        }
      }).finally(res => {
        dismissPopup()
    })
  }

  const getFarms = () => {
    getFarmList(routeParams.id)
      .then(res => {
        if (res.data && res.data.success) {
          setFarms(res.data.data)
        }
      }).finally(res => {
      dismissPopup()
    })
  }

  return (
    <Page header={{title: 'สวนทั้งหมด', showLeftSide: true}}
          content={{style: {overflowY: 'hidden'}}}
          footer={{}}>

      <div className="farms-container">
        { routeParams && routeParams.id && <CardFarmer farmer={farmer}/> }

        {
          farms && farms.length > 0 ?
            <div className="h-100" style={styleListContainer}>
              <div className="main-blue-color d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="vertical-line me-1"></div>
                  {farmerId ? 'สวนทั้งหมด' : 'สวนของคุณทั้งหมด' }
                </div>

                {/*<button type={"button"}
                  onClick={() => navigate('/farm/add')}
                  className={"btn btn-primary btn-add-farm"}>
            + เพิ่มแปลง
          </button>*/}
              </div>

              <div className="farms-list-container h-100">
                {
                  farms.map((farm, index) => (
                    <div className="farm-box" key={`farms-${index}`}
                         onClick={() => farmerId ? navigate(`/farmer/${farmerId}/farm/${farm.id}`) : navigate(`/farm/${farm.id}`)}
                    >
                      <div className="d-flex align-items-center w-100">
                        <div style={{width: '30%'}}>
                          <div className="farm-img-box">
                          </div>
                        </div>

                        <div style={{padding: '0.8rem', width: '70%'}}>
                          <div>
                            <div className="fw-bold mb-2">
                              <p className="mb-0 text-nowrap overflow-hidden text-ellipsis">
                                {farm.name}
                              </p>
                            </div>

                            <div style={{fontSize: 12}} className="mb-2">
                              <span className="ms-2">{farm.location || '-'}</span>
                            </div>

                            <div className="d-flex align-items-center">
                              <div className="farm-detail d-flex align-items-center me-2" style={{fontSize: 10}}>
                                <img alt={'icon tree'} className="me-1"/>
                                <span style={{fontSize: 12}}> {farm.amount_of_tree} ต้น </span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))
                }

                {
                  user && user.type === 'FARMER' &&
                  <div className="add-box" onClick={() => navigate('/farm/add')}>
                    <div className="label-add main-color me-1">เพิ่มสวนลำไย</div>
                    <div className="btn-add">
                     +
                    </div>
                  </div>
                }
              </div>
            </div>
              : (<div></div>)
        }
      </div>
    </Page>
  )
}

export default Farms;
