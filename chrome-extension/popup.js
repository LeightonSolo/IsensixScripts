const HELP_URL = 'https://docs.google.com/document/d/1SPD0375j1HjBwO5maCj5_XXBmlDgxA0cy09b2oa6IgQ';

const pageElement = document.getElementById('page');
const statusElement = document.getElementById('status');
const scriptsElement = document.getElementById('scripts');

function renderScripts(scripts) {
  scriptsElement.replaceChildren();

  if (!scripts.length) {
    const item = document.createElement('li');
    item.className = 'muted';
    item.textContent = 'No Isensix Tools scripts reported on this page.';
    scriptsElement.appendChild(item);
    return;
  }

  for (const script of scripts) {
    const item = document.createElement('li');
    item.textContent = script;
    scriptsElement.appendChild(item);
  }
}

async function loadStatus() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    statusElement.textContent = 'Unavailable';
    pageElement.textContent = 'No active page';
    renderScripts([]);
    return;
  }

  pageElement.textContent = tab.url ? new URL(tab.url).hostname : 'Current page';
  const response = await chrome.runtime.sendMessage({ type: 'GET_SCRIPT_STATUS', tabId: tab.id });
  renderScripts(response?.scripts ?? []);
  statusElement.textContent = response?.scripts?.length ? 'Active' : 'Idle';
}

loadStatus().catch(() => {
  statusElement.textContent = 'Unavailable';
  pageElement.textContent = 'Unable to inspect this page';
  renderScripts([]);
});

document.querySelector('.help').addEventListener('click', (event) => {
  event.preventDefault();
  chrome.tabs.create({ url: HELP_URL });
});
