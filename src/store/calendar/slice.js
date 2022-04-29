import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { addDays, startOfISOWeek, endOfISOWeek } from 'date-fns';
import { getCalendarAvailability } from '../../api/calendar';

const initialCalendarState = {
  currentDate: startOfISOWeek(new Date()).getTime(),
  availabilities: {},
};

export const fetchCalendarAvailability = createAsyncThunk(
  'calendar/fetchCalendarAvailability',
  async (date) => {
    const response = await getCalendarAvailability(date);
    return response.data;
  },
);

// used static properties as enum
export class CalendarStatus {
  static idle = 'idle';

  static loading = 'loading';
}

export const counterSlice = createSlice({
  name: 'calendar',
  initialState: initialCalendarState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    incrementCurrentWeek: (state) => {
      state.currentDate = addDays(
        startOfISOWeek(new Date(state.currentDate)),
        7,
      ).getTime(); // must be serializable
    },
    decrementCurrentWeek: (state) => {
      state.currentDate = addDays(
        endOfISOWeek(new Date(state.currentDate)),
        -7,
      ).getTime(); // must be serializable
    },
    setCurrentDate: (state, { payload }) => {
      state.currentDate = payload;
    },
    setLoading: (state, { payload }) => {
      state.status = payload ? CalendarStatus.loading : CalendarStatus.idle;
    },
    setAvailabilities: (state, { payload }) => {
      state.availabilities = payload;
    },
  },
});

export const {
  incrementCurrentWeek,
  decrementCurrentWeek,
  setLoading,
  setAvailabilities,
  setCurrentDate,
} = counterSlice.actions;

export const selectCurrentDate = (state) => new Date(state.calendar.currentDate);
export const selectAvailabilities = (state) => state.calendar.availabilities;

export default counterSlice.reducer;
