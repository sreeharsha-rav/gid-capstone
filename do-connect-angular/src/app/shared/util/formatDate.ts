/*
 * This function takes a date string and returns a formatted date string.
 * The formatted date string is the difference between the input date and the current date.
 * The difference is in years, months, days, hours, minutes, or seconds.
 * If the difference is more than 1, the function returns the plural form of the time unit.
 * If the difference is 1, the function returns the singular form of the time unit.
 * If the difference is 0, the function returns "just now".
 */
export const formatDate = (date: string): string => {
    const currentDate = new Date();
    const inputDate = new Date(date);
  
    const seconds = Math.floor((currentDate.getTime() - inputDate.getTime()) / 1000);
  
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }