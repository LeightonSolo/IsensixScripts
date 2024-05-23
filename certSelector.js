// ==UserScript==
// @name         WIP Cert Selector
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      1.09
// @description  Will select and highlight certs that you upload for easier calibration
// @author       Leighton Solomon
// @match        https://*/arms2/media/photo_manager.php*
// @match        https://*/arms2/calibration/calsensor.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/certSelector.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/certSelector.js
// @grant GM_getValue
// @grant GM.setValue
// ==/UserScript==


//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `


    if((document.URL).includes("calsensor.php")){ //Calibration Page

        let certName1 = await GM.getValue("highlightCert1");
        let certName2 = await GM.getValue("highlightCert2");
        let certName3 = await GM.getValue("highlightCert3");
        let certName4 = await GM.getValue("highlightCert4");

        let dropdown = document.getElementById("slCalibrationCertificate");
        let selectedOption = dropdown.options[dropdown.selectedIndex];
        let options = dropdown.options;

        const form = document.getElementById("calsen");
        const table = form.getElementsByTagName("table")[0];
        const d = table.getElementsByTagName("tr")[6];
        const serialObj = d.getElementsByTagName("td")[0];
        const serial = serialObj.innerHTML; //full serial number here
        const firstFour = serial.slice(0, 4).toLowerCase(); //get first four letters of sensor serial number, used to check sensor type
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


        if(meterType == "RE"){ //will auto select Oakton and Flukes for RE type sensors
            if(certName1.includes("Oakton") || certName1.includes("Fluke")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName1) {
                        cert1index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert1index;
            }
            if(certName2.includes("Oakton") || certName2.includes("Fluke")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName2) {
                        cert2index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert2index;
            }
            if(certName3.includes("Oakton") || certName3.includes("Fluke")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName3) {
                        cert3index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert3index;
            }
            if(certName4.includes("Oakton") || certName4.includes("Fluke")){
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].text.split(" - ")[0] === certName4) {
                        cert4index = i;
                        break; // Exit the loop if found
                    }
                }
                dropdown.selectedIndex = cert4index;
            }
        }// END RE

    }


(async () => {
    'use strict';

    if(!(document.URL).includes("calsensor.php")){ //dont create table on calibration page
        let container = document.getElementById("body");

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

    const line1 = document.createTextNode("\u00A0 \u00A0Stored Certificates");
    createTable(container, [1,2,3,4], certNames, deleteButtons); //create table of stored certs
    container.prepend(line1);
    }


    if((document.URL).includes("photo_manager.php?id")){ //cert pages

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

})();

function createTable(append, number, names, buttons) {

    var table = document.createElement("TABLE"); //makes a table element for the page

        append.style.margin = "0 auto";
        table.style.width = '350px';
        table.style.border = '1px solid #000';
        //table.style.marginLeft = '50px';
        document.getElementById("outer").appendChild(append);

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

