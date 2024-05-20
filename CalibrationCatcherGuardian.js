// ==UserScript==
// @name         Isensix Calibration Catcher (Guardian)
// @namespace    http://tampermonkey.net/
// @version      2.91
// @description  Catch calibration mistakes for Isensix Guardian servers
// @author       Leighton Solomon
// @match        https://*/arms2/calibration/calsensor.php*
// @match        https://*/arms/calsensor.php*
// @match        https://*/arms2/calsensor.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @grant        none
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `


//OFFSET CATCHING WILL NOT WORK WITHOUT A VALID SENSOR SERIAL NUMBER
//Works on Guardian 2.0 and 2.1 Servers
//Will warn users when entering an offset outside the allowable range for RE, RM, SC, HU, DP, CO2, TC, and TMC. (assuming valid serial number)
//Will warn if no offset is given or an offset of exactly 0
//Will warn if no canned message is selected
//Will warn if you are calibrating a sensor that has already been calibrated in the past week


(function() {
    'use strict';

    const form = document.getElementById("calsen");
    const table = form.getElementsByTagName("table")[0];
    const d = table.getElementsByTagName("tr")[6];
    const d2 = table.getElementsByTagName("tr")[3];
    const serialObj = d.getElementsByTagName("td")[0];
    const dateObj = d2.getElementsByTagName("td")[0];
    const serial = serialObj.innerHTML; //full serial number here
    const date = dateObj.innerHTML; //last calibration date here
    const firstFour = serial.slice(0, 4).toLowerCase(); //get first four letters of sensor serial number, used to check sensor type
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



    serialObj.style.color="#008000";

    if(firstFour.includes("re")){
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
    else if(firstFour.includes("tmc")){
        type = "TMC";
        allowOffset = "±4°C";
    }
    else if(firstFour.includes("co2")){
        type = "CO2";
        allowOffset = "±2%";
    }
    else if(firstFour.includes("dp")){
        type = "DP";
        allowOffset = "±0.05%";
    }
    else if(firstFour.includes("tc")){
        type = "TC";
        allowOffset = "±2°C";
    }
    else if((firstFour.includes("4to2")) || (firstFour.includes("bi")) || (cert == "N/A")){
        type = "VerifyOnly";
        allowOffset = "N/A";
    }
    else{
        type = "UNKNOWN FROM SERIAL";
        allowOffset = "?";
        serialObj.style.color="#ff0000";
    }

    const sensorText = document.createTextNode(" \u00A0 \u00A0 Sensor Type Detected: " + type + "  \u00A0 \u00A0 \u00A0 Allowed Offset: " + allowOffset);

    serialObj.appendChild(sensorText);


    const checkBoxes = document.getElementsByName("cmsg[]"); //get the list of canned messages
    let canSelected = false;


    const BTN_CHECK = document.getElementById("BTN_CHECK");

    BTN_CHECK.addEventListener("click", (event) => { //wait for user to click sensor calibrated button

        const offset = document.getElementById("offset").value; //get value of offset entered

        if((type == "RE" || type == "RM") && (offset >= 1.5 || offset <= -1.5)){
            alert("Warning: The offset entered (" + offset + ") is greater than or equal to the allowable offset for RE/RM (±1.5°C)");
        }
        else if(type == "SC" && (offset >= 3 || offset <= -3)){
            alert("Warning: The offset entered (" + offset + ") is greater than or equal to the allowable offset for SC (±3°C)");
        }
        else if(type == "HU" && (offset >= 5 || offset <= -5)){
            alert("Warning: The offset entered (" + offset + ") is greater than or equal to the allowable offset for HU (±5%)");
        }
        else if(type == "TMC" && (offset >= 4 || offset <= -4)){
            alert("Warning: The offset entered (" + offset + ") is greater than or equal to the allowable offset for TMC (±4°C)");
        }
        else if(type == "DP" && (offset >= 0.05 || offset <= -0.05)){
            alert("Warning: The offset entered (" + offset + ") is greater than or equal to the allowable offset for DP (±0.05%)");
        }
        else if(type == "CO2" && (offset >= 2 || offset <= -2)){
            alert("Warning: The offset entered (" + offset + ") is greater than or equal to the allowable offset for CO2 (±2%)");
        }
        else if(type == "TC" && (offset >= 2 || offset <= -2)){
            alert("Warning: The offset entered (" + offset + ") is greater than or equal to the allowable offset for TC (±2°)");
        }
        else if((offset == 0 || offset === "") && (type != "VerifyOnly")){
            alert("Warning: Please make sure you have entered an offset and try to refrain from offsets of exactly 0. Disregard this message if the sensor is only being Verified.");
        }


        for(var i = 0; i < checkBoxes.length; i++){ //go through all canned messages and make sure you have selected at least one
            if(checkBoxes[i].checked){
                canSelected = true;
            }
        }

        if(!canSelected){
            alert("Please make sure you select a Canned Message.");
        }


    });


})();
