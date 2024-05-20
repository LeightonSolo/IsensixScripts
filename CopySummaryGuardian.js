// ==UserScript==
// @name Copy Isensix Calibration Summary (Guardian)
// @namespace http://tampermonkey.net/
// @version 1.6
// @description This script will automatically copy the text from the Isensix Calibration Summary on guardian servers when the button is pressed
// @author Leighton Solomon
// @match        https://*/arms2/iserep1.php
// @match        https://*/arms/iserep1.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @grant none
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `


//Works on Guardian 2.0 and 2.1 Servers. Will add a button above the Calibration Query table found on the "Isensix Calibration Summary" section of the Setup tab.
//Clicking this button will automatically copy the contents of the table to the clipboard, which can then be pasted on the Isensix Calibration Visualizer

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
        btn.textContent = 'Copy Calibration Query';

        let div = document.querySelector("#ui-id-1");
        try {
            div.appendChild(btn);
        }
        catch(err) {
            let div = document.querySelector("#tab1");
            div.prepend(btn);
        }

        btn.onclick = () => {

            //class="arms p100"
            var table = document.getElementsByClassName('arms p100')[0];

            selectElementContents( table );

            const selection = window.getSelection();
            const text = selection.toString();
            let newText = text.replace("Calibration Query", "");
            newText = newText.replace(/^\s+|\s+$/g, ''); //remove title and leading newlines from text copied
            //document.execCommand('copy');   deprecated
            navigator.clipboard.writeText(newText).then(
                () => {
                    btn.textContent = 'Copied to your clipboard!';
                    btn.style.background='#5beb34';
                    window.getSelection().removeAllRanges();
                },
                (message) => {
                    alert("Could not copy! Error: " + message);
                },
            );

        };

})();
