// ==UserScript==
// @name         Cert Selector (Guardian and ARMS)
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      1.51
// @description  Will select certs automatically based on sensor type and highlight certs that you upload for easier calibration.
// @author       Leighton Solomon
// @match        https://*/arms2/media/photo_manager.php*
// @match        https://*/arms2/calibration/calsensor.php*
// @match        https://*/arms/admin/index.php?mode=11&certs=1*
// @match        https://*/arms/admin/editcalcert.php
// @match        https://*/arms/admin/sensorcal.php
// @match        https://*/arms2/admin/index.php?mode=SETUP_CERT*
// @match        https://*/arms2/calsensor.php?id=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/certSelector.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/certSelector.js
// @grant GM_getValue
// @grant GM.setValue
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `

let arms = 0;
    try { //determine if the system is ARMS or Guardian
        if(document.getElementsByClassName("headline2")[0].innerHTML == "(Advanced Remote Monitoring System)"){
        //console.log("ARMS server detected");
        arms = 1;
        }
    }
    catch(err){}

    if((document.URL).includes("calsensor.php") || (document.URL).includes("sensorcal.php")){ //Calibration Pages

        let certName1 = await GM.getValue("highlightCert1");
        let certName2 = await GM.getValue("highlightCert2");
        let certName3 = await GM.getValue("highlightCert3");
        let certName4 = await GM.getValue("highlightCert4");

        if(certName1 == undefined){
            certName1 = "empty";
        }
        if(certName2 == undefined){
            certName2 = "empty";
        }
        if(certName3 == undefined){
            certName3 = "empty";
        }
        if(certName4 == undefined){
            certName4 = "empty";
        }

        let dropdown = document.getElementById("slCalibrationCertificate");
        if(dropdown == null){ //handle guardian 2.0 dropdown
            dropdown = document.getElementById("cacert");
        }
        if(arms == 1){
            dropdown = document.querySelector("body > form > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td > select");
        }
        let selectedOption = dropdown.options[dropdown.selectedIndex];
        let options = dropdown.options;

        let serial = "";

        if(arms == 1){//ARMS
            let table = document.getElementsByTagName("table")[4];
            let d = table.getElementsByTagName("tr")[6];

            let serialObj = d.getElementsByClassName("sinfodesc")[0];

            serial = serialObj.innerHTML.trim(); //full serial number here

            //let serial = document.querySelector("body > form > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > th.sinfodesc").innerHTML.text;
            //let serial = document.querySelector("body > form > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > th.sinfodesc");
        }
        if(arms == 0){ //Guardian
            let form = document.getElementById("calsen");
            let table = form.getElementsByTagName("table")[0];
            let d = table.getElementsByTagName("tr")[6];
            let serialObj = d.getElementsByTagName("td")[0];
            serial = serialObj.innerHTML; //full serial number here
        }

        let firstFour = serial.slice(0, 4).toLowerCase(); //get first two letters of sensor serial number, used to check sensor type

        let meterType = "";

        if(firstFour.includes("re") || firstFour.includes("rm") || firstFour.includes("sc") || firstFour.includes("tmc") || firstFour.includes("tc")){
            meterType = "RE";
        }
        else if(firstFour.includes("hu")){
            meterType = "HU";
        }
        else if(firstFour.includes("co2")){
            meterType = "CO2";
        }
        else if(firstFour.includes("dp")){
            meterType = "DP";
        }
        else if((firstFour.includes("4to2")) || (firstFour.includes("bi"))){
            meterType = "VerifyOnly";
        }

        for(let i = 0; i < options.length; i++){
             let check = options[i].text;
             let match = check.split(" - ")[0]; //remove expiration date from cert name
            if(arms == 1){
                match = check.split(" Exp:")[0];
            }
            if((match == certName1) || (match == certName2) || (match == certName3) || (match == certName4)){ //check if matches a stored cert name
                dropdown.selectedIndex = i;
                options[i].style.fontWeight = "bold";
                options[i].style.color = "darkblue";
            };
        }
        let cert1index = 0;
        let cert2index = 0;
        let cert3index = 0;
        let cert4index = 0;

        console.log("Meter Type Detected: " + meterType);

        if(meterType == "RE"){ //will auto select Oakton and Flukes for RE type sensors

            if(certName1.includes("Oakton") || certName1.includes("Fluke")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName1 || dropdown.options[i].text.split(" Exp:")[0] === certName1) {
                        cert1index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert1index;
            }
            if(certName2.includes("Oakton") || certName2.includes("Fluke")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName2 || dropdown.options[i].text.split(" Exp:")[0] === certName2) {
                        cert2index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert2index;
            }
            if(certName3.includes("Oakton") || certName3.includes("Fluke")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName3 || dropdown.options[i].text.split(" Exp:")[0] === certName3) {
                        cert3index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert3index;
            }
            if(certName4.includes("Oakton") || certName4.includes("Fluke")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName4 || dropdown.options[i].text.split(" Exp:")[0] === certName4) {
                        cert4index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert4index;
            }
        }// END RE
        else if(meterType == "HU"){ //will auto select Vaisala for HU type sensors
            if(certName1.includes("Vaisala") && !certName1.includes("CO2")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName1 || dropdown.options[i].text.split(" Exp:")[0] === certName1) {
                        cert1index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert1index;
            }
            if(certName2.includes("Vaisala") && !certName2.includes("CO2")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName2 || dropdown.options[i].text.split(" Exp:")[0] === certName2) {
                        cert2index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert2index;
            }
            if(certName3.includes("Vaisala") && !certName3.includes("CO2")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName3 || dropdown.options[i].text.split(" Exp:")[0] === certName3) {
                        cert3index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert3index;
            }
            if(certName4.includes("Vaisala") && !certName4.includes("CO2")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName4 || dropdown.options[i].text.split(" Exp:")[0] === certName4) {
                        cert4index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert4index;
            }
        }// END HU
        else if(meterType == "CO2"){ //will auto select Vaisala CO2 for CO2 type sensors
            if(certName1.includes("Vaisala CO2")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName1 || dropdown.options[i].text.split(" Exp:")[0] === certName1) {
                        cert1index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert1index;
            }
            if(certName2.includes("Vaisala CO2")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName2 || dropdown.options[i].text.split(" Exp:")[0] === certName2) {
                        cert2index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert2index;
            }
            if(certName3.includes("Vaisala CO2")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName3 || dropdown.options[i].text.split(" Exp:")[0] === certName3) {
                        cert3index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert3index;
            }
            if(certName4.includes("Vaisala CO2")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName4 || dropdown.options[i].text.split(" Exp:")[0] === certName4) {
                        cert4index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert4index;
            }
        }// END CO2
        else if(meterType == "DP"){ //will auto select Dwyer for DP type sensors
            if(certName1.includes("Dwyer")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName1 || dropdown.options[i].text.split(" Exp:")[0] === certName1) {
                        cert1index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert1index;
            }
            if(certName2.includes("Dwyer")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName2 || dropdown.options[i].text.split(" Exp:")[0] === certName2) {
                        cert2index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert2index;
            }
            if(certName3.includes("Dwyer")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName3 || dropdown.options[i].text.split(" Exp:")[0] === certName3) {
                        cert3index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert3index;
            }
            if(certName4.includes("Dwyer")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName4 || dropdown.options[i].text.split(" Exp:")[0] === certName4) {
                        cert4index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert4index;
            }
        }// END DP
    }

(async () => {
    'use strict';

    let container = "";

    if(!(document.URL).includes("calsensor.php") && !(document.URL).includes("editcalcert.php") && !(document.URL).includes("sensorcal.php")){ //dont create table on calibration pages (and arms upload page?)
        container = document.getElementById("body");

        if((document.URL).includes("mode=11&certs=1")){
            container = document.getElementById("arms_menu_2");
        }

        let certNames = [];
        certNames[0] = await GM.getValue("highlightCert1");
        if(certNames[0] == undefined){certNames[0] = "empty"};
        certNames[1] = await GM.getValue("highlightCert2");
        if(certNames[1] == undefined){certNames[1] = "empty"};
        certNames[2] = await GM.getValue("highlightCert3");
        if(certNames[2] == undefined){certNames[2] = "empty"};
        certNames[3] = await GM.getValue("highlightCert4");
        if(certNames[3] == undefined){certNames[3] = "empty"};

        const deleteButtons = [
            { text: "Delete", clickFunction: () => deleteCert(1) },
            { text: "Delete", clickFunction: () => deleteCert(2) },
            { text: "Delete", clickFunction: () => deleteCert(3) },
            { text: "Delete", clickFunction: () => deleteCert(4) },
        ];

        const line1 = document.createTextNode("\u00A0 \u00A0Assigned Certificates");
        createTable(container, [1,2,3,4], certNames, deleteButtons); //create table of stored certs
        container.prepend(line1);

    }

    if((document.URL).includes("photo_manager.php?id")){ //guardian 2.1 cert pages

        const BTN_CHECK = document.getElementById("save");

        let stored1 = await GM.getValue("highlightCert1");
        let stored2 = await GM.getValue("highlightCert2");
        let stored3 = await GM.getValue("highlightCert3");
        let stored4 = await GM.getValue("highlightCert4");

        BTN_CHECK.addEventListener("click", (event) => { //wait for user to click the save button
            let certBox = document.getElementById("cat2");
            if(certBox.checked){// && checkbox.checked){ //save the cert if the certificate box is checked
                let certName = document.getElementById("description").value;

                if((stored1 == certName) || (stored2 == certName) || (stored3 == certName) || (stored4 == certName)){
                    alert("Cert saved: " + certName);
                }
                else if(stored1 == undefined){
                    GM.setValue("highlightCert1", certName);
                    alert("Cert saved: " + certName);
                }
                else if(stored2 == undefined){
                    GM.setValue("highlightCert2", certName);
                    alert("Cert saved: " + certName);
                }
                else if(stored3 == undefined){
                    GM.setValue("highlightCert3", certName);
                    alert("Cert saved: " + certName);
                }
                else if(stored4 == undefined){
                    GM.setValue("highlightCert4", certName);
                    alert("Cert saved: " + certName);
                }
                else{
                    GM.setValue("highlightCert1", certName);
                    alert("Cert saved: " + certName);
                }
            }
        });
    }
    else if((document.URL).includes("?mode=SETUP_CERT")){ //guardian 2.0 cert pages

        const BTN_CHECK = document.querySelector("#body > form > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(7) > td > input:nth-child(1)");

        let stored1 = await GM.getValue("highlightCert1");
        let stored2 = await GM.getValue("highlightCert2");
        let stored3 = await GM.getValue("highlightCert3");
        let stored4 = await GM.getValue("highlightCert4");

        BTN_CHECK.addEventListener("click", (event) => { //wait for user to click the save button

                let certName = document.querySelector("#body > form > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(2) > td").textContent;


                if((stored1 == certName) || (stored2 == certName) || (stored3 == certName) || (stored4 == certName)){
                    alert("Cert saved: " + certName);
                }
                else if(stored1 == undefined){
                    GM.setValue("highlightCert1", certName);
                    alert("Cert saved: " + certName);
                }
                else if(stored2 == undefined){
                    GM.setValue("highlightCert2", certName);
                    alert("Cert saved: " + certName);
                }
                else if(stored3 == undefined){
                    GM.setValue("highlightCert3", certName);
                    alert("Cert saved: " + certName);
                }
                else if(stored4 == undefined){
                    GM.setValue("highlightCert4", certName);
                    alert("Cert saved: " + certName);
                }
                else{
                    GM.setValue("highlightCert1", certName);
                    alert("Cert saved: " + certName);
                }

        });
    }

    else if((document.URL).includes("editcalcert.php")){ //ARMS cert pages

        const BTN_CHECK = document.querySelector('input[type="submit"][value="Accept"]'); //ARMS accept cert button

        let stored1 = await GM.getValue("highlightCert1");
        let stored2 = await GM.getValue("highlightCert2");
        let stored3 = await GM.getValue("highlightCert3");
        let stored4 = await GM.getValue("highlightCert4");

        BTN_CHECK.addEventListener("click", (event) => { //wait for user to click the save button
                let certName = document.querySelector("body > form > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2)").innerHTML; //get cert description

                if((stored1 == certName) || (stored2 == certName) || (stored3 == certName) || (stored4 == certName)){
                    alert("Cert saved: " + certName);
                }
                else if(stored1 == undefined){
                    GM.setValue("highlightCert1", certName);
                    alert("Cert saved: " + certName);
                }
                else if(stored2 == undefined){
                    GM.setValue("highlightCert2", certName);
                    alert("Cert saved: " + certName);
                }
                else if(stored3 == undefined){
                    GM.setValue("highlightCert3", certName);
                    alert("Cert saved: " + certName);
                }
                else if(stored4 == undefined){
                    GM.setValue("highlightCert4", certName);
                    alert("Cert saved: " + certName);
                }
                else{
                    GM.setValue("highlightCert1", certName);
                    alert("Cert saved: " + certName);
                }

        });
    }

})();


function createTable(append, number, names, buttons) {

    var table = document.createElement("TABLE"); //makes a table element for the page

        append.style.margin = "0 auto";
        table.style.width = '350px';
        table.style.border = '1px solid #000';
        //table.style.marginLeft = '50px';

    if(arms == 0){
        document.getElementById("outer").appendChild(append);
    }
    else if(arms == 1){
        document.getElementById("arms_menu_1").appendChild(append);
    }

    for (var i = 0; i < 4; i++) {
        var row = table.insertRow(i);

        // Create cells for number and name
        var cellNumber = row.insertCell(0);
        cellNumber.innerHTML = number[i];

        var cellName = row.insertCell(1);
        cellName.innerHTML = names[i];

        // Create cell for button
        var cellButton = row.insertCell(2);

        // Create a button element
        var buttonElement = document.createElement("button");
        buttonElement.innerText = buttons[i].text;

        // Add click event listener to the button
        buttonElement.addEventListener("click", buttons[i].clickFunction);

        // Append the button element to the cell
        cellButton.appendChild(buttonElement);

    }
    append.prepend(table);
}

async function deleteCert(certNumber) {
    let toDelete = await GM.getValue("highlightCert" + certNumber);

    alert(toDelete + " will no longer be highlighted when calibrating.");

    GM.deleteValue("highlightCert" + certNumber);

    try{
        location.replace(location.href);
    }
    catch(err){}
}
