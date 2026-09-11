chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
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
