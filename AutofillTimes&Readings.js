// ==UserScript==
// @name         WIP Autofill Calibration Times and Readings (ARMS)
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      0.91
// @description  Will automatically input the current time into the times for your readings, currently just works for ARMS, will autofill second two readings based on first
// @author       Leighton Solomon
// @match        https://*/arms/admin/index.php*mode=11*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/refs/heads/main/AutofillTimes%26Readings.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/refs/heads/main/AutofillTimes%26Readings.js
// @grant GM_getValue
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `


let time1box = document.getElementsByName("time[0]")[0];
let time2box = document.getElementsByName("time[1]")[0];
let time3box = document.getElementsByName("time[2]")[0];

let reading1box = document.getElementsByName("temp[0]")[0];
let reading2box = document.getElementsByName("temp[1]")[0];
let reading3box = document.getElementsByName("temp[2]")[0];

(async () => {
    'use strict';

        if (performance.navigation.type === 2) {
            console.log("Page loaded from cache, script will not run.");
            return; // Do not run
        }

            const lastCalTime = localStorage.getItem("lastCal1");
            let now = new Date(lastCalTime);

            const actualNow = new Date();

            let diff = actualNow - now;
            let diffInMinutes = diff / 1000 / 60;
            //let minutes = now.getMinutes() + 1;


        if (diffInMinutes > 30) { //if more than 30 minutes in past, just use current time to calibrate
            now = new Date(actualNow.getTime() - 120000);
        }

            let time1 = convertTo4Digits(new Date(now.getTime() + 60000));
            let time2 = convertTo4Digits(new Date(now.getTime() + 120000));
            let time3 = convertTo4Digits(new Date(now.getTime() + 180000));

            time1box.value = time1;
            time2box.value = time2;
            time3box.value = time3;


})();

if (reading1box && reading2box && reading3box) {
            // Add an event listener to first reading
            reading1box.addEventListener('input', function () {
                reading2box.value = reading1box.value;
                reading3box.value = reading1box.value;
            });
            // Add an event listener to first time
            time1box.addEventListener('input', function () {
                time2box.value = convertTo4Digits(new Date(convertFrom4Digits(time1box.value).getTime() + 60000));
                time3box.value = convertTo4Digits(new Date(convertFrom4Digits(time1box.value).getTime() + 120000));

            });

            }

function convertTo4Digits(time){

 let formatted = time.toLocaleTimeString("en-GB");
    formatted = formatted.replace(/\d{2}$/, "");
    formatted = formatted.replace(/:/g, "");
    //console.log("Formatted: " + formatted);

    return formatted;
}

function convertFrom4Digits(time) {
  // Ensure the time string is in the correct format (e.g., "1230")
  if (!/^\d{4}$/.test(time)) {
    throw new Error("Invalid time format. Use 'HHMM'");
  }

  // Extract hours and minutes from 4 digit string
  const hours = parseInt(time.slice(0, 2), 10);
  const minutes = parseInt(time.slice(2), 10);

  // Create a new Date object for today
  const today = new Date();

  // Set the hours and minutes on the Date object
  today.setHours(hours, minutes, 0, 0);

  return today;
}
