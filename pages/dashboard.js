import { Box, Container, Paper, Stack } from "@mui/material";
import ReportButton from "components/ReportButton";
import SelectionComponent from "components/SelectionComponent";
import HeaderComponent from "components/header";
import { colors } from "constants/colors";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useQuery } from "react-query";
import { fetchData, getAnalyticsAccount } from "@apis/analyticsAccounts";


const Dashboard = () => {

    const [selectedReport, setSelectedReport] = useState("acquisition");
    const { data: session } = useSession();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [pageToken, setPageToken] = useState("");

    const {
        isLoading, refetch, isFetching, isRefetching
    } = useQuery(
        "getAnalyticsAccountSummaries",
        () => getAnalyticsAccount(session?.accessToken, 200, pageToken),
        {
            enabled: !!session?.accessToken, // Only run the query if session is defined
            retry: false,
            onSuccess: (responseData) => {

                console.log("getAnalyticsAccountSummaries:", JSON.stringify(responseData));

                setData(prevData => [
                    ...(Array.isArray(prevData) ? prevData : []),
                    ...(responseData.accountSummaries ? responseData.accountSummaries : [])
                ]);
                if (responseData.nextPageToken) {
                    setPageToken(responseData.nextPageToken);
                } else {
                    setPageToken("");
                }
            },
            onError: (error) => {
                console.log("getAnalyticsAccountSummaries error:", JSON.stringify(error));
            }
        });

    // Refetch data if pageToken changes
    useEffect(() => {
        if (pageToken) {
            refetch();
        }
    }, [pageToken, refetch]);

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

                <Paper
                    elevation={3}
                    sx={{
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