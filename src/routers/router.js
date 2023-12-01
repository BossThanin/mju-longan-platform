import {Route, Routes} from "react-router-dom";
import React from "react";

import Login from "../views/Login";
import Register from "../views/Register";

function AppAuthenRouter() {
  return (
      <Routes>
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
      </Routes>
  )
}

export default AppAuthenRouter;
