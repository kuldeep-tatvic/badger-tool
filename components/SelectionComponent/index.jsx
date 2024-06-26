import { useState } from 'react';
import { Box, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import CustomDateRangePicker from 'components/date/DateRangePicker';

const rows = {
    row1: [
        'First User Channel Grouping', 'First User Source', 'First User Medium',
        'First User Source/Medium', 'First User Campaign'
    ],
    row2: [
        'Session Channel Grouping', 'Session Source', 'Session Medium',
        'Session Source/Medium', 'Session Campaign'
    ],
    row3: [
        'Source', 'Medium', 'Source/Medium'
    ]
};

const dimensionMetricsMap = {
    'First User Channel Grouping': [
        'New users', 'engaged sessions', 'engagement rate', 'engaged sessions per user',
        'avg engagement time', 'event count', 'revenue', 'key events', 'key event rate',
        'bounce rate', 'avg session duration', 'views', 'entrances', 'exits'
    ],
    'First User Source': [
        'New users', 'engaged sessions', 'engagement rate', 'engaged sessions per user',
        'avg engagement time', 'event count', 'revenue', 'key events', 'key event rate',
        'bounce rate', 'avg session duration', 'views', 'entrances', 'exits'
    ],
    'First User Medium': [
        'New users', 'engaged sessions', 'engagement rate', 'engaged sessions per user',
        'avg engagement time', 'event count', 'revenue', 'key events', 'key event rate',
        'bounce rate', 'avg session duration', 'views', 'entrances', 'exits'
    ],
    'First User Source/Medium': [
        'New users', 'engaged sessions', 'engagement rate', 'engaged sessions per user',
        'avg engagement time', 'event count', 'revenue', 'key events', 'key event rate',
        'bounce rate', 'avg session duration', 'views', 'entrances', 'exits'
    ],
    'First User Campaign': [
        'New users', 'engaged sessions', 'engagement rate', 'engaged sessions per user',
        'avg engagement time', 'event count', 'revenue', 'key events', 'key event rate',
        'bounce rate', 'avg session duration', 'views', 'entrances', 'exits'
    ],
    'Session Channel Grouping': [
        'Users', 'Sessions', 'Engaged Sessions', 'Avg engagement time per session',
        'engaged session per user', 'events per session', 'event count', 'revenue',
        'key events', 'key event rate', 'bounce rate', 'avg session duration', 'views',
        'entrances', 'exits'
    ],
    'Session Source': [
        'Users', 'Sessions', 'Engaged Sessions', 'Avg engagement time per session',
        'engaged session per user', 'events per session', 'event count', 'revenue',
        'key events', 'key event rate', 'bounce rate', 'avg session duration', 'views',
        'entrances', 'exits'
    ],
    'Session Medium': [
        'Users', 'Sessions', 'Engaged Sessions', 'Avg engagement time per session',
        'engaged session per user', 'events per session', 'event count', 'revenue',
        'key events', 'key event rate', 'bounce rate', 'avg session duration', 'views',
        'entrances', 'exits'
    ],
    'Session Source/Medium': [
        'Users', 'Sessions', 'Engaged Sessions', 'Avg engagement time per session',
        'engaged session per user', 'events per session', 'event count', 'revenue',
        'key events', 'key event rate', 'bounce rate', 'avg session duration', 'views',
        'entrances', 'exits'
    ],
    'Session Campaign': [
        'Users', 'Sessions', 'Engaged Sessions', 'Avg engagement time per session',
        'engaged session per user', 'events per session', 'event count', 'revenue',
        'key events', 'key event rate', 'bounce rate', 'avg session duration', 'views',
        'entrances', 'exits'
    ],
    'Source': [
        'Active users', 'total users', 'event value', 'key events', 'purchase revenue'
    ],
    'Medium': [
        'Active users', 'total users', 'event value', 'key events', 'purchase revenue'
    ],
    'Source/Medium': [
        'Active users', 'total users', 'event value', 'key events', 'purchase revenue'
    ],
};

const FilterComponent = () => {
    const [dimensions, setDimensions] = useState([]);
    const [availableDimensions, setAvailableDimensions] = useState(Object.values(rows).flat());
    const [availableMetrics, setAvailableMetrics] = useState([]);
    const [selectedMetrics, setSelectedMetrics] = useState([]);

    const handleDimensionChange = (event) => {
        const selectedDimensions = event.target.value;
        if (selectedDimensions.includes('None')) {
            // Clear all selections
            setDimensions([]);
            setAvailableDimensions(Object.values(rows).flat());
            setAvailableMetrics([]);
            setSelectedMetrics([]);
        } else {
            setDimensions(selectedDimensions);
            if (selectedDimensions.length > 0) {

                // Find the row containing the selected dimensions
                const rowKey = Object.keys(rows).find(row =>
                    rows[row].some(dimension => selectedDimensions.includes(dimension))
                );

                // Update available dimensions and metrics
                setAvailableDimensions(rows[rowKey]);
                setAvailableMetrics(selectedDimensions.flatMap(dimension => dimensionMetricsMap[dimension] || []));
            } else {

                // Reset to show all dimensions and no metrics if no dimensions are selected
                setAvailableDimensions(Object.values(rows).flat());
                setAvailableMetrics([]);
            }
        }
    };

    const handleMetricsChange = (event) => {
        if (event.target.value.includes('None')) {
            setSelectedMetrics([]);
        } else {
            setSelectedMetrics(event.target.value);
        }
    };

    // Date range filter
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [compareStartDate, setCompareStartDate] = useState(null);
    const [compareEndDate, setCompareEndDate] = useState(null);

    return (
        <Box display="flex" alignItems="center" justifyContent={"center"} p={2} sx={{ width: "100%" }}>
            <Box
                alignItems="center"
                gap={2}
                sx={{
                    justifyContent: "center",
                    display: "flex",
                    width: "100%"
                }}>
                <FormControl sx={{ width: 300 }}>
                    <InputLabel id="dimensions-label">Select the Dimensions</InputLabel>
                    <Select
                        labelId="dimensions-label"
                        value={dimensions}
                        onChange={handleDimensionChange}
                        label="Select the Dimensions"
                        multiple
                    >
                        <MenuItem value="None">
                            <em>None</em>
                        </MenuItem>
                        {availableDimensions.map((dim) => (
                            <MenuItem key={dim} value={dim}>{dim}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ width: 300 }}>
                    <InputLabel id="metrics-label">Select the Metrics</InputLabel>
                    <Select
                        labelId="metrics-label"
                        value={selectedMetrics}
                        onChange={handleMetricsChange}
                        label="Select the Metrics"
                        multiple
                    >
                        <MenuItem value="None">
                            <em>None</em>
                        </MenuItem>
                        {availableMetrics.map((metric) => (
                            <MenuItem key={metric} value={metric}>{metric}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box display="flex" alignItems="center" gap={2}>
                    <CustomDateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        compareStartDate={compareStartDate}
                        compareEndDate={compareEndDate}
                        setCompareStartDate={setCompareStartDate}
                        setCompareEndDate={setCompareEndDate}
                    />
                </Box>
            </Box>
            <Button sx={{ marginLeft: 'auto' }} variant="contained" color="primary">
                Filter
            </Button>
        </Box>
    );
};

export default FilterComponent;
