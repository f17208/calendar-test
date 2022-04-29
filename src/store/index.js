import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import calendarReducer from './calendar/slice';
import calendarSaga from './calendar/saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({ thunk: true })
      .concat(sagaMiddleware)
  ),
});

sagaMiddleware.run(calendarSaga);

export default store;
