import { call, takeEvery, put } from 'redux-saga/effects';
import { setAvailabilities, setLoading } from './slice';
import { getCalendarAvailability } from '../../api/calendar';

export const sagaActions = {
  FETCH_AVAILABILITIES: 'FETCH_AVAILABILITIES',
};

export function* fetchAvailabilitiesSaga({ payload }) {
  yield put(setLoading(true));
  const result = yield call(getCalendarAvailability, new Date(payload));
  yield put(setAvailabilities(result.data));
  yield put(setLoading(false));
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_AVAILABILITIES, fetchAvailabilitiesSaga);
}
