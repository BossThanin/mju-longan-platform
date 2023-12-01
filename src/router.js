import {Route, Routes} from "react-router-dom";
import React from "react";
import Home from "./views/home/Home";
import Predict from "./views/Predict";
import FarmDetail from "./views/farm/FarmDetail";
import CreateFarm from "./views/farm/CreateFarm";
import Farms from "./views/farm/Farms";
import FarmerList from "./views/farmer/FarmerList";
import FarmerLonganList from "./views/farmer/FarmerLonganList";
import FarmerDetail from "./views/farmer/FarmerDetail";
import NotificationAdmin from "./views/admin_notifications/NotificationAdmin";
import NotificationDetailAdmin from "./views/admin_notifications/NotificationDetailAdmin";
import NotificationFarmer from "./views/farmer_notification/NotificationFarmer";
import ApproveUser from "./views/users/ApproveUser";
import Setting from "./views/setting/Setting";
import AddApp from "./views/AddApp";
import UpdateApp from "./views/UpdateApp";

function AppRouter() {
    return (
        <Routes>
            <Route exact path="/home" element={<Home/>}/>

            {/*admin notification*/}
            <Route exact path="/admin_notification" element={<NotificationAdmin/>}/>
            <Route exact path="/admin_notification/:id" element={<NotificationDetailAdmin/>}/>

            {/*farmer notification*/}
            <Route exact path="/farmer_notification" element={<NotificationFarmer/>}/>

            {/*farmer*/}
            <Route exact path="/farmer" element={<FarmerList/>}/>
            <Route exact path="/farmer/:id" element={<FarmerDetail/>}/>
            <Route exact path="/user/:id" element={<FarmerDetail/>}/>
            <Route exact path="/user/:id/approve" element={<ApproveUser/>}/>
            <Route exact path="/farmer/:id/farm" element={<Farms styleListContainer={{paddingBottom: '5.5rem'}}/>}/>
            <Route exact path="/farmer/:id/farm/:farm_id" element={<FarmerLonganList/>}/>
            {/*admin*/}
            <Route exact path="/farm" element={<Farms/>}/>
            <Route exact path="/farm/add" element={<CreateFarm/>}/>
            <Route exact path="/farm/:id" element={<FarmDetail/>}/>
            <Route exact path="/application" element={<Predict/>}/>
            <Route exact path={'/app-manage'} element={<Setting/>}/>
            <Route exact path={'/add-app'} element={<AddApp/>}></Route>
                <Route exact path={'/edit-app/:id'} element={<UpdateApp/>}></Route>
        </Routes>
    )
}

export default AppRouter;
