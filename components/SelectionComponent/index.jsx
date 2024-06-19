import { useState } from 'react';
import { Box, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterComponent = () => {
    const [dimensions, setDimensions] = useState([]);
    const [metrics, setMetrics] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDimensionChange = (event) => {
        setDimensions(event.target.value);
    };

    const handleMetricsChange = (event) => {
        setMetrics(event.target.value);
    };

    return (
        <Box display="flex" flexWrap="wrap" alignItems="center" gap={2} p={2}>
            <FormControl sx={{ width: 300 }}>
                <InputLabel id="dimensions-label">Select the Dimensions</InputLabel>
                <Select
                    labelId="dimensions-label"
                    value={dimensions}
                    onChange={handleDimensionChange}
                    label="Select the Dimensions"
                    multiple
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Dimension 1</MenuItem>
                    <MenuItem value={20}>Dimension 2</MenuItem>
                    <MenuItem value={30}>Dimension 3</MenuItem>
                    <MenuItem value={40}>Dimension 4</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ width: 300 }}>
                <InputLabel id="metrics-label">Select the Metrics</InputLabel>
                <Select
                    labelId="metrics-label"
                    value={metrics}
                    onChange={handleMetricsChange}
                    label="Select the Metrics"
                    multiple
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Metric 1</MenuItem>
                    <MenuItem value={20}>Metric 2</MenuItem>
                    <MenuItem value={30}>Metric 3</MenuItem>
                    <MenuItem value={40}>Metric 4</MenuItem>
                </Select>
            </FormControl>

            <Box display="flex" alignItems="center" gap={2}>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    customInput={<TextField label="Start Date" variant="outlined" />}
                />
                <Box sx={{ mx: 2 }}> to </Box>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                    customInput={<TextField label="End Date" variant="outlined" />}
                />
            </Box>

            <Button variant="contained" color="primary">
                Filter
            </Button>
        </Box>
    );
};

export default FilterComponent;
