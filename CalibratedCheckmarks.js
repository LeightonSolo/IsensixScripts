// ==UserScript==
// @name         Calibrated Checkmarks and Autocollapse Zones
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      3.55
// @description  Shows which sensors have been calibrated on the live view. This only updates whenever the calibration overview, calibration summary, or arms debug query is viewed. Zones can be automatically collapsed when calibrated.
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
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/CalibratedCheckmarks.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/CalibratedCheckmarks.js
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

let toggleKey = `toggleState_${window.location.host}`;

async function toggleZones(){
    const savedState = localStorage.getItem(toggleKey);
    //let toggleZones = await GM.getValue("toggleZones");
    //if(toggleZones){
    if(savedState === 'ON'){
        if(arms == 1){
            window.location="/arms/index.php?x=&zva=1";
            console.log("Showing all zones");
        }
        else if(twoPointZero == 1){

            var links = document.querySelectorAll('a');

            //Iterate over  links to find the one with the text "Show All Sensors"
            links.forEach(function(link) {
                if (link.textContent.trim() === "Show All Sensors") {
                    link.click();

                    // Wait a bit and then force the browser to go to the URL to override redirection
                    setTimeout(function() {
                        window.location.href = link.href;
                    }, 100); // 100 ms delay before overriding
                }
            });

            //window.location="/arms/index.php?vmode=2;zva=1";
            console.log("Showing all zones");

        }
            else{
                location.reload();
        }
        localStorage.setItem(toggleKey, 'OFF');

    }
    else{
        localStorage.setItem(toggleKey, 'ON');
            location.reload();

    }
}

    const currentDate = new Date();

