// ==UserScript==
// @name         WIP Cert Selector
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Will select and highlight certs that you upload for easier calibration
// @author       Leighton Solomon
// @match        https://*/arms2/media/photo_manager.php*
// @match        https://*/arms2/calibration/calsensor.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @grant GM_getValue
// @grant GM.setValue
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `


    if((document.URL).includes("calsensor.php")){

        let certName = await GM.getValue("highlightCert1");

        let dropdown = document.getElementById("slCalibrationCertificate");
        let selectedOption = dropdown.options[dropdown.selectedIndex];
        let options = dropdown.options;

        for(let i = 0; i < options.length; i++){
             let check = options[i].text;
            if((check.split(" - ")[0]) == certName){ //check if matches stored cert name
                options[i].style.fontWeight = "bold";
                options[i].style.color = "darkblue";
            };
        }
    }


(async () => {
    'use strict';

    //Create checkbox to save cert
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "saveCheckbox";
    checkbox.checked = false; //Set the initial checked state

    // Create label element

        let label = document.createElement("label");
        label.for = "saveCheckbox"; // Link the label to the checkbox by ID
        label.textContent = "Highlight Cert";
        checkbox.parentNode.insertBefore(label, checkbox); // Insert label before checkbox

    // Find the container element where you want to add the checkbox
    let container = document.getElementById("myContainer"); // Replace with your container ID
    // Add the checkbox to the container
    container.appendChild(checkbox);

    const BTN_CHECK = document.getElementById("save");

    BTN_CHECK.addEventListener("click", (event) => { //wait for user to click the save button
        let certBox = document.getElementById("cat2");
        if(certBox.checked && checkbox.checked){
            let certName = document.getElementById("description").value;

            GM.setValue("highlightCert1", certName);
            alert("Cert saved: " + certName);
        }
        });

})();
