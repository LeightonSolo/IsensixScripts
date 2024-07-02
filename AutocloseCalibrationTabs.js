// ==UserScript==
// @name         WIP COMBINED Autoclose Calibration Tabs
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      0.9
// @description  Automatically closes the calibration tab based on a custom number of seconds on Guardian 2.0, 2.1 and ARMS servers
// @author       Leighton Solomon
// @match        https://*/arms2/calibration/calreport.php*
// @match        https://*/arms2/calibration//calreport.php*
// @match        https://*/arms2/calsetup.php?*
// @match        https://*/arms/calsetup.php?*
// @match        https://*/arms/calreport.php?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
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

function createSlider(append) {
    // Create the slider input element

    // Create the value display element
    const valueDisplay = document.createElement('div');
    valueDisplay.style.fontSize = '1.3em';
    valueDisplay.style.marginTop = '10px';
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

        let span = document.getElementsByClassName("ICO_TAG_ORANGE")[0];
        try {
            if (typeof(span) == 'undefined' || span == null){ //if the info box is not present, put the notice at the top of the page
                span = document.getElementById("outer");
                createSlider(span);
            }
            else{
                createSlider(span);
            }
        }
        catch(err){}
        closeWindow();
    }

    else if((document.URL).includes("/calsetup.php?")){ //GUARDIAN 2.0   WIP
        const timeToWait = 10000; //in miliseconds
        const span = document.getElementsByClassName("ICO_INFORMATION")[0];

        const node = document.createTextNode(" - This tab will close 10 seconds after calibration. To disable this, click the Tampermonkey icon in your browser and disable 'Autoclose Calibration Tabs'");
        span.appendChild(node);

        //if((span.innerHTML).includes("calibrated")){
        setTimeout(function(){ closeWindow(); }, timeToWait);
        //}
    }
    else if((document.URL).includes("arms/calreport.php")){ //ARMS WIP
        const timeToWait = 15000; //in miliseconds
        const table = document.getElementsByTagName("table")[6];
        let d = table.getElementsByTagName("td")[0];

        d.style.fontWeight = "bold";

        const node = document.createTextNode("This tab will close 15 seconds after calibration. To disable this, click the Tampermonkey icon in your browser and disable 'Autoclose Calibration Tabs'");
        d.append(node);

        setTimeout(function(){ closeWindow(); }, timeToWait);
    }

})();
