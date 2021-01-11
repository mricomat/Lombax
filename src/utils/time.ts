import {
  addDays,
  format,
  getYear,
  isValid,
  parse,
  setYear,
  addYears,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  isPast,
  isFuture,
  isToday,
  differenceInCalendarDays,
  differenceInMinutes,
  differenceInSeconds,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";

export type dateParam = Date | string | number;
export enum formatString {
  ddmmyyyy = "dd/MM/yyyy",
  dmyyyy = "d/M/yyyy",
  myyyy = "M/yyyy",
  yyyyMd = "yyyy-M-d",
  MMMMdyyyy = "MMMM d, yyyy",
  MMMMyyyy = "MMMM yyyy",
  MMMMd = "MMMM d",
  MMMd = "MMM d",
  MMMddyyyyhmmaaaa = "MMM dd, yyyy h:mm aaaa",
  MMMddyyyy = "MMM dd. yyyy",
  yyyy = "yyyy",
  MMMM = "MMMM",
}
export const today = new Date();
export const tomorrow = addDays(today, 1);
export const up18 = addYears(today, -18);
/**
 * checks if date is valid
 * @param {Date} d date to format
 * @returns {Date | false} date or false
 */
export const parseDefaultDate = (d?: dateParam): Date | false => {
  if (d) {
    const date = new Date(d);
    if (isValid(date)) return date;
  }
  return false;
};
/**
 * checks if date is valid
 * @param {Date} d date to format
 * @returns {Date | false} date or false
 */
export const parseDateOrCurrent = (d: dateParam): Date => {
  const date = parseDefaultDate(d);
  return date || new Date();
};
/**
 * converts string to a valid date https://date-fns.org/v2.0.0-alpha.25/docs/parse
 * @param {string} date date to format
 * @param {string} formatString date structure
 * @param {Date | number | undefined} baseDate default Date to fill empty values
 */
export const parseDate = (
  date: string,
  formatStringp = formatString.ddmmyyyy,
  baseDate?: Date | number
): Date | false => {
  const result = parse(date, formatStringp, baseDate || today);
  return isValid(result) ? result : false;
};
/**
 * get the year of a valid Date/parseable to date or current year if no param passed
 */
export const getCurrentYear = (date?: dateParam): number => {
  return getYear(parseDefaultDate(date) || today);
};
/**
 * change year with a new one
 * @param {Date | string | number} d a valid Date or parseable to date
 * @param {Date | false}  date with new year or false if not a valid date
 */
export const setDateYear = (d: dateParam, year: number): Date | false => {
  const date = parseDefaultDate(d);
  return date ? setYear(date, year) : false;
};
/**
 * generate Date with GTM +0
 */
export const generateDateGTM0 = (...params: [number, number, number?, number?, number?, number?]): Date => {
  return new Date(Date.UTC(...params));
};
/**
 * formats a date parsable prop  to a string date, yyyy-M-d by default
 * @param {Date} d date to format
 * @param {string} formatString date structure
 * @returns {string} date formated as 'dd/MM/yyyy'
 */
export const dateToString = (d: dateParam, formatStringp = formatString.yyyyMd): string => {
  const date = parseDefaultDate(d);
  return date ? format(date, formatStringp, { locale: es }) : "";
};
export const addDaysToDate = (date: dateParam, amount: number) => {
  const d = parseDefaultDate(date);
  return d ? addDays(d, amount) : date;
};
export const addYearsToDate = (date: dateParam, amount: number) => {
  const d = parseDefaultDate(date);
  return d ? addYears(d, amount) : date;
};
export const setTimeTo0 = (date: any) => {
  const d = parseDefaultDate(date);
  if (!d) return date;
  return setMilliseconds(setSeconds(setMinutes(setHours(d, 0), -d.getTimezoneOffset()), 0), 0);
};
export const getTimeISOshort = (date?: Date) => {
  return setTimeTo0(date)?.toISOString().split("T")[0];
};
export const getDateUTC = (date: string, formatStringp = formatString.MMMMdyyyy) => {
  return format(parseISO(date.split("T")[0]), formatStringp);
};
export const isFutureDate = (date?: Date, includeToday?: boolean) => {
  if (!date) return false;
  if (includeToday) return !isPast(date);
  return isFuture(date);
};
export const howManyDaysAgo = (date: string, dateTwo: dateParam = new Date()): number => {
  return differenceInCalendarDays(new Date(date), new Date(dateTwo));
};
export const howManyMinutesAgo = (date: string, dateTwo: dateParam = new Date()): number => {
  if (date === null) return 0;
  return differenceInMinutes(new Date(dateTwo), new Date(date));
};
export const howManySecondsAgo = (date: string, dateTwo: dateParam = new Date()): number => {
  if (date === null) return 0;
  return differenceInSeconds(new Date(dateTwo), new Date(date));
};
export const idDateToday = (date: dateParam): boolean => {
  const d = parseDefaultDate(date);
  return d ? isToday(d) : false;
};
export const getTimeDiferencie = (first: dateParam, second: dateParam) => {
  const date1 = parseDefaultDate(first);
  const date2 = parseDefaultDate(second);
  return date1 && date2 ? new Date(date1).getTime() - new Date(date2).getTime() : 0;
};
