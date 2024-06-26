import { Typography } from '@mui/material';
import { colors } from 'constants/colors';
import React from 'react'

const DateRangeOption = ({ children, onClick, sx }) => {
  return (
    <Typography
      sx={{
        ":hover": {
          cursor: "pointer"
        },
        padding: "0.4rem 0rem",
        color: colors.primary,
        ...sx
      }}
      variant="subtitle1"
      onClick={onClick}
    >
      {children}
    </Typography>
  );
};

export default DateRangeOption;
