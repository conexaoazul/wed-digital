import React, {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import UserContext from "../../api/userContext-api/userContext";

function PrivateRouter() {
    const {token} = useContext(UserContext);

    return token ? <Outlet/> : <Navigate to="/"/>;
}

export default PrivateRouter;
