// ==UserScript==
// @name         Calibration Capture - Send to Visualizer Database
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      3.53
// @description  Capture Isensix calibration and Live View data for the dashboard database.
// @author       Leighton Solomon
// @match        https://*/guardian/calibration/calsensor.php*
// @match        https://*.isensix.com:*/guardian/calibration/calsensor.php*
// @match        https://*.isensix.com:*/arms2/calibration/calsensor.php*
// @match        https://*.isensix.com:*/arms/calsensor.php*
// @match        https://*.isensix.com:*/guardian/calibration/calreport.php*
// @match        https://*.isensix.com:*/arms2/calibration/calreport.php*
// @match        https://*.isensix.com:*/arms2/calibration//calreport.php*
// @match        https://*.isensix.com:*/arms2/calsetup.php*
// @match        https://*.isensix.com:*/arms/calsetup.php*
// @match        https://*/arms/calreport.php?cid=*
// @match        https://*.isensix.com:*/guardian/iserep1.php*
// @match        https://*.isensix.com:*/arms2/iserep1.php*
// @match        https://*.isensix.com:*/arms/iserep1.php*
// @match        https://*/arms2/calibration/calsensor.php*
// @match        https://*.isensix.com:*/arms/admin/sensorcal.php
// @match        https://*.isensix.com:*/arms/debug/debug_query.php*
// @match        https://*/arms2/
// @match        https://*/arms2/index.php*
// @match        https://*/arms/
// @match        https://*/arms/index.php*
// @match        https://*/guardian/
// @match        https://*/guardian/index.php*
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/sendToDatabase.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/sendToDatabase.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @connect      flat-tree-380f.leightonsolo.workers.dev
// ==/UserScript==

  const arms = document.querySelector(".headline2")?.textContent.trim() === "(Advanced Remote Monitoring System)";

  let twoPointOne = false;
    try {//determine if the server is Guardian 3.0
        if(document.querySelector("#primary_nav_wrap > ul > li:nth-child(1) > a").title == "Guardian 2.1"){
            twoPointOne = true;
            console.log("2.1 Detected");
        }
    }
    catch(err){}

  let twoPointZero = false;
    try {//determine if the server is Guardian 3.0
        if(document.getElementsByClassName("ICO_DISCONNECT")[0].innerHTML == "Sign me off"){

            twoPointZero = true;
            console.log("2.0 Detected");
        }
    }
    catch(err){}

  let threePoint0 = false;
    try {
        if (document.querySelector("#isemainmenu > li:nth-child(1) > a")?.title === "Guardian 3.0") {
            threePoint0 = true;
            console.log("3.0 Detected");
        }
    }
    catch(err){}



const TYPE_MAP = {
  'RE':  'Temp-RE',
  'RM':  'Temp-RM',
  'SC':  'Temp-SC',
  'TC':  'Temp-TC',
  'HU':  'Humidity',
  'DP':  'DiffPress',
  'DP.25': 'DiffPress',
  'DiffPressure': 'DiffPress',
  'DiffPress .25': 'DiffPress',
  //'MPM': 'MPM',
  'BIN': 'Binary',
  'O2':  'Oxygen',
  //'CO2_A_20': 'CO2',
};

function normalizeType(raw) {
  if (!raw) return null;
  return TYPE_MAP[raw.trim()] ?? raw.trim();
}

