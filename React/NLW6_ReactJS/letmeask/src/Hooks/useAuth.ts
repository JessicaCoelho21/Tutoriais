import React from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
    const value = React.useContext(AuthContext);

    return value;
}