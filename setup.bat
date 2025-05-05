@echo off
echo Installing dependencies...
npm install

echo Running the build...
npm run build

echo Setup complete. You can now run the app with "npm start" or use "run.bat".
pause