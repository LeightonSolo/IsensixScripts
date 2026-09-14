# Leighton's Isensix Tools Chrome extension

This is the first Chrome extension conversion of the Tampermonkey scripts in the repository.

## Build and release

The files in `scripts` are generated from the original repository scripts. After editing a root script, run this from the repository root:

```powershell
.\chrome-extension\build.ps1
```

The build wraps each complete source file in its own async function. This prevents declarations from different content scripts from colliding while allowing the top-level awaits used by the original userscripts.

The build also adds a runtime status report to each generated script. Click the extension icon on a matching page to see which scripts reported in, along with a link to the technician help document.

The popup also has an enable/disable toggle for each script. Changes are saved per Chrome profile and reload the current page. The number on the extension icon is the number of scripts that reported in for the current tab.

To create a Web Store upload package, run this from the repository root:

```powershell
.\release-extension.ps1
```

This rebuilds the generated scripts, increments the patch version in `manifest.json`, validates the manifest, and creates `isensix-tools-<version>.zip` in the repository root. Upload that ZIP as an update to the existing Chrome Web Store item. To package without changing the version, use `-NoVersionBump`; to choose a specific version, use `-Version 1.2.0`.

## Local testing

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**.
3. Choose **Load unpacked** and select this `chrome-extension` folder.
4. Open a matching Isensix or Paylocity page.
5. After editing code, return to `chrome://extensions`, click the extension reload button, and refresh the page.

The original userscripts remain at the repository root while this migration is tested.

## Chrome Web Store deployment

- `manifest.json` contains the former `@match` rules.
- `compatibility.js` translates the storage and request APIs used by the migrated scripts.
- `service-worker.js` performs the cross-origin request previously handled by `GM_xmlhttpRequest`.
- `popup.html` shows the scripts that reported in for the current tab and links to the technician help document.
- Publish the extension as **Unlisted** so technicians can install it from the direct Web Store link.
- Keep the same Web Store item for future releases. Upload each new version to that item so Chrome can update existing installations.
- Before publishing, test the ZIP as a clean installation and confirm the Web Store privacy and data-use declarations are accurate.
- The draft privacy policy is at [../PRIVACY-POLICY.md](../PRIVACY-POLICY.md). Publish it at a public HTTPS URL and add that URL in the Web Store privacy settings.
- The API key in the extension is visible to installed users. Use a low-privilege, rate-limited key and rotate it if it is exposed.
