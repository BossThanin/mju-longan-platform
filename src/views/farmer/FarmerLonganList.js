
import {debounce} from "lodash";
import {useEffect, useState} from "react";
import {getFarmDetail} from "../../api/FarmsApi";
import {dismissPopup, showProgress} from "../../components/AlertDialogs";
import {useNavigate, useParams} from "react-router-dom";
import {getFarmerLonganList} from "../../api/FarmerApi";
import Page from "../layouts/Page";
import {getLonganList} from "../../api/LonganApi";

function FarmerLonganList() {
  const [search, setSearch] = useState('');
  const [longans, setLongan] = useState([]);
  const routeParams = useParams();
  const [farms, setFarm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getFarmData()
  }, []);

  function getFarmData(search='') {
    showProgress('')
    let farm_id = routeParams.farm_id

    getLonganList(farm_id, {search})
      .then(res => {
        if(res.data && res.data.success) {
          const data = res.data.data.longans;
          setLongan(data || [])
          setFarm(res.data.data.farm)
        }
      }).finally(() => {
      dismissPopup()
    })
  }

  const debounceSearch = debounce((v) => {
    setSearch(v)
    getFarmData(v)
  }, 800)

  return (
    <Page header={{title: farms && farms.name || '', showLeftSide: true}}>
      <div className="farmer-longan-tree-container mt-3">
        <div className="main-blue-color d-flex align-items-center mb-3">
          <div className="vertical-line me-1"></div>
          ต้นลำไยทั้งหมด
        </div>

        <div className="input-group mt-2 mb-2">
          <span className="input-group-text rounded-start-pill"
                id="search">
            serch
          </span>
          <input type="search"
                 className="form-control search-longan-tree rounded-end-pill"
                 placeholder="ค้นหา"
                 aria-label="search"
                 onChange={(e) => debounceSearch(e.target.value)}
                 aria-describedby="search"/>
        </div>

        {
          longans && longans.length > 0 ?
            <div className="longan-tree-list">
              {
                longans.map((longan, index) => (
                  <div className="longan-box w-100 mb-2" key={`longan-${index}`}>
                    <div className="d-flex align-items-center"
                         style={{width: '60%'}}
                         onClick={() => navigate(`/farmer/${routeParams.id}/farm/${routeParams.farm_id}/longan/${longan.id}`)}>
                      <div style={{width: '35%'}}>
                      </div>

                      <div style={{width: '65%'}}>
                        <div className="fw-bold mb-1" style={{fontSize: 18}}>
                          <p className="mb-0 text-nowrap overflow-hidden text-ellipsis">{longan.name}</p>
                        </div>
                        {/*<div style={{fontSize: 12}}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                            <path
                              d="M2.5 1.25C2.5 0.851562 2.82812 0.5 3.25 0.5C3.64844 0.5 4 0.851562 4 1.25V2H7V1.25C7 0.851562 7.32812 0.5 7.75 0.5C8.14844 0.5 8.5 0.851562 8.5 1.25V2H9.625C10.2344 2 10.75 2.51562 10.75 3.125V4.25H0.25V3.125C0.25 2.51562 0.742188 2 1.375 2H2.5V1.25ZM10.75 5V5.02344C10.6094 5.02344 10.4922 5 10.375 5C8.07812 5 6.25 6.85156 6.25 9.125C6.25 10.5312 6.92969 11.7734 7.98438 12.5H1.375C0.742188 12.5 0.25 12.0078 0.25 11.375V5H10.375H10.75ZM13.75 9.125C13.75 11 12.2266 12.5 10.375 12.5C8.5 12.5 7 11 7 9.125C7 7.27344 8.5 5.75 10.375 5.75C12.2266 5.75 13.75 7.27344 13.75 9.125ZM10.375 7.25C10.1641 7.25 10 7.4375 10 7.625V9.125C10 9.33594 10.1641 9.5 10.375 9.5H11.5C11.6875 9.5 11.875 9.33594 11.875 9.125C11.875 8.9375 11.6875 8.75 11.5 8.75H10.75V7.625C10.75 7.4375 10.5625 7.25 10.375 7.25Z"
                              fill="#BEBEBE"/>
                          </svg>
                          &nbsp;
                          อายุไร่ 1 เดือน
                        </div>*/}
                      </div>
                    </div>

                    <div style={{width: '40%', textAlign: 'right'}} className="text-nowrap pe-3">
                      <button className="btn btn-submit" style={{padding: '5px 14px', fontSize: 12}}
                              onClick={() => navigate(`/farmer/${routeParams.id}/farm/${routeParams.farm_id}/longan/${longan.id}`)}>
                        <span className="fw-bold me-2 text-nowrap">เพิ่มรูปลำไย</span>
                        right
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
            : <div className="data-not-found">ไม่พบรายการต้นลำไยในสวน</div>
        }

        <div className="add-longan-box"
             onClick={() => navigate(`/farmer/${routeParams.id}/farm/${routeParams.farm_id}/longan/add`)}>
          <div className="label-add-longan main-color me-1">เพิ่มต้นลำไย</div>
          <div className="btn-add-longan">
            +
          </div>
        </div>
      </div>
    </Page>
  )
}

export default FarmerLonganList;
