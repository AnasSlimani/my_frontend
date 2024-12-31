
export function calculateDuration(startDate, endDate) {
    // Parse the input dates
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Check if the dates are valid
    if (isNaN(start) || isNaN(end)) {
      return "Invalid date(s) provided.";
    }
  
    // Calculate the difference in milliseconds
    const diffInMilliseconds = end - start;
  
    // Convert milliseconds to days
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  
    // Return the duration
    return diffInDays >= 0 ? diffInDays : "End date must be after start date.";
  }
 
  
  // Example Usage
//   const startDate = "2024-12-01"; // Replace with user input
//   const endDate = "2024-12-10"; // Replace with user input
  
//   const duration = calculateDuration(startDate, endDate);
//   console.log(`Duration: ${duration} day(s)`);
  