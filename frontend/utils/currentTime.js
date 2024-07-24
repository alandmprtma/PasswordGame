import axios from 'axios';

export async function getCurrentTimeFromAPI() {
  try {
    const response = await axios.get('http://worldtimeapi.org/api/timezone/Etc/UTC');
    const dateTime = new Date(response.data.utc_datetime);
    const hours = String(dateTime.getUTCHours()).padStart(2, '0');
    const minutes = String(dateTime.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  } catch (error) {
    console.error('Error fetching time from API:', error);
    return null;
  }
}