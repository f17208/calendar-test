import React from 'react';
import { format } from 'date-fns'

import {
  Avatar,
  Typography,
  Box,
} from '@mui/material';

import {
  AccountCircle,
} from '@mui/icons-material';

export function PersonalDetails({
  fullName, 
  verifiedAtDate,
  stars, 
  totReviews,
}) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box pr={2}>
        <Avatar style={{ width: 64, height: 64 }}>
          <AccountCircle style={{ width: '100%', height: '100%' }} />
        </Avatar>
      </Box>
      
      <Box>
        <Typography variant="h6">
          {fullName}
        </Typography>
        <Typography variant="subtitle1">
          ✅ Verificato il {format(verifiedAtDate, 'dd MMMM yy')} {/** TODO: set locale */}
        </Typography>
        <Typography variant="subtitle1">
          ★ {stars} / {totReviews} recensioni
        </Typography>
      </Box>
    </Box>
  );
}
