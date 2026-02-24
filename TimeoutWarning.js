// ==UserScript==
// @name         Warning on Unconfirmed Calibration and Timezone Mismatch
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      1.6
// @description  Will warn if you have sat on the calibration confirmation page for too long without confirming, will warn if server Timezone does not match system time, will prevent idle logout (WIP)
// @author       Leighton Solomon
// @match        https://*/arms2/calibration/calsensor.php*
// @match        https://*/arms/calsensor.php*
// @match        https://*/guardian/calibration/calsensor.php*
// @match        https://*/arms2/calsensor.php*
// @match        https://*/arms/admin/index.php?mode=11&id=*
// @match        https://*/arms2/index.php*
// @match        https://*/arms2/iserep1.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/TimeoutWarning.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/TimeoutWarning.js
// @grant        window.focus
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `

let arms = false;
    try { //determine if the system is ARMS or Guardian
        if(document.getElementsByClassName("headline2")[0].innerHTML == "(Advanced Remote Monitoring System)"){
        console.log("ARMS server detected");
        arms = true;
        }
    }
    catch(err){}

let twoPointZero = false;
    try { //determine if the system is Guardian 2.1 or 2.0
        if((document.getElementsByClassName("ICO_DISCONNECT")[0].innerHTML == "Sign me off") || (document.querySelector("#guardian-bar-wp-logo > a").title == "Guardian 2.0")){
            console.log("Guardian 2.0 server detected");
            twoPointZero = true;
        }
    }
    catch(err){}

let threePoint0 = false;
    try {//determine if the server is Guardian 3.0
        if(document.querySelector("#isemainmenu > li:nth-child(1) > a").title == "Guardian 3.0"){
            threePoint0 = true;
        }
    }
    catch(err){}


function alertWarning() {
    window.focus();
    alert("Make sure you confirm this calibration before it times out!");
}

(function() {
    'use strict';


    if((document.URL).endsWith('/calsensor.php')){
    //wait 3 minutes
        const timeToWait = 180000; //in miliseconds
        setTimeout(function(){ alertWarning(); }, timeToWait);
    }
    else if((document.URL).includes('calsensor.php?') || (document.URL).includes('?mode=11&id=')){ //check if server timezone matches system time
        let serverTime = null;
        let serverTimeAndTimezone = null;
        let regex = /(\d{2}:\d{2}:\d{2} [A-Za-z]+)/;

        if(twoPointZero){ //Guardian 2.0
            let uinfo = document.querySelector("#uinfo").innerHTML;
            // Match the pattern in the string
            serverTime = uinfo.match(regex);
            serverTimeAndTimezone = serverTime[0];
        }
        else if(arms){
            let uinfo = document.querySelector("#arms_menu_2 > tbody > tr > td:nth-child(1)").innerHTML;
             serverTime = uinfo.match(regex);
             serverTimeAndTimezone = serverTime[0];
        }


        else{
            serverTime = document.querySelector("#primary_nav_wrap > ul > li:nth-child(11) > a");
            if(serverTime){
                serverTime = serverTime.text.replace(/\.$/, ""); //Guardian 2.1
            }
            else{
                serverTime = document.querySelector("#servertime").innerHTML; //Guardian 3.0
                console.log(serverTime);
            }
            serverTimeAndTimezone = serverTime;
        }

        if (serverTime) {

            // Extract the timezone from the server time string (last 3 characters)
            const serverTimezone = serverTimeAndTimezone.slice(-3);
            console.log("ServerTimeZone" + serverTimezone);

            // Mapping of common timezone abbreviations to full timezone names
            const timezoneMap = {
                "CST": "America/Chicago",
                "PST": "America/Los_Angeles",
                "EST": "America/New_York",
                "MST": "America/Denver",
            };

            // Get the user's system timezone
            const userTimezone = new Intl.DateTimeFormat().resolvedOptions().timeZone;

            // Look up the full timezone name based on the server's abbreviation
            const fullServerTimezone = timezoneMap[serverTimezone];

            if (fullServerTimezone) {
                console.log(`Server timezone: ${fullServerTimezone}`);
                console.log(`User system timezone: ${userTimezone}`);

                // Compare timezones
                if (fullServerTimezone != userTimezone) {
                    console.log("The user is NOT in the same timezone as the server.");
                    const warningText = `Warning: This server timezone is ${fullServerTimezone}, but your system timezone is ${userTimezone}`;
                    const warningSpan = document.createElement("span");
                    warningSpan.textContent = warningText;
                    warningSpan.style.color = "red";
                    if(arms){
                        var table = document.querySelector("#sensor_menu_start_1 > tbody > tr > td:nth-child(2) > form > table:nth-child(2)");
                        var newRow = table.insertRow();
                        // Create empty cell
                        var cell1 = newRow.insertCell();
                        cell1.innerHTML = ""; // Leave the first column empty

                        var cell2 = newRow.insertCell();
                        cell2.colSpan = 5;
                        cell2.innerHTML = warningText;
                        cell2.style.color = "red";
                        cell2.style.padding = "10px";
                        cell2.style.fontWeight = "bold";
                        cell2.style.textAlign = "center";

                    }
                    else{
                        let div = document.getElementById("outer");
                        if(threePoint0){
                            div = document.getElementById("isxmain");
                        }
                        else{
                             div.style.marginTop = "20px";
                        document.getElementById("body").style.marginTop = "10px";
                        }
                       
                        div.prepend(warningSpan);
                    }
                }
            } else {
                console.log("The server's timezone abbreviation is not in the timezone map.");
            }
        } else {
            console.log("No time and timezone found.");
        }

    }

    //PREVENT IDLE LOG OUT ON GUARDIAN 2.1
    //===========================================================================================
    if(!twoPointZero){
        let idlePreventionEnabled = GM_getValue("idlePreventionEnabled", true); // Load saved state, default ON

        function disableIdleHandler() {
            if (typeof jQuery !== 'undefined') {
                console.log("Tampermonkey script running - Idle logout prevention engaged");

                // Prevent installIdleHandler from reattaching events
                window.installIdleHandler = function() {
                    if (idlePreventionEnabled) {
                        console.log("Blocked installIdleHandler");
                    }
                };

                // Function to remove idle detection if it was re-added
                function checkAndRemoveIdleHandler() {
                    if (!idlePreventionEnabled) return; // Skip if disabled

                    if (typeof idleHandlerCallback === 'function' && $(document).data("idleHandlerActive") !== false) {
                        console.log("Idle handler detected, removing...");

                        $(document).off("mousedown", idleHandlerCallback);
                        $(document).off("mouseup", idleHandlerCallback);
                        $(document).off("scroll", idleHandlerCallback);

                        $(document).data("idleHandlerActive", false);
                        console.log("Idle handler removed.");
                    }
                }

                // Monitor for reinstallation and remove when necessary
                const observer = new MutationObserver(() => {
                    if (idlePreventionEnabled && typeof idleHandlerCallback === 'function' && $(document).data("idleHandlerActive") !== false) {
                        checkAndRemoveIdleHandler();
                    }
                });

                observer.observe(document, { childList: true, subtree: true });

                // Prevent idle timeout from logging you out
                window.setTimeout = new Proxy(window.setTimeout, {
                    apply: function(target, thisArg, argumentsList) {
                        if (idlePreventionEnabled && argumentsList[1] > 60000) { // Blocks long timeouts
                            console.log("Blocked forced logout timeout");
                            return;
                        }
                        return Reflect.apply(target, thisArg, argumentsList);
                    }
                });

                console.log(`Idle logout prevention ${idlePreventionEnabled ? "enabled" : "disabled"} (persistent).`);
                if(!(document.URL).includes('iserep1')){
                    addToggleButton(); // Add the toggle button
                }
            } else {
                console.log("jQuery not available yet. Retrying...");
                setTimeout(disableIdleHandler, 500);
            }
        }

        function addToggleButton() {
            if (document.getElementById("idleToggleBtn")) return; // Prevent duplicate buttons

            const button = document.createElement("button");
            button.id = "idleToggleBtn";
            updateButtonState(button);

            //button.style.position = "fixed";
            button.style.top = "5px";
            button.style.right = "5px";
            //button.style.zIndex = "9999";
            button.style.padding = "5px";
            button.style.color = "white";
            button.style.border = "none";
            button.style.cursor = "pointer";
            button.style.fontSize = "12px";
            button.style.borderRadius = "3px";

            button.onclick = function() {
                idlePreventionEnabled = !idlePreventionEnabled;
                GM_setValue("idlePreventionEnabled", idlePreventionEnabled); // Save state
                updateButtonState(button);
                console.log(`Idle logout prevention is now ${idlePreventionEnabled ? "ENABLED" : "DISABLED"} (saved).`);
            };
            let append = document.getElementsByClassName("noprint flex_nav")[0];

            append.prepend(button);
        }

        function updateButtonState(button) {
            button.textContent = idlePreventionEnabled ? "Enable Idle Logout" : "Disable Idle Logout";
            button.style.backgroundColor = idlePreventionEnabled ? "#4CAF50" : "#f44336";
        }

        disableIdleHandler();
    }
    //===========================================================================================


})();
