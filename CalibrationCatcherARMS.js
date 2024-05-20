// ==UserScript==
// @name         Isensix Calibration Catcher (ARMS)
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      1.7
// @description  Catch calibration mistakes for Isensix ARMS servers
// @author       Leighton Solomon
// @match        https://*/arms/admin/sensorcal.php
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/CalibrationCatcherARMS.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/CalibrationCatcherARMS.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @grant        none
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `


//WILL NOT WORK WITHOUT A VALID SENSOR SERIAL NUMBER
//Will warn users when entering an offset outside the allowable range for RE, RM, SC, HU, DP, CO2, and TMC. (assuming valid serial number)
//Will warn if no offset is given or an offset of exactly 0.
//Will warn if no canned message is selected


(function() {
    'use strict';

    const table = document.getElementsByTagName("table")[4];
    const d = table.getElementsByTagName("tr")[6];
    const serialObj = d.getElementsByClassName("sinfodesc")[0];
    const serial = serialObj.innerHTML.trim(); //full serial number here
    const firstFour = serial.slice(0, 4).toLowerCase(); //get first two letters of sensor serial number, used to check sensor type
    var type = "";
    var allowOffset = 0;


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
    else if((firstFour.includes("4to2")) || (firstFour.includes("bin"))){
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


    const checkBoxes = document.querySelectorAll('input[type=checkbox]');
    let canSelected = false;


    const BTN_CHECK = document.getElementsByName("submit")[2];

    BTN_CHECK.addEventListener("click", (event) => { //wait for user to Set Sensor Offset button

        const offset = document.getElementsByName("newoffset")[0].value; //get value of offset entered

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
