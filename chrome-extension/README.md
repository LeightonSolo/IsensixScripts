# Leighton's Isensix Tools Chrome extension

This is the first Chrome extension conversion of the Tampermonkey scripts in the repository.

## Rebuild migrated scripts

The files in `scripts` are generated from the original repository scripts. After editing a root script, run this from the repository root:

```powershell
.\chrome-extension\build.ps1
```

The build wraps each complete source file in its own async function. This prevents declarations from different content scripts from colliding while allowing the top-level awaits used by the original userscripts.

The build also adds a runtime status report to each generated script. Click the extension icon on a matching page to see which scripts reported in, along with a link to the technician help document.

## Local testing

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**.
3. Choose **Load unpacked** and select this `chrome-extension` folder.
4. Open a matching Isensix or Paylocity page.
5. After editing code, return to `chrome://extensions`, click the extension reload button, and refresh the page.

The original userscripts remain at the repository root while this migration is tested.

## Current migration notes

- `manifest.json` contains the former `@match` rules.
- `compatibility.js` translates the storage and request APIs used by the migrated scripts.
- `service-worker.js` performs the cross-origin request previously handled by `GM_xmlhttpRequest`.
- `popup.html` shows the scripts that reported in for the current tab and links to the technician help document.
- This is a development build. It is not yet packaged or published for technician distribution.
- Rotate any API key that has been committed to a public repository before production use.
