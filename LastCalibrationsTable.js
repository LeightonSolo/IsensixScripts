// ==UserScript==
// @name         Last 5 Calibrations Table
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  Shows the last 5 calibrations you've done to prevent meter time overlap
// @author       Leighton Solomon
// @match        https://*/arms2/calsetup.php
// @match        https://*/arms2/calibration/calsensor.php*
// @match        https://*/arms2/calsensor.php*
// @match        https://*/arms/calsensor.php*
// @match        https://*/arms/calreport.php?*
// @match        https://*/arms/admin/index.php?*
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/LastCalibrationsTable.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/LastCalibrationsTable.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant GM_getValue
// @grant GM.setValue
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `

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
        document.getElementById("outer").appendChild(append);
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

let arms = 0;
    try { //determine if the system is ARMS or Guardian
        if(document.getElementsByClassName("headline2")[0].innerHTML == "(Advanced Remote Monitoring System)"){
        arms = 1;
        }
    }
    catch(err){}


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

            let BTN_CHECK = document.getElementById("BTN_CHECK"); //get submit button on guardian 2.1

            /*if(!BTN_CHECK){
                BTN_CHECK = document.getElementsByName("BTN_CHECK")[0]; //get submit button on guardian 2.0
                alert(BTN_CHECK);
            }*/

            BTN_CHECK.addEventListener("click", (event) => { //wait for user to click sensor calibrated button

                let dropdown = document.getElementById("slCalibrationCertificate"); //Guardian 2.1

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

                const date = document.getElementsByClassName("at p100 date hasDatepicker")[0].innerHTML;

            });
        }
        else if((document.URL).includes("calsensor.php")){ //will store the rest of the data on the confirm page for guardian

            const table = document.getElementsByTagName("table")[0];
            let name = "";
            let address = "";
            let lastCal = "N/A";

            for(var i = 0; i < table.getElementsByTagName("tr").length; i++){
            try {
                let d = table.getElementsByTagName("tr")[i];
                let check = d.getElementsByTagName("th")[0];
                if(check.innerHTML == "CP Serial Number"){
                    address = d.getElementsByTagName("td")[0];
                }
                else if(check.innerHTML == "Sensor Name"){
                    name = d.getElementsByTagName("td")[0];
                }
            }
            catch(err){}

            }


            try {
                const table2 = document.getElementsByTagName("table")[2];
                const d2 = table2.getElementsByTagName("tr")[4];
                lastCal = d2.getElementsByTagName("td")[0];
            }
            catch(err){
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

        }


    }
    else if(arms == 1){ //ARMS


        if((document.URL).includes("arms/admin/index.php?") && (document.URL).includes("mode=11")){

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

    }

    }

})();
