const tabScripts = new Map();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'SCRIPT_STARTED' && sender.tab?.id !== undefined) {
    const scripts = tabScripts.get(sender.tab.id) ?? new Set();
    scripts.add(message.name);
    tabScripts.set(sender.tab.id, scripts);
    return undefined;
  }

  if (message?.type === 'GET_SCRIPT_STATUS') {
    const scripts = [...(tabScripts.get(message.tabId) ?? [])].sort();
    sendResponse({ scripts });
    return undefined;
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
  if (changeInfo.status === 'loading') tabScripts.delete(tabId);
});

chrome.tabs.onRemoved.addListener((tabId) => {
  tabScripts.delete(tabId);
});
