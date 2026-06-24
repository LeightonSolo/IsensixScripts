// ==UserScript==
// @name         Last 5 Calibrations Table and Meter Overlap Prevention (ARMS, G2.0, G2.1, G3.0)
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      2.52
// @description  Shows the last 5 calibrations you've done, highlights the calibration times if it overlaps with the same meter (WIP)
// @author       Leighton Solomon
// @match        https://*/arms2/calsetup.php
// @match        https://*/arms2/calibration/calsensor.php*
// @match        https://*/arms2/calsensor.php*
// @match        https://*/arms/calsensor.php*
// @match        https://*/arms/calreport.php?*
// @match        https://*/arms/admin/index.php?*
// @match        https://*/guardian/calibration/calsensor.php*
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/LastCalibrationsTable.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/LastCalibrationsTable.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @grant GM_getValue
// @grant GM.setValue
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `

let threePoint0 = false;
    try {//determine if the server is Guardian 3.0
        if(document.querySelector("#isemainmenu > li:nth-child(1) > a").title == "Guardian 3.0"){
            threePoint0 = true;
            console.log("3.0 Detected");
        }
    }
    catch(err){}

let arms = 0;
    try { //determine if the system is ARMS or Guardian
        if((document.getElementsByClassName("headline2")[0].innerHTML == "(Advanced Remote Monitoring System)")){
            arms = 1;
            console.log("ARMS detected");

        }
    }
    catch(err){}

let twoPoint0 = 0;
    try { //determine if the system is Guardian 2.1 or 2.0
        if(document.getElementsByClassName("ICO_DISCONNECT")[0].innerHTML == "Sign me off"){
            twoPoint0 = 1;
            console.log("Guardian 2.0 Detected");
        }
    }
    catch(err){}

let twoPoint1 = 0;
try { //determine if the system is Guardian 2.1 or 2.0
        if(document.querySelector("#primary_nav_wrap > ul > li:nth-child(1) > a").title == "Guardian 2.1"){
            twoPoint1 = 1;
            console.log("Guardian 2.1 Detected");
        }
    }
    catch(err){}

function createTable(append, addresses, names, certs, times) {

    var table = document.createElement("TABLE"); //makes a table element for the page

    if(arms == 1){

        table.style.width = '1000px';
        table.style.border = '1px solid #000';
        table.style.marginLeft = '50px';
    }
    else{
        append.style.margin = "0 auto";
        table.style.width = '1050px';
        table.style.border = '1px solid #000';
        //table.style.marginLeft = '50px';
        if(threePoint0){
                   // document.getElementsByClassName("c")[1].appendChild(append);
            document.querySelector("#isxmain").appendChild(append);

        }else{
        document.getElementById("outer").appendChild(append);
        }
    }

    for (var i = 0; i < 6; i++) {
        var row = table.insertRow(i);

        for (var j = 0; j < 4; j++) {
            var cell = row.insertCell(j);
            cell.innerHTML = (j === 0) ? addresses[i] :
                              (j === 1) ? names[i] :
                              (j === 2) ? certs[i] :
                                         times[i];
            cell.style.borderBottom = "1px solid black";
            cell.style.padding = "2px";
            cell.style.textAlign = "left";
            cell.style.fontSize = "15px";
            if(j > 0){
                cell.style.borderLeft = "1px solid black";
            }
            if(i < 1){
                cell.style.fontWeight = "bold";
            }
        }
    }

    append.append(table);
}


(async () => {
    'use strict';

    if(arms == 0){ //GUARDIAN

        if((document.URL).includes("?id=")){ //will store the cert after clicking submit on calibration for guardian


            let addresses = ["CP #", await GM.getValue("address1"), await GM.getValue("address2"), await GM.getValue("address3"), await GM.getValue("address4"), await GM.getValue("address5")];
            let names = ["Sensor Name", await GM.getValue("name1"), await GM.getValue("name2"), await GM.getValue("name3"), await GM.getValue("name4"), await GM.getValue("name5")];
            let certs = ["Certificate", await GM.getValue("cert1"), await GM.getValue("cert2"), await GM.getValue("cert3"), await GM.getValue("cert4"), await GM.getValue("cert5")];
            let times = ["Last Measurement Time", await GM.getValue("lastCal1"), await GM.getValue("lastCal2"), await GM.getValue("lastCal3"), await GM.getValue("lastCal4"), await GM.getValue("lastCal5")];


            var div = document.createElement("div");
            div.setAttribute("style","width:62%");
            div.style.margin = "0 auto";

            const line1 = document.createElement("b");
            line1.innerText = "Your last 5 Calibrations";
            div.appendChild(line1);

            createTable(div, addresses, names, certs, times);



            // Initial attach for row 1, then observe for rows 2 and 3
            attachInputListeners();
            observeReadingsTable();
            await checkTimeConflicts();


            let BTN_CHECK = document.getElementById("BTN_CHECK"); //get submit button on guardian 2.1

            /*if(!BTN_CHECK){
                BTN_CHECK = document.getElementsByName("BTN_CHECK")[0]; //get submit button on guardian 2.0
                alert(BTN_CHECK);
            }*/

            BTN_CHECK.addEventListener("click", (event) => { //wait for user to click sensor calibrated button

                let dropdown = document.getElementById("slCalibrationCertificate"); //Guardian 2.1 and 3.0

                let selectedOption = "";

                try { //try to use guardian 2.1, if error uses 2.0
                    selectedOption = dropdown.options[dropdown.selectedIndex];
                }
                catch(err){
                    dropdown = document.getElementById("cacert"); //guardian 2.0
                    selectedOption = dropdown.options[dropdown.selectedIndex];
                }

                const tempCert = selectedOption.text;

                GM.setValue("tempCert", tempCert);

                //const date = document.getElementsByClassName("at p100 date hasDatepicker")[0].innerHTML;

            });
        }
        else if((document.URL).includes("calsensor.php")){ //will store the rest of the data on the confirm page for guardian

            const table = document.getElementsByTagName("table")[0];
            let name = "";
            let address = "";
            let lastCal = "N/A";

            if(threePoint0){ //G3.0
                name = document.querySelector("#tab-f6147c9c9b908be9b52803698be57ad2-1 > table:nth-child(1) > tbody > tr:nth-child(3) > td > span");
                address = document.querySelector("#tab-f6147c9c9b908be9b52803698be57ad2-1 > table:nth-child(1) > tbody > tr:nth-child(6) > td");
                lastCal = document.querySelector("#tab-f6147c9c9b908be9b52803698be57ad2-1 > table:nth-child(28) > tbody > tr:nth-child(3) > td.c.nb");
                console.log("Address: ", address);
                console.log("Name: ", name);
                console.log("lastCal: ", lastCal);
            }
            else{

                for(var i = 0; i < table.getElementsByTagName("tr").length; i++){
                    try {
                        let d = table.getElementsByTagName("tr")[i];
                        let check = d.getElementsByTagName("th")[0];
                        if(check.innerHTML == "CP Serial Number"){
                            address = d.getElementsByTagName("td")[0];
                            console.log("Address: ", address);
                        }
                        else if(check.innerHTML == "Sensor Name"){
                            name = d.getElementsByTagName("td")[0];
                            console.log("Name: ", name);

                        }
                    }
                    catch(err){}
                }
                try {
                const table2 = document.getElementsByTagName("table")[2];
                const d2 = table2.getElementsByTagName("tr")[4];
                lastCal = d2.getElementsByTagName("td")[0];
                                    console.log("lastCal: ", lastCal);

            }
            catch(err){
            }

            }


            //Add Cert information to table
            var row = table.insertRow(7);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            cell1.innerHTML = "<b>Certificate \u00A0 \u00A0 </b>";
            cell1.style.textAlign = "right";
            cell2.innerHTML = await GM.getValue("tempCert");


            let cert5 = await GM.getValue("cert4");
            GM.setValue("cert5", cert5);
            let cert4 = await GM.getValue("cert3");
            GM.setValue("cert4", cert4);
            let cert3 = await GM.getValue("cert2");
            GM.setValue("cert3", cert3);
            let cert2 = await GM.getValue("cert1");
            GM.setValue("cert2", cert2);
            GM.setValue("cert1", cell2.innerHTML);


            let address5 = await GM.getValue("address4");
            GM.setValue("address5", address5);
            let address4 = await GM.getValue("address3");
            GM.setValue("address4", address4);
            let address3 = await GM.getValue("address2");
            GM.setValue("address3", address3);
            let address2 = await GM.getValue("address1");
            GM.setValue("address2", address2);
            GM.setValue("address1", address.innerHTML);


            let name5 = await GM.getValue("name4");
            GM.setValue("name5", name5);
            let name4 = await GM.getValue("name3");
            GM.setValue("name4", name4);
            let name3 = await GM.getValue("name2");
            GM.setValue("name3", name3);
            let name2 = await GM.getValue("name1");
            GM.setValue("name2", name2);
            GM.setValue("name1", name.innerHTML);

            let lastCal5 = await GM.getValue("lastCal4");
            GM.setValue("lastCal5", lastCal5);
            let lastCal4 = await GM.getValue("lastCal3");
            GM.setValue("lastCal4", lastCal4);
            let lastCal3 = await GM.getValue("lastCal2");
            GM.setValue("lastCal3", lastCal3);
            let lastCal2 = await GM.getValue("lastCal1");
            GM.setValue("lastCal2", lastCal2);
            GM.setValue("lastCal1", lastCal.innerHTML);
            localStorage.setItem("lastCal1", lastCal.innerHTML);

        }


    }
    else if(arms == 1){ //ARMS


        if((document.URL).includes("arms/admin/index.php?") && (document.URL).includes("mode=11") && !(document.URL).includes("certs=1")){

            const calForm = document.getElementsByName("calform")[0];

            var lastCertText = document.createElement("p");

            const line1 = document.createTextNode("\u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0Your last 5 Calibrations");

            calForm.style.fontWeight = 'bold';
            calForm.appendChild(line1);


            let addresses = ["CP #", await GM.getValue("address1"), await GM.getValue("address2"), await GM.getValue("address3"), await GM.getValue("address4"), await GM.getValue("address5")];
            let names = ["Sensor Name", await GM.getValue("name1"), await GM.getValue("name2"), await GM.getValue("name3"), await GM.getValue("name4"), await GM.getValue("name5")];
            let certs = ["Certificate", await GM.getValue("cert1"), await GM.getValue("cert2"), await GM.getValue("cert3"), await GM.getValue("cert4"), await GM.getValue("cert5")];
            let times = ["Last Measurement Time", await GM.getValue("lastCal1"), await GM.getValue("lastCal2"), await GM.getValue("lastCal3"), await GM.getValue("lastCal4"), await GM.getValue("lastCal5")];


            createTable(calForm, addresses, names, certs, times);


        }
        else if((document.URL).includes("calreport")){

        const table = document.getElementsByTagName("table")[6];
        let d = table.getElementsByTagName("tr")[14];
        let check = d.getElementsByTagName("td")[0];
        let cert = d.getElementsByTagName("td")[1];
        let name = "";
        let address = "";


        for(var j = 0; j < table.getElementsByTagName("tr").length; j++){
            try {
                d = table.getElementsByTagName("tr")[j];
                check = d.getElementsByTagName("td")[0];
                if(check.innerHTML == "Nist Certificate"){
                    cert = d.getElementsByTagName("td")[1];
                }
                else if(check.innerHTML == "Address"){
                    address = d.getElementsByTagName("td")[1];
                }
                else if(check.innerHTML == "Sensor Name"){
                    name = d.getElementsByTagName("td")[1];
                }
            }
            catch(err){}

        }

        //cert.style.backgroundColor = '#00e1ff';

        const report = document.getElementsByClassName("report")[0];
        const d2 = report.getElementsByTagName("tr")[4];
        const lastCal = d2.getElementsByTagName("td")[0];

        //lastCal.style.backgroundColor = '#00e1ff';

        let cert5 = await GM.getValue("cert4");
        GM.setValue("cert5", cert5);
        let cert4 = await GM.getValue("cert3");
        GM.setValue("cert4", cert4);
        let cert3 = await GM.getValue("cert2");
        GM.setValue("cert3", cert3);
        let cert2 = await GM.getValue("cert1");
        GM.setValue("cert2", cert2);
        GM.setValue("cert1", cert.innerHTML);


        let address5 = await GM.getValue("address4");
        GM.setValue("address5", address5);
        let address4 = await GM.getValue("address3");
        GM.setValue("address4", address4);
        let address3 = await GM.getValue("address2");
        GM.setValue("address3", address3);
        let address2 = await GM.getValue("address1");
        GM.setValue("address2", address2);
        GM.setValue("address1", address.innerHTML);


        let name5 = await GM.getValue("name4");
        GM.setValue("name5", name5);
        let name4 = await GM.getValue("name3");
        GM.setValue("name4", name4);
        let name3 = await GM.getValue("name2");
        GM.setValue("name3", name3);
        let name2 = await GM.getValue("name1");
        GM.setValue("name2", name2);
        GM.setValue("name1", name.innerHTML);

        let lastCal5 = await GM.getValue("lastCal4");
        GM.setValue("lastCal5", lastCal5);
        let lastCal4 = await GM.getValue("lastCal3");
        GM.setValue("lastCal4", lastCal4);
        let lastCal3 = await GM.getValue("lastCal2");
        GM.setValue("lastCal3", lastCal3);
        let lastCal2 = await GM.getValue("lastCal1");
        GM.setValue("lastCal2", lastCal2);
        GM.setValue("lastCal1", lastCal.innerHTML);
        localStorage.setItem("lastCal1", lastCal.innerHTML);


    }

    }

})();

function parseTime(timeStr) {
    if (!timeStr) return null;
    // Normalize T separator to space so both formats parse cleanly
    const normalized = timeStr.trim().replace("T", " ");
    const dt = new Date(normalized);
    if (isNaN(dt.getTime())) return null;
    return dt.getTime(); // milliseconds since epoch — fully accounts for date and hour
}

// Main conflict checker
async function checkTimeConflicts() {
    let dropdown = document.getElementById("slCalibrationCertificate");
    if(twoPoint0){
        dropdown = document.querySelector("#cacert");
    }
    if (!dropdown) return;

    const selectedCert = dropdown.options[dropdown.selectedIndex]?.text?.trim();
    if (!selectedCert) return;

    let timeInputs;
    if (twoPoint1 || twoPoint0) {
        // Select all inputs with name="calt[]" — covers however many rows exist
        timeInputs = [...document.querySelectorAll('input[name="calt[]"]')];
    } else {
        const timeInputSelectors = [
            "#readings > tr > td:nth-child(1) > input",
            "#readings > tr:nth-child(2) > td:nth-child(1) > input",
            "#readings > tr:nth-child(3) > td:nth-child(1) > input"
        ];
        timeInputs = timeInputSelectors.map(sel => document.querySelector(sel));
    }

    // Load stored certs and last cal times (slots 1-5)
    const storedCerts = await Promise.all([1,2,3,4,5].map(i => GM.getValue(`cert${i}`)));
    const storedTimes = await Promise.all([1,2,3,4,5].map(i => GM.getValue(`lastCal${i}`)));


    // Collect all stored lastCal times for entries matching selectedCert
    const TWO_MIN_MS = 2 * 60 * 1000;

    const blockedRanges = [];
    for (let i = 0; i < 5; i++) {
        if (storedCerts[i]?.trim() === selectedCert) {
            const t = parseTime(storedTimes[i]);
            if (t !== null) {
                blockedRanges.push({ start: t - TWO_MIN_MS, end: t });
            }
        }
    }


    console.log("Selected cert:", selectedCert);
console.log("Stored certs:", storedCerts);
console.log("Stored times:", storedTimes);
console.log("Blocked minutes:", [...blockedRanges]);
console.log("Current input minutes:", timeInputs.map(i => i ? parseTime(i.value) : null));

    // Check each time input and highlight red if conflict
    for (const input of timeInputs) {
        if (!input) continue;
        const t = parseTime(input.value);
        const isBlocked = blockedRanges.some(r => t >= r.start && t <= r.end);
        if (t !== null && isBlocked) {
            input.style.backgroundColor = "red";
            input.style.color = "white";
            input.title = "Meter Overlap Detected. Make sure you didn't use this meter at this time.";
        } else {
            input.style.backgroundColor = "";
            input.style.color = "";
            input.title = "";
        }
    }
}

function attachInputListeners() {

    let inputs = [];
    if (twoPoint1 || twoPoint0) {
        inputs = [...document.querySelectorAll('input[name="calt[]"]')];
    }
    else if(threePoint0) {
        const timeInputSelectors = [
            "#readings > tr > td:nth-child(1) > input",
            "#readings > tr:nth-child(2) > td:nth-child(1) > input",
            "#readings > tr:nth-child(3) > td:nth-child(1) > input"
        ];
        inputs = timeInputSelectors.map(sel => document.querySelector(sel));
    }
    else if(arms){

    }

    for (const input of inputs) {
        if (input && !input.dataset.conflictListenerAttached) {
            input.addEventListener("input", checkTimeConflicts);
            input.addEventListener("change", checkTimeConflicts);
            input.dataset.conflictListenerAttached = "true";
        }
    }
}


function observeReadingsTable() {
    let readingsTable = document.getElementById("readings");
    if(twoPoint0 || twoPoint1){
        readingsTable = document.querySelector("#calhelper > tbody");
    }
    if (!readingsTable) return;

    const observer = new MutationObserver(() => {
        attachInputListeners();
        checkTimeConflicts();
    });

    observer.observe(readingsTable, { childList: true, subtree: true });
}

// Attach dropdown listener separately (it exists on page load)
const dropdown = document.getElementById("slCalibrationCertificate");
if (dropdown) {
    dropdown.addEventListener("change", checkTimeConflicts);
}




