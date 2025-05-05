// Interfaces for type safety
export interface WeatherEntry {
    date: string;
    degrees_in_celsius: number;
    sky: string;
    times_of_rain_showers: string | null;
  }
  
export interface HolidayEntry {
    date: string;
    name: string;
  }