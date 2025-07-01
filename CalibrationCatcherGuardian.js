// ==UserScript==
// @name         Isensix Calibration Catcher (Guardian)
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      4.0
// @description  Catch calibration mistakes for Isensix Guardian servers (3.0 support in Beta)
// @author       Leighton Solomon
// @match        https://*/arms2/calibration/calsensor.php*
// @match        https://*/arms/calsensor.php*
// @match        https://*/arms2/calsensor.php*
// @match        https://*/guardian/calibration/calsensor.php?id=*
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/CalibrationCatcherGuardian.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/CalibrationCatcherGuardian.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @grant        none
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `


//OFFSET CATCHING WILL NOT WORK WITHOUT A VALID SENSOR SERIAL NUMBER
//Works on Guardian 2.0, 2.1 and 3.0 Servers
//Will warn users when entering an offset outside the allowable range for RE, RM, SC, HU, DP, CO2, TC, and TMC. (assuming valid serial number, or Guardian 3.0)
//Will warn if no offset is given or an offset of exactly 0
//Will warn if no canned message is selected
//Will warn if there is not a canned message that meets the approved phrasing
//Will warn if you are calibrating a sensor that has already been calibrated in the past week


(function() {
    'use strict';

    let threePoint0 = false;
    try {//determine if the server is Guardian 3.0
        if(document.querySelector("#isemainmenu > li:nth-child(1) > a").title == "Guardian 3.0"){
            threePoint0 = true;
        }
    }
    catch(err){}

    const form = document.getElementById("calsen");
    const table = form.getElementsByTagName("table")[0];
    const d = table.getElementsByTagName("tr")[6];
    const d2 = table.getElementsByTagName("tr")[3];
    const serialObj = d.getElementsByTagName("td")[0];
    const dateObj = d2.getElementsByTagName("td")[0];
    const serial = serialObj.innerHTML; //full serial number here
    const date = dateObj.innerHTML; //last calibration date here
    let firstFour = serial.slice(0, 4).toLowerCase(); //get first four letters of sensor serial number, used to check sensor type
    var type = "";
    var allowOffset = 0;

    const parsed = Date.parse(date) / 1000; //get a unix timestamp of the last calibration date (javascript works with milliseconds since epoch)

        if(((Date.now() / 1000) - parsed) < 604800){ //compare current unix time to last calibration, 604800 = number of seconds in one week
            const dateWarning = document.createTextNode(" \u00A0 \u00A0 This sensor has been calibrated in the past week.");
            dateObj.style.color="#ff0000";
            dateObj.appendChild(dateWarning);
        }

    let dropdown = document.getElementById("slCalibrationCertificate"); //get cert information to determine if verify only, Guardian 2.1

    let selectedOption = "";

                try { //try to use guardian 2.1, if error uses 2.0
                    selectedOption = dropdown.options[dropdown.selectedIndex];
                }
                catch(err){
                    dropdown = document.getElementById("cacert"); //guardian 2.0
                    selectedOption = dropdown.options[dropdown.selectedIndex];
                }

                const cert = selectedOption.text;

    let threeType = "";

    if(threePoint0){
        threeType = document.querySelector("#tab-f6147c9c9b908be9b52803698be57ad2-1 > table:nth-child(1) > tbody > tr:nth-child(1) > td > em:nth-child(2)").innerHTML.toLowerCase();
        firstFour = threeType;
    }


    serialObj.style.color="#008000";

    if(firstFour.includes("re") || threeType == "re"){
        type = "RE";
        allowOffset = "±1.5°C";
    }
    else if(firstFour.includes("rm")){
        type = "RM";
        allowOffset = "±1.5°C";
    }
    else if(firstFour.includes("sc")){
        type = "SC";
        allowOffset = "±3°C";
    }
    else if(firstFour.includes("hu")){
        type = "HU";
        allowOffset = "±5%";
    }
    else if(firstFour.includes("tmc") || threeType.includes("tmc")){
        type = "TMC";
        allowOffset = "±4°C";
    }
    else if(firstFour.includes("co2")){
        type = "CO2";
        allowOffset = "±2%";
    }
    else if(firstFour.includes("o2")){
        type = "O2";
        allowOffset = "N/A";
    }
    else if(firstFour.includes("dp")){
        type = "DP";
        allowOffset = "±0.05%";
    }
    else if(firstFour.includes("tc")){
        type = "TC";
        allowOffset = "±2°C";
    }
    else if((firstFour.includes("4to2")) || (firstFour.includes("bi")) || (cert == "N/A") || (firstFour.includes("da")) || (firstFour.includes("mpm"))){
        type = "VerifyOnly";
        allowOffset = "N/A";
    }
    else{
        type = "UNKNOWN FROM SERIAL";
        allowOffset = "?";
        serialObj.style.color="#ff0000";
    }

    const sensorText = document.createTextNode(" \u00A0 \u00A0 Sensor Type Detected: " + type + "  \u00A0 \u00A0 \u00A0 Allowed Offset: " + allowOffset);

    if(!threePoint0){
        serialObj.appendChild(sensorText);
    }


    const checkBoxes = document.getElementsByName("cmsg[]"); //get the list of canned messages
    let canSelected = false;


    const BTN_CHECK = document.getElementById("BTN_CHECK");
    let firstClick = true;
    let failed = false;
    let replaced = false;
    let correctCannedFail = false;
    let correctCannedProper = false;
    let correctCannedReplaced = false;

    BTN_CHECK.addEventListener("click", (event) => { //wait for user to click sensor calibrated button

        for(var i = 0; i < checkBoxes.length; i++){ //go through all canned messages and make sure you have selected at least one, check failure, and check correct type of failure message
            if(checkBoxes[i].parentElement.textContent.trim().toLowerCase() == "sensor failed calibration/verification, needs to be replaced."){
                correctCannedFail = true;
            }
            if(checkBoxes[i].parentElement.textContent.trim().toLowerCase() == "proper functionality has been verified."){
                correctCannedProper = true;
            }
            if(checkBoxes[i].parentElement.textContent.trim().toLowerCase() == "replaced sensor."){
                correctCannedReplaced = true;
            }

            if(checkBoxes[i].checked){
                canSelected = true;
                if(checkBoxes[i].parentElement.textContent.trim().toLowerCase().includes("failed")){
                    failed = true;
                    console.log("Sensor failed.");
                }
                if(checkBoxes[i].parentElement.textContent.trim().toLowerCase().includes("sensor replaced") || checkBoxes[i].parentElement.textContent.trim().toLowerCase().includes("replaced sensor")){
                    replaced = true;
                    console.log("Sensor replaced.");
                }
            }
        }


        const offset = document.getElementById("offset").value; //get value of offset entered
        if(!failed){

            if(firstClick && (type == "RE" || type == "RM") && (offset >= 1.5 || offset <= -1.5)){
                alert("Warning: The offset entered (" + offset + ") is greater than or equal to the allowable offset for RE/RM (±1.5°C)");
                event.preventDefault();
                firstClick = false;
            }
            else if(firstClick && (type == "SC") && (offset >= 3 || offset <= -3)){
                alert("Warning: The offset entered (" + offset + ") is greater than or equal to the allowable offset for SC (±3°C)");
                event.preventDefault();
                firstClick = false;
            }
            else if(firstClick && (type == "HU") && (offset >= 5 || offset <= -5)){
                alert("Warning: The offset entered (" + offset + ") is greater than or equal to the allowable offset for HU (±5%)");
                event.preventDefault();
                firstClick = false;
            }
            else if(firstClick && (type == "TMC") && (offset >= 4 || offset <= -4)){
                alert("Warning: The offset entered (" + offset + ") is greater than or equal to the allowable offset for TMC (±4°C)");
                event.preventDefault();
                firstClick = false;
            }
            else if(firstClick && (type == "DP") && (offset >= 0.05 || offset <= -0.05)){
                alert("Warning: The offset entered (" + offset + ") is greater than or equal to the allowable offset for DP (±0.05%)");
                event.preventDefault();
                firstClick = false;
            }
            else if(firstClick && (type == "CO2") && (offset >= 2 || offset <= -2)){
                alert("Warning: The offset entered (" + offset + ") is greater than or equal to the allowable offset for CO2 (±2%)");
                event.preventDefault();
                firstClick = false;
            }
            else if(firstClick && (type == "TC") && (offset >= 2 || offset <= -2)){
                alert("Warning: The offset entered (" + offset + ") is greater than or equal to the allowable offset for TC (±2°)");
                event.preventDefault();
                firstClick = false;
            }
            else if(firstClick && (offset == 0 || offset === "") && (type != "VerifyOnly")){
                alert("Warning: Please make sure you have entered an offset and try to refrain from offsets of exactly 0. Disregard this message if the sensor is only being Verified.");
                event.preventDefault();
                firstClick = false;
            }
            else if(firstClick && (type == "UNKNOWN FROM SERIAL") && (offset >= 5 || offset <= -5)){
                alert("Warning: The offset entered (" + offset + ") is greater than or equal to the allowable offset for any sensor type.");
                event.preventDefault();
                firstClick = false;
            }
        }

        if(firstClick && (!canSelected)){
            alert("Please make sure you select a Canned Message.");
            event.preventDefault();
            firstClick = false;
        }
        if(firstClick && !correctCannedProper){
            alert("A correct canned message was not found for proper functionality. Please create a canned message that is EXACTLY \"Proper functionality has been verified.\"");
            event.preventDefault();
            firstClick = false;
        }
        if(firstClick && !correctCannedFail && failed){
            alert("A correct canned message was not found for failing a sensor. Please create a canned message that is EXACTLY \"Sensor failed calibration/verification, needs to be replaced.\"");
            event.preventDefault();
            firstClick = false;
        }
        if(firstClick && !correctCannedReplaced && replaced){
            alert("A correct canned message was not found for replacing a sensor. Please create a canned message that is EXACTLY \"Replaced sensor.\"");
            event.preventDefault();
            firstClick = false;
        }

    });


})();
