// ==UserScript==
// @name         Calibration Report Error Checking (ARMS, G2.0, G2.1, G3.0)
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      1.4
// @description  Ensures canned messages correct, meter matches sensor type, and correct amount of samples entered - ARMS, Guardian 2.0, 2.1, and 3.0
// @author       Leighton Solomon
// @match        https://*.isensix.com/cust/?id=*
// @match        https://*/arms2/full_calreport.php
// @match        https://*/guardian/full_calreport.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/calReportChecking.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/calReportChecking.js
// @grant        none
// ==/UserScript==

//  .--.      .--.      .--.      .--.      .--.      .--.      .--.      .--.
//:::::.\::::::::.\::::::::.\  Leighton's Tools \::::::::.\::::::::.\::::::::.\
//'      `--'      `--'      `--'      `--'      `--'      `--'      `--'      `

(function() {
    'use strict';

    // ── collect all cells that should be highlighted ──────────────────────────
    const highlightedCells = [];

    const rules = [
        { keywords: ["Humidity"],           validValues: ["Vaisala"] },
        { keywords: ["RE", "RM", "TMC", "SC", "TC"], validValues: ["Oakton", "Fluke", "Digisense"] },
        { keywords: ["CO2_A_20"],           validValues: ["Vaisala CO2", "ViaSensor"] },
        { keywords: ["DiffPress"],          validValues: ["Dwyer"] },
    ];

    const isGuardian = document.URL.includes("guardian");

    let table = isGuardian
        ? document.querySelector("body > div.page > div > table")
        : document.querySelector("body > div.page > table");

    const requiredText = [
        "Proper functionality has been verified.",
        "Sensor failed calibration/verification, needs to be replaced.",
        "Replaced sensor.",
        "Sensor Disabled"
    ];

    const validSamples = ["3/3", "0/0", "/"];

    function markRed(cell) {
        cell.dataset.flagged = "true";
        highlightedCells.push(cell);
    }

    // ── row scanning───────────────────────────────────
    for (let i = 1; i < table.rows.length; i++) {
        let cell       = table.rows[i].cells[isGuardian ? 13 : 12];
        let typeCell   = table.rows[i].cells[isGuardian ?  5 :  4];
        let meterCell  = table.rows[i].cells[isGuardian ? 14 : 13];
        let statusCell = table.rows[i].cells[isGuardian ? 13 : 12];
        let samplesCell = table.rows[i].cells[isGuardian ? 12 : 11];

        // Canned message check
        if (cell) {
            const text = cell.textContent || cell.innerText;
            if (!requiredText.some(t => text.includes(t))) markRed(cell);
        }

        if (samplesCell) {
            let samplesText = samplesCell.textContent.trim();
            samplesText = samplesText.replace(/\s/g, ''); //remove newline which is in 3/3 for some reason??
            if (!validSamples.includes(samplesText)) markRed(samplesCell);
        }

        // Meter/type mismatch check
        if (!typeCell || !meterCell) continue;
        const statusText = statusCell.textContent.trim();
        if (statusText.includes("Sensor Disabled")) continue;

        const typeText = typeCell.textContent.trim();
        const meterText = meterCell.textContent.trim().toLowerCase();

        const rule = rules.find(r => r.keywords.some(k => typeText.includes(k)));
        if (rule && !rule.validValues.some(v => meterText.includes(v.toLowerCase()))) {
            markRed(typeCell);
            markRed(meterCell);
        }
    }

    // ── inject print-safe CSS ─────────────────────────────────────────────────
    const style = document.createElement("style");
    style.textContent = `
        #error-highlight-toggle-bar {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 14px;
            background: #f8f8f8;
            border-bottom: 1px solid #ddd;
            font-family: sans-serif;
            font-size: 14px;
        }
        #error-highlight-toggle-bar label {
            cursor: pointer;
            user-select: none;
        }
        td[data-flagged="true"] {
            background-color: red !important;
        }
        body.highlights-off td[data-flagged="true"] {
            background-color: unset !important;
        }

        /* ── hidden when printing or saving as PDF ── */
        @media print {
            #error-highlight-toggle-bar { display: none !important; }
            td[data-flagged="true"]     { background-color: red !important; }
        }
    `;
    document.head.appendChild(style);

    // ── build the toggle UI ───────────────────────────────────────────────────
    const bar = document.createElement("div");
    bar.id = "error-highlight-toggle-bar";
    bar.innerHTML = `
        <label>
            <input type="checkbox" id="highlight-toggle" checked>
            Show error highlights in red
        </label>
        <span style="color:#888">(${highlightedCells.length} flagged cell${highlightedCells.length !== 1 ? 's' : ''})</span>
    `;
    bar.title = "Canned messages that are not the exact approved wording and meters that don't match sensor type will be highlighted red. Toggle this here.";
    document.body.insertBefore(bar, document.body.firstChild);

    document.getElementById("highlight-toggle").addEventListener("change", function() {
        document.body.classList.toggle("highlights-off", !this.checked);
    });

})();

