const tabScripts = new Map();

function updateBadge(tabId) {
  const count = tabScripts.get(tabId)?.size ?? 0;
  chrome.action.setBadgeText({ tabId, text: count ? String(count) : '' });
  if (count) chrome.action.setBadgeBackgroundColor({ tabId, color: '#477c71' });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'SCRIPT_STARTED' && sender.tab?.id !== undefined) {
    const scripts = tabScripts.get(sender.tab.id) ?? new Set();
    scripts.add(message.name);
    tabScripts.set(sender.tab.id, scripts);
    updateBadge(sender.tab.id);
    return undefined;
  }

  if (message?.type === 'GET_SCRIPT_STATUS') {
    const scripts = [...(tabScripts.get(message.tabId) ?? [])].sort();
    sendResponse({ scripts });
    return undefined;
  }

  if (message?.type === 'GET_SCRIPT_SETTINGS') {
    chrome.storage.local.get(null).then((settings) => {
      const enabled = {};
      for (const [key, value] of Object.entries(settings)) {
        if (key.startsWith('isensix-script:')) enabled[key.slice('isensix-script:'.length)] = value !== false;
      }
      sendResponse({ enabled });
    });
    return true;
  }

  if (message?.type === 'SET_SCRIPT_ENABLED') {
    const key = `isensix-script:${message.name}`;
    chrome.storage.local.set({ [key]: message.enabled }).then(() => {
      if (message.tabId !== undefined) chrome.tabs.reload(message.tabId);
      sendResponse({ ok: true });
    });
    return true;
  }

  if (message?.type !== 'GM_XMLHTTP_REQUEST') return undefined;

  const { method = 'GET', url, headers, data } = message.details;
  fetch(url, { method, headers, body: data })
    .then(async (response) => ({
      status: response.status,
      statusText: response.statusText,
      responseText: await response.text(),
      response: response.url
    }))
    .then((result) => sendResponse({ ok: true, result }))
    .catch((error) => sendResponse({ ok: false, error: { error: error.message } }));

  return true;
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    tabScripts.delete(tabId);
    updateBadge(tabId);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  tabScripts.delete(tabId);
});
