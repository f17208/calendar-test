import { format } from 'date-fns';

export function dateToKey(date) {
  return format(date, 'MMyyyy');
}
