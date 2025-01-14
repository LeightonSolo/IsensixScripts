# **Leighton’s Tools**


Leighton’s Tools is a collection of scripts that run via the Tampermonkey browser extension. The scripts add features, prevent mistakes, and improve efficiency of the Isensix Calibration process.

  
   

**Scripts Breakdown:**
------------------------


- [CalibrateButtonsOnLiveView.js](/CalibrateButtonsOnLiveView.js) - Adds a calibration button to every sensor on the Isensix Live view page, will work on all ARMS and Guardian servers.
- [LastCalibrationsTable.js](/LastCalibrationsTable.js) - Shows the last 5 calibrations you've done, useful to prevent meter time overlap and keep track of what you've done.
- [CalibrationCatcherGuardian.js](/CalibrationCatcherGuardian.js) - For Isensix Guardian servers, the user is notified for out of range or empty offsets, no canned message selection, and if the sensor was already calibrated in the past week.
- [CalibrationCatcherARMS.js](/CalibrationCatcherARMS.js) - For Isensix ARMS servers, the user is notified for out of range or empty offsets and if no canned message was selected.
- [certSelector.js](/certSelector.js) - Automatically selects the appropriate certificate based on sensor type and highlights certs that you upload for easier selection.
- [CalibratedCheckmarks.js](/CalibratedCheckmarks.js) - Shows which sensors have already been calibrated on the live view. This data only updates whenever the calibration overview, calibration summary, or arms debug query is viewed.
- [LatestCalibrationTimes.js](/LatestCalibrationTimes.js) - Tells latest calibration time on the calibration overview tab, Isensix Calibration Summary Tab, and ARMS Debug Query.
- [ARMSDebugQuery.js](/ARMSDebugQuery.js) - Creates a button on ARMS servers that when clicked will open, autofill query, and copy from debug_query.php.
- [CopySummaryGuardian.js](/CopySummaryGuardian.js) - Creates a button on Guardian servers that when clicked will automatically copy the text from the Isensix Calibration Summary to your clipboard.
- [AutocloseCalibrationTabs.js](/AutocloseCalibrationTabs.js) - Closes calibration tabs after a sensor is calibrated based on a user defined time. Can be disabled or changed with a slider on the calibration page. 
- [TimeoutWarning.js](/TimeoutWarning.js) - Will warn if you have sat on the calibration confirmation page for too long without confirming before the page times out.
- [AutofillTimes&Readings.js](/AutofillTimes&Readings.js) - (Work in Progress) Fills the time and reading automatically when calibrating a sensor, updates dynamically.

Other scripts not on this repository due to being very simple or unlikely to be updated:
- Automatically go back after Guardian 2.0 servers redirect you to the "Portal" page
- Debugging and testing scripts


**Download here:**
------------------------

**https://docs.google.com/document/d/1SPD0375j1HjBwO5maCj5_XXBmlDgxA0cy09b2oa6IgQ**


The download link will always be on the Reference tab of the Master Visualizer as well:
https://docs.google.com/spreadsheets/d/1u8KL70Zb6Rlg5_0BtO7IaNFMsbqpPpa7IraYfb1GTYA/


Repository with old script versions:
https://gist.github.com/LeightonSolo

