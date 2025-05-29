// ==UserScript==
// @name         Autoclose Calibration Tabs
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      1.2
// @description  Automatically closes the calibration tab based on a custom number of seconds on Guardian 2.0, 2.1 and ARMS servers
// @author       Leighton Solomon
// @match        https://*/arms2/calibration/calreport.php*
// @match        https://*/arms2/calibration//calreport.php*
// @match        https://*/arms2/calsetup.php?*
// @match        https://*/arms/calsetup.php?*
// @match        https://*/arms/calreport.php?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/AutocloseCalibrationTabs.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/AutocloseCalibrationTabs.js
// @grant GM_getValue
// @grant GM.setValue
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `

    function closeWindow(){
    //alert("window closing");
    const timeInSeconds = getSliderValue();
        if (timeInSeconds === parseInt(slider.max, 10)) {
            console.log('Slider is at maximum value, window will not close.');
            return;
        }
        console.log(`Window will close in ${timeInSeconds} seconds`);
        setTimeout(() => {
            window.close();
        }, timeInSeconds * 1000);
    }

    function getSliderValue() {
        return parseInt(slider.value, 10);
    }

const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 5;
    slider.max = 60;
slider.value = await GM.getValue("autocloseSlider");
    //slider.value = 15;
    slider.style.width = '100%';
    slider.style.maxWidth = '400px';
    slider.style.marginLeft = '30px';

function createSlider(append) {
    // Create the value display element
    const valueDisplay = document.createElement('div');
    valueDisplay.style.fontSize = '1.2em';
    valueDisplay.style.marginTop = '15px';
    valueDisplay.style.marginLeft = '30px';
    if(getSliderValue() === parseInt(slider.max, 10)){
        valueDisplay.textContent = `Calibration tabs will not close. Adjust the slider below to have these tabs autoclose after calibration.`;
    }
    else{
        valueDisplay.textContent = `Calibration tabs will close after ${slider.value} seconds. Drag the slider below to adjust the autoclose time.`;
    }

    // Function to update the display
    function updateSliderValue() {
        const value = slider.value;
        GM.setValue("autocloseSlider", value);
        if(getSliderValue() === parseInt(slider.max, 10)){
            valueDisplay.textContent = `Calibration tabs will not close.`;
        }
        else{
        valueDisplay.textContent = `Calibration tabs will close after ${slider.value} seconds.`;
        }

    }
    // Add event listener to update the value when the slider is moved
    slider.addEventListener('input', updateSliderValue);

    // Insert the slider and value display into append variable
    append.appendChild(valueDisplay);
    append.appendChild(slider);
}

(function() {
    'use strict';

    if((document.URL).includes("/calreport.php") && (document.URL).includes("/arms2")){ //GUARDIAN 2.1   DONE
        let div = document.querySelector("body > div.noprint.shadow");
        if(!div){
            div = document.getElementById("primary_nav_wrap");
        }
        createSlider(div);
        closeWindow();
    }

    else if((document.URL).includes("/calsetup.php")){ //GUARDIAN 2.0   DONE
        let div = document.querySelector("body > div.uc.noprint");
        createSlider(div);
        closeWindow();

    }
    else if((document.URL).includes("arms/calreport.php")){ //ARMS  DONE
        let div = document.querySelector("body > table:nth-child(1) > tbody > tr > td:nth-child(3) > table > tbody");
        createSlider(div);
        closeWindow();
    }

})();
