// ==UserScript==
// @name         Calibration Report Error Checking
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      1
// @description  Ensures canned messages correct, meter matches sensor type, and offset matches canned message (WIP) - ARMS, Guardian 2.0, 2.1, and 3.0
// @author       Leighton Solomon
// @match        https://*.isensix.com/cust/?id=*
// @match        https://*/arms2/full_calreport.php
// @match        https://*/guardian/full_calreport.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/calReportChecking.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/calReportChecking.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const rules = [ //rules for checking if meter matches sensor type
  {
    keywords: ["Humidity"],
    validValues: ["Vaisala"],
  },
  {
    keywords: ["RE", "RM", "TMC", "SC", "TC"],
    validValues: ["Oakton", "Fluke", "Digisense"],
  },
  {
    keywords: ["CO2_A_20"],
    validValues: ["Vaisala CO2", "ViaSensor"],
  },
  {
    keywords: ["DiffPress"],
    validValues: ["Dwyer"],
  },
];

let table = document.querySelector("body > div.page > table");

    if((document.URL).includes("guardian")){
       table = document.querySelector("body > div.page > div > table");
    }


// Define the text to search for (can be string or array of strings)
const requiredText = ["Proper functionality has been verified.", "Sensor failed calibration/verification, needs to be replaced.", "Replaced sensor.", "Sensor Disabled"];
// Loop through each row
for (let i = 1; i < table.rows.length; i++) {

  //===== Canned message checking ========================================
  let cell = table.rows[i].cells[12]; // column 13 = index 12
     if((document.URL).includes("guardian")){
         cell = table.rows[i].cells[13];
     }

  if (cell) {
    const text = cell.textContent || cell.innerText;
    if (!requiredText.some(t => text.includes(t))) {
       cell.style.backgroundColor = "red";
     }
  }
    //========================================================================

  //check meters match
  const row = table.rows[i];
  let typeCell = row.cells[4]; // column 5
  let meterCell = row.cells[13]; // column 14
  let statusCell = row.cells[12]; // column 13

   if((document.URL).includes("guardian")){
      typeCell = row.cells[5]; // column 6
      meterCell = row.cells[14]; // column 15
      statusCell = row.cells[13]; // column 14
   }



  if (!typeCell || !meterCell) continue; // Skip if cells are missing

  const statusText = statusCell.textContent.trim();
  if (statusText.includes("Sensor Disabled")) continue; // Skip disabled sensors

  const typeText = typeCell.textContent.trim();
  const meterText = meterCell.textContent.trim().toLowerCase();

    //console.log("Type", typeText, "-  Meter", meterText, "-  Status", statusText);

  // Find a rule where any keyword matches the type text
   const rule = rules.find(r =>
    r.keywords.some(k => typeText.includes(k))
  );

  if (rule && !rule.validValues.some(v => meterText.includes(v.toLowerCase()))) {
    // Highlight both cells if brand doesn't match expected
    typeCell.style.backgroundColor = "red";
    meterCell.style.backgroundColor = "red";
  }
}

})();
