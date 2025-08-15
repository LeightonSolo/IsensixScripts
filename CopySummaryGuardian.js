// ==UserScript==
// @name         Copy Isensix Calibration Summary (Guardian) (3.0)
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      3.2
// @description  This script will automatically copy the text from the Isensix Calibration Summary on guardian servers when the button is pressed
// @author       Leighton Solomon
// @match        https://*/arms2/iserep1.php
// @match        https://*/arms/iserep1.php
// @match        https://*/guardian/iserep1.php*
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/CopySummaryGuardian.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/CopySummaryGuardian.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @grant none
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `


//Works on Guardian 2.0, 2.1 and 3.0 Servers. Will add a button above the Calibration Query table found on the "Isensix Calibration Summary" section of the Setup tab.
//Clicking this button will automatically copy the contents of the table to the clipboard, which can then be pasted on the Isensix Calibration Visualizer, 
//along with server information like SID and version

let serverType = "G2.1";

    try { //determine if the system is ARMS or Guardian
        if(document.getElementsByClassName("headline2")[0].innerHTML == "(Advanced Remote Monitoring System)"){
        //console.log("ARMS server detected");
        serverType = "ARMS";
        }
    }
    catch(err){}

    try { //determine if the system is Guardian 2.1 or 2.0
        if((document.getElementsByClassName("ICO_DISCONNECT")[0].innerHTML == "Sign me off") || (document.querySelector("#guardian-bar-wp-logo > a").title == "Guardian 2.0")){
            //console.log("Guardian 2.0 server detected");
            serverType = "G2.0";
        }
    }
    catch(err){}

    try {//determine if the server is Guardian 3.0
        if(document.querySelector("#isemainmenu > li:nth-child(1) > a").title == "Guardian 3.0"){
            serverType = "G3.0";
        }
    }
    catch(err){}

let match = window.location.href.match(/:(\d{3,5})/); // match like :7888
let serverId = match ? match[1].slice(-3) : "UNKNOWN"; // get last 3 digits

function selectElementContents(el) {
        var body = document.body, range, sel;
        if (document.createRange && window.getSelection) {
            range = document.createRange();
            sel = window.getSelection();
            sel.removeAllRanges();
            try {
                range.selectNodeContents(el);
                sel.addRange(range);
            } catch (e) {
                range.selectNode(el);
                sel.addRange(range);
            }
        } else if (body.createTextRange) {
            range = body.createTextRange();
            range.moveToElementText(el);
            range.select();
        }
    }


(function() {
    let btn = document.createElement("BUTTON");
    btn.style.margin = '5px';
    btn.textContent = 'Copy Calibration Query';

    let div = document.querySelector("#ui-id-1") || document.querySelector("#tab1");
    if(serverType == "G2.0"){
        div = document.querySelector("#tabs > ul");
        btn.style.margin = '10px';
    }
    else{
        btn.style.margin = '2px 10px';
    }
    div.appendChild(btn);

    btn.onclick = () => {
        const table = document.getElementsByClassName('arms p100')[0];
        const rows = Array.from(table.querySelectorAll("tr"));
        const updatedRows = [];

        rows.forEach((tr) => {
            const ths = tr.querySelectorAll("th");
            const tds = tr.querySelectorAll("td");

            if (ths.length > 0) {
                // preserve header row
                const headerTexts = Array.from(ths).map(th => th.textContent.trim());
                // headers for SID and Version too
                headerTexts.push("SID", "Version");
                updatedRows.push(headerTexts.join("\t"));
            } else if (tds.length > 0) {
                // data rows, add SID and Version
                const cellTexts = Array.from(tds).map(td => td.textContent.trim());
                cellTexts.push(serverId, serverType);
                updatedRows.push(cellTexts.join("\t"));
            }
            // Skip rows that have neither <th> nor <td>
        });

        const finalText = updatedRows.join("\n");

        navigator.clipboard.writeText(finalText).then(
            () => {
                btn.textContent = 'Copied to your clipboard!';
                btn.style.background = '#5beb34';
            },
            (err) => {
                alert("Could not copy! Error: " + err);
            }
        );
    };


})();
