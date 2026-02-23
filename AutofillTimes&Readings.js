// ==UserScript==
// @name         Autofill Calibration Times and Readings (ARMS, G2.0, G2.1, G3.0)
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      1.7
// @description  Will automatically input the current time into the times for your readings and update them dynamically, Autofills second two readings based on first. Works on ARMS, G2.0, G2.1, and G3.0
// @author       Leighton Solomon
// @match        https://*/arms/admin/index.php*mode=11*
// @match        https://*/arms2/calibration/calsensor.php*
// @match        https://*/arms/calsensor.php*
// @match        https://*/arms2/calsensor.php*
// @match        https://*/guardian/calibration/calsensor.php?id=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/refs/heads/main/AutofillTimes%26Readings.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/refs/heads/main/AutofillTimes%26Readings.js
// @grant GM_getValue
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `

const url = document.URL;

let arms = 0;

    try { //determine if the system is ARMS or Guardian
        if((document.getElementsByClassName("headline2")[0].innerHTML == "(Advanced Remote Monitoring System)")){
            arms = 1;
            console.log("ARMS detected");

        }
    }
    catch(err){}

            let time1box = document.getElementsByName("time[0]")[0];
            let time2box = document.getElementsByName("time[1]")[0];
            let time3box = document.getElementsByName("time[2]")[0];

            let reading1box = document.getElementsByName("temp[0]")[0];
            let reading2box = document.getElementsByName("temp[1]")[0];
            let reading3box = document.getElementsByName("temp[2]")[0];

let twoPointZero = 0;
    try { //determine if the system is Guardian 2.1 or 2.0
        if(document.getElementsByClassName("ICO_DISCONNECT")[0].innerHTML == "Sign me off"){
            twoPointZero = 1;
            console.log("Guardian 2.0 Detected");
        }
    }
    catch(err){}

let threePoint0 = false;
    try {//determine if the server is Guardian 3.0
        if(document.querySelector("#isemainmenu > li:nth-child(1) > a").title == "Guardian 3.0"){
            threePoint0 = true;
            console.log("3.0 Detected");
        }
    }
    catch(err){}



(async () => {
    'use strict';

        if (performance.navigation.type === 2) {
            console.log("Page loaded from cache, script will not run.");
            return; // Do not run
        }

    if(arms == 1){
        if((document.URL).includes("&certs=1")){
            return;
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
    }




})();

if(arms == 1){ //ARMSSSSSS
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
}

else if(twoPointZero == 1){ //Guardian 2.0

   /* const lastCalTime = localStorage.getItem("lastCal1");
    let now = new Date(lastCalTime);

    const actualNow = new Date();

    let diff = actualNow - now;
    let diffInMinutes = diff / 1000 / 60;
    */


    let counter = 0; // number of extra boxes filled
    let boxes = [];

    // Format as MM/DD/YYYY HH:mm
    const pad = (n) => n.toString().padStart(2, '0');
    function formatDate(date) {
        return `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }


    // Update all boxes relative to the first one
    function updateLinkedTimes() {
        if (boxes.length === 0) return;
        const firstBox = boxes[0];
        if (!firstBox.value) return;


            //let minutes = now.getMinutes() + 1;

        let baseDate = new Date(firstBox.value);

        /*if (diffInMinutes < 30) {
            let baseDate = new Date(formatDate(lastCalTime));
            //firstBox.value = lastCalTime;
        }*/

        if (isNaN(baseDate)) return; // invalid date typed in

        for (let i = 1; i < boxes.length; i++) {
            let newTime = new Date(baseDate.getTime() + i * 60000); // +1 min each

            boxes[i].value = formatDate(newTime);
        }
    }

    // --- Step 1: Auto-click "Now" button first time it appears
    function clickNowButton() {
        const btn = document.querySelector('button.ui-datepicker-current[data-handler="today"]');
        if (btn) {
            console.log("Clicking 'Now' button...");
            btn.click();

            // Wait for the first box to populate
            setTimeout(() => {
                boxes = Array.from(document.querySelectorAll('tr#reading input.date'));
                if (boxes.length > 0) {
                    console.log("Captured first box:", boxes[0]);

                    // Attach listener so edits to first box update others
                    boxes[0].addEventListener("input", updateLinkedTimes);
                }
            }, 200);
            return true;
        }
        return false;
    }

    // --- Step 2: Watch for new rows being added
    const rowObserver = new MutationObserver(() => {
        const newBoxes = Array.from(document.querySelectorAll('tr#reading input.date'));
        if (newBoxes.length > boxes.length) {
            boxes = newBoxes;
            counter = boxes.length - 1;
            console.log("New row added, total boxes:", boxes.length);

            updateLinkedTimes(); // auto-fill with updated times
        }
    });

    rowObserver.observe(document.body, { childList: true, subtree: true });

    // --- Step 3: Watch for "Now" button once
    const btnObserver = new MutationObserver(() => {
        //if (diffInMinutes < 30){
            if (clickNowButton()) {
                btnObserver.disconnect();
            }
        /*}
        else{
            boxes[0].value =
            //put last caltime + 1 minute
        }*/

    });

    btnObserver.observe(document.body, { childList: true, subtree: true });

    // In case it's already there
    clickNowButton();


}

