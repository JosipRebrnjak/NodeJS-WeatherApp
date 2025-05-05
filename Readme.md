# San Francisco Weather Auto Report

This utility automates the process of collecting and emailing a weather report for San Francisco, using Make/N8N-compatible JSON APIs.

## Features

- Fetches dynamic weather and public holiday data
- Handles 429 API rate limits with retry logic
- Aggregates:
  - Max / Min / Avg temperature
  - "Sky" conditions and their counts
  - Rain shower times
  - Sky conditions during holidays
- Sends formatted email to recipient


##  Setup Instructions

1.Download this repository. 
2.Open project and create .env file. There is .env.example which u can use as a example. This app is made for gmail implementation. For that u need "EMAIL_PASS" which is a key u get on https://myaccount.google.com/apppasswords.
3.After u configured your .env file u should install your app with Setup.bat. 

## Starting application

After sucessfully setting up your app u can start it with Run.bat. Ctrl+c for shutting down.


### 1. Clone & install dependencies (For more controlled starting -> developers)

git clone https://github.com/JosipRebrnjak/node-weather-auto-report.git
cd node-weather-auto-report
npm install

npm run build

npm start


# TS commands

## If u need to just transpile your ts 
npx tsc 