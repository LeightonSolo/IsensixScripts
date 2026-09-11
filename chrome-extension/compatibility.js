// Compatibility helpers for scripts that previously ran under Tampermonkey.
(() => {
  if (globalThis.GM) return;

  const storage = {
    async getValue(key, fallbackValue) {
      const values = await chrome.storage.local.get(key);
      return values[key] === undefined ? fallbackValue : values[key];
    },
    async setValue(key, value) {
      await chrome.storage.local.set({ [key]: value });
    },
    async listValues() {
      return Object.keys(await chrome.storage.local.get(null));
    },
    async deleteValue(key) {
      await chrome.storage.local.remove(key);
    }
  };

  globalThis.GM = storage;

  // These two calls are used synchronously by sendToDatabase for cooldowns.
  globalThis.GM_getValue = (key, fallbackValue) => {
    const value = localStorage.getItem(`isensix-tools:${key}`);
    if (value === null) return fallbackValue;
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  globalThis.GM_setValue = (key, value) => {
    localStorage.setItem(`isensix-tools:${key}`, JSON.stringify(value));
  };

  globalThis.GM_xmlhttpRequest = (details) => {
    chrome.runtime.sendMessage({ type: 'GM_XMLHTTP_REQUEST', details }, (response) => {
      if (chrome.runtime.lastError || !response) {
        details.onerror?.({ error: chrome.runtime.lastError?.message || 'No response' });
        return;
      }
      if (response.ok) details.onload?.(response.result);
      else details.onerror?.(response.error);
    });
  };
})();
