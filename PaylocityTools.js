// ==UserScript==
// @name         Paylocity QOL Scripts
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      0.7
// @description  WIP: Adds a button to autofill Per Diem, autofill Monday through Friday hours on time sheet
// @author       Leighton Solomon
// @match        https://app.paylocity.com/Expense/dashboardV2/reports/edit/*
// @match        https://webtime2.paylocity.com/webtime/Employee/Timesheet
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/refs/heads/main/PaylocityTools.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/refs/heads/main/PaylocityTools.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=paylocity.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if((document.URL).includes("Timesheet")){ //AUTOFILL WEEKDAYS WITH 8 HOURS ===============================================================
        let appendTo = document.getElementById("TimesheetCallToActions");
        let butt=document.createElement("button");
        butt.innerHTML="Fill Weekdays";

            butt.addEventListener("click", (event) => {
                event.preventDefault(); // Prevents the default action

                let days = document.getElementsByClassName("day  last-row ");

                for (let i = 0; i < 2; i++) {
                    for(let i = 0; i < days.length; i++){

                        console.log(days[i]);

                        let dayOfWeek = days[i].querySelector("td.day > div > a:nth-child(1)");

                        if((dayOfWeek.innerHTML != "Saturday") && (dayOfWeek.innerHTML != "Sunday")){
                            let dayId = days[i].id.match(/\d+/g);

                            if(document.getElementById("TimeSheet_" + dayId + "_").className != "day  last-row readonly"){

                                let dropdown = document.getElementById("TimeSheet_" + dayId + "__Entries_0__PayTypeId");
                                dropdown.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

                                //console.log("DayId: " + dayId);
                                //console.log("dayOfWeek: " + dayOfWeek.innerHTML);

                                // Wait a short time to mimic user interaction, then set the value
                                setTimeout(() => {
                                    dropdown.focus();
                                    dropdown.value = '-1'; // Set to Work
                                    dropdown.dispatchEvent(new Event('change', { bubbles: true }));
                                    const optionToClick = dropdown.querySelector('option[value="-1"]');
                                    optionToClick.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                                    let startTime = document.getElementById("TimeSheet_" + dayId + "__Entries_0__StartTime");
                                    startTime.value = "08:00 AM";
                                    let startLunch = document.getElementById("TimeSheet_" + dayId + "__Entries_0__StartLunchTime");
                                    startLunch.value = "12:00 PM";
                                    let endLunch = document.getElementById("TimeSheet_" + dayId + "__Entries_0__EndLunchTime");
                                    endLunch.value = "12:30 PM";
                                    let endTime = document.getElementById("TimeSheet_" + dayId + "__Entries_0__EndTime");
                                    endTime.value = "04:30 PM";
                                }, 100); // delay
                            }
                        }
                    }
                }

            });

        appendTo.appendChild(butt);

    }//==============================================================================================================================
    else if((document.URL).includes("Expense")){

    }

})();
