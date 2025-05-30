// ==UserScript==
// @name         ARMS Debug Query
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      3.0
// @description  Creates a button on older ARMS servers that when clicked will open, autofill query, and copy from debug_query.php along with server information
// @author       Leighton Solomon
// @match        https://*/arms/admin/
// @match        https://*/arms/debug/debug.php
// @match        https://*/arms/debug/debug_query.php
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/ARMSDebugQuery.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/ARMSDebugQuery.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @grant        none
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `


const query = `SELECT
s.sensor_id AS id, s.addr,
s.name AS sensor,
s.sensor_sn as serial,
s.offset,
a.name AS ap,
CASE l.qual
WHEN 0 THEN 'LINK'
WHEN 1 THEN 'GOOD'
WHEN 2 THEN 'SENSOR'
WHEN 3 THEN 'NETWORK'
WHEN 4 THEN 'BATTERY'
WHEN 7 THEN 'WIRE'
WHEN 8 THEN 'WIRE'
WHEN 99 THEN 'INIT'
ELSE IF(s.enable=0, '','UNKNOWN')
END as Qual,
IF (s.enable=1, "ENABLED","DISABLED") AS status,
st.name AS type,
z.name AS zone,
from_unixtime(MAX(c.ts)) as calibrated
FROM sensor s
LEFT JOIN stypes st ON st.id = s.stype
LEFT JOIN zone z ON z.zone_id = s.owner LEFT JOIN callog c ON c.sid = s.sensor_id
LEFT JOIN slog_now l ON l.sensor_id = s.sensor_id
LEFT JOIN ap a on a.ap_id = s.ap
GROUP BY s.name, c.sid`;

let arms = 0;
    try { //determine if the system is ARMS or Guardian
        if(document.getElementsByClassName("headline2")[0].innerHTML == "(Advanced Remote Monitoring System)"){
        arms = 1;
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

function removeEmptyLastColumn(table) {
    let lastColumnEmpty = true;
    const rows = table.rows;
    const lastCellIndex = rows[0].cells.length - 1;

    for (let i = 0; i < rows.length; i++) {
        const cell = rows[i].cells[lastCellIndex];
        if (cell && cell.textContent.trim() !== "") {
            lastColumnEmpty = false;
            break;
        }
    }

    if (lastColumnEmpty) {
        for (let i = 0; i < rows.length; i++) {
            rows[i].deleteCell(lastCellIndex);
        }
    }
}



function copyTable(copyBtn){
    var table = document.getElementsByTagName("table")[0];

    // Remove the last column if it is empty
    removeEmptyLastColumn(table);

    let rows = Array.from(table.rows);
    let newRows = [];

    let version = "ARMS";

    for (let row of rows) {
        let cells = Array.from(row.cells).map(cell => cell.textContent.trim());
        cells.push(serverId, version); // Add the two new columns
        newRows.push(cells.join("\t"));
    }

    const finalText = newRows.join("\n");

    navigator.clipboard.writeText(finalText).then(
        () => {
            copyBtn.textContent = 'Copied to your clipboard!';
            copyBtn.style.background = '#5beb34';
            window.getSelection().removeAllRanges();
        },
        (message) => {
            alert("Could not copy! Error: " + message);
        },
    );
}



(function() {
    'use strict';

    if(arms == 1){//ensure we are on older arms server
        let btn = document.createElement("BUTTON");
        btn.textContent = 'Copy Calibration Query';

        let div = document.getElementById("arms_menu_1");

        let cell = document.createElement("td");
        cell.appendChild(btn);
        div.prepend(cell);

        const url = document.URL;
        let debugUrl = "";

        debugUrl = url.slice(0, 38) + "debug/debug_query.php";

        btn.onclick = () => {

            window.open(debugUrl); //opens the debug_query.php in a new tab

        }
    }
    else{ //should only run on debug_query.php url
        try {
            document.getElementsByName("query")[0].textContent = query;

            let btn = document.getElementsByName("submit")[0];

            var table = document.querySelector('table');

                if(table){
                // The table element exists.
                    let copyBtn = document.createElement("BUTTON");
                    copyBtn.textContent = 'Copy Query Results';
                    copyBtn.style.background='#00e1ff';

                    btn.parentNode.appendChild(copyBtn);

                    copyBtn.addEventListener('click', function(event) {
                        // Prevent the default behavior of the button.
                        event.preventDefault();

                    });

                    copyBtn.onclick = () => {
                        copyTable(copyBtn);
                    }
                }

       }
       catch(err) {}

    }

})();
