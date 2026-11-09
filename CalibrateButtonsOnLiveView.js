// ==UserScript==
// @name         Calibrate Buttons for Live View (ARMS, G2.0, G2.1, G3.0)
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      5.51
// @description  Adds Calibration and Exception controls to every sensor on the Isensix Live view page.
// @author       Leighton Solomon
// @match        https://*/arms2/index.php*
// @match        https://*/arms2/
// @match        https://*/arms/
// @match        https://*/arms/index.php*
// @match        https://*/guardian/index.php*
// @match        https://*/guardian/
// @match        https://*guardian//index.php*
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/CalibrateButtonsOnLiveView.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/CalibrateButtonsOnLiveView.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @grant        GM_xmlhttpRequest
// @connect      flat-tree-380f.leightonsolo.workers.dev
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
    if(url.includes("ics3")){
        calUrl = url.slice(0, 35) + "admin/index.php?mode=11&id="; //sets to calibation mode for older ARMS servers
    }else{
        calUrl = url.slice(0, 38) + "admin/index.php?mode=11&id="; //sets to calibation mode for older ARMS servers
    }
}
else if(url.slice(33, 38) == "arms/"){
        if(url.includes("ics3")){
               calUrl = url.slice(0, 35) + "calsensor.php?id=";

        }else{
               calUrl = url.slice(0, 38) + "calsensor.php?id=";
        }
}
else if(twoPointZero == 1){ //sets calibration URL for Guardian 2.0
            if(url.includes("ics3")){
                calUrl = url.slice(0, 36) + "calsensor.php?id=";
            }else{
                calUrl = url.slice(0, 39) + "calsensor.php?id=";
            }
}
else if(threePoint0 == 1){ //sets calibration URL for Guardian 3.0
    if(url.includes("ics3")){
            calUrl = url.slice(0, 39) + "calibration/calsensor.php?id=";
    }else{
        calUrl = url.slice(0, 42) + "calibration/calsensor.php?id=";
    }
}
else{ //sets calibration URL for Guardian 2.1
        if(url.includes("ics3")){
            calUrl = url.slice(0, 36) + "calibration/calsensor.php?id=";
        }else{
            calUrl = url.slice(0, 39) + "calibration/calsensor.php?id=";
        }
}

function openCalUrl(id, butt){
   window.open(calUrl + id);
    butt.style.backgroundColor = '#00e1ff'; //set color of button (to locate easier on live view)
}

function getSensorId(element) {
    const onclick = element.getAttribute('onclick') || '';
    const onclickId = onclick.match(/pop_sd\(\s*(\d+)\s*\)/i)?.[1];
    if (onclickId) return onclickId;

    const href = element.getAttribute('href') || '';
    return href.match(/[?&]id=(\d+)(?:[&#]|$)/i)?.[1] || null;
}

const WORKER_URL = 'https://flat-tree-380f.leightonsolo.workers.dev';
const API_KEY = 'U87iy7VynFYLJUDnfUYBJHnRKbRiQO3Z';
const currentServer = window.location.host.match(/:7(\d{3})/)?.[1] || null;
let exceptionState = new Map();

function getTechnicianName() {
    const guardianThree = document.querySelector('a[title][href*="v2prefs.php"]')?.getAttribute('title');
    if (guardianThree?.trim()) return guardianThree.trim();

    const guardianTwoOne = document.querySelector('span.isensix.nw');
    if (guardianTwoOne?.textContent?.trim()) return guardianTwoOne.textContent.replace(/\s+/g, ' ').trim();

    const guardianTwo = document.querySelector('span.bgicon[style*="status_online"], span.isensix');
    if (guardianTwo?.textContent?.trim()) return guardianTwo.textContent.replace(/\s+/g, ' ').trim();

    const armsMenu = [...document.querySelectorAll('td.menubar')]
        .find(cell => (cell.getAttribute('align') || '').toLowerCase() === 'left')
        ?.textContent?.replace(/\s+/g, ' ').trim();
    const armsTechnician = armsMenu?.match(
        /\b(?:CST|CDT|EST|EDT|MST|MDT|PST|PDT)\b\s+(.+)$/i
    )?.[1];
    return armsTechnician?.trim() || 'Unknown technician';
}

const technicianName = getTechnicianName();

function styleActionButton(button) {
    button.style.width = '28px';
    button.style.height = '24px';
    button.style.padding = '0';
    button.style.margin = '0 2px';
    button.style.boxSizing = 'border-box';
    button.style.lineHeight = '22px';
    button.style.verticalAlign = 'middle';
}

function workerRequest(method, path, body) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method,
            url: `${WORKER_URL}${path}`,
            headers: { 'Content-Type': 'application/json', 'X-Api-Key': API_KEY },
            data: body ? JSON.stringify(body) : undefined,
            onload: response => response.status >= 200 && response.status < 300
                ? resolve(response.responseText ? JSON.parse(response.responseText) : {})
                : reject(new Error(`Worker returned ${response.status}`)),
            onerror: () => reject(new Error('Worker request failed')),
        });
    });
}

