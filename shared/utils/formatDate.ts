import { 
  format, 
  formatDistanceToNow, 
  isToday,
  isYesterday,
  isTomorrow,
  parseISO 
} from 'date-fns';

/**
 * Parse input to Date object
 */
const parseDate = (date: string | number | Date): Date => {
  if (typeof date === 'string') {
    return parseISO(date);
  }
  if (typeof date === 'number') {
    return new Date(date);
  }
  return date;
};

/**
 * Format a date string or timestamp into a human-readable format
 * @param date - Date string, timestamp, or Date object
 * @param formatString - date-fns format string (default: 'MMM d, yyyy h:mm a')
 * @returns Formatted date string
 * 
 * @example
 * formatDate(new Date()) // "Nov 5, 2025 2:30 PM"
 * formatDate(Date.now(), 'yyyy-MM-dd') // "2025-11-05"
 * formatDate('2025-11-05', 'MMMM do, yyyy') // "November 5th, 2025"
 */
export const formatDate = (
  date: string | number | Date,
  formatString: string = 'MMM d, yyyy h:mm a'
): string => {
  const dateObj = parseDate(date);
  return format(dateObj, formatString);
};

/**
 * Get relative time string (e.g., "2 hours ago", "in 3 days")
 * @param date - Date string, timestamp, or Date object
 * @param addSuffix - Add "ago" or "in" suffix (default: true)
 * @returns Relative time string
 * 
 * @example
 * getRelativeTime(Date.now() - 3600000) // "about 1 hour ago"
 * getRelativeTime(Date.now() + 3600000) // "in about 1 hour"
 */
export const getRelativeTime = (
  date: string | number | Date,
  addSuffix: boolean = true
): string => {
  const dateObj = parseDate(date);
  
  // Special cases for common dates
  if (isToday(dateObj)) {
    return formatDistanceToNow(dateObj, { addSuffix });
  }
  if (isYesterday(dateObj)) {
    return 'yesterday';
  }
  if (isTomorrow(dateObj)) {
    return 'tomorrow';
  }
  
  return formatDistanceToNow(dateObj, { addSuffix });
};

/**
 * Calculate time remaining until a date
 * @param expiryTimestamp - Expiry timestamp in milliseconds
 * @returns Object with time remaining details
 * 
 * @example
 * const remaining = getTimeRemaining(Date.now() + 86400000);
 * console.log(remaining.formatted); // "1d 0h 0m 0s"
 * console.log(remaining.expired); // false
 */
export const getTimeRemaining = (expiryTimestamp: number) => {
  const now = Date.now();
  const diff = expiryTimestamp - now;

  if (diff <= 0) {
    return {
      expired: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      formatted: 'Expired'
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  let formatted = '';
  if (days > 0) {
    formatted = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else if (hours > 0) {
    formatted = `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    formatted = `${minutes}m ${seconds}s`;
  } else {
    formatted = `${seconds}s`;
  }

  return {
    expired: false,
    days,
    hours,
    minutes,
    seconds,
    formatted
  };
};

/**
 * Format date for display in droplink cards
 * @param date - Date string, timestamp, or Date object
 * @returns Formatted date string
 * 
 * @example
 * formatDropDate(new Date()) // "Nov 5, 2025"
 */
export const formatDropDate = (date: string | number | Date): string => {
  return formatDate(date, 'MMM d, yyyy');
};

/**
 * Format date for display with time
 * @param date - Date string, timestamp, or Date object
 * @returns Formatted date string with time
 * 
 * @example
 * formatDropDateTime(new Date()) // "Nov 5, 2025 at 2:30 PM"
 */
export const formatDropDateTime = (date: string | number | Date): string => {
  return formatDate(date, "MMM d, yyyy 'at' h:mm a");
};

/**
 * Check if a drop is expiring soon (within 1 hour)
 * @param expiryTimestamp - Expiry timestamp in milliseconds
 * @returns Boolean indicating if drop is expiring soon
 */
export const isExpiringSoon = (expiryTimestamp: number): boolean => {
  const remaining = getTimeRemaining(expiryTimestamp);
  return !remaining.expired && remaining.days === 0 && remaining.hours === 0 && remaining.minutes < 60;
};

/**
 * Check if a drop has expired
 * @param expiryTimestamp - Expiry timestamp in milliseconds
 * @returns Boolean indicating if drop has expired
 */
export const isExpired = (expiryTimestamp: number): boolean => {
  return Date.now() > expiryTimestamp;
};
