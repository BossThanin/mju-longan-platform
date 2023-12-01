import {Route, Routes} from "react-router-dom";
import React from "react";
import Home from "../views/home/Home";
import Farms from "../views/farm/Farms";
import FarmerList from "../views/farmer/FarmerList";
import FarmerLonganList from "../views/farmer/FarmerLonganList";
import FarmerDetail from "../views/farmer/FarmerDetail";
import NotificationFarmer from "../views/farmer_notification/NotificationFarmer";
import FarmDetail from "../views/farm/FarmDetail";
import Predict from "../views/Predict";
import CreateFarm from "../views/farm/CreateFarm";

function AppFarmerRouter() {
    return (
        <Routes>
            <Route exact path="/home" element={<Home/>}/>

            {/*farmer notification*/}
            <Route exact path="/farmer_notification" element={<NotificationFarmer/>}/>

          <Route exact path="/farm" element={<Farms/>}/>
          <Route exact path="/farm/add" element={<CreateFarm/>}/>
          <Route exact path="/farm/:id" element={<FarmDetail/>}/>

            {/*farmer*/}
            <Route exact path="/farmer" element={<FarmerList/>}/>
            <Route exact path="/farmer/:id" element={<FarmerDetail/>}/>
            <Route exact path="/farmer/:id/farm" element={<Farms/>}/>
            <Route exact path="/farmer/:id/farm/:farm_id" element={<FarmerLonganList/>}/>

            <Route exact path="/predict" element={<Predict/>}/>

        </Routes>
    )
}

export default AppFarmerRouter;
