// ==UserScript==
// @name         Paylocity QOL Scripts
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      0.9
// @description  WIP: Adds a button to autofill Per Diem, autofill Monday through Friday hours on time sheet
// @author       Leighton Solomon
// @match        https://app.paylocity.com/Expense/dashboardV2/reports*
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

                        //console.log(days[i]);

                        let dayOfWeek = days[i].querySelector("td.day > div > a:nth-child(1)");

                        if((dayOfWeek.innerHTML != "Saturday") && (dayOfWeek.innerHTML != "Sunday")){
                            let dayId = days[i].id.match(/\d+/g);

                            if(document.getElementById("TimeSheet_" + dayId + "_").className != "day  last-row readonly"){

                                let dropdown = document.getElementById("TimeSheet_" + dayId + "__Entries_0__PayTypeId");

                                if(dropdown.value != 5){

                                    dropdown.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

                                    //console.log("DayId: " + dayId);
                                    //console.log("dayOfWeek: " + dayOfWeek.innerHTML);
                                    //console.log("Dropdown value: " + dropdown.value);

                                    // Wait a short time to mimic user interaction, then set the value
                                    setTimeout(() => {
                                        dropdown.focus();
                                        dropdown.value = '-1'; // Set to Work
                                        dropdown.dispatchEvent(new Event('change', { bubbles: true }));
                                        const optionToClick = dropdown.querySelector('option[value="-1"]');
                                        if(optionToClick){
                                            optionToClick.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                                            let startTime = document.getElementById("TimeSheet_" + dayId + "__Entries_0__StartTime");
                                            startTime.value = "08:00 AM";
                                            let startLunch = document.getElementById("TimeSheet_" + dayId + "__Entries_0__StartLunchTime");
                                            startLunch.value = "12:00 PM";
                                            let endLunch = document.getElementById("TimeSheet_" + dayId + "__Entries_0__EndLunchTime");
                                            endLunch.value = "12:30 PM";
                                            let endTime = document.getElementById("TimeSheet_" + dayId + "__Entries_0__EndTime");
                                            endTime.value = "04:30 PM";
                                        }
                                    }, 100); // delay
                            }
                        }
                        }
                    }
                }

            });

        appendTo.appendChild(butt);

    }//==============================================================================================================================
    else if((document.URL).includes("Expense")){
        // Wait for the create expense button to load
        const waitForButton = new Promise((resolve) => {
            const checkButtonInterval = setInterval(() => {
                const button = document.querySelector("#create-expense");
                if (button) {
                    clearInterval(checkButtonInterval); // Stop checking
                    resolve(button);
                }
            }, 100); // Check every 100 milliseconds
        });

        // Handle the sequence of events
        waitForButton.then((button) => {
            console.log("Create Expense Button loaded");

            // Add a click event listener to the button
            button.addEventListener("click", () => {
                console.log("Create Expense clicked");

                // Wait for 2 seconds after the button is clicked
                setTimeout(() => {
                    console.log("Waiting for the textbox to load...");

                    // Wait for the textbox to load
                    const waitForTextbox = new Promise((resolve) => {
                        const checkTextboxInterval = setInterval(() => {
                            const textbox = document.querySelector("#merchantEdit"); // Replace with your textbox's selector
                            if (textbox) {
                                clearInterval(checkTextboxInterval); // Stop checking
                                resolve(textbox);
                            }
                        }, 100); // Check every 100 milliseconds
                    });

                    waitForTextbox.then((textbox) => {
                        console.log("Textbox loaded:", textbox);

                        // Add an event listener to the textbox
                        textbox.addEventListener("input", () => {
                            if (textbox.value.includes("Per Diem")) {
                                /*document.querySelector("#notesEdit").value = "Isensix Field Per Diem";
                                document.querySelector("#payment-edit").value = "Personal Expense Incurred - Personal CC/Cash (reimbursable)";
                                document.querySelector("#category-edit").value = "Meal - Self";*/
                                // Example usage after detecting "Per Diem"
if (textbox.value.includes("Per Diem")) {
    setInputValue("#notesEdit", "Isensix Field Per Diem");
    setInputValue("#payment-edit", "Personal Expense Incurred - Personal CC/Cash (reimbursable)");
    setInputValue("#category-edit", "Meal - Self");
}
                                const simulateTyping = (input, text) => {
    input.focus();
    input.value = ""; // Clear the field first
    text.split("").forEach((char) => {
        input.value += char; // Add each character
        input.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true }));
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true }));
    });
    input.dispatchEvent(new Event("change", { bubbles: true }));
};

const input = document.querySelector("#payment-edit");
if (input) {
    simulateTyping(input, "Personal Expense Incurred - Personal CC/Cash (reimbursable)");
}

const observeField = (selector, value) => {
    const target = document.querySelector(selector);
    if (target) {
        const observer = new MutationObserver(() => {
            if (target.value !== value) {
                target.value = value;
                target.dispatchEvent(new Event("input", { bubbles: true }));
                target.dispatchEvent(new Event("change", { bubbles: true }));
                console.log("Value re-applied:", value);
            }
        });

        observer.observe(target, { attributes: true, childList: true, subtree: true });
    }
};

observeField("#payment-edit", "Personal Expense Incurred - Personal CC/Cash (reimbursable)");



                            }
                        });
                    });
                }, 2000); // Wait 2 seconds
            });
        });
    }//==============================================================================================================================

})();

const setInputValue = (selector, value) => {
    const input = document.querySelector(selector);
    if (input) {
        // Set the value programmatically
        input.value = value;

        // Dispatch input and change events for framework compatibility
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
        console.log(`Value set for ${selector}: ${value}`);
    } else {
        console.log(`Element not found: ${selector}`);
    }
};
