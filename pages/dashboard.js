import { getTicketList, getTicketListByAccountId } from "@apis/ticket";
import { Close, ConfirmationNumber, KeyboardDoubleArrowUp } from "@mui/icons-material";
import {
    Box, Button, CircularProgress, Drawer, Grid, MenuItem,
    Select, TablePagination, TextField, Typography, useTheme, Badge,
    Menu,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import getInitialProps from "@utils/getInitialProps";
import { FILTER_TICKET_STATUS, HUBS, PRIORITY } from "@utils/tickets";
import CreateTicketForm from "components/forms/createTicketForm";
import SidebarLayOut from "components/layouts/sidebar-layout";
import MyToast from "components/myToast";
import TicketCard from "components/ticketCard";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import InQueue from "components/InQueue";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import ClosedTab from "components/InQueue/closedTab";
import CountBar from "components/InQueue/countBar";
import AppLevelFeedback from "components/feedback/appLevelFeedback";

function Dashboard({ accountId, isAdmin = false }) {
    const [createTicketDrawer, setCreateTicketDrawer] = useState({ isOpen: false, isEdit: false });
    const [ticketListData, setTicketListData] = useState([]);
    const [editTicketData, setEditTicketData] = useState({});
    const [currentTab, setCurrentTab] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [showLimitRestriction, setLimitRestriction] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const [countTicket, setCountTicket] = useState({});
    const [limitWarningMsg, /* setLimitWarningMsg */] = useState("");
    const [showError, setShowError] = useState(false);
    const [filterObj, setFilterObj] = useState({
        subject: "",
        hub: "",
        status: "",
        priority: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const theme = useTheme();
    const planDetails = useStoreState(
        (state) => state.user.planDetails
    );
    const setPlanDetails = useStoreActions((actions) => actions.user.setPlanDetails);

    const { rowsPerPage, page } = useStoreState((state) => state.ticket.paginationSetting);
    const setPaginationSetting = useStoreActions((actions) => actions.ticket.setPaginationSetting);

    const [planDetailsLimit, setPlanDetailsLimit] = useState(0);

    useEffect(() => {
        setPlanDetailsLimit(planDetails?.limit);
    }, [planDetails]);

    // Defined pagination state (Generated using ChatGPT 4)
    const [filteredTickets, setFilteredTickets] = useState([]);

    // Apply filters whenever ticketListData or filterObj changes (Generated using ChatGPT 4)
    useEffect(() => {

        const filtered = ticketListData.filter(ticket => {
            const isSubjectMatch = filterObj.subject === "" ||
                ticket.subject.toLowerCase().includes(filterObj.subject.toLowerCase());
            const isHubMatch = filterObj.hub === "" || (ticket.cf && ticket.cf.cf_hub === filterObj.hub);
            const isStatusMatch = filterObj.status === "" || ticket.status === filterObj.status;
            const isPriorityMatch = filterObj.priority === "" || ticket.priority === filterObj.priority;
            return isSubjectMatch && isHubMatch && isStatusMatch &&
                isPriorityMatch && ticket.isInQueue === false && ticket.status !== "Closed";
        });

        setFilteredTickets(filtered);
        setPaginationSetting({ rowsPerPage, page: 1 }); // Reset to first page when filters change
    }, [ticketListData, filterObj]);


    const handleChangePage = (_, newPage) => {
        setPaginationSetting({ rowsPerPage, page: newPage + 1 });
    };

    // New: Handle change rows per page
    const handleChangeRowsPerPage = (event) => {
        setPaginationSetting({ rowsPerPage: parseInt(event.target.value, 10), page: 1 });
    };

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredTickets.length);
    const currentTickets = filteredTickets.slice(startIndex, endIndex);

    const {
        isLoading, refetch, isFetching, isRefetching
    } = useQuery("getTicketList", getTicketList, {
        retry: false,
        enabled: !accountId,
        onSuccess: ({ data }) => {
            if (data?.data?.tickets && data.data.tickets.length > 0) {
                setTicketListData(data.data.tickets);
            } else {
                setTicketListData([]);
            }

            if (data?.data?.counts) {
                setCountTicket(data.data.counts);
            }
        }
    });

    // For Admins
    const {
        isLoading: isLoadingByAccountId,
        isFetching: isFetchingByAccountId,
        refetch: refetchByAccountId,
    } = useQuery("getTicketListByAccountId", () => getTicketListByAccountId(accountId), {
        retry: false,
        enabled: !!accountId,
        onSuccess: ({ data }) => {
            if (data?.data?.tickets && data.data.tickets.length > 0) {
                setTicketListData(data.data.tickets);
            } else {
                setTicketListData([]);
            }

            if (data?.data?.counts) {
                setCountTicket(data.data.counts);
            }

            if (!!accountId && data?.data?.planDetails) {
                setPlanDetails(data.data.planDetails);
            }
        }
    });

    useEffect(() => {
        if (accountId) {
            refetchByAccountId();
        }
    }, [accountId, refetchByAccountId]);

    const isFilterObjEmpty = (obj) => {
        return Object.values(obj).every(value => value === "");
    };

    const setCurrentTicketData = useStoreActions(
        (actions) => actions.ticket.setCurrentTicketData
    );


    const sortBy = (value) => {
        const sortedTickets = [...ticketListData];
        const [order, key] = value.split("-");

        const compareDates = (a, b) => {
            const dateA = new Date(a[key]);
            const dateB = new Date(b[key]);
            return order === "asc" ? dateA - dateB : dateB - dateA;
        };

        sortedTickets.sort(compareDates);
        setTicketListData(sortedTickets);
        setAnchorEl(null);
    };

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <SidebarLayOut isFullHeight={false} path="Tasks"
            actionPath={(!isAdmin && !accountId) ? "/dashboard" : `/clients/${accountId}`}>
            <MyToast
                isOpen={showSuccess}
                onCloseToast={() => {
                    setShowSuccess(false);
                }}
                message={successMsg}
                type="success" />
            <MyToast
                isOpen={showError}
                onCloseToast={() => {
                    setShowError(false);
                }}
                message={errorMsg}
                type="error" />
            <MyToast
                isOpen={showLimitRestriction}
                onCloseToast={() => {
                    setLimitRestriction(false);
                }}
                position={["top", "center"]}
                message={limitWarningMsg}
                type="warning" />
            <AppLevelFeedback
                open={feedbackOpen}
                handleClose={() => setFeedbackOpen(false)}
            />
            <Drawer
                anchor={"right"}
                open={createTicketDrawer.isOpen}
                onClose={() => { setCreateTicketDrawer({ isOpen: false, isEdit: false }); setEditTicketData([]); }}
            >
                <Box sx={{ maxWidth: 600 }}>
                    <Box sx={{ height: 50, background: "#F3F3F3", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", px: 3 }}>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                            <ConfirmationNumber color="primary" />
                            <Typography
                                color="primary"
                                fontWeight={500}
                                fontSize={18}>
                                {createTicketDrawer.isEdit ?
                                    "Task Details" : "Create New Task"}
                            </Typography>
                        </Box>
                        <Close sx={{ cursor: "pointer" }} onClick={() => { setCreateTicketDrawer({ isOpen: false, isEdit: false }); setEditTicketData({}); setCurrentTicketData({}); }} color="primary"></Close>
                    </Box>
                    <Box sx={{ width: "100%", p: 3 }}>
                        <CreateTicketForm availableLimit={planDetailsLimit - countTicket.openTasks} taskInPlan={countTicket.inQueueTasks} onShowSuccess={() => {
                            setShowSuccess(true);
                        }} refetch={refetch}
                            onClose={() => { setCreateTicketDrawer({ isOpen: false, isEdit: false }); setEditTicketData({}); setCurrentTicketData({}); }}
                            setSuccessMsg={(msg) => {
                                setSuccessMsg(msg);
                            }}
                            setErrorMsg={(msg) => {
                                setErrorMsg(msg);
                            }}
                            setShowError={() => {
                                setShowError(true);
                            }}
                            isEdit={createTicketDrawer.isEdit} editTicketData={editTicketData} createTicketDrawer={createTicketDrawer}
                            planName={planDetails?.planName}
                            monthlyAvailableTasks={countTicket.monthlyAvailableTasks}
                        />
                    </Box>
                </Box>
            </Drawer>
            <Box width="100%" display="flex" alignItems="center"
                justifyContent="space-between" sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    background: "#fff"
                }}>
                <Box sx={{ borderColor: "divider" }}>
                    <Tabs value={currentTab} onChange={handleTabChange}
                        TabIndicatorProps={{
                            style: {
                                display: "none" // Hide the default indicator
                            }
                        }}
                        sx={{
                            ".Mui-selected": { // Styles for selected tab
                                borderBottom: "3px solid", // Border at the bottom
                                borderColor: "primary.main", // Color of the border
                            },
                        }}
                    >
                        <Tab sx={{ fontSize: "18px" }} label="Active Tasks" />
                        <Tab sx={{ fontSize: "18px", pb: 2 }}
                            label="In Queue"
                            icon={
                                <Badge
                                    sx={{
                                        ".MuiBadge-badge": {
                                            top: 5, right: -40,
                                            height: 18, width: 18
                                        }
                                    }}
                                    badgeContent={countTicket.inQueueTasks}
                                    color="error"
                                />}
                        />
                        <Tab sx={{ fontSize: "18px" }} label="Closed" />
                    </Tabs>
                </Box>

                {!isAdmin && <Button onClick={() => {
                    setCreateTicketDrawer({
                        isOpen: true,
                        isEdit: false
                    });
                }} variant="contained"
                    disabled={planDetails.planName === "Starter" ?
                        countTicket.inQueueTasks >= countTicket.taskLimit :
                        countTicket.openTasks + countTicket.inQueueTasks >= 20}
                >
                    + Create New Task
                </Button>}
            </Box>
            {currentTab === 0 &&
                <Box>
                    <Box sx={{
                        width: "100%",
                        position: "sticky",
                        zIndex: 500,
                        top: 72, // Adjust this value as needed
                        backgroundColor: "#FFF",
                        pb: 3
                    }}>
                        <CountBar countTicket={countTicket} />
                        <Box sx={{ width: "100%", mt: 4, }}>
                            <Grid container spacing={1} sx={{ alignItems: "center" }}>
                                <Grid item xs={1} md={1}>
                                    <Typography >Filter By:</Typography>
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    <TextField
                                        size="small"
                                        value={filterObj.subject}
                                        placeholder="Subject" fullWidth onChange={(e) => {
                                            const newFilter = { ...filterObj };
                                            newFilter["subject"] = e.target.value;
                                            setFilterObj(newFilter);
                                        }} />
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    <Select value={filterObj.hub} onChange={(e) => {
                                        const newFilter = { ...filterObj };
                                        newFilter["hub"] = e.target.value;
                                        setFilterObj(newFilter);

                                    }} sx={{ color: filterObj.hub === "" ? "grey" : "#000", }}
                                        size="small" fullWidth displayEmpty>
                                        <MenuItem value="" sx={{ color: "#424242" }} disabled>
                                            {"Hub"}
                                        </MenuItem>
                                        {HUBS.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                value={item}
                                            >
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    <Select value={filterObj.status} onChange={(e) => {
                                        const newFilter = { ...filterObj };
                                        newFilter["status"] = e.target.value;
                                        setFilterObj(newFilter);

                                    }} sx={{ color: filterObj.status === "" ? "grey" : "#000" }}
                                        size="small" fullWidth displayEmpty>
                                        <MenuItem value="" sx={{ color: "#424242" }} disabled>
                                            {"Status"}
                                        </MenuItem>
                                        {FILTER_TICKET_STATUS.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    <Select value={filterObj.priority} onChange={(e) => {
                                        const newFilter = { ...filterObj };
                                        newFilter["priority"] = e.target.value;
                                        setFilterObj(newFilter);

                                    }} sx={{ color: filterObj.priority === "" ? "grey" : "#000" }}
                                        size="small" fullWidth displayEmpty>
                                        <MenuItem value="" sx={{ color: "#424242" }} disabled>
                                            {"Priority"}
                                        </MenuItem>
                                        {PRIORITY.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={1} md={1}>
                                    <Button
                                        disabled={isFilterObjEmpty(filterObj)} onClick={() => {
                                            setFilterObj({
                                                subject: "",
                                                hub: "",
                                                status: "",
                                                priority: ""
                                            });
                                        }}
                                        sx={{
                                            textDecoration: "underline",
                                            cursor: "pointer",
                                            textAlign: "center"
                                        }}>
                                        <CancelOutlinedIcon sx={{
                                            height: "16px",
                                            width: "16px",
                                            marginRight: 0.5
                                        }} />
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid item xs={2} md={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        variant="outlined"
                                        aria-controls={Boolean(anchorEl) ? "sort-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                                        onClick={(event) => setAnchorEl(event.currentTarget)}
                                        endIcon={<SwapVertIcon />}
                                    >
                                        Sort
                                    </Button>
                                    <Menu
                                        id="sort-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={() => setAnchorEl(null)}
                                        MenuListProps={{
                                            "aria-labelledby": "sort-button",
                                        }}
                                    >
                                        <MenuItem onClick={() => sortBy("asc-createdAt")}>
                                            <ListItemIcon>
                                                <KeyboardDoubleArrowUp fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Created by</ListItemText>
                                        </MenuItem>

                                        <MenuItem onClick={() => sortBy("desc-createdAt")}>
                                            <ListItemIcon>
                                                <KeyboardDoubleArrowDownIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Created by</ListItemText>
                                        </MenuItem>
                                        <MenuItem onClick={() => sortBy("asc-dueDate")}>
                                            <ListItemIcon>
                                                <KeyboardDoubleArrowUp fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Due date</ListItemText>
                                        </MenuItem>
                                        <MenuItem onClick={() => sortBy("desc-dueDate")}>
                                            <ListItemIcon>
                                                <KeyboardDoubleArrowDownIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Due date</ListItemText>
                                        </MenuItem>

                                    </Menu>
                                </Grid>

                            </Grid>
                        </Box>
                    </Box>
                    {(isLoading || isFetching || isRefetching) ||
                        (isLoadingByAccountId || isFetchingByAccountId) ?
                        <Box sx={{
                            width: "100%",
                            overflow: "scroll",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative"
                        }}>
                            <CircularProgress />
                        </Box> : currentTickets.filter(ticket => {
                            // Check if the subject contains filterObj.subject (case-insensitive)
                            const isSubjectMatch = filterObj.subject === "" ||
                                ticket.subject.toLowerCase().includes(filterObj.subject.toLowerCase());

                            // Assuming that 'hub' in filterObj corresponds to 'cf_hub' in the ticket
                            const isHubMatch = filterObj.hub === "" ||
                                (ticket.cf && ticket.cf.cf_hub === filterObj.hub);

                            // Check for exact matches for status and priority
                            const isStatusMatch = filterObj.status === "" ||
                                ticket.status === filterObj.status;
                            const isPriorityMatch = filterObj.priority === "" ||
                                ticket.priority === filterObj.priority;

                            // Return true if all conditions are met
                            return isSubjectMatch && isHubMatch && isStatusMatch && isPriorityMatch;
                        }).length > 0 ? <>
                            <Box width="100%" mt={4} pb={1} px={1} sx={{
                                overflow: "auto",
                                "&::-webkit-scrollbar": {
                                    width: "6px", // Adjust the width of the scrollbar
                                },
                                "&::-webkit-scrollbar-track": {
                                    backgroundColor: "#f1f1f1", // Adjust the track color
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    backgroundColor: "grey", // Adjust the thumb color
                                    borderRadius: "10px", // Optional: add border-radius to the scrollbar thumb
                                    "&:hover": {
                                        backgroundColor: theme.palette.primary.main, // Adjust the thumb color on hover
                                    },
                                },
                            }} > {currentTickets.filter(ticket => {
                                // Check if the subject contains filterObj.subject (case-insensitive)
                                const isSubjectMatch = filterObj.subject === "" ||
                                    ticket.subject.toLowerCase().includes(filterObj.subject.toLowerCase());

                                // Assuming that 'hub' in filterObj corresponds to 'cf_hub' in the ticket
                                const isHubMatch = filterObj.hub === "" ||
                                    (ticket.cf && ticket.cf.cf_hub === filterObj.hub);

                                // Check for exact matches for status and priority
                                const isStatusMatch = filterObj.status === "" ||
                                    ticket.status === filterObj.status;
                                const isPriorityMatch = filterObj.priority === "" ||
                                    ticket.priority === filterObj.priority;

                                // Return true if all conditions are met
                                return isSubjectMatch && isHubMatch && isStatusMatch && isPriorityMatch;
                            }).map((ticket, index) => {
                                return (
                                    <TicketCard
                                        key={index}
                                        onShowSuccess={() => setShowSuccess(true)}
                                        refetch={refetch}
                                        setSuccessMsg={setSuccessMsg}
                                        keyIndex={index}
                                        setErrorMsg={setErrorMsg}
                                        setShowError={() => setShowError(true)}
                                        ticket={ticket}
                                        setEditTicketData={setEditTicketData}
                                        setCreateTicketDrawer={setCreateTicketDrawer}
                                        goToClosedTab={() => {
                                            if (ticketListData && ticketListData.length > 0) {
                                                if (!ticketListData.some(ticket => ticket.status === "Closed")) {
                                                    setFeedbackOpen(true);
                                                }
                                            }
                                            setCurrentTab(2);
                                        }}
                                        isAdmin={!!isAdmin}
                                    />
                                );
                            })}
                            </Box>
                            <Box mt={2}
                                justifyContent='space-between'
                                flexDirection={"row"}
                                sx={{
                                    alignItems: "center",
                                    display: "flex"
                                }}
                            >
                                <TablePagination
                                    component="div"
                                    count={filteredTickets.length}
                                    page={page - 1}
                                    onPageChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                    labelRowsPerPage="Show rows"
                                    sx={{
                                        // Style for the select component (dropdown)
                                        ".MuiTablePagination-select": {
                                            borderRadius: "8px", // Apply rounded corners
                                            borderWidth: "2px",
                                            boxSizing: "border-box", // Apply border box
                                            borderWidth: "2px",
                                        },
                                        // Style for the label displayed rows (reduce margin)
                                        ".MuiTablePagination-displayedRows": {
                                            marginLeft: "-24px", // Adjust the left margin to bring the text closer
                                        },
                                        ".MuiTablePagination-input": {
                                            boxSizing: "border-box",
                                            borderWidth: "2px",
                                            borderRadius: "8px", // Apply rounded corners
                                        },
                                    }}

                                />
                                <Box />
                            </Box>
                        </> : <Box sx={{ width: "100%", p: 5, display: "flex", justifyContent: "center" }}>
                            <Typography color="gray">No Tasks Found</Typography>
                        </Box>}
                </Box>}
            {currentTab === 1 &&
                <InQueue
                    isLoading={(isLoading || isFetching || isRefetching) ||
                        (isLoadingByAccountId || isFetchingByAccountId)}
                    ticketListData={ticketListData}
                    refetch={refetch}
                    ticketCountData={countTicket}
                    isAdmin={isAdmin}
                />
            }
            {currentTab === 2 &&
                <ClosedTab
                    isLoading={(isLoading || isFetching || isRefetching) ||
                        (isLoadingByAccountId || isFetchingByAccountId)}
                    ticketListData={ticketListData}
                    refetch={refetch}
                    ticketCountData={countTicket}
                    isAdmin={isAdmin}
                />}
        </SidebarLayOut>
    );
}

Dashboard.getInitialProps = getInitialProps;

export default Dashboard;
