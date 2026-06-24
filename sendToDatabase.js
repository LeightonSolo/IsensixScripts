// ==UserScript==
// @name         Calibration Capture - Send to Visualizer Database (WIP)
// @namespace    https://github.com/LeightonSolo/IsensixScripts
// @version      2.0
// @description  Capture Calibration data and send to isensix visualizer database in realtime (3.0 and 2.1 only currently)
// @author       Leighton Solomon
// @match        https://*/guardian/calibration/calsensor.php*
// @match        https://*.isensix.com:*/guardian/calibration/calsensor.php*
// @match        https://*.isensix.com:*/arms2/calibration/calsensor.php*
// @match        https://*.isensix.com:*/guardian/calibration/calreport.php*
// @match        https://*.isensix.com:*/arms2/calibration/calreport.php*
// @match        https://*.isensix.com:*/guardian/iserep1.php*
// @match        https://*.isensix.com:*/arms2/iserep1.php*
// @match        https://*/arms2/calibration/calsensor.php*
// @downloadURL  https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/sendToDatabase.js
// @updateURL    https://raw.githubusercontent.com/LeightonSolo/IsensixScripts/main/sendToDatabase.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=isensix.com
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @connect      flat-tree-380f.leightonsolo.workers.dev
// ==/UserScript==

  let twoPointOne = false;
    try {//determine if the server is Guardian 3.0
        if(document.querySelector("#primary_nav_wrap > ul > li:nth-child(1) > a").title == "Guardian 2.1"){
            twoPointOne = true;
            console.log("2.1 Detected");
        }
    }
    catch(err){}

const TYPE_MAP = {
  'RE':  'Temp-RE',
  'RM':  'Temp-RM',
  'SC':  'Temp-SC',
  'TC':  'Temp-TC',
  'HU':  'Humidity',
  'DP':  'DiffPressure',
  'DP.25': 'DiffPressure',
  'MPM': 'Temp-MPM',
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
  const API_KEY    = 'Aerodrive123!';
  const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes per page type per server

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
          showBanner('✓ Calibration captured', '#1a6e2e');
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

  if (path.includes('calsensor.php')) handleCalSensor();
  else if (path.includes('calreport.php')) handleCalReport();
  else if (path.includes('iserep1.php')) handleIseRep();

  /* ═══════════════════════════════════════════════════════
     HANDLER 1 — calsensor.php (calibration confirmation)
     Fires on Confirm button click. Single record, high fidelity.
     Authoritative source for: calibrated_by, cp_address,
     cal_cert, canned_msg, old_offset, new_offset, calibrated_at
  ════════════════════════════════════════════════════════ */
  function handleCalSensor() {
    const confirmBtn = document.getElementById('BTN_SAVE');
    if (!confirmBtn) return;

    confirmBtn.addEventListener('click', () => {
    const data = (twoPointOne)
      ? scrapeCalSensor_v21()
      : scrapeCalSensor();
      if (!data) {
        showBanner('⚠ Could not read sensor data', '#8b1a1a');
        return;
      }
      postSingle(data);
    });
  }


  function scrapeCalSensor() {
    const server = getServer();

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
    const sensor_id = sensorIdCell?.querySelector('span')?.textContent?.trim() ?? null;
    // Don't capture sensor_type here — iserep1 is authoritative for full type names

    // Calibrated by from nav title — strip "Isensix " prefix
    const userLink = document.querySelector('a[href="/guardian/v2prefs.php"]');
    const calibrated_by = userLink?.getAttribute('title')?.replace(/^Isensix\s+/i, '').trim() ?? null;

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
    const calibrated_at = calAtRaw ? new Date(calAtRaw).toISOString() : null;

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


  const calibrated_by = document.querySelector("#primary_nav_wrap > ul > li:nth-child(12) > a > span").textContent.trim();

  // Hidden inputs — same as original
  const getHidden = (name) =>
    document.querySelector(`input[name="${name}"]`)?.value?.trim() ?? null;

  const new_offset = getHidden('offset');
  const canned_msg = getHidden('comment');

  // old_offset not available in 2.1 — omit
  // calibrated_at not available from ts[] — use current time
  const calibrated_at = new Date().toISOString();

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

    const sensors = (twoPointOne)
    ? scrapeCalReport_v21(server)
    : scrapeCalReport(server);
    if (!sensors.length) return;

    postBatch(sensors, (count) => {
      setCooldown(cooldownKey);
      showBanner(`✓ Synced ${count} sensors (overview)`, '#1a6e2e');
    });
  }







  function scrapeCalReport(server) {
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
        : new Date(rawCalibratedAt).toISOString();
      const calibrated_by = (!rawCalibratedBy || rawCalibratedBy === '-')
        ? null
        : rawCalibratedBy;

      const certText = tds[10]?.textContent?.trim();


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
      : new Date(rawCalibratedAt).toISOString();
    const calibrated_by = (!rawCalibratedBy || rawCalibratedBy === '-')
      ? null
      : rawCalibratedBy;

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
      showBanner(`✓ Synced ${count} sensors (status)`, '#1a6e2e');
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
        : new Date(rawCalibratedAt).toISOString();

      sensors.push({
        sensor_id:    rawId,
        cp_address:   tds[1]?.textContent?.trim() || null,
        sensor_name:  tds[2]?.textContent?.trim() || null,
        serial_number:tds[3]?.textContent?.trim() || null,
        new_offset:   parseFloatOrNull(tds[4]?.textContent),
        access_point: tds[5]?.textContent?.trim() || null,
        quality:      tds[6]?.textContent?.trim() || null,
        status:       tds[7]?.textContent?.trim() || null,
        sensor_type:  tds[8]?.textContent?.trim() || null,
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

})();
