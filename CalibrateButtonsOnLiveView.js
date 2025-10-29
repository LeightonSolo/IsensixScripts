// ==UserScript==
// @name         Calibrate Buttons for Live View, ARMS and Guardian
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      5.21
// @description  Adds a Calibration button to every sensor on the Isensix Live view page, will work on all ARMS and Guardian servers, Exception buttons WIP
// @author       Leighton Solomon
// @match        https://*/arms2/index.php*
// @match        https://*/arms2/
// @match        https://*/arms/
// @match        https://*/arms/index.php*
// @match        https://*/guardian/index.php*
// @match        https://*/guardian/
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/CalibrateButtonsOnLiveView.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/CalibrateButtonsOnLiveView.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @grant        none
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `

let arms = 0;
    try { //determine if the system is ARMS or Guardian
        if(document.getElementsByClassName("headline2")[0].innerHTML == "(Advanced Remote Monitoring System)"){
        console.log("ARMS server detected");
        arms = 1;
        }
    }
    catch(err){}

let twoPointZero = 0;
    try { //determine if the system is Guardian 2.1 or 2.0
        if((document.getElementsByClassName("ICO_DISCONNECT")[0].innerHTML == "Sign me off") || (document.querySelector("#guardian-bar-wp-logo > a").title == "Guardian 2.0")){
            console.log("Guardian 2.0 server detected");
            twoPointZero = 1;
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

const url = document.URL;
let calUrl = "";
if(arms == 1){
    calUrl = url.slice(0, 38) + "admin/index.php?mode=11&id="; //sets to calibation mode for older ARMS servers
}
else if(url.slice(33, 38) == "arms/"){
   calUrl = url.slice(0, 38) + "calsensor.php?id=";
}
else if(twoPointZero == 1){ //sets calibration URL for Guardian 2.0
    calUrl = url.slice(0, 39) + "calsensor.php?id=";
}
else if(threePoint0 == 1){ //sets calibration URL for Guardian 3.0
    calUrl = url.slice(0, 42) + "calibration/calsensor.php?id=";
}
else{ //sets calibration URL for Guardian 2.1
    calUrl = url.slice(0, 39) + "calibration/calsensor.php?id=";
}

function openCalUrl(id, butt){
   window.open(calUrl + id);
    butt.style.backgroundColor = '#00e1ff'; //set color of button (to locate easier on live view)
}

(function() {
    'use strict';

    if(arms == 0){//if system is detected to be guardian
        if(threePoint0){ //G3.0
            let sensorList = document.getElementsByClassName("slnk"); //gets list of all sensors on the live view page

            const sensorList2 = document.getElementsByClassName("lvhead");

            for (let i = 0; i < sensorList.length; i++) {
                let id = sensorList[i].onclick.toString().slice(27, 42);
                //console.log(id);//gets the ID of the sensor from the html
                let butt=document.createElement("button");

                id = id.match(/(\d+)/)[0]; //gets only the digits from the sensor ID if it contains trailing ");"


                butt.innerHTML="Cal";

                butt.addEventListener("click", () => openCalUrl(id, butt));

                //sensorList2[i].appendChild(butt);

                let cell = document.createElement("td");
                // Get first row of table
                /*let row = sensorList2[i].rows[0];
                // Create new row if row doesn't exist
                if(!row) {
                    row = document.createElement("row");
                    sensorList2[i].appendChild(row);
                }*/
                                    //sensorList2[i].appendChild(butt);
                                                    sensorList[i].parentElement.parentElement.appendChild(butt);


                // Add button to sensor table cell
                //cell.appendChild(butt);
                //row.prepend(cell);
            }

        }
        else{ //G2.1 and G2.0

            let sensorList = document.getElementsByClassName("slnk poplink"); //gets list of all sensors on the live view page

            if (sensorList.length === 0){
                sensorList = document.getElementsByClassName("slnk "); //handle weird 2.0 servers that have a different class for sensor name
            }
            const sensorList2 = document.getElementsByClassName("mon");

            for (let i = 0; i < sensorList.length; i++) {
                let id = sensorList[i].onclick.toString().slice(33, 37); //gets the ID of the sensor from the html
                let butt=document.createElement("button");

                id = id.match(/(\d+)/)[0]; //gets only the digits from the sensor ID if it contains trailing ");"

                butt.innerHTML="Calibrate";

                butt.addEventListener("click", () => openCalUrl(id, butt));

                //sensorList2[i].appendChild(butt);

                let cell = document.createElement("td");
                // Get first row of table
                let row = sensorList2[i].rows[0];
                // Create new row if row doesn't exist
                if(!row) {
                    row = document.createElement("row");
                    sensorList2[i].appendChild(row);
                }
                // Add button to sensor table cell
                cell.appendChild(butt);
                row.prepend(cell);
            }
        }
    }
    else if(arms == 1){ //if system is detected to be ARMS

        const sensorList = document.getElementsByClassName("noul"); //gets list of all sensors on the live view page

        for (let i = 0; i < sensorList.length; i++) {
            //alert(sensorList[i].getAttribute("href").toString().slice(0, 12));
            if(sensorList[i].getAttribute("href").toString().slice(0, 12) == "sensordetail"){
                const id = sensorList[i].getAttribute("href").toString().slice(20, 23); //gets the ID of the sensor from the html
                let butt=document.createElement("button");

                butt.innerHTML="Calibrate";

                butt.addEventListener("click", () => openCalUrl(id, butt));

                sensorList[i].parentElement.parentElement.appendChild(butt); //adds calibrate button to parent table

            }
        }
    }

})();
