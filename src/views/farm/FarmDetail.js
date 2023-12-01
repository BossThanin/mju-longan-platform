import Page from "../layouts/Page";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

function FarmDetail() {
  const [farms, setFarm] = useState('');

  return (
    <Page header={{title: (farms && farms.name) || '', showLeftSide: true}}
          footer={{}}
    >
      <div className="farm-detail-container h-100 overflow-y-auto">
        <div className="d-flex align-items-center">
          <div className="vertical-line me-1"></div>
          <span className="fw-bold">ต้นลำไยของคุณ</span>
        </div>

      </div>
    </Page>
  )
}

export default FarmDetail;
