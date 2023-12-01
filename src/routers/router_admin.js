import {Route, Routes} from "react-router-dom";
import React from "react";
import Home from "../views/home/Home";
import Predict from "../views/Predict";
import FarmDetail from "../views/farm/FarmDetail";
import CreateFarm from "../views/farm/CreateFarm";
import Farms from "../views/farm/Farms";
import NotificationAdmin from "../views/admin_notifications/NotificationAdmin";
import NotificationDetailAdmin from "../views/admin_notifications/NotificationDetailAdmin";
import FarmerList from "../views/farmer/FarmerList";
import FarmerDetail from "../views/farmer/FarmerDetail";
import FarmerLonganList from "../views/farmer/FarmerLonganList";

function AppAdminRouter() {
  return (
      <Routes>
            <Route exact path="/home" element={<Home/>} />

            {/*admin notification*/}
            <Route exact path="/admin_notification" element={<NotificationAdmin/>}/>
            <Route exact path="/admin_notification/:id" element={<NotificationDetailAdmin/>}/>

          {/*farmer*/}
          <Route exact path="/farmer" element={<FarmerList/>}/>
          <Route exact path="/farmer/:id" element={<FarmerDetail/>}/>
          <Route exact path="/farmer/:id/farm" element={<Farms/>}/>
          <Route exact path="/farmer/:id/farm/:farm_id" element={<FarmerLonganList/>}/>

            {/*admin*/}
            <Route exact path="/farm" element={<Farms/>}/>
            <Route exact path="/farm/:id" element={<FarmDetail/>}/>
            <Route exact path="/predict" element={<Predict/>}/>
      </Routes>
  )
}

export default AppAdminRouter;
