import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import Menu from '@mui/material/Menu';
import { colors } from "constants/colors";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import toast from 'react-hot-toast';


const HeaderComponent = ({ onAccountHandler, data }) => {

    console.log("header data", data);

    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const [selectedProperties, setSelectedProperties] = useState([]);

    const [accountId, setAccountId] = useState("");
    const [propertyId, setPropertyId] = useState("");


    const handleDropdownVisibility = (event) => {
        setAnchorEl(event.currentTarget);
        setDropdownVisible(!isDropdownVisible);
        if (onAccountHandler) {
            onAccountHandler();
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        setDropdownVisible(false);
    };

    const handleAccountClick = (event, accountId) => {
        console.log("on click item", JSON.stringify(data));

        const account = data.find((account) => account.account === `accounts/${accountId}`);

        console.log("account", account);

        if (account) {
            const properties = Array.isArray(account.propertySummaries)
                ? account.propertySummaries.filter(prop => prop.parent === `accounts/${accountId}`)
                : [];

            if (properties.length === 0) {
                toast.error("No properties found for this account");
            }

            setSelectedProperties(properties);

            setAccountId(accountId);

            console.log("selected properties", properties);
            // toast.success("Account selected");
        } else {
            console.log("Account not found");
            toast.error("Account not found");

        }

        // setAnchorEl(event.currentTarget);
    };

    const handlePropertyClick = async (event, propId) => {
        setPropertyId(propId);
        console.log("on click property", propertyId);
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    height: "72px",
                    width: "100%",
                    alignItems: "center",
                    backgroundColor: "white",
                }}>
                <Stack
                    direction={"row"}
                    width={"100%"}
                    height={"100%"}
                    paddingLeft={"2rem"}
                    paddingRight={"1rem"}
                    sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                    >
                        <Image
                            alt="badger_logo"
                            src={"/images/badger_logo.svg"}
                            width={20}
                            height={22}
                        />
                        <Box
                            onClick={handleDropdownVisibility}
                            sx={{
                                background: "#EFF0F5",
                                height: "52px",
                                marginLeft: "1.5rem",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                width: "210px",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                            }}>
                            <Stack direction={"column"}>
                                <Stack direction={"row"}>
                                    <Typography
                                        variant="subtitle2"
                                        fontSize={"12px"}
                                        sx={{ marginTop: "3px" }}
                                    >ICICI Lombard</Typography>
                                    <KeyboardArrowRightIcon />
                                    <Typography
                                        sx={{ marginTop: "3px" }}
                                        variant="subtitle2" fontSize={"12px"}>ICICI Lombard</Typography>
                                </Stack>

                                <Stack direction={"row"} sx={{
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}>
                                    <Typography variant="subtitle1" sx={{
                                        color: "#2A4759",
                                        fontSize: 14
                                    }}>[UA] ICICI BIZ Health - GA4</Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            background: "#E2E3E8",
                                            height: "10px",
                                            width: "10px",
                                            justifyContent: "center",
                                            borderRadius: "15%"
                                        }}
                                    >
                                        <Image
                                            alt={"right_arrow"}
                                            src={"/images/down_arrow.svg"}
                                            height={6}
                                            width={6}
                                        />
                                    </Box>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh", // Added height for demonstration purposes
                    }}>
                        <Stack
                            direction={"row"}
                            spacing={2}
                            sx={{
                                alignItem: "center",
                            }}>
                            <IconButton>
                                <NotificationsNoneIcon
                                    height={34}
                                    width={34}
                                    sx={{
                                        color: colors.primary,
                                    }} />
                            </IconButton>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Typography
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 500,
                                    }}
                                    variant="body2">{session?.user?.name}</Typography>
                            </Box>
                            <IconButton sx={{
                                color: "#2A4759"
                            }} >
                                <ArrowDropDownIcon />
                            </IconButton>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingRight: "1rem",
                            }}>
                                <Image
                                    alt="user_image"
                                    src={session?.user?.image}
                                    height={34}
                                    width={34}
                                />
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                    sx: {
                        paddingTop: 0,
                        paddingBottom: 0,
                    }
                }}
                sx={{
                    height: "auto",
                    marginTop: "0.1rem",
                    '& .MuiPaper-root': {
                        width: '50rem',
                    },
                }}
            >
                <Box
                    sx={{
                        height: "50vh",
                        overflowY: "auto",
                    }}
                >
                    <Stack direction={"row"}>
                        <Stack width={"45%"}>
                            <Box sx={{
                                position: "sticky",
                                top: 0,
                                backgroundColor: "inherit", // Maintain the background color when sticky
                                zIndex: 1,
                                background: "white"
                            }}>
                                <Typography
                                    sx={{
                                        padding: "1rem 1rem",

                                    }}
                                    variant="inherit"
                                    color={colors.primary}>Analytics Accounts</Typography>

                                <Divider
                                    orientation="horizontal"
                                    flexItem
                                    sx={{
                                        marginRight: "0.1rem",
                                    }}
                                />
                            </Box>
                            <Box sx={{
                                padding: "1rem 1rem",
                                marginRight: "0.1rem",
                            }}>
                                {
                                    data?.map((item) => {
                                        const accountId = item.account.split('/')[1];
                                        return (
                                            <Box
                                                key={item.id}
                                                sx={{
                                                    padding: "0.7rem 0rem",
                                                }}
                                                onClick={(event) => handleAccountClick(event, accountId)}
                                            >
                                                <Typography
                                                    variant="inherit"
                                                    color={colors.primary}
                                                >{item.displayName}</Typography>

                                                <Typography
                                                    variant="subtitle1"
                                                    color={colors.subTitleText}
                                                >{accountId}</Typography>
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                        </Stack>
                        <Stack width={"70%"}>
                            <Typography
                                variant="inherit"
                                color={colors.primary}
                                backgroundColor={colors.lightGray}
                                sx={{
                                    padding: "1rem 1rem",
                                    position: "sticky",
                                    zIndex: 1,
                                    top: 0,
                                    marginBottom: "1rem",
                                }}
                            >Properties & Apps</Typography>

                            {
                                selectedProperties?.map((item) => {
                                    const propertyID = item.property.split('/')[1];
                                    return (
                                        <Box
                                            key={item.id}
                                            sx={{
                                                padding: "0.7rem 1rem",
                                            }}
                                            onClick={(event) => handlePropertyClick(event, propertyID)}
                                        >
                                            <Typography
                                                variant="inherit"
                                                color={colors.primary}
                                            >{item.displayName}</Typography>
                                            <Typography
                                                variant="subtitle1"
                                                color={colors.subTitleText}
                                            >{propertyID}</Typography>
                                        </Box>
                                    )
                                })
                            }

                        </Stack>
                    </Stack>
                </Box>
            </Menu>
        </Box>
    );
};

export default HeaderComponent;
