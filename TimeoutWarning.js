// ==UserScript==
// @name         WIP Warning on Unconfirmed Calibration
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Will warn if you have sat on the calibration confirmation page for too long without confirming before the page times out
// @author       Leighton Solomon
// @match        https://*/arms2/calibration/calsensor.php
// @match        https://*/arms/calsensor.php
// @match        https://*/arms2/calsensor.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @grant        window.focus
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `

function alertWarning() {
    window.focus();
    alert("Make sure you confirm this calibration before it times out!");
}

(function() {
    'use strict';

    //wait 3 minutes
    const timeToWait = 180000; //in miliseconds

    setTimeout(function(){ alertWarning(); }, timeToWait);

    //look for button containing text "Confirm"
    //if true start timer
    //if timer reaches threshold send alert to tab

})();
