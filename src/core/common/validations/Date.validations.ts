/**
 * @function Weekend
 * @param date day to calculate
 * @returns { Boolean }
 */

export const Weekend = (date: Date) => {
  const dayNum: number = new Date(date).getDay();
  if (dayNum == 0 || dayNum == 6) {
    return true;
  } else {
    return false;
  }
};

export const ValidateSunday = (date: Date) => {
  const dayNum: number = new Date(date).getDay();
  if (dayNum == 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * @function validateHour validate hour
 * @param time
 * @returns { Boolean }
 */
const validateHour = (time: Date) => {
  const OPEN_HOUR = 8;
  const CLOSE_HOUR = 16;

  const now: Date = new Date();

  const open: Date = new Date(now);
  open.setHours(OPEN_HOUR);

  const close: Date = new Date(now);
  close.setHours(CLOSE_HOUR);

  const hour: number = new Date(time).getHours();

  const time1: Date = new Date(now);
  time1.setHours(hour);

  if (time1 >= open && time1 <= close) {
    return true;
  }

  return false;
};

/**
 * @function Hours
 * @param date time to calculate
 * @returns { Boolean }
 */
export const Hours = (date: Date) => {
  const validateH: boolean = validateHour(date);

  if (validateH) {
    return true;
  } else {
    return false;
  }
};
