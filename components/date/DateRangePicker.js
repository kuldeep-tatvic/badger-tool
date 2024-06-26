import React, { useState, useRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import enGb from 'date-fns/locale/en-GB';
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover";
import Switch from "@mui/material/Switch";
import { Box, Button, Typography, List } from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";
import { colors } from "constants/colors";
import DateRangeOption from "components/dateRangeOptions/DateRangeOptions";
import styles from "./CustomDateRangePicker.module.css"; // Import the CSS module

registerLocale('en-GB', enGb);

const CustomDateRangePicker = ({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    compareStartDate,
    compareEndDate,
    setCompareStartDate,
    setCompareEndDate
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isCompared, setIsCompared] = useState(false);
    const inputRef = useRef(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "date-range-popover" : undefined;

    const [highlightWithRanges, setHighlightWithRanges] = useState([
        {
            "highlighted-custom-1": [startDate, endDate],
        },
        {
            "highlighted-custom-2": [compareStartDate, compareEndDate],
        },
    ]);

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
                size="medium"
                sx={{
                    "&.MuiInputBase-input::placeholder": {
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

                            {isCompared && (
                                <List sx={{
                                    padding: "0.5rem 1rem",
                                    background: "white"
                                }}>
                                    <DateRangeOption
                                        onClick={() => {
                                            // setCompareStartDate(new Date());
                                            // setCompareEndDate(new Date());
                                        }}
                                    >
                                        Preceding period (match day of week)
                                    </DateRangeOption>
                                    <DateRangeOption
                                        onClick={() => {
                                            // setCompareStartDate(new Date());
                                            // setCompareEndDate(new Date());
                                        }}
                                    >
                                        Same period last year (match day of week)
                                    </DateRangeOption>
                                    <DateRangeOption
                                        onClick={() => {
                                            // setCompareStartDate(new Date());
                                            // setCompareEndDate(new Date());
                                        }}
                                    >
                                        Preceding period
                                    </DateRangeOption>
                                    <DateRangeOption
                                        onClick={() => {
                                            // setCompareStartDate(new Date());
                                            // setCompareEndDate(new Date());
                                        }}
                                    >
                                        Same period last year
                                    </DateRangeOption>
                                    <DateRangeOption
                                        onClick={() => {
                                            // setCompareStartDate(new Date());
                                            // setCompareEndDate(new Date());
                                        }}
                                    >
                                        Custom
                                    </DateRangeOption>
                                </List>
                            )}
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
                                            // onChange={(e) => setCompareStartDate(new Date(e.target.value))}
                                            onChange={(e) => {
                                                const newCompareStartDate = new Date(e.target.value);
                                                console.log(newCompareStartDate);
                                                setCompareStartDate(newCompareStartDate);
                                                setHighlightWithRanges([
                                                    {
                                                        "highlighted-custom-1": [startDate, endDate],
                                                    },
                                                    {
                                                        "highlighted-custom-2": [newCompareStartDate, compareEndDate],
                                                    },
                                                ]);
                                            }}
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
                                            // onChange={(e) => setCompareEndDate(new Date(e.target.value))}
                                            onChange={(e) => {
                                                const newCompareEndDate = new Date(e.target.value);
                                                setCompareEndDate(newCompareEndDate);
                                                setHighlightWithRanges([
                                                    {
                                                        "highlighted-custom-1": [startDate, endDate],
                                                    },
                                                    {
                                                        "highlighted-custom-2": [compareStartDate, newCompareEndDate],
                                                    },
                                                ]);
                                            }}
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

                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: "0.5rem 1rem",
                                width: "100%",
                            }}>
                                <DatePicker
                                    selectsRange
                                    style={{
                                        width: 500, // increase width
                                        height: 250, // increase height
                                    }}

                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={(dates) => {
                                        const [start, end] = dates;
                                        setStartDate(start);
                                        setEndDate(end);
                                    }}
                                    inline
                                    highlightDates={highlightWithRanges}
                                    locale="en-GB"
                                    renderDayContents={(day, date) => {
                                        const isHighlight1 = startDate && endDate && date >= startDate && date <= endDate;
                                        const isHighlight2 = compareStartDate && compareEndDate && date >= compareStartDate && date <= compareEndDate;
                                        if (isHighlight1 && isHighlight2) {
                                            return (
                                                <span
                                                    style={{
                                                        backgroundColor: 'black', // override with compare color
                                                        borderRadius: '22%',
                                                        display: 'inline-block',
                                                        width: '1.8rem',
                                                        height: '2rem',
                                                        lineHeight: '2rem',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {day}
                                                </span>
                                            );
                                        } else if (isHighlight1) {
                                            return (
                                                <span
                                                    style={{
                                                        // backgroundColor: 'lightblue',
                                                        // borderRadius: '50%',
                                                        // display: 'inline-block',
                                                        // width: '2rem',
                                                        // height: '2rem',
                                                        // lineHeight: '2rem',
                                                        // textAlign: 'center',
                                                    }}
                                                >
                                                    {day}
                                                </span>
                                            );
                                        } else if (isHighlight2) {
                                            return (
                                                <span
                                                    style={{
                                                        backgroundColor: 'lightgreen',
                                                        borderRadius: '15%',
                                                        display: 'inline-block',
                                                        width: '1.7rem',
                                                        height: '1.9rem',
                                                        lineHeight: '2rem',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {day}
                                                </span>
                                            );
                                        } else {
                                            return <span>{day}</span>;
                                        }
                                    }}
                                />
                            </Box>
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
