// ==UserScript==
// @name         Latest Calibration Times
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      1.6
// @description  Tells latest calibration time on the calibration overview tab, Isensix Calibration Summary Tab, and ARMS Debug Query
// @author       Leighton Solomon
// @match        https://*/arms2/calibration/calreport.php
// @match        https://*/arms/iserep1.php
// @match        https://*/arms2/iserep1.php
// @match        https://*/arms/debug/debug_query.php
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/LatestCalibrationTimes.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/LatestCalibrationTimes.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `


function findMostRecentTime(timeArray) {
    // Convert the time strings to Date objects
    const dateObjects = timeArray.map(timeStr => new Date(timeStr));

    // Find the maximum Date object, which corresponds to the most recent calibration time
    const mostRecentTime = new Date(Math.max.apply(null, dateObjects));

    return mostRecentTime;
}

(function() {

    if((document.URL).includes("/calreport.php")){

        const table = document.getElementById("tuq1");
        let d = table.getElementsByTagName("tr")[1];
        let check = d.getElementsByTagName("td")[6];

        const rows = table.rows;
        const columnData = [];

        for (let i = 1; i < rows.length; i++) {
            const cell = rows[i].cells[6];
            columnData.push(cell.innerText);
        }

        const filteredTimes = columnData.filter(item => item !== "-");

        let mostRecentTime = findMostRecentTime(filteredTimes);

        let div = document.getElementById("tab-calreport-1");
        const node = document.createTextNode("Most Recent Calibration: " + mostRecentTime);

        div.prepend(node);
    }
    else if((document.URL).includes("/debug_query.php")){ //show most recent calibration time on the ARMS Debug Query screen

        let table = document.getElementsByTagName("table")[0];
        let d = table.getElementsByTagName("tr")[1];
        let check = d.getElementsByTagName("td")[10];

        const rows = table.rows;
        const columnData = [];

        for (let i = 1; i < rows.length; i++) {
            const cell = rows[i].cells[10];
            columnData.push(cell.innerText);
        }
        const filteredTimes = columnData.filter(e => String(e).trim());

        let mostRecentTime = findMostRecentTime(filteredTimes);

        let div = document.getElementsByClassName("hdbg")[0];
        const node = document.createTextNode("Most Recent Calibration: " + mostRecentTime);

        div.prepend(node);
    }
    else{

        const table = document.getElementsByClassName("arms p100")[0];
        let d = table.getElementsByTagName("tr")[1];
        let check = d.getElementsByTagName("td")[6];

        const rows = table.rows;
        const columnData = [];

        for (let i = 1; i < rows.length; i++) {

            const cell = rows[i].cells[10];
            columnData.push(cell.innerText);
            //console.log(cell.innerText);
        }

        const filteredTimes = columnData.filter(item => item !== "");

        let mostRecentTime = findMostRecentTime(filteredTimes);

        let div = document.getElementById("tab1");
        const node = document.createTextNode(" Most Recent Calibration: " + mostRecentTime + " \n ");

        div.prepend(node);



    }


})();
