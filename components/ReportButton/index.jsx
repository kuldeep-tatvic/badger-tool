import { Box, Typography } from "@mui/material";
import { colors } from "constants/colors";
import Image from "next/image";
import React from "react";

const ReportButton = ({ label, reportType, setSelectedReport, isActive, }) => {
    return (
        <Box
            onClick={() => {
                setSelectedReport(reportType);
            }}
            sx={{
                width: "auto",
                background: isActive ? colors.cyon : colors.darkBlue,
                border: "1px solid rgba(255, 255, 255, 0.4)",
                borderRadius: "6px",
                color: isActive ? "white" : colors.grayBorder,
                padding: "0.5rem 1rem"
            }}
        >
            <Box sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}>
                <Image
                    src={reportType === "acquisition" ? "/images/acquisition.svg"
                        : "/images/funnel.svg"
                    }
                    style={{
                        filter: reportType === "acquisition" ? 'brightness(0) invert(1)'
                            : 'brightness(0) invert(0.7)',
                    }}
                    alt={label}
                    width={30}
                    height={30}
                />
                <Typography sx={{
                    marginLeft: 2,
                    color: isActive ? colors.white : colors.grayBorder
                }}>{label}</Typography>

                {
                    reportType === "funnel" && (
                        <Typography sx={{
                            marginLeft: 2,
                            color: colors.cyon,
                            fontSize: "12px",
                            marginLeft: 2
                        }}>Coming Soon</Typography>)
                }
            </Box >
        </Box >
    );
};

export default ReportButton;