import {useEffect, useState} from "react";
import {getFarmList} from "../../api/FarmsApi";
import {dismissPopup, showProgress} from "../../components/AlertDialogs";
import {useNavigate} from "react-router-dom";
import Page from "../layouts/Page";

function FarmList ({setFarmID, farms}) {
  const navigate = useNavigate();
  const [farm_selected_id, setFarmSelected] = useState();

  useEffect(() => {
    if(farms && farms.length > 0) {
      setFarmSelected(farms[0].id)
    }
  }, [farms]);

  const handleSelectFarm = (id) => {
    setFarmSelected(id)
    setFarmID(id)
  }

  return (
    <div>
      <div className="main-blue-color d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img  alt={'tree icon'}/>
          <span className="ms-2">สวนลำไยของคุณ</span>
        </div>

        {
          farms && farms.length > 0 &&
          <div onClick={() => navigate(`/farm`)}>
            <span className="me-2">ทั้งหมด</span>

          </div>
        }

      </div>
      <div className="farm-list-container">
        {
          farms && farms.length > 0 ?
            farms.map((farm, index) => (
              <div className="farm-list-box me-2"
                   style={farm.id === farm_selected_id ? {} : {opacity: 0.5}}
                   onClick={() => handleSelectFarm(farm.id)}
                   key={`farm-list-${index}`}>

                <div className="farm-name">
                  <div className="box">
                    <span>{farm.name}</span>
                  </div>
                </div>

                <div className="tree-in-farm">
                  <div className="d-flex align-items-center">
                    <img />
                    <span className="ms-2">{farm.amount_of_tree || 0} ต้น</span>
                  </div>
                </div>
              </div>
            ))
            : <div className="data-not-found">ไม่พบรายการสวนลำไยของคุณ</div>
        }

      </div>
    </div>
  )
}

export default FarmList;