(function () {
  'use strict';

  /* ─── Config ──────────────────────────────────────────── */
  const WORKER_URL = 'https://flat-tree-380f.leightonsolo.workers.dev';
  const API_KEY = 'U87iy7VynFYLJUDnfUYBJHnRKbRiQO3Z';
  const COOLDOWN_MS = 1 * 60 * 1000; // 1 minutes per page type per server  CHANGE TO 5 or more later?

  /* ─── Shared utilities ────────────────────────────────── */
  function getServer() {
    const m = window.location.host.match(/:7(\d{3})/);
    return m ? m[1] : null;
  }

  function showBanner(msg, color) {
    const el = document.createElement('div');
    el.textContent = msg;
    el.style.cssText = `
      position: fixed; top: 16px; right: 16px;
      background: ${color}; color: white;
      padding: 10px 16px; border-radius: 6px;
      z-index: 99999; font-size: 14px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      font-family: system-ui, sans-serif;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }

  function isCoolingDown(key) {
    const last = GM_getValue(key, 0);
    return Date.now() - last < COOLDOWN_MS;
  }

  function setCooldown(key) {
    GM_setValue(key, Date.now());
  }

  function postSingle(data) {
    GM_xmlhttpRequest({
      method: 'POST',
      url: `${WORKER_URL}/calibration`,
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': API_KEY },
      data: JSON.stringify(data),
      onload: (res) => {
        if (res.status === 200) {
          showBanner('✓ Calibration synced to dashboard', '#1a6e2e');
        } else {
          showBanner(`⚠ Capture failed (${res.status})`, '#8b1a1a');
          console.error('Single post failed:', res.responseText);
        }
      },
      onerror: () => showBanner('⚠ Network error', '#8b1a1a'),
    });
  }

  function postBatch(sensors, onSuccess) {
    GM_xmlhttpRequest({
      method: 'POST',
      url: `${WORKER_URL}/calibrations/batch`,
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': API_KEY },
      data: JSON.stringify({ sensors }),
      onload: (res) => {
        if (res.status === 200) {
          onSuccess(sensors.length);
        } else {
          showBanner(`⚠ Sync failed (${res.status})`, '#8b1a1a');
          console.error(' Batch post failed:', res.responseText);
        }
      },
      onerror: () => showBanner('⚠ Network error — sync failed', '#8b1a1a'),
    });
  }

  /* ─── Page dispatcher ─────────────────────────────────── */
  const path = window.location.pathname;

  if (isLiveViewPath(path)) handleLiveView();
  else if (isArmsCalibrationReport()) handleArmsCalibrationReport();
  else if (path.includes('calsensor.php') || path.includes('sensorcal.php')) handleCalSensor();
  else if (path.includes('calreport.php') || path.includes('calsetup.php')) handleCalReport();
  else if (path.includes('iserep1.php')) handleIseRep();
  else if (path.includes('debug_query.php')) handleArmsIseRep();

  function isLiveViewPath(pathname) {
    return /\/(?:arms2|arms|guardian)(?:\/+index\.php)?\/?$/i.test(pathname);
  }

  function isArmsCalibrationReport() {
    return /\/arms\/calreport\.php$/i.test(path) && new URLSearchParams(window.location.search).has('cid');
  }

  function handleArmsCalibrationReport() {
    const data = scrapeArmsCalibrationReport();
    if (!data) {
      showBanner('⚠ Could not read calibration report data', '#8b1a1a');
      console.error('[sendToDatabase] Could not read required sensor ID or calibration time from ARMS report.');
      return;
    }
    postSingle(data);
  }

  function scrapeArmsCalibrationReport() {
    const server = getServer();
    if (!server) return null;

    const values = new Map();
    for (const row of document.querySelectorAll('tr')) {
      const label = row.querySelector('td.detailheader');
      const value = row.querySelector('td.detailcell');
      if (label && value) {
        values.set(label.textContent.trim().toLowerCase(), value.textContent.trim());
      }
    }

    const getValue = (label) => values.get(label.toLowerCase()) || null;
    const sensor_id = getValue('Sensor ID');
    const calibrated_at = parseToISO(getValue('Date Calibrated'));
    if (!sensor_id || !calibrated_at) return null;

    const serial_number = getValue('Sensor Serial No.');
    const rawCertificate = getValue('Nist Certificate');

    return {
      sensor_id,
      sensor_name: getValue('Sensor Name'),
      zone: getValue('Zone'),
      cp_address: getValue('Address'),
      serial_number,
      calibrated_by: getValue('Calibrated By'),
      calibrated_at,
      old_offset: parseFloatOrNull(getValue('Old Offset')),
      new_offset: parseFloatOrNull(getValue('New Offset')),
      cal_cert: !rawCertificate || rawCertificate.toLowerCase() === 'n/a' ? null : rawCertificate,
      canned_msg: getValue('Comment'),
      server,
    };
  }

  /* ═══════════════════════════════════════════════════════
     HANDLER 1 — calsensor.php (calibration confirmation)
     Fires on Confirm button click. Single record, high fidelity.
     Authoritative source for: calibrated_by, cp_address,
     cal_cert, canned_msg, old_offset, new_offset, calibrated_at
  ════════════════════════════════════════════════════════ */
  function handleCalSensor() {

    if(path.includes('sensorcal.php')){
        handleCalSensor_ARMS();
        return;
    }
    const confirmBtn = document.getElementById('BTN_SAVE');
    if (!confirmBtn) return;

    const scrape = () => twoPointOne ? scrapeCalSensor_v21() : scrapeCalSensor();
    const previewData = scrape();
    if (previewData) {
      console.info('[sendToDatabase] Calibration scrape preview (not submitted):', previewData);
    } else {
      console.warn('[sendToDatabase] Calibration scrape preview could not read sensor data.');
    }

    confirmBtn.addEventListener('click', () => {
    const data = scrape();
      if (!data) {
        showBanner('⚠ Could not read sensor data', '#8b1a1a');
        return;
      }
      postSingle(data);
    });
  }


  function scrapeCalSensor() {
      console.log("Scraping CalSensor for 2.0");
    const server = getServer();

    console.log("Server: ", server);

    // Helper: find td text by th label
    const getRow = (label) => {
      for (const row of document.querySelectorAll('tr')) {
        const th = row.querySelector('th');
        if (th && th.textContent.trim() === label) {
          return row.querySelector('td');
        }
      }
      return null;
    };

    // Sensor ID cell (contains ID span and type <em>)
    const sensorIdCell = getRow('Sensor ID');
    const sensor_id = sensorIdCell?.querySelector('span')?.textContent?.trim() || document.querySelector('#calsen > table:nth-child(3) > tbody > tr:nth-child(1) > td')?.textContent?.trim() ||
  null;

      console.log("Sensor ID: ", sensor_id);
    // Don't capture sensor_type here — iserep1 is authoritative for full type names

    // Calibrated by from nav title — strip "Isensix " prefix
    const userLink = document.querySelector('a[href="/guardian/v2prefs.php"]');
    const calibrated_by = userLink?.getAttribute('title')?.trim() ?? null;

    // Hidden inputs
    const getHidden = (name) =>
      document.querySelector(`input[name="${name}"]`)?.value?.trim() ?? null;

    const new_offset = getHidden('offset');
    const old_offset = getHidden('offsets[]');
    const canned_msg = getHidden('comment');

    // Cal cert — visible text in the certificate row
    let cal_cert = null;
    for (const row of document.querySelectorAll('tr')) {
      const cells = row.querySelectorAll('td');
      if (cells.length === 2 && cells[0].textContent.includes('Certificate')) {
        const text = cells[1].textContent.trim();
        cal_cert = text === 'n/a' ? null : text;
        break;
      }
    }

    // Calibrated at from visible table cell, convert to ISO
    const calAtRaw = document.querySelector('td[name="ts[]"]')?.textContent?.trim() ?? null;
      console.log("calAtRaw: ", calAtRaw);
    //const calibrated_at = calAtRaw ? new Date(calAtRaw).toISOString() : null; before timezone fix
    const parsedCalibratedAt = calAtRaw ? parseToISO(calAtRaw) : null;
    const serverTimeText = document.querySelector('#uinfo')?.textContent ?? '';
    const serverTimeRaw = serverTimeText.match(/Server Time:\s*(\d{1,2}\/\d{1,2}\/\d{4}\s+\d{1,2}:\d{2}(?::\d{2})?)/i)?.[1] ?? null;
    const calibrated_at = parsedCalibratedAt ?? (serverTimeRaw ? parseToISO(serverTimeRaw) : null);

      console.log("calibrated_at: ", calibrated_at);

    // Sensor name from onclick span
    const sensor_name = document.querySelector('tr td span[onclick]')?.textContent?.trim() ?? null;


    if (!sensor_id || !calibrated_at) return null;


    return {
      sensor_id,
      sensor_name,
      zone:          getRow('Zone')?.textContent?.trim() ?? null,
      serial_number: getRow('Sensor Serial')?.textContent?.trim() ?? null,
      cp_address:    getRow('CP Serial Number')?.textContent?.trim() ?? null,
      old_offset:    old_offset ? parseFloat(old_offset) : null,
      new_offset:    new_offset ? parseFloat(new_offset) : null,
      cal_cert,
      canned_msg,
      calibrated_at,
      calibrated_by,
      server,
    };
  }

  function scrapeCalSensor_v21() {
  const server = getServer();

  const getRow = (label) => {
    for (const row of document.querySelectorAll('tr')) {
      const th = row.querySelector('th');
      if (th && th.textContent.trim() === label) {
        return row.querySelector('td');
      }
    }
    return null;
  };

  // Sensor ID is plain text in 2.1, no span wrapper
  const sensor_id = getRow('Sensor ID')?.textContent?.trim() || null;

  // Sensor name is plain text in 2.1, no onclick span
  const sensor_name = getRow('Sensor Name')?.textContent?.trim() || null;


  const calibrated_by = document
    .querySelector('#primary_nav_wrap > ul > li.ise-ui-menu-item > a > span.isensix')
    ?.textContent?.trim() || null;

  // Hidden inputs — same as original
  const getHidden = (name) =>
    document.querySelector(`input[name="${name}"]`)?.value?.trim() ?? null;

  const new_offset = getHidden('offset');
  const canned_msg = getHidden('comment');

  // old_offset not available in 2.1 — omit
  // calibrated_at not available from ts[] — use current time
  //const calibrated_at = new Date().toISOString();
      // With this — use current local time formatted without UTC conversion:
      const now = new Date();
      const calibrated_at = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  // Cal cert
  let cal_cert = null;
  for (const row of document.querySelectorAll('tr')) {
    const cells = row.querySelectorAll('td');
    if (cells.length === 2 && cells[0].textContent.includes('Certificate')) {
      const text = cells[1].textContent.trim();
      cal_cert = text === 'n/a' ? null : text;
      break;
    }
  }

  if (!sensor_id) return null;

  return {
    sensor_id,
    sensor_name,
    zone:          getRow('Zone')?.textContent?.trim() ?? null,
    serial_number: getRow('Sensor Serial')?.textContent?.trim() ?? null,
    cp_address:    getRow('CP Serial Number')?.textContent?.trim() ?? null,
    new_offset:    new_offset ? parseFloat(new_offset) : null,
    old_offset:    null,
    cal_cert,
    canned_msg,
    calibrated_at,
    calibrated_by,
    server,
  };
}

    function handleCalSensor_ARMS() {
  // ARMS uses a form submit — intercept it and check which button was clicked
  const form = document.querySelector('form[name="calform"]');
  if (!form) return;

  let clickedButton = null;

  // Track which submit button was clicked
  form.querySelectorAll('input[type="submit"]').forEach(btn => {
    btn.addEventListener('click', () => { clickedButton = btn.value; });
  });

  form.addEventListener('submit', (e) => {
    // Only fire on Set Sensor Offset or Replace Sensor, not Cancel
    if (!clickedButton ||
        (!clickedButton.includes('Set Sensor Offset') &&
         !clickedButton.includes('Replace Sensor'))) {
      return;
    }

    const data = scrapeCalSensor_ARMS();
    if (!data) {
      showBanner('⚠ Could not read sensor data', '#8b1a1a');
      return;
    }

    // Fire and forget — don't block the form submission
    postSingle(data);
  });
}

function scrapeCalSensor_ARMS() {
  const server = getServer();

  // Hidden inputs are the most reliable source for ARMS
  const getHidden = (name) =>
    document.querySelector(`input[name="${name}"]`)?.value?.trim() ?? null;

  const sensor_id   = getHidden('id');
  const sensor_name = getHidden('sname');
  const serial_number = getHidden('s_sn');
  const new_offset  = getHidden('newoffset');
  const old_offset  = getHidden('oldoffset');
  const calibrated_by_raw = getHidden('uname');

  // Clean up uname — ARMS stores it as "isensix tech." sometimes with trailing period
  const calibrated_by = calibrated_by_raw?.replace(/\.$/, '').trim() || null;

  // Zone and CP address from the sensor info table
  // ARMS uses th.sinfoname / th.sinfodesc pairs
  function getInfoRow(label) {
    const headers = document.querySelectorAll('th.sinfoname');
    for (const th of headers) {
      if (th.textContent.trim() === label) {
        return th.nextElementSibling?.textContent?.trim() ?? null;
      }
    }
    return null;
  }

  const zone       = getInfoRow('Zone Name');
  const cp_address = getInfoRow('CP Address');

  // Cal cert — selected option text from the NIST certificate dropdown
  const certSelect = document.querySelector('select[name="nistCert"]');
  const cal_cert = certSelect
    ? certSelect.options[certSelect.selectedIndex]?.text?.trim() || null
    : null;

  // Canned messages — collect text of checked checkboxes
  const checkedMsgs = [];
  document.querySelectorAll('input[type="checkbox"][name^="cmsg"]').forEach(cb => {
    if (cb.checked) {
      const label = cb.nextElementSibling?.textContent?.trim();
      if (label) checkedMsgs.push(label);
    }
  });
  const canned_msg = checkedMsgs.length ? checkedMsgs.join(' | ') : null;

  // Comment field
  const comment = document.querySelector('textarea[name="comment"]')?.value?.trim() || null;

  // Combine canned messages and comment
  const full_msg = [canned_msg, comment].filter(Boolean).join(' | ') || null;

  // calibrated_at — use current time at click, formatted as local YYYY-MM-DD HH:MM
  const now = new Date();
  const calibrated_at = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  if (!sensor_id) return null;

  return {
    sensor_id,
    sensor_name,
    zone,
    cp_address,
    serial_number,
    old_offset:    old_offset    ? parseFloat(old_offset)  : null,
    new_offset:    new_offset    ? parseFloat(new_offset)  : null,
    cal_cert,
    canned_msg:    full_msg,
    calibrated_at,
    calibrated_by,
    server,
    // sensor_type intentionally omitted — iserep1 is authoritative
  };
}


  /* ═══════════════════════════════════════════════════════
     HANDLER 2 — calreport.php (calibration overview)
     Fires on page load with cooldown. Batch upsert.
     Good for: sensor inventory, zone, type, serial, offsets,
     calibrated_at, calibrated_by. Opens every calibration cycle.
  ════════════════════════════════════════════════════════ */
  function handleCalReport() {
    const server = getServer();
    const cooldownKey = `calreport_sync_${server}`;
    if (isCoolingDown(cooldownKey)) {
      console.log(`calreport cooldown active for server ${server}`);
      return;
    }

    const sensors = (twoPointOne) ? scrapeCalReport_v21(server) : (twoPointZero) ? scrapeCalReport_v20(server) : scrapeCalReport(server);

    if (!sensors.length) return;

    postBatch(sensors, (count) => {
      setCooldown(cooldownKey);
      showBanner(`✓ Synced ${count} sensors data to dashboard`, '#1a6e2e');
    });
  }







  function scrapeCalReport(server) {
      console.log("scraping cal report for 3.0 server");
    const rows = document.querySelectorAll('table#tuq1 tbody tr');
    const sensors = [];

    for (const row of rows) {
      const tds = row.querySelectorAll('td');
      if (tds.length < 9) continue;

      const rawId = tds[2]?.textContent?.trim().replace('#', '');
      if (!rawId || isNaN(rawId)) continue;

      const calSpans = tds[6]?.querySelectorAll('span');
      const rawCalibratedAt = calSpans?.[0]?.textContent?.trim();
      const rawCalibratedBy = calSpans?.[1]?.textContent?.trim();

      const calibrated_at = (!rawCalibratedAt || rawCalibratedAt === '-')
        ? null
        : parseToISO(rawCalibratedAt);
      const calibrated_by = (!rawCalibratedBy || rawCalibratedBy === '-')
        ? null
        : rawCalibratedBy;

      const certText = tds[10]?.textContent?.trim();

        //console.log("Calibrated at: ", calibrated_at);
        //console.log("Calibrated by: ", calibrated_by);

        //console.log(certText);


      sensors.push({
        sensor_id:     rawId,
        zone:          tds[1]?.querySelector('span')?.textContent?.trim() ?? null,
        sensor_name:   tds[3]?.querySelector('span')?.textContent?.trim() ?? null,
        sensor_type:   normalizeType(tds[4]?.querySelector('span')?.textContent?.trim() ?? null),
        serial_number: tds[5]?.textContent?.trim() ?? null,
        calibrated_at,
        calibrated_by,
        old_offset:    parseFloatOrNull(tds[7]?.textContent),
        new_offset:    parseFloatOrNull(tds[8]?.textContent),
        cal_cert:      (!certText || certText === 'n/a') ? null : certText,
        server,
      });
    }
    return sensors;
  }

  function scrapeCalReport_v21(server) {
      console.log("scraping cal report for 2.1 server");
  const table = document.querySelector('table#tuq1')
             || document.querySelector('table.arms.p100');
  if (!table) return [];

  const rows = table.querySelectorAll('tbody tr');
  const sensors = [];

  for (const row of rows) {
    const tds = row.querySelectorAll('td');
    if (tds.length < 10) continue;

    // Sensor ID from row id attribute (e.g. "r171" → "171")
    const rawId = row.id?.replace(/^r/, '');
    if (!rawId || isNaN(rawId)) continue;

    // Calibrated at / by — plain text, "-" means null
    const rawCalibratedAt = tds[6]?.textContent?.trim();
    const rawCalibratedBy = tds[7]?.textContent?.trim();

    const calibrated_at = (!rawCalibratedAt || rawCalibratedAt === '-')
      ? null
      : parseToISO(rawCalibratedAt);
    const calibrated_by = (!rawCalibratedBy || rawCalibratedBy === '-')
      ? null
      : rawCalibratedBy;

    //console.log("Calibrated at: ", calibrated_at);
        //console.log("Calibrated by: ", calibrated_by);

    // Cal cert — anchor text, skip "n/a"
    const certText = tds[12]?.textContent?.trim();

    sensors.push({
      sensor_id:     rawId,
      zone:          tds[1]?.textContent?.trim() || null,
      sensor_name:   tds[2]?.querySelector('a')?.textContent?.trim() || null,
      sensor_type:   normalizeType(tds[3]?.textContent?.trim() || null),
      cp_address:    tds[4]?.textContent?.trim() || null,
      serial_number: tds[5]?.textContent?.trim() || null,
      calibrated_at,
      calibrated_by,
      old_offset:    parseFloatOrNull(tds[8]?.textContent),
      new_offset:    parseFloatOrNull(tds[9]?.textContent),
      cal_cert:      (!certText || certText === 'n/a') ? null : certText,
      server,
    });
  }
  return sensors;
}

    function scrapeCalReport_v20(server) {
      console.log("scraping cal report for 2.0 server");
  const table = document.querySelector('table#tuq1')
             || document.querySelector('table.arms.p100');
  if (!table) return [];

  const rows = table.querySelectorAll('tbody tr');
  const sensors = [];

  for (const row of rows) {
    const tds = row.querySelectorAll('td');
    if (tds.length < 10) continue;

    // Sensor ID from row id attribute (e.g. "r171" → "171")
    const rawId = row.id?.replace(/^r/, '');
    if (!rawId || isNaN(rawId)) continue;

    // Calibrated at / by — plain text, "-" means null
    const rawCalibratedAt = tds[5]?.querySelectorAll('span')[1]?.textContent?.trim();

    const rawCalibratedBy = tds[6]?.textContent?.trim();


    const calibrated_at = (!rawCalibratedAt || rawCalibratedAt === '-')
      ? null
      : parseToISO(rawCalibratedAt);
    const calibrated_by = (!rawCalibratedBy || rawCalibratedBy === '-')
      ? null
      : rawCalibratedBy;


    // Cal cert — anchor text, skip "n/a"
    const certText = tds[11]?.textContent?.trim();

    sensors.push({
      sensor_id:     rawId,
      zone:          tds[1]?.textContent?.trim() || null,
      sensor_name:   tds[2]?.textContent?.trim() || null,
      sensor_type:   normalizeType(tds[3]?.textContent?.trim() || null),
      serial_number: tds[4]?.textContent?.trim() || null,
      calibrated_at,
      calibrated_by,
      old_offset:    parseFloatOrNull(tds[7]?.textContent),
      new_offset:    parseFloatOrNull(tds[8]?.textContent),
      cal_cert:      (!certText || certText === 'n/a') ? null : certText,
      server,
    });
  }
  return sensors;
}


  /* ═══════════════════════════════════════════════════════
     HANDLER 3 — iserep1.php (calibration query / status)
     Fires on page load with cooldown. Batch upsert.
     Authoritative source for: cp_address, access_point,
     quality, status, sensor_type (full names), zone, serial.
     Best data quality — techs should leave this open.
  ════════════════════════════════════════════════════════ */
  function handleIseRep() {
    const server = getServer();
    const cooldownKey = `iserep_sync_${server}`;
    if (isCoolingDown(cooldownKey)) {
      console.log(`iserep cooldown active for server ${server}`);
      return;
    }

    const sensors = scrapeIseRep(server);
    if (!sensors.length) return;
      //console.log(sensors);

    postBatch(sensors, (count) => {
      setCooldown(cooldownKey);
      showBanner(`✓ Synced ${count} sensors status to dashboard`, '#1a6e2e');
    });
  }

  function scrapeIseRep(server) {
    // Columns: ID, CP_ADDRESS, SENSOR_NAME, SERIAL, OFFSET, AP, QUAL, STATUS, TYPE, ZONE, calibrated
  const table = document.querySelector('table#tuq1')
             || document.querySelector('table.arms.p100');
  if (!table) return [];

  const rows = table.querySelectorAll('tbody tr');
    const sensors = [];

    for (const row of rows) {
      const tds = row.querySelectorAll('td');
      if (tds.length < 11) continue;

      const rawId = tds[0]?.textContent?.trim();
      if (!rawId || isNaN(rawId)) continue;

      const rawCalibratedAt = tds[10]?.textContent?.trim();
      const calibrated_at = (!rawCalibratedAt || rawCalibratedAt === '-')
        ? null
        : parseToISO(rawCalibratedAt);

      sensors.push({
        sensor_id:    rawId,
        cp_address:   tds[1]?.textContent?.trim() || null,
        sensor_name:  tds[2]?.textContent?.trim() || null,
        serial_number:tds[3]?.textContent?.trim() || null,
        new_offset:   parseFloatOrNull(tds[4]?.textContent),
        access_point: tds[5]?.textContent?.trim() || null,
        quality:      tds[6]?.textContent?.trim() || null,
        status:       tds[7]?.textContent?.trim() || null,
        sensor_type:  normalizeType(tds[8]?.textContent?.trim() || null),
        zone:         decodeHtmlEntities(tds[9]?.textContent?.trim()) || null,
        calibrated_at,
        // calibrated_by intentionally omitted — not available on this page
        server,
      });
    }
      console.log(sensors);
    return sensors;
  }

  /* ─── Shared parsing helpers ──────────────────────────── */
  function parseFloatOrNull(text) {
    if (!text) return null;
    const v = parseFloat(text.trim());
    return isNaN(v) ? null : v;
  }

  function decodeHtmlEntities(text) {
    if (!text) return null;
    const el = document.createElement('textarea');
    el.innerHTML = text;
    return el.value;
  }

    function parseToISO(raw) {
        if (!raw || raw.trim() === '-') return null;
        const cleaned = raw.trim();

        // ISO-ish from server: "2026-02-26 13:25:42" or "2026-02-26T13:25:42"
        // Store as-is normalized to minute, NO UTC conversion
        // These are server local times — converting to UTC would shift them incorrectly
        if (/^\d{4}-\d{2}-\d{2}/.test(cleaned)) {
            return cleaned.replace('T', ' ').slice(0, 16); // "2026-02-26 13:25"
        }

        const longDate = cleaned.match(
            /^(?:[A-Za-z]+,\s*)?([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})\s+(\d{1,2}):(\d{2})(?::\d{2})?\s*(am|pm)$/i
        );
        if (longDate) {
            const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
            const month = months.indexOf(longDate[1].toLowerCase());
            if (month !== -1) {
                let hour = parseInt(longDate[4], 10);
                if (longDate[6].toLowerCase() === 'pm' && hour !== 12) hour += 12;
                if (longDate[6].toLowerCase() === 'am' && hour === 12) hour = 0;
                return `${longDate[3]}-${String(month + 1).padStart(2, '0')}-${String(parseInt(longDate[2], 10)).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${longDate[5]}`;
            }
        }

        // calreport format: "02/26/26 1:25 pm" or "04/03/26 11:33"
        const m = cleaned.match(
            /^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)?$/i
        );
        if (m) {
            let [, month, day, year, hours, minutes, seconds, ampm] = m;
            let h = parseInt(hours);
            if (ampm) {
                if (ampm.toLowerCase() === 'pm' && h !== 12) h += 12;
                if (ampm.toLowerCase() === 'am' && h === 12) h = 0;
            }
            const fullYear = year.length === 2 ? 2000 + parseInt(year, 10) : parseInt(year, 10);
            // Format as "YYYY-MM-DD HH:MM" without UTC conversion
            const MM = String(parseInt(month)).padStart(2, '0');
            const DD = String(parseInt(day)).padStart(2, '0');
            const HH = String(h).padStart(2, '0');
            const mm = String(parseInt(minutes)).padStart(2, '0');
            return `${fullYear}-${MM}-${DD} ${HH}:${mm}`;
        }

        // Last resort
        const d = new Date(cleaned);
        return isNaN(d) ? null : d.toISOString().replace('T', ' ').slice(0, 16);
    }

    function handleArmsIseRep() {
  const server = getServer();
  const cooldownKey = `arms_iserep_sync_${server}`;

  // Table only exists after form submit — if not present, nothing to do
  const table = document.querySelector('table[border="1"][width="100%"]');
  if (!table) return;

  if (isCoolingDown(cooldownKey)) {
    console.log(`ARMS iserep cooldown active for server ${server}`);
    return;
  }

  const sensors = scrapeArmsIseRep(server, table);
  if (!sensors.length) return;

  postBatch(sensors, (count) => {
    setCooldown(cooldownKey);
    showBanner(`✓ Synced ${count} sensors status to dashboard (ARMS) `, '#1a6e2e');
  });
}

function scrapeArmsIseRep(server, table) {
  const rows = table.querySelectorAll('tbody tr');
  const sensors = [];

  for (const row of rows) {
    const tds = row.querySelectorAll('td');
    if (tds.length < 11) continue;

    const rawId = tds[0]?.textContent?.trim();
    if (!rawId || isNaN(rawId)) continue;

    // Blank cells in ARMS are &nbsp; which becomes a non-breaking space
    const getText = (td) => {
      const t = td?.textContent?.trim().replace(/\u00a0/g, '').trim();
      return t || null;
    };

    const rawCalibratedAt = getText(tds[10]);
    const calibrated_at = rawCalibratedAt ? parseToISO(rawCalibratedAt) : null;

    // Quality cell may be blank for disabled sensors — treat as null
    const rawQual = getText(tds[6]);
    const quality = rawQual || null;

    sensors.push({
      sensor_id:    rawId,
      cp_address:   getText(tds[1]),
      sensor_name:  getText(tds[2]),
      serial_number:getText(tds[3]),
      new_offset:   parseFloatOrNull(tds[4]?.textContent),
      access_point: getText(tds[5]),
      quality,
      status:       getText(tds[7]),
      sensor_type:  normalizeType(getText(tds[8])),
      zone:         getText(tds[9]),
      calibrated_at,
      server,
    });
  }

  return sensors;
}

  /* ═══════════════════════════════════════════════════════
     HANDLER 4 — Live View
     Captures the latest visible sensor health/status and radio
     quality without submitting temperature readings.
  ════════════════════════════════════════════════════════ */
  function handleLiveView() {
    const server = getServer();
    if (!server) return;

    const cooldownKey = `liveview_sync_${server}`;
    if (isCoolingDown(cooldownKey)) {
      console.log(`Live View cooldown active for server ${server}`);
      return;
    }

    const sensors = scrapeLiveView(server);
    if (!sensors.length) return;

    postBatch(sensors, (count) => {
      setCooldown(cooldownKey);
      showBanner(`✓ Synced ${count} Live View sensor statuses to dashboard`, '#1a6e2e');
    });
  }

  function scrapeLiveView(server) {
    if (threePoint0) return scrapeLiveViewGuardian3(server);
    if (arms) return scrapeLiveViewArms(server);
    return scrapeLiveViewGuardian2(server);
  }

  function scrapeLiveViewGuardian3(server) {
    const sensors = [];
    for (const sensorCard of document.querySelectorAll('.sensordata .lvsensor')) {
      const nameElement = sensorCard.querySelector('.slnk, .slnk-title');
      const sensorId = getLiveViewSensorId(nameElement);
      if (!sensorId) continue;

      const box = sensorCard.closest('.senbox') || sensorCard;
      const zone = findPreviousZoneName(box);
      sensors.push(buildLiveViewRecord({
        sensorId,
        sensorName: nameElement?.textContent,
        sensorCard,
        reading: sensorCard.querySelector('.u'),
        statusContainer: box,
        zone,
        server,
      }));
    }
    return sensors;
  }

  function scrapeLiveViewGuardian2(server) {
    const sensors = [];
    for (const sensorCard of document.querySelectorAll('td.senbox')) {
      const nameElement = sensorCard.querySelector('.slnk');
      const sensorId = getLiveViewSensorId(nameElement);
      if (!sensorId) continue;

      const zoneTable = sensorCard.closest('table.zone');
      const zone = zoneTable?.querySelector('.zonename a')?.textContent
        || zoneTable?.querySelector('a[title*="show only"]')?.textContent
        || zoneTable?.querySelector('.zonename')?.textContent;
      const readCell = sensorCard.querySelector('.sencell');
      sensors.push(buildLiveViewRecord({
        sensorId,
        sensorName: nameElement?.textContent,
        sensorCard,
        reading: readCell?.querySelector('.read, .val'),
        statusContainer: readCell || sensorCard,
        zone,
        server,
      }));
    }
    return sensors;
  }

  function scrapeLiveViewArms(server) {
    const sensors = [];
    for (const nameElement of document.querySelectorAll('a.noul[href*="sensordetail.php"]')) {
      const sensorId = nameElement.href.match(/[?&]id=(\d+)/i)?.[1];
      if (!sensorId) continue;

      const sensorRow = nameElement.closest('tr');
      const readingCell = document.getElementById(`o_${sensorId}`);
      if (!sensorRow || !readingCell) continue;
      sensors.push(buildLiveViewRecord({
        sensorId,
        sensorName: nameElement.textContent,
        sensorCard: sensorRow,
        reading: readingCell,
        statusContainer: readingCell,
        server,
      }));
    }
    return sensors;
  }

  function buildLiveViewRecord({
    sensorId,
    sensorName,
    sensorCard,
    reading,
    statusContainer,
    zone,
    server,
  }) {
    const lid = sensorCard.querySelector('.lid');
    const lidText = getCleanText(lid);
    const typeCode = lidText?.match(/\b(RE|RM|SC|TC|HU|DP(?:\.25)?|BIN|O2)\s*$/i)?.[1];
    const accessPointTitle = sensorCard.querySelector('.lid [title^="AP "]')?.title;
    const status = getLiveViewStatus(reading, statusContainer);
    const record = {
      sensor_id: sensorId,
      server,
    };

    if (sensorName?.trim()) record.sensor_name = sensorName.trim();
    if (zone?.trim()) record.zone = normalizeLiveViewZoneName(zone);
    if (typeCode) record.sensor_type = normalizeType(typeCode);
    if (accessPointTitle) record.access_point = accessPointTitle.replace(/^AP\s+/i, '').trim();
    record.quality = getLiveViewQuality(reading, statusContainer);
    if (status) record.status = status;
    return record;
  }

  function getLiveViewSensorId(element) {
    if (!element) return null;
    const onclickId = element.getAttribute('onclick')?.match(/pop_sd\(\s*(\d+)\s*\)/i)?.[1];
    if (onclickId) return onclickId;
    return element.href?.match(/[?&]id=(\d+)/i)?.[1] || null;
  }

  function getCleanText(element) {
    return element?.textContent?.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim() || null;
  }

  function normalizeLiveViewZoneName(zone) {
    return zone
      .replace(/\s*(?:[-–]\s*)?\d+\s*\/\s*\d+\s+calibrated(?:\s*[✅✓]*)?\s*$/i, '')
      .trim();
  }

  function getLiveViewStatus(reading, statusContainer) {
    const readingText = getCleanText(reading);
    if (readingText && /\binactive\s+sensor\b/i.test(readingText)) return 'Disabled';
    if (readingText && /\b(check|disabled|offline|error|fault|high|low|normal|in range|out of range|sensor|network|link|probe|wire|initializ\w*|initialis\w*)\b/i.test(readingText)) {
      return readingText;
    }

    const rangeText = getCleanText(statusContainer.querySelector('.r'));
    if (rangeText) return rangeText;

    const classes = `${statusContainer.className || ''} ${reading?.className || ''}`
      .toLowerCase()
      .split(/\s+/);
    const statusClasses = [
      ['tnet', 'Check Network'],
      ['tlink', 'Check Link'],
      ['tsen', 'Check Sensor'],
      ['tdis', 'Disabled'],
      ['thigh', 'High'],
      ['tlow', 'Low'],
      ['tnorm', 'in range'],
    ];
    for (const [classPrefix, status] of statusClasses) {
      if (classes.some((className) => className.startsWith(classPrefix))) return status;
    }
    return null;
  }

  function getLiveViewQuality(reading, statusContainer) {
    const readingText = getCleanText(reading) || '';
    if (/\binit(?:ializ\w*|ialis\w*)?\b/i.test(readingText)) return 'INIT';
    if (/\bcheck\s*link\b/i.test(readingText)) return 'LINK';
    if (/\bcheck\s*network\b/i.test(readingText)) return 'NETWORK';
    if (/\bcheck\s*(?:sensor|probe(?:\s+wire)?)\b/i.test(readingText)) return 'SENSOR';
    if (/\b(?:inactive\s+sensor|disabled|offline|error|fault)\b/i.test(readingText)) return 'SENSOR';

    const classNames = `${statusContainer.className || ''} ${reading?.className || ''}`
      .toLowerCase()
      .split(/\s+/);
    if (classNames.some((name) => name.startsWith('tlink'))) return 'LINK';
    if (classNames.some((name) => name.startsWith('tnet'))) return 'NETWORK';
    if (classNames.some((name) => name.startsWith('tsen') || name.startsWith('tdis'))) return 'SENSOR';
    return 'GOOD';
  }

  function findPreviousZoneName(element) {
    let sibling = element.previousElementSibling;
    while (sibling) {
      if (sibling.matches('.zonetop')) {
        return sibling.querySelector('a[title="show only this zone"]')?.textContent
          || sibling.querySelector('a')?.textContent
          || null;
      }
      sibling = sibling.previousElementSibling;
    }
    return null;
  }


})();
