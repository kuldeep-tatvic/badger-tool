import { Box, Container, Paper, Stack } from "@mui/material";
import ReportButton from "components/ReportButton";
import SelectionComponent from "components/SelectionComponent";
import HeaderComponent from "components/header";
import { colors } from "constants/colors";
import React, { useState } from "react";

const Dashboard = () => {

    const [selectedReport, setSelectedReport] = useState("acquisition");

    return (
        <Container sx={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            background: "linear-gradient(111.85deg, #AAB4BD 1.7%, #6F8199 99.3%)",
            "@media (min-width: 1200px)": {
                maxWidth: "none", // or any value you prefer
            },
            "@media (min-width: 600px)": {
                paddingLeft: 0,
                paddingRight: 0
            },
        }}>
            <Stack direction={"column"} width={"100%"}>
                <HeaderComponent />
                <Box sx={{
                    flexDirection: "row",
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    backgroundColor: colors.darkBlue,
                    gap: 2,
                    padding: "1rem",
                }}>
                    <ReportButton
                        label="Acquisition Report"
                        reportType="acquisition"
                        setSelectedReport={setSelectedReport}
                        isActive={selectedReport === "acquisition"}
                    />

                    <ReportButton
                        label="funnel Report"
                        reportType="funnel"
                        setSelectedReport={setSelectedReport}
                        isActive={selectedReport === "funnel"}
                    />
                </Box>

                <Paper elevation={3} sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: colors.white,
                    marginTop: 1,
                    marginLeft: 2,
                    marginRight: 2,
                }}>
                    <SelectionComponent />
                </Paper>
            </Stack>
        </Container>
    );
};

export default Dashboard;