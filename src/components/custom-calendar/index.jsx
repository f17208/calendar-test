import React, { useState, useEffect } from 'react';

import {
  Box,
  Grid, 
  IconButton,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { format, isPast, addDays, startOfISOWeek } from 'date-fns'

import { useDispatch, useSelector } from 'react-redux';
import {
  incrementCurrentWeek,
  decrementCurrentWeek,
  selectAvailabilities,
  selectCurrentDate,
  setCurrentDate,
  sagaActions,
} from '../../store/calendar';

import {
  ArrowForwardIos,
  ArrowBackIos,
} from '@mui/icons-material';
import { dateToKey } from '../../utils/availabilities';

export function CustomCalendar() {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectCurrentDate);
  const availabilities = useSelector(selectAvailabilities);

  const [openAlert, setOpenAlert] = useState(false);

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const disableDecrement = isPast(startOfISOWeek(currentDate));

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_AVAILABILITIES, payload: currentDate.getTime() });
  }, [dispatch, currentDate.getTime()]);

  const baseDate = startOfISOWeek(currentDate);

  const currentDateKey = dateToKey(currentDate);
  const currentDateAvailabilities = (availabilities[currentDateKey] || {})[currentDate.getDate()] || {}

  return (
    <Box width="100%" textAlign="center">
      <Box display="flex" alignItems="center" justifyContent="center">
      <IconButton
        color="primary"
        disabled={disableDecrement}
        aria-label="Decrement value"
        onClick={() => dispatch(decrementCurrentWeek())}
      >
        <ArrowBackIos />
      </IconButton>
      <span>
        {currentDate && `${format(currentDate, 'MMMM')} '${format(currentDate, 'yy')}`}
      </span>
      <IconButton
        color="primary"
        aria-label="Increment value"
        onClick={() => dispatch(incrementCurrentWeek())}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  
      <Box width="100%" pt={1}>
        <Grid container justifyContent="center" spacing={1}>
          {
            new Array(7).fill(0).map((_, i) => {
              const day = addDays(baseDate, i);
              const isPastDate = isPast(day);
              const dateKey = dateToKey(day);

              const dayAvailabilities = (availabilities[dateKey] || {})[day.getDate()]
              const noAvailabilities = Object.keys(dayAvailabilities || {}).length === 0;

              const disableDay = isPastDate || noAvailabilities;
              const bg = disableDay
                ? 'lightgray'
                : 'lightblue';

              const dayOfMonth = format(day, 'dd');
              const weekDay = format(day, 'eee');
              return <Grid item key={i}>
                <Box display="flex" flexDirection="column" rowGap={0.5}>
                  {
                    day.toISOString() === currentDate.toISOString()
                      ? <strong>{weekDay}</strong>
                      : weekDay

                  }
                  <button 
                    type="button" 
                    disabled={disableDay}
                    style={{ backgroundColor: bg }}
                    onClick={() => dispatch(setCurrentDate(day.getTime()))}
                  >
                    {
                      day.toISOString() === currentDate.toISOString()
                        ? <strong>{dayOfMonth}</strong>
                        : dayOfMonth
                      
                    }
                  </button>
                </Box>
                
              </Grid>
            })
          }
        </Grid>

        <Box pt={4} display="flex" justifyContent="center">
          <Grid container spacing={1} justifyContent="center">
            {Object.keys(currentDateAvailabilities)
              .map(hourSlot => {
                const disableSlot = !currentDateAvailabilities[hourSlot]
                const bg = disableSlot
                  ? 'lightgrey'
                  : 'green';

                return <Grid item xs={3} sm={1} key={hourSlot}>
                  <button
                    type="button"
                    disabled={disableSlot}
                    /** TODO: move inline style into proper css */
                    style={{ 
                      color: bg, 
                      border: 0, 
                      backgroundColor: 'transparent', 
                      cursor: disableSlot ? 'not-allowed' : 'pointer' 
                    }} 
                    onClick={() => handleOpenAlert()}
                  >
                    <strong>{hourSlot.replace('_', ':') + ' >'}</strong>
                  </button>
                  
                </Grid>
              })
            }

            {Object.keys(currentDateAvailabilities).length === 0 && (
              <Grid item xs={12}>
                <Typography>
                  Sorry, no data. Try changing day!
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>

        {/** TODO move this into separate component, improve style */}
        <Dialog
          open={openAlert}
          onClose={handleCloseAlert}
        >
          <DialogTitle id="alert-dialog-title">
            Hello
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              World
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAlert} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
    </Box>
    
  );
}

