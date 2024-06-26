import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover";
import Switch from "@mui/material/Switch";
import { Box, Button, Typography, List, } from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";
import { colors } from "constants/colors";
import DateRangeOption from "components/dateRangeOptions/DateRangeOptions";

const CustomDateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isCompared, setIsCompared] = useState(false);
    const [compareStartDate, setCompareStartDate] = useState(null);
    const [compareEndDate, setCompareEndDate] = useState(null);
    const inputRef = useRef(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "date-range-popover" : undefined;

    return (
        <>
            <TextField
                ref={inputRef}
                fullWidth
                onClick={handleClick}
                value={
                    startDate && endDate
                        ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                        : ""
                }
                placeholder="Date Range"
                size="small"
                sx={{
                    "& .MuiInputBase-input::placeholder": {
                        opacity: 1,
                    },
                }}
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <Box sx={{
                    background: colors.lightBlueBg
                }} display="flex" flexDirection="column" width={700}>
                    <Box display="flex" mb={2}>
                        <Box width="40%" sx={{ background: colors.antiFlashWhite }}>
                            <Typography
                                sx={{
                                    padding: "1rem 1rem"
                                }}
                                variant="inherit"
                                fontWeight="bold">Custom</Typography>
                            <List sx={{
                                padding: "0.5rem 1rem",
                                background: "white"
                            }}>
                                <DateRangeOption
                                    onClick={() => {
                                        // setStartDate(new Date());
                                        // setEndDate(new Date());
                                    }}
                                >
                                    Today
                                </DateRangeOption>

                                <DateRangeOption
                                    onClick={() => {
                                        // setStartDate(new Date());
                                        // setEndDate(new Date());
                                    }}
                                >
                                    Yesterday
                                </DateRangeOption>

                                <DateRangeOption
                                    onClick={() => {
                                        // setStartDate(new Date());
                                        // setEndDate(new Date());
                                    }}
                                >
                                    This week (Sun - Today)
                                </DateRangeOption>

                                <DateRangeOption
                                    onClick={() => {
                                        // setStartDate(new Date());
                                        // setEndDate(new Date());
                                    }}
                                >
                                    Last Week (Sun - Sat)
                                </DateRangeOption>

                                <DateRangeOption
                                    onClick={() => {
                                        // setStartDate(new Date());
                                        // setEndDate(new Date());
                                    }}
                                >
                                    Last 7 days
                                </DateRangeOption>

                                <DateRangeOption
                                    onClick={() => {
                                        // setStartDate(new Date());
                                        // setEndDate(new Date());
                                    }}
                                >
                                    Last 28 days
                                </DateRangeOption>

                                <DateRangeOption
                                    onClick={() => {
                                        // setStartDate(new Date());
                                        // setEndDate(new Date());
                                    }}
                                >
                                    Last 30 days
                                </DateRangeOption>

                                <DateRangeOption
                                    onClick={() => {
                                        // setStartDate(new Date());
                                        // setEndDate(new Date());
                                    }}
                                >
                                    Last 90 days
                                </DateRangeOption>

                                <DateRangeOption
                                    onClick={() => {
                                        // setStartDate(new Date());
                                        // setEndDate(new Date());
                                    }}
                                >
                                    Last 12 months
                                </DateRangeOption>

                                <DateRangeOption
                                    onClick={() => {
                                        // setStartDate(new Date());
                                        // setEndDate(new Date());
                                    }}
                                >
                                    Last calendar year
                                </DateRangeOption>

                                <DateRangeOption
                                    onClick={() => {
                                        // setStartDate(new Date());
                                        // setEndDate(new Date());
                                    }}
                                >
                                    This year (Jan - Today)
                                </DateRangeOption>

                            </List>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "0.5rem 1rem"
                            }}>
                                <Typography variant="inherit">Compare</Typography>
                                <Switch checked={isCompared} onChange={() => setIsCompared(!isCompared)} />
                            </Box>

                            <List sx={{
                                padding: "0.5rem 1rem",
                                background: "white"
                            }}>
                                <DateRangeOption
                                    onClick={() => {
                                        // setStartDate(new Date());
                                        // setEndDate(new Date());
                                    }}
                                >
                                    Preceding period (match day of week)
                                </DateRangeOption>
                                <DateRangeOption
                                    onClick={() => {
                                        // setStartDate(new Date());
                                        // setEndDate(new Date());
                                    }}
                                >
                                    Same period last year (match day of week)
                                </DateRangeOption>
                                <DateRangeOption
                                    onClick={() => {
                                        // setStartDate(new Date());
                                        // setEndDate(new Date());
                                    }}
                                >
                                    Preceding period
                                </DateRangeOption>
                                <DateRangeOption
                                    onClick={() => {
                                        // setStartDate(new Date());
                                        // setEndDate(new Date());
                                    }}
                                >
                                    Same period last year
                                </DateRangeOption>
                                <DateRangeOption
                                    onClick={() => {
                                        // setStartDate(new Date());
                                        // setEndDate(new Date());
                                    }}
                                >
                                    Custom
                                </DateRangeOption>
                            </List>
                        </Box>
                        <Box width="55%">
                            <Box sx={{
                                flexDirection: "row",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "0.5rem 1rem",
                                marginBottom: isCompared ? 0 : 2
                            }}>
                                <Box mt={2}>
                                    <TextField
                                        label="Start Date"
                                        type="date"
                                        value={startDate ? startDate.toISOString().substr(0, 10) : ''}
                                        onChange={(e) => setStartDate(new Date(e.target.value))}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        fullWidth
                                        sx={{
                                            width: "auto"
                                        }}
                                    />
                                </Box>
                                <Box mt={2}>
                                    <TextField
                                        label="End Date"
                                        type="date"
                                        value={endDate ? endDate.toISOString().substr(0, 10) : ''}
                                        onChange={(e) => setEndDate(new Date(e.target.value))}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        fullWidth
                                        sx={{
                                            width: "auto"
                                        }}
                                    />
                                </Box>
                            </Box>
                            {isCompared && (
                                <>
                                    <Typography
                                        sx={{
                                            padding: "0.5rem 1rem",
                                        }}
                                        mb={1}
                                        variant="inherit"
                                        fontWeight="bold">Compare</Typography>


                                    <Box sx={{
                                        flexDirection: "row",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "0.5rem 1rem",
                                        marginBottom: "1rem"
                                    }}>
                                        <TextField
                                            label="Compare Start Date"
                                            type="date"
                                            value={compareStartDate ? compareStartDate.toISOString().substr(0, 10) : ''}
                                            onChange={(e) => setCompareStartDate(new Date(e.target.value))}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth
                                            sx={{
                                                width: "auto"
                                            }}
                                        />
                                        <TextField
                                            label="Compare End Date"
                                            type="date"
                                            value={compareEndDate ? compareEndDate.toISOString().substr(0, 10) : ''}
                                            onChange={(e) => setCompareEndDate(new Date(e.target.value))}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth
                                            sx={{
                                                width: "auto"
                                            }}
                                        />
                                    </Box>
                                </>
                            )}

                            <DatePicker
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(dates) => {
                                    const [start, end] = dates;
                                    setStartDate(start);
                                    setEndDate(end);
                                }}
                                inline
                            />
                        </Box>
                    </Box>
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleClose}>Save</Button>
                    </Box>
                </Box>
            </Popover>
        </>
    );
};

export default CustomDateRangePicker;
