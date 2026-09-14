const HELP_URL = 'https://docs.google.com/document/d/1SPD0375j1HjBwO5maCj5_XXBmlDgxA0cy09b2oa6IgQ';
const SCRIPT_NAMES = [
  'ARMSDebugQuery',
  'AutocloseCalibrationTabs',
  'AutofillTimes&Readings',
  'CalibrateButtonsOnLiveView',
  'CalibratedCheckmarks',
  'CalibrationCatcherARMS',
  'CalibrationCatcherGuardian',
  'CopySummaryGuardian',
  'LastCalibrationsTable',
  'LatestCalibrationTimes',
  'PaylocityTools',
  'TimeoutWarning',
  'calReportChecking',
  'certSelector',
  'sendToDatabase'
];

const pageElement = document.getElementById('page');
const statusElement = document.getElementById('status');
const runningScriptsElement = document.getElementById('running-scripts');
const otherScriptsElement = document.getElementById('other-scripts');

function renderScripts(runningScripts, enabled) {
  runningScriptsElement.replaceChildren();
  otherScriptsElement.replaceChildren();

  if (!runningScripts.length) {
    const item = document.createElement('li');
    item.className = 'muted';
    item.textContent = 'No scripts are running on this page.';
    runningScriptsElement.appendChild(item);
  }

  const otherScripts = SCRIPT_NAMES.filter((script) => !runningScripts.includes(script));
  if (!otherScripts.length) {
    const item = document.createElement('li');
    item.className = 'muted';
    item.textContent = 'All available scripts are running on this page.';
    otherScriptsElement.appendChild(item);
  }

  function createScriptItem(script, isRunning) {
    const item = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = script;
    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.checked = enabled[script] !== false;
    toggle.title = `Enable ${script}`;
    toggle.setAttribute('aria-label', `Enable ${script}`);
    toggle.addEventListener('change', async () => {
      toggle.disabled = true;
      await chrome.runtime.sendMessage({ type: 'SET_SCRIPT_ENABLED', tabId: activeTabId, name: script, enabled: toggle.checked });
    });
    if (!isRunning) item.classList.add('inactive');
    item.append(label, toggle);
    return item;
  }

  for (const script of runningScripts) {
    runningScriptsElement.appendChild(createScriptItem(script, true));
  }

  for (const script of otherScripts) {
    otherScriptsElement.appendChild(createScriptItem(script, false));
  }
}

let activeTabId;

async function loadStatus() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    statusElement.textContent = 'Unavailable';
    pageElement.textContent = 'No active page';
    renderScripts([], {});
    return;
  }

  activeTabId = tab.id;
  pageElement.textContent = tab.url ? new URL(tab.url).hostname : 'Current page';
  const [response, settings] = await Promise.all([
    chrome.runtime.sendMessage({ type: 'GET_SCRIPT_STATUS', tabId: tab.id }),
    chrome.runtime.sendMessage({ type: 'GET_SCRIPT_SETTINGS' })
  ]);
  renderScripts(response?.scripts ?? [], settings?.enabled ?? {});
  statusElement.textContent = response?.scripts?.length ? 'Active' : 'Idle';
}

loadStatus().catch(() => {
  statusElement.textContent = 'Unavailable';
  pageElement.textContent = 'Unable to inspect this page';
  renderScripts([], {});
});

document.querySelector('.help').addEventListener('click', (event) => {
  event.preventDefault();
  chrome.tabs.create({ url: HELP_URL });
});