async function loadExceptionState() {
    if (!currentServer) return;
    try {
        const payload = await workerRequest('GET', `/live-view/state?server=${encodeURIComponent(currentServer)}`);
        for (const sensor of payload.sensors || []) {
            if (sensor.exception_id) exceptionState.set(String(sensor.sensor_id), sensor);
        }
    } catch (error) {
        console.warn('[Isensix Tools] Could not load exception state:', error);
    }
}

function markException(button, sensorLink, active, reason = '') {
    button.textContent = active ? '\u2716' : '\u26a0';
    button.title = active ? `Clear exception${reason ? `: ${reason}` : ''}` : 'Mark as exception';
    button.style.backgroundColor = active ? '#f39c12' : '';
    const container = sensorLink.closest('.senbox, .lvsensor, tr') || sensorLink.parentElement;
    if (container) container.style.outline = active ? '2px solid #f39c12' : '';
}

function addExceptionButton(sensorLink, id) {
    const button = document.createElement('button');
    styleActionButton(button);
    const state = exceptionState.get(String(id));
    markException(button, sensorLink, Boolean(state), state?.exception_reason || '');
    button.addEventListener('click', async () => {
        button.disabled = true;
        try {
            if (exceptionState.has(String(id))) {
                await workerRequest('DELETE', `/exceptions/${exceptionState.get(String(id)).exception_id}`);
                exceptionState.delete(String(id));
                markException(button, sensorLink, false);
            } else {
                const reason = window.prompt('Why could this sensor not be calibrated?');
                if (!reason?.trim()) return;
                const result = await workerRequest('POST', '/exceptions', {
                    sensor_id: String(id),
                    server: currentServer,
                    sensor_name: sensorLink.textContent.trim(),
                    reason: reason.trim(),
                    year: new Date().getFullYear(),
                    added_by: technicianName,
                });
                const state = {
                    sensor_id: String(id),
                    exception_id: result.exception?.id,
                    exception_reason: reason.trim(),
                };
                exceptionState.set(String(id), state);
                markException(button, sensorLink, true, state.exception_reason);
            }
        } catch (error) {
            console.error('[Isensix Tools] Exception update failed:', error);
            window.alert('Could not update the exception. Please try again.');
        } finally {
            button.disabled = false;
        }
    });
    return button;
}

(async function() {
    'use strict';

    await loadExceptionState();

    if(arms == 0){//if system is detected to be guardian
        if(threePoint0){ //G3.0
            //let sensorList = document.getElementsByClassName("slnk"); //gets list of all sensors on the live view page
            let sensorList = [
              ...document.getElementsByClassName("slnk"),
              ...document.getElementsByClassName("slnk-title")
            ];

            const sensorList2 = document.getElementsByClassName("lvhead");

            for (let i = 0; i < sensorList.length; i++) {
                const id = getSensorId(sensorList[i]);
                if (!id) continue;
                //console.log(id);//gets the ID of the sensor from the html
                let butt=document.createElement("button");

                styleActionButton(butt);

                butt.textContent="\u25c9";
                butt.title = "Calibrate";


                butt.addEventListener("click", () => openCalUrl(id, butt));

                const exceptionButt = addExceptionButton(sensorList[i], id);

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
                sensorList[i].parentElement.parentElement.appendChild(exceptionButt);
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
                const id = getSensorId(sensorList[i]);
                if (!id) continue;
                let butt=document.createElement("button");

                styleActionButton(butt);

                butt.textContent="\u25c9";
                butt.title = "Calibrate";

                butt.addEventListener("click", () => openCalUrl(id, butt));

                const exceptionButt = addExceptionButton(sensorList[i], id);

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
                cell.appendChild(exceptionButt);
                cell.appendChild(butt);
                row.prepend(cell);
            }
        }
    }
    else if(arms == 1){ //if system is detected to be ARMS

        const sensorList = document.querySelectorAll('a.noul[href*="sensordetail.php"]'); //gets list of all sensors on the live view page

        for (let i = 0; i < sensorList.length; i++) {
            const href = sensorList[i].getAttribute("href") || "";
            if (/(?:^|\/)sensordetail\.php(?:[?#]|$)/i.test(href)) {
                const id = getSensorId(sensorList[i]);
                if (!id) continue;
                let butt=document.createElement("button");

                styleActionButton(butt);

                butt.textContent="\u25c9";
                butt.title = "Calibrate";


                butt.addEventListener("click", () => openCalUrl(id, butt));

                const exceptionButt = addExceptionButton(sensorList[i], id);

                sensorList[i].parentElement.parentElement.prepend(butt); //adds calibrate button to parent table
                sensorList[i].parentElement.parentElement.prepend(exceptionButt);

            }
        }
    }

})();
