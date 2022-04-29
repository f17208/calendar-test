import { startOfISOWeek, endOfISOWeek } from 'date-fns';

import { dateToKey } from '../utils/availabilities';

const freeSlots = {
  '032022': {
    6: {
      '09_00': true,
      '09_15': false,
      '09_30': true,
      '09_45': false,
    },
    7: {},
    8: {
      '09_00': true,
      '09_15': false,
      '09_30': true,
      '09_45': false,
    },
  },
  '052022': {
    1: {
      '09_00': false,
      '09_15': true,
      '09_30': true,
      '09_45': false,
    },
    2: {},
    3: {
      '09_00': true,
      '09_15': false,
      '09_30': true,
      '09_45': false,
    },
  },
};

export function getCalendarAvailability(date, delay = 1000) {
  const dateToKey1 = dateToKey(startOfISOWeek(date));
  const dateToKey2 = dateToKey(endOfISOWeek(date));

  const data1 = freeSlots[dateToKey1] || {};
  const data2 = freeSlots[dateToKey2] || {};
  const data = {
    [dateToKey1]: data1,
    [dateToKey2]: data2,
  };

  return new Promise((resolve) => setTimeout(() => resolve({ data }), delay));
}
