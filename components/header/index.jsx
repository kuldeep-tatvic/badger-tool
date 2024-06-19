import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { colors } from "constants/colors";

const HeaderComponent = () => {

    const { data: session } = useSession();
    return (
        <Box sx={{
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
                    <Box sx={{
                        background: "#EFF0F5",
                        height: "52px",
                        marginLeft: "1.5rem",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        width: "210px",
                        justifyContent: "center",
                        alignItems: "center",
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
    );
};

export default HeaderComponent;