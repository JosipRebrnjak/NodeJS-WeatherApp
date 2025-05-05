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

---

##  Setup Instructions

Download this repository. Open project and run batch scripts in this order:

1. Setup.bat
2. Run.bat


### 1. Clone & install dependencies (For more controlled starting -> developers)

git clone https://github.com/JosipRebrnjak/node-weather-auto-report.git
cd node-weather-auto-report
npm install

npm run build

npm start


# TS commands

## If u need to just transpile your ts 
npx tsc 