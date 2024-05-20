// ==UserScript==
// @name         Calibrated Checkmarks for Live View, ARMS and Guardian
// @namespace    http://tampermonkey.net/
// @version      2.8
// @description  Shows which sensors have already been calibrated on the live view. This data only updates whenever the calibration overview, calibration summary, or arms debug query is viewed.
// @author       Leighton Solomon
// @match        https://*/arms2/index.php*
// @match        https://*/arms2/
// @match        https://*/arms/
// @match        https://*/arms/index.php*
// @match        https://*/arms/calreport.php?*
// @match        https://*/arms2/calibration/calreport.php*
// @match        https://*/arms2/calibration//calreport.php*
// @match        https://*/arms2/calsetup.php*
// @match        https://*/arms/calsetup.php*
// @match        https://*/arms2/iserep1.php*
// @match        https://*/arms/iserep1.php*
// @match        https://*/arms/debug/debug_query.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @grant GM_getValue
// @grant GM.setValue
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `

const url = document.URL;

let arms = 0;

if(url.includes("debug_query.php")){
   arms = 1;
   console.log("ARMS detected");
}

    try { //determine if the system is ARMS or Guardian
        if((document.getElementsByClassName("headline2")[0].innerHTML == "(Advanced Remote Monitoring System)")){
            arms = 1;
            console.log("ARMS detected");
        }
    }
    catch(err){}

let twoPointZero = 0;
    try { //determine if the system is Guardian 2.1 or 2.0
        if(document.getElementsByClassName("ICO_DISCONNECT")[0].innerHTML == "Sign me off"){
            twoPointZero = 1;
            console.log("Guardian 2.0 Detected");
        }
    }
    catch(err){}



(async function() {
    'use strict';

    var inputString = document.URL;
            var regex = /:(\d{4})/;
            var match = inputString.match(regex);

            if (match) {
                var server = match[1];
                server = server.slice(1); //will get the three digit server ID
            }

    if(arms == 1){ //ARMS

        if((document.URL).includes("/arms/calreport.php")){

            const table = document.getElementsByTagName("table")[6];
            let d = table.getElementsByTagName("tr")[14];
            let check = d.getElementsByTagName("td")[0];
            let sensorId = "";


            for(let j = 0; j < table.getElementsByTagName("tr").length; j++){
                try {
                    d = table.getElementsByTagName("tr")[j];
                    check = d.getElementsByTagName("td")[0];
                    if(check.innerHTML == "Sensor ID"){
                        sensorId = d.getElementsByTagName("td")[1].innerHTML;
                    }
                }
                catch(err){}

            }

            const report = document.getElementsByClassName("report")[0];
            const d2 = report.getElementsByTagName("tr")[4];
            const lastCal = d2.getElementsByTagName("td")[0];

            const parsed = Date.parse(lastCal.innerHTML) / 1000; //get a unix timestamp of the last calibration date (javascript works with milliseconds since epoch)

            if(((Date.now() / 1000) - parsed) < 604800){ //determine if sensor has been calibrated in past week
                //alert("past week");
                let storeName = server + "," + sensorId; //store the sensor as calibrated in the format of SERVER,SENSORID
                GM.setValue(storeName, true);
                console.log("Storing sensor as calibrated: " + storeName);
            }

        }
        else if((document.URL).includes("/debug_query.php")){ //store calibration data from ARMS Debug Query

            let table = document.getElementsByTagName("table")[0];
            let sensorId = "";

            // Get all the rows of the table
            let tableRows = table.querySelectorAll('tr');
            //tableRows.forEach(function(item, index) {
            //console.log('Item ' + index + ':', item);
            //});
            for (let i = 1; i < tableRows.length; i++) {
                // Get the date from the 11th td
                let dateSpan = tableRows[i].querySelector('td:nth-child(11)');

                const parsed = Date.parse(dateSpan.innerHTML) / 1000; //get a unix timestamp of the last calibration date (javascript works with milliseconds since epoch)

                if(((Date.now() / 1000) - parsed) < 604800){ //determine if sensor has been calibrated in past week
                    let sensorId = tableRows[i].querySelector('td:nth-child(1)').textContent;
                    let storeName = server + "," + sensorId; //store the sensor as calibrated in the format of SERVER,SENSORID
                    GM.setValue(storeName, true);
                    console.log("Storing sensor as calibrated: " + storeName);
                }
            }
        }
        else{ //live view on ARMS

            const sensorList = document.getElementsByClassName("noul"); //gets list of all sensors on the live view page

            for (let i = 0; i < sensorList.length; i++) {
                //alert(sensorList[i].getAttribute("href").toString().slice(0, 12));
                if(sensorList[i].getAttribute("href").toString().slice(0, 12) == "sensordetail"){
                    let id = sensorList[i].getAttribute("href").toString().slice(20, 23); //gets the ID of the sensor from the html
                    let storedName = server + "," + id;
                    let check = await GM.getValue(storedName);
                    console.log(check);

                    if(check){
                        let checkMark = document.createTextNode(' \u2713 Calibrated');
                        sensorList[i].parentElement.parentElement.style.fontSize = '11px';
                        sensorList[i].parentElement.parentElement.style.fontWeight = 'bold';
                        sensorList[i].parentElement.parentElement.prepend(checkMark); //adds checkmark to parent table
                        //alert("adding check");
                       }
                }
            }
        }
    }

    else if(twoPointZero == 1){ //GUARDIAN 2.0

        if((document.URL).includes("/calsetup.php")){

            const table = document.getElementsByTagName("table")[0];
            let sensorId = "";

            // Get all the rows of the table
            let tableRows = table.querySelectorAll('tr');
            //tableRows.forEach(function(item, index) {
            //console.log('Item ' + index + ':', item);
            //});
            for (let i = 1; i < tableRows.length; i++) {
                // Get the date from the second span tag
                let dateSpan = tableRows[i].querySelector('td span:nth-child(2)');

                const parsed = Date.parse(dateSpan.innerHTML) / 1000; //get a unix timestamp of the last calibration date (javascript works with milliseconds since epoch)

                if(((Date.now() / 1000) - parsed) < 604800){ //determine if sensor has been calibrated in past week
                //alert("past week");
                    let sensorId = tableRows[i].querySelector('td:nth-child(1)').textContent;
                    let storeName = server + "," + sensorId; //store the sensor as calibrated in the format of SERVER,SENSORID
                    GM.setValue(storeName, true);
                    console.log("Storing sensor as calibrated: " + storeName);
                }

            }

        }
        else if((document.URL).includes("/iserep1.php")){ //collect calibrated data from isensix calibration summary

            const table = document.getElementsByClassName("arms p100")[0];
            let sensorId = "";

            // Get all the rows of the table
            let tableRows = table.querySelectorAll('tr');

            //tableRows.forEach(function(item, index) {
            //    console.log('Item ' + index + ':', item);
            //});
            for (let i = 1; i < (tableRows.length); i++) {
                // Get the date from the table row
                let dateSpan = tableRows[i].querySelector('tr td:nth-child(11)');

                const parsed = Date.parse(dateSpan.innerHTML) / 1000; //get a unix timestamp of the last calibration date (javascript works with milliseconds since epoch)

                if(((Date.now() / 1000) - parsed) < 604800){ //determine if sensor has been calibrated in past week
                //alert("past week");
                    let sensorId = tableRows[i].querySelector('tr td:nth-child(1)').textContent.trim();
                    let storeName = server + "," + sensorId; //store the sensor as calibrated in the format of SERVER,SENSORID
                    GM.setValue(storeName, true);
                    console.log("Storing sensor as calibrated: " + storeName);
                }

            }

        }
        else{

            const sensorList = document.getElementsByClassName("slnk poplink"); //gets list of all sensors on the live view page

            for (let i = 0; i < sensorList.length; i++) {
                let id = sensorList[i].onclick.toString().slice(33, 37); //gets the ID of the sensor from the html

                id = id.match(/(\d+)/)[0]; //gets only the digits from the sensor ID if it contains trailing ");"

                let storedName = server + "," + id;
                let check = await GM.getValue(storedName);
                console.log(check);

                if(check){
                    let checkMark = document.createTextNode(' \u2713 Calibrated');
                    sensorList[i].parentElement.parentElement.style.fontSize = '11px';
                    sensorList[i].parentElement.parentElement.style.fontWeight = 'bold';
                    sensorList[i].parentElement.parentElement.prepend(checkMark);
                    sensorList[i].parentElement.parentElement.style.opacity = 0.4;
                    //alert("adding check");
                }
            }
        }
    }

    else if(twoPointZero == 0){ //GUARDIAN 2.1

        if((document.URL).includes("/calreport.php")){

            const table = document.getElementsByTagName("table")[0];
            let sensorId = "";

            // Get all the rows of the table
            let tableRows = table.querySelectorAll('tr');

            //tableRows.forEach(function(item, index) {
            //    console.log('Item ' + index + ':', item);
            //});
            for (let i = 1; i < (tableRows.length); i++) { //go through all table rows
                // Get the date from the table row
                let dateSpan = tableRows[i].querySelector('tr td:nth-child(7)');

                const parsed = Date.parse(dateSpan.innerHTML) / 1000; //get a unix timestamp of the last calibration date (javascript works with milliseconds since epoch)

                if(((Date.now() / 1000) - parsed) < 604800){ //determine if sensor has been calibrated in past week
                //alert("past week");
                    let sensorId = tableRows[i].querySelector('tr td:nth-child(1)').textContent.trim();
                    let storeName = server + "," + sensorId; //store the sensor as calibrated in the format of SERVER,SENSORID
                    GM.setValue(storeName, true);
                    console.log("Storing sensor as calibrated: " + storeName);
                }

            }

        }
        else if((document.URL).includes("/iserep1.php")){ //collect calibrated data from isensix calibration summary

            const table = document.getElementsByClassName("arms p100")[0];
            let sensorId = "";

            // Get all the rows of the table
            let tableRows = table.querySelectorAll('tr');

            //tableRows.forEach(function(item, index) {
            //    console.log('Item ' + index + ':', item);
            //});
            for (let i = 1; i < (tableRows.length); i++) {
                // Get the date from the table row
                let dateSpan = tableRows[i].querySelector('tr td:nth-child(11)');

                const parsed = Date.parse(dateSpan.innerHTML) / 1000; //get a unix timestamp of the last calibration date (javascript works with milliseconds since epoch)

                if(((Date.now() / 1000) - parsed) < 604800){ //determine if sensor has been calibrated in past week
                //alert("past week");
                    let sensorId = tableRows[i].querySelector('tr td:nth-child(1)').textContent.trim();
                    let storeName = server + "," + sensorId; //store the sensor as calibrated in the format of SERVER,SENSORID
                    GM.setValue(storeName, true);
                    console.log("Storing sensor as calibrated: " + storeName);
                }

            }
        }
        else{

            const sensorList = document.getElementsByClassName("slnk poplink"); //gets list of all sensors on the live view page

            for (let i = 0; i < sensorList.length; i++) {
                let id = sensorList[i].onclick.toString().slice(33, 37); //gets the ID of the sensor from the html

                id = id.match(/(\d+)/)[0]; //gets only the digits from the sensor ID if it contains trailing ");"

                let storedName = server + "," + id;
                let check = await GM.getValue(storedName);
                console.log(check);

                if(check){
                    let checkMark = document.createTextNode(' \u2713 Calibrated');
                    sensorList[i].parentElement.parentElement.style.fontSize = '11px';
                    sensorList[i].parentElement.parentElement.style.fontWeight = 'bold';
                    sensorList[i].parentElement.parentElement.prepend(checkMark);
                    sensorList[i].parentElement.parentElement.style.opacity = 0.35;
                }
            }
        }
    }


})();