else if(threePoint0){ //Guardian 3.0 (WIP)    ======================================================================================

        (function() {
  // Helper function to safely get an input once it's available
  function waitForSelector(selector, callback) {
    const el = document.querySelector(selector);
    if (el) return callback(el);
    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        observer.disconnect();
        callback(el);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  const firstSelector = "#readings > tr:nth-child(1) > td:nth-child(2) > input";
  const secondSelector = "#readings > tr:nth-child(2) > td:nth-child(2) > input";
  const thirdSelector = "#readings > tr:nth-child(3) > td:nth-child(2) > input";

  waitForSelector(firstSelector, first => {
    // When the first changes, copy to the second (once it exists)
      let sensType = document.querySelector("#tab-f6147c9c9b908be9b52803698be57ad2-1 > table:nth-child(1) > tbody > tr:nth-child(1) > td > em:nth-child(2)").innerHTML;
       if((sensType != "DP.25") && (sensType != "CO2_A_20")){
          document.getElementsByClassName("ar p100 textInput")[0].step = 0.1;
       }
    first.addEventListener("input", () => {
      waitForSelector(secondSelector, second => {

          if((sensType != "DP.25") && (sensType != "CO2_A_20")){
                document.getElementsByClassName("ar p100 textInput")[1].step = 0.1; //fix step value cause why would we want 0.0001
          }

        second.value = first.value;
        triggerRealisticInput(second);
      });
    });
  });

  waitForSelector(secondSelector, second => {
    // When the second changes, copy to the third (once it exists)
    second.addEventListener("input", () => {
      waitForSelector(thirdSelector, third => {
          let sensType = document.querySelector("#tab-f6147c9c9b908be9b52803698be57ad2-1 > table:nth-child(1) > tbody > tr:nth-child(1) > td > em:nth-child(2)").innerHTML;
           if((sensType != "DP.25") && (sensType != "CO2_A_20")){
                document.getElementsByClassName("ar p100 textInput")[2].step = 0.1;
           }

        third.value = second.value;
        triggerRealisticInput(third);
      });
    });
  });
})();

    function triggerRealisticInput(el) { //page doesnt detect script input so pretend we're human
  el.dispatchEvent(new Event("focus", { bubbles: true }));
  el.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "1" }));
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
  el.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true, key: "1" }));
  el.dispatchEvent(new Event("blur", { bubbles: true }));
}


}
else{ //Guardian 2.1 (WIP)       ======================================================================================

    let counter = 0; // number of extra boxes filled
    let boxes = [];

    // Format as MM/DD/YYYY HH:mm
    const pad = (n) => n.toString().padStart(2, '0');
    function formatDate(date) {
        return `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }


    // Update all date/time boxes relative to the first one
    function updateLinkedTimes() {
        if (boxes.length === 0) return;
        const firstBox = boxes[0];
        if (!firstBox.value) return;


            //let minutes = now.getMinutes() + 1;

        let baseDate = new Date(firstBox.value);

        /*if (diffInMinutes < 30) {
            let baseDate = new Date(formatDate(lastCalTime));
            //firstBox.value = lastCalTime;
        }*/

        if (isNaN(baseDate)) return; // invalid date typed in

        for (let i = 1; i < boxes.length; i++) {
            let newTime = new Date(baseDate.getTime() + i * 60000); // +1 min each

            boxes[i].value = formatDate(newTime);
        }

        //Click calculate buttons
        const buttons = document.querySelectorAll('input[type="button"][value="Calculate"], button');

        // Filter in case some <button> elements just show text
        const calculateButtons = Array.from(buttons).filter(btn => {
            return btn.value === "Calculate" || btn.textContent.trim() === "Calculate";
        });

        // Click the first three, if they exist
        for (let i = 0; i < 3 && i < calculateButtons.length; i++) {
            calculateButtons[i].click();
        }
    }

    function updateLinkedReadings() {

    }

    // --- Step 1: Auto-click "Now" button first time it appears
    function clickNowButton() {
        const btn = document.querySelector('button.ui-datepicker-current[data-handler="today"]');
        if (btn) {
            console.log("Clicking 'Now' button...");
            btn.click();

            // Wait for the first box to populate
            setTimeout(() => {
                boxes = Array.from(document.querySelectorAll('tr#reading input.date'));
                if (boxes.length > 0) {
                    console.log("Captured first box:", boxes[0]);

                    // Attach listener so edits to first box update others
                    boxes[0].addEventListener("input", updateLinkedTimes);
                }
            }, 200);
            return true;
        }
        return false;
    }

    // --- Step 2: Watch for new rows being added
    const rowObserver = new MutationObserver(() => {
        const newBoxes = Array.from(document.querySelectorAll('tr#reading input.date'));
        if (newBoxes.length > boxes.length) {
            boxes = newBoxes;
            counter = boxes.length - 1;
            console.log("New row added, total boxes:", boxes.length);

            updateLinkedTimes(); // auto-fill with updated times
        }
    });

    rowObserver.observe(document.body, { childList: true, subtree: true });

    // --- Step 3: Watch for "Now" button once
    const btnObserver = new MutationObserver(() => {
        //if (diffInMinutes < 30){
            if (clickNowButton()) {
                btnObserver.disconnect();
            }
        /*}
        else{
            boxes[0].value =
            //put last caltime + 1 minute
        }*/

    });

    btnObserver.observe(document.body, { childList: true, subtree: true });

    // In case it's already there
    clickNowButton();


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
