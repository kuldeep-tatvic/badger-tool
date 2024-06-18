import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import SidebarLayOut from "components/layouts/sidebar-layout";
import { useStoreState } from "easy-peasy";
import { ROLES } from "@utils/constants";
import getInitialProps from "@utils/getInitialProps";

const AdminDashboard = () => {
    const [currentRole, setCurrentRole] = useState(null);

    const { type: userRole } = useStoreState((state) => state.user.role);
    useEffect(() => {
        setCurrentRole(userRole);
    }, [userRole]);

    if (currentRole !== ROLES.ADMIN) {
        return (
            <SidebarLayOut path="Dashboard" actionPath="/admin-dashboard">
                <Typography
                    variant="h2"
                    sx={{ mt: 3, textAlign: "center", color: "grey" }}
                >
                    You do not have access to this page
                </Typography>
            </SidebarLayOut>
        );
    }

    return (
        <SidebarLayOut path="Dashboard" actionPath="/admin-dashboard">
            <Typography variant="h1">
                Admin Dashboard (Coming Soon)
            </Typography>
        </SidebarLayOut>
    );
};

AdminDashboard.getInitialProps = getInitialProps;

export default AdminDashboard;