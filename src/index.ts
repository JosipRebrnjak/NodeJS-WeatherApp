import * as dotenv from 'dotenv';
import axios from 'axios';
import { Command } from 'commander';
import { sendEmail, simpleEmailTest } from './emailService'; 
import { generateEmailText } from './emailTemplate'; 
import { WeatherEntry, HolidayEntry } from './types';

dotenv.config();

// Helper function for delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


// Main function to gather weather data and send email
async function main() {
  const weatherUrl = 'https://hook.eu2.make.com/7mfiayunbpfef8qlnielxli5ptoktz02';
  const holidayUrl = 'https://hook.eu2.make.com/76g53ebwgbestjsj1ikejbaicpnc5jro';

  try {
    const weather: WeatherEntry[] = await fetchWithRetry(weatherUrl);
    console.log('Weather Data:', weather); // Debug: Log the weather data
    const holidays: HolidayEntry[] = await fetchWithRetry(holidayUrl);
    console.log('Holiday Data:', holidays); // Debug: Log the holiday data

    // Generate email text
    const emailText = generateEmailText(weather, holidays);
    
    console.log(emailText);
    await sendEmail(emailText); 

  } catch (err: any) {
    console.error("Error:", err.message);
  }
}

// Helper function for fetching data with retry logic
async function fetchWithRetry(url: string, retries = 3, delay = 1000): Promise<any> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err: any) {
    if (retries > 0) {
      console.log(`Retrying... ${retries} attempts left.`);
      await sleep(delay);
      return fetchWithRetry(url, retries - 1, delay);
    }
    throw new Error(`Failed to fetch data from ${url}: ${err.message}`);
  }
}

// CLI Setup using commander.js
const program = new Command();

program
  .version('1.0.0')
  .description('Weather Report CLI')
  .option('-r, --run', 'Fetch and send weather report')
  .option('-t, --test-email', 'Send a test email')
  .parse(process.argv);

const options = program.opts();

// Test Email Logic
if (options.testEmail) {
  simpleEmailTest();
}

// Weather Report Logic
if (options.run) {
  main();
}