(async function() {
    'use strict';


    //CLEANUP CALIBRATION DATA EVERY 10 MONTHS
    // Initialize the current date

    // Load the last cleanup timestamp
    const lastCleanup = await GM.getValue("lastCleanup", 0);

    // Check if 10 months have passed since the last cleanup
    const TEN_MONTHS_MS = 10 * 30 * 24 * 60 * 60 * 1000; // Approximation: 10 months in milliseconds
    if (currentDate.getTime() - lastCleanup >= TEN_MONTHS_MS) {
        console.log("10 months have passed. Clearing stored calibration values...");

        // Get all stored keys and clear them
        const keys = await GM.listValues();
        for (const key of keys) {
            await GM.deleteValue(key);
        }

        // Update the last cleanup timestamp
        await GM.setValue("lastCleanup", currentDate.getTime());
        console.log("All stored values cleared and cleanup timestamp updated.");
    }
    // ========================================================================

    var inputString = document.URL;
            var regex = /:(\d{4})/;
            var match = inputString.match(regex);

            if (match) {
                var server = match[1];
                server = server.slice(1); //will get the three digit server ID
            }



    //================================================ ARMS ===================================================================================================
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
            const zoneHideButton = document.getElementsByClassName("zview")[0];

            let butt=document.createElement("button");
            let toggleZoneState = localStorage.getItem(toggleKey);
            if(toggleZoneState == "ON"){
                butt.innerHTML="Show All Zones";
                butt.style.fontWeight = "bold";
                butt.style.backgroundColor = '#ff512b';
            }
            else{
                butt.innerHTML="Only Show Non Calibrated Zones";
            }
            butt.addEventListener("click", () => toggleZones());

            zoneHideButton.appendChild(butt);

            for (let i = 0; i < sensorList.length; i++) {
                //alert(sensorList[i].getAttribute("href").toString().slice(0, 12));
                if(sensorList[i].getAttribute("href").toString().slice(0, 12) == "sensordetail"){
                    let id = sensorList[i].getAttribute("href").toString().slice(20, 23); //gets the ID of the sensor from the html
                    let storedName = server + "," + id;
                    let check = await GM.getValue(storedName);

                    if(check){
                        let checkMark = document.createTextNode(' \u2713 Calibrated');
                        sensorList[i].parentElement.parentElement.style.fontSize = '11px';
                        sensorList[i].parentElement.parentElement.style.fontWeight = 'bold';
                        sensorList[i].parentElement.parentElement.prepend(checkMark); //adds checkmark to parent table
                        sensorList[i].parentElement.parentElement.style.opacity = 0.4;
                        //alert("adding check");
                       }
                }
            }
            let zoneTables = document.getElementsByClassName("tbord");
            zoneTables = Array.from(zoneTables).filter(element => element.tagName === "TABLE");

            for(let i = 0; i < zoneTables.length; i++){

                //Count sensors in zone by getting count of signal images
                let images = zoneTables[i].querySelectorAll('img');

                // Filter the images to match the specific source
                let filteredImages = Array.from(images).filter(img => img.src.includes('signal'));

                let zoneCount = 0;

                try{zoneCount = filteredImages.length;}
                catch(err){}

                let calibratedCount = 0;
                //alert(zoneTables.length) //28
                const table = zoneTables[i];

                // Get the innerText of the table (text content without HTML tags)
                const tableText = table.innerText;
                // Count occurrences of calibrated
                const occurrences = tableText.split("✓").length - 1;

                // Add the occurrences to the total count
                calibratedCount += occurrences;
                //console.log("Zone: " + i);
                //console.log("Calibrated: " + calibratedCount);


                //try{
                    const zoneName = zoneTables[i].querySelector("tbody > tr:nth-child(1) > td > table > tbody > tr > td.zonename > a.zonelink").textContent;
                    let zoneTitle = document.createTextNode(zoneName + ' - ' + zoneCount + ' Active, ' + calibratedCount + ' Calibrated. ' + (zoneCount - calibratedCount) + ' left.');

                    zoneTables[i].style = "white-space:nowrap";
                    zoneTables[i].style.fontSize = '14px';

                    if((calibratedCount == zoneCount) && (toggleZoneState == "ON")){
                        zoneTables[i].style.backgroundColor = '#9eff7f';
                        zoneTitle = document.createTextNode(zoneName + ' - ' + zoneCount + ' Active, ' + calibratedCount + ' Calibrated.');
                    //close zone
                    /*const firstLink = table.querySelector('a')[1];
                    if (firstLink) {
                        firstLink.click();
                    }*/
                        zoneTables[i].children[0].style = "display:none"; //hide not remove, cause ARMS freaks out otherwise
                    }
                    if(zoneCount == 0){
                        zoneTitle = document.createTextNode(zoneName + ' - 0 Active or Hidden');
                    }
                    zoneTables[i].prepend(zoneTitle); //adds zone count and calibrated to zone title

                //}catch(err){};

            }
            //create button to allow manually deleting all stored sensor data if needed  ======
            let deleteButt=document.createElement("button");
            deleteButt.innerHTML="Delete Stored Calibration Data from Leighton's Tools";
            deleteButt.addEventListener("click", () => deleteStoredData());
            document.querySelector("body > hr").appendChild(deleteButt);
            //=============================================================================
        }
    }
    //================================================ GUARDIAN 2.0 ================================================================================================
    else if(twoPointZero == 1){

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
            const zoneHideButton = document.getElementsByClassName("atoolbar")[0];

            let butt=document.createElement("button");
            //let toggleZoneState = await GM.getValue("toggleZones");
            let toggleZoneState = localStorage.getItem(toggleKey);
            if(toggleZoneState == "ON"){
                butt.innerHTML="Show All Zones";
                butt.style.fontWeight = "bold";
                butt.style.backgroundColor = '#ff512b';
            }
            else{
                butt.innerHTML="Only Show Non Calibrated Zones";
            }
            butt.addEventListener("click", () => toggleZones());

            zoneHideButton.appendChild(butt);


            for (let i = 0; i < sensorList.length; i++) {
                let id = sensorList[i].onclick.toString().slice(33, 37); //gets the ID of the sensor from the html

                id = id.match(/(\d+)/)[0]; //gets only the digits from the sensor ID if it contains trailing ");"

                let storedName = server + "," + id;
                let check = await GM.getValue(storedName);

                if(check){
                    let checkMark = document.createTextNode(' \u2713 Calibrated');
                    sensorList[i].parentElement.parentElement.style.fontSize = '11px';
                    sensorList[i].parentElement.parentElement.style.fontWeight = 'bold';
                    sensorList[i].parentElement.parentElement.prepend(checkMark);
                    sensorList[i].parentElement.parentElement.style.opacity = 0.4;
                    //alert("adding check");
                }
            }
            const zoneTables = document.getElementsByClassName("zone p100");
            const ajaxBodyElement = document.querySelector('ajaxbody');
            if (ajaxBodyElement) {
               ajaxBodyElement.style.lineHeight = '0.6'; //shrink <br> spaces between zones
            }

            for(let i = 0; i < zoneTables.length; i++){

                //alert(zoneTable.innerHTML);
                 let images = zoneTables[i].querySelectorAll('img');

                // Filter the images to match the specific source
                let filteredImages = Array.from(images).filter(img => img.src.includes('signal'));

                let zoneCount = 0;

                try{zoneCount = filteredImages.length;}
                catch(err){}

                let calibratedCount = 0;
                //alert(zoneTables.length) //28
                const table = zoneTables[i];

                // Get the innerText of the table (text content without HTML tags)
                const tableText = table.innerText;
                // Count occurrences of calibrated
                const occurrences = tableText.split("✓").length - 1;

                // Add the occurrences to the total count
                calibratedCount += occurrences;
                //console.log("Zone: " + i);
                //console.log("Calibrated: " + calibratedCount);
                //const zoneName = document.querySelector("tbody > tr:nth-child(1) > td > table > tbody > tr > td.zonename > a.zonelink");
                const zoneName = zoneTables[i].querySelector("tbody > tr:nth-child(1) > td > table > tbody > tr > td.zonename > a.zonelink").textContent;

                let zoneTitle = document.createTextNode(zoneName + ' - ' + zoneCount + ' Sensors, ' + calibratedCount + ' Calibrated. ' + (zoneCount - calibratedCount) + ' left.');

                zoneTables[i].style = "white-space:nowrap";
                zoneTables[i].style.fontSize = '14px';

                if((calibratedCount == zoneCount) && (toggleZoneState == "ON")){
                    zoneTables[i].style.backgroundColor = '#9eff7f';
                    zoneTitle = document.createTextNode(zoneName + ' - ' + zoneCount + ' Sensors, ' + calibratedCount + ' Calibrated.');
                    zoneTables[i].children[0].remove();
                }
                if(zoneCount == 0){
                     zoneTitle = document.createTextNode(zoneName + ' - 0 Active or Hidden');
                }

                zoneTables[i].prepend(zoneTitle); //adds zone count and calibrated to zone title
            }
            //create button to allow manually deleting all stored sensor data if needed  ======
            let deleteButt=document.createElement("button");
            deleteButt.innerHTML="Delete Stored Calibration Data from Leighton's Tools";
            deleteButt.addEventListener("click", () => deleteStoredData());
            document.querySelector("#body").appendChild(deleteButt);
            //=============================================================================
        }
    }
    //================================================ GUARDIAN 2.1 ================================================================================================
    else if(twoPointZero == 0){

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
            const zoneHideButton = document.getElementsByClassName("noprint flex_nav")[0];

            let butt=document.createElement("button");
            //let toggleZoneState = await GM.getValue("toggleZones");
            let toggleZoneState = localStorage.getItem(toggleKey);
            if(toggleZoneState == "ON"){
                butt.innerHTML="Show All Zones";
                butt.style.fontWeight = "bold";
                butt.style.backgroundColor = '#ff512b';
            }
            else{
                butt.innerHTML="Only Show Non Calibrated Zones";
            }
            butt.addEventListener("click", () => toggleZones());

            zoneHideButton.appendChild(butt);

            for (let i = 0; i < sensorList.length; i++) {
                let id = sensorList[i].onclick.toString().slice(33, 37); //gets the ID of the sensor from the html

                id = id.match(/(\d+)/)[0]; //gets only the digits from the sensor ID if it contains trailing ");"

                let storedName = server + "," + id;
                let check = await GM.getValue(storedName);
                //console.log(check);

                if(check){
                    let checkMark = document.createTextNode(' \u2713 Calibrated');
                    sensorList[i].parentElement.parentElement.style.fontSize = '11px';
                    sensorList[i].parentElement.parentElement.style.fontWeight = 'bold';
                    sensorList[i].parentElement.parentElement.prepend(checkMark);
                    sensorList[i].parentElement.parentElement.style.opacity = 0.35;
                }
            }

            //create button to allow manually deleting all stored sensor data if needed  ======
            let deleteButt=document.createElement("button");
            deleteButt.innerHTML="Delete Stored Calibration Data from Leighton's Tools";
            deleteButt.addEventListener("click", () => deleteStoredData());
            document.querySelector("#body").appendChild(deleteButt);
            //=============================================================================



            const zoneTables = document.getElementsByClassName("zone p100");

            const ajaxBodyElement = document.querySelector('.ajaxbody');
            if (ajaxBodyElement) {
               ajaxBodyElement.style.lineHeight = '0.7'; //shrink <br> spaces between zones
            }

            for(let i = 0; i < zoneTables.length; i++){

                //alert(zoneTable.innerHTML);
                 let images = zoneTables[i].querySelectorAll('img');

                // Filter the images to match the specific source
                let filteredImages = Array.from(images).filter(img => img.src.includes('graph-icon'));

                let zoneCount = 0;

                try{zoneCount = filteredImages.length;}
                catch(err){}

                let calibratedCount = 0;
                //alert(zoneTables.length) //28
                const table = zoneTables[i];

                // Get the innerText of the table (text content without HTML tags)
                const tableText = table.innerText;
                // Count occurrences of calibrated
                const occurrences = tableText.split("✓").length - 1;

                // Add the occurrences to the total count
                calibratedCount += occurrences;
                //console.log("Zone: " + i);
                //console.log("Calibrated: " + calibratedCount);
                //const zoneName = document.querySelector("tbody > tr:nth-child(1) > td > table > tbody > tr > td.zonename > a.zonelink");

                const zoneName = zoneTables[i].querySelector("tbody > tr:nth-child(1) > td > table > tbody > tr > td.l.zonename.p100 > a:nth-child(9)").textContent;

                let zoneTitle = document.createTextNode(zoneName + ' - ' + zoneCount + ' Sensors, ' + calibratedCount + ' Calibrated. ' + (zoneCount - calibratedCount) + ' left.');

                zoneTables[i].style = "white-space:nowrap";
                zoneTables[i].style.fontSize = '17px';
                //zoneTables[i].style.fontWeight = 'bold';

                if((calibratedCount == zoneCount) && (toggleZoneState == "ON")){
                    zoneTables[i].style.backgroundColor = '#9eff7f';
                    zoneTitle = document.createTextNode(zoneName + ' - ' + zoneCount + ' Sensors, ' + calibratedCount + ' Calibrated. ');
                    //close zone
                    /* const firstLink = table.querySelector('a');
                    if (firstLink) {
                        firstLink.click();
                    }*/
                    //console.log("removing");
                    zoneTables[i].children[0].remove();
                }
                if(zoneCount == 0){
                     zoneTitle = document.createTextNode(zoneName + ' - 0 Active or Hidden');
                }
                                zoneTables[i].prepend(zoneTitle); //adds zone count and calibrated to zone title

            }
        }
    }
})();


async function deleteStoredData(){
    const keys = await GM.listValues();
        for (const key of keys) {
            await GM.deleteValue(key);
        }
        // Update the last cleanup timestamp
        await GM.setValue("lastCleanup", currentDate.getTime());
    console.log("deleting stored calibration values");
    location.reload();

}

