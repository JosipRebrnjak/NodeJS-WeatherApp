
import { WeatherEntry, HolidayEntry } from './types'; 

// Function for generation of email text
export function generateEmailText(weather: WeatherEntry[], holidays: HolidayEntry[]): string {
  const temps = weather.map(w => w.degrees_in_celsius).filter(temp => !isNaN(temp));
  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);
  const avgTemp = average(temps).toFixed(2);

  // Sky counts
  const skyCounts: Record<string, number> = {};
  for (const w of weather) {
    skyCounts[w.sky] = (skyCounts[w.sky] || 0) + 1;
  }

  // Rain times
  const rainTimes: string[] = [];
  for (const w of weather) {
    if (w.times_of_rain_showers && w.times_of_rain_showers.length > 0) {
      rainTimes.push(...w.times_of_rain_showers.split(',').map(time => `${w.date} ${time}`));
    }
  }

  // Holiday skies
  const holidaySet = new Set(holidays.map(h => h.date));
  const holidaySkies: Record<string, string> = {};
  for (const w of weather) {
    if (holidaySet.has(w.date)) {
      holidaySkies[w.date] = w.sky;
    }
  }

  
  return `
Hi,

Here are your San Francisco weather stats for 2022-11:

- The max temperature was: ${maxTemp}
- The avg temperature was: ${avgTemp}
- The min temperature was: ${minTemp}

Overview of unique "sky" values and their counts:
${formatSkyCounts(skyCounts)}

Rain showers:
${formatRainTimes(rainTimes)}

"Sky" statuses during holidays:
${formatHolidaySkies(holidaySkies)}

Have a nice day!
  `.trim();
}

// Helper functions to calculate average, format output, etc.
function average(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function formatSkyCounts(skyCounts: Record<string, number>): string {
  return Object.entries(skyCounts)
    .map(([sky, count]) => `- ${sky}: ${count} times`)
    .join('\n');
}

function formatRainTimes(rainTimes: string[]): string {
  return rainTimes.length > 0
    ? rainTimes.map(t => `- ${t}`).join('\n')
    : "No rain showers recorded.";
}

function formatHolidaySkies(holidaySkies: Record<string, string>): string {
  const entries = Object.entries(holidaySkies);
  return entries.length > 0
    ? entries.map(([date, sky]) => `- ${date}: ${sky}`).join('\n')
    : "No holiday weather data.";
}