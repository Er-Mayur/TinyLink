// Format date - backend sends IST times as YYYY-MM-DD HH24:MI:SS strings
export const formatDateIST = (dateString) => {
  if (!dateString) return 'Never';
  
  try {
    // Backend sends: "2025-11-21 14:30:45"
    // Parse manually to avoid timezone reinterpretation
    const parts = dateString.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
    
    if (!parts) {
      return dateString;
    }
    
    const [, year, month, day, hours, minutes, seconds] = parts;
    
    // Create a date in IST (don't let JS convert it)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = months[parseInt(month) - 1];
    
    // Convert to 12-hour format
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour % 12 || 12;
    
    return `${parseInt(day)} ${monthName} ${year} at ${String(displayHour).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
  } catch (err) {
    console.error('Date formatting error:', err);
    return dateString;
  }
};

// Format date to short format (for tables)
export const formatDateISTShort = (dateString) => {
  if (!dateString) return 'Never';
  
  try {
    // Backend sends: "2025-11-21 14:30:45"
    const parts = dateString.match(/(\d{4})-(\d{2})-(\d{2})/);
    
    if (!parts) {
      return dateString;
    }
    
    const [, year, month, day] = parts;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = months[parseInt(month) - 1];
    
    return `${parseInt(day)} ${monthName} ${year}`;
  } catch (err) {
    console.error('Date formatting error:', err);
    return dateString;
  }
};
