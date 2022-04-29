import React from 'react';

import {
  Grid,
  Box,
} from '@mui/material';

import { PersonalDetails } from '../personal-details'
import { CustomCalendar } from '../custom-calendar'

export function MainPage() {

  return (
    <Box pt={1}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PersonalDetails
            fullName="Maurizio Calcagno"
            stars={4.3}
            totReviews={24}
            verifiedAtDate={new Date("2019-04-24")}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomCalendar />
        </Grid>
      </Grid>
    </Box>
  );
}
