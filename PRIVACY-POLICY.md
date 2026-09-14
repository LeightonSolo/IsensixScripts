# Privacy Policy for Leighton's Isensix Tools

**Effective date:** September 14, 2026

Leighton's Isensix Tools is a Chrome extension that adds workflow, validation, calibration, and reporting helpers to Isensix pages. It may also provide limited tools for Paylocity pages.

## Information the extension accesses

Depending on which features are enabled and which supported page is open, the extension may access information displayed in the current page, including:

- Isensix sensor IDs, names, serial numbers, zones, CP addresses, sensor types, offsets, calibration certificates, calibration comments, calibration times, calibration status, and related page information.
- The logged-in technician name when it is displayed on an Isensix page.
- Information displayed on supported Paylocity pages when a Paylocity helper is enabled.
- The page URL and hostname needed to determine whether a supported feature should run.

The extension does not intentionally collect browsing history, passwords, payment-card information, or unrelated page content.

## How information is used

Information accessed from supported pages is used to:

- Add calibration workflow assistance and validation to supported pages.
- Remember extension preferences, such as which scripts are enabled and user-selected workflow settings.
- Synchronize calibration information with the project's dashboard database when the calibration synchronization feature is enabled.

The extension does not use information for advertising, profiling, or sale to data brokers.

## Information sent to a server

The calibration synchronization feature sends the calibration data needed by the dashboard to:

`https://flat-tree-380f.leightonsolo.workers.dev`

This may include sensor and calibration information listed above, including the technician name when available. The server is operated for this project and is used to receive and store dashboard data.

**Data retention:** The project retains synchronized data for **[insert retention period or state "as long as needed for the calibration dashboard"]**. Update this statement to match the actual Worker/database retention behavior before publishing.

The extension does not send page data to the project server when the relevant synchronization feature is disabled. Other helper scripts primarily use page data locally in the browser.

## Local storage

The extension stores settings and temporary workflow state in Chrome extension storage or the website's local storage. This can include:

- Whether individual scripts are enabled or disabled.
- Cooldown timestamps used to avoid duplicate synchronization.
- User-selected workflow preferences and locally cached calibration display data.

This information remains on the technician's Chrome profile unless Chrome storage is cleared or the extension is removed. The extension does not use this storage for advertising.

## Sharing

We do not sell personal information. Information is shared only with the project dashboard server described above when required to provide the extension's calibration synchronization feature, or when disclosure is required by law.

## Security

The extension uses HTTPS when communicating with the project dashboard server. No method of electronic transmission or storage is completely secure. The extension includes a client-side request credential to authorize dashboard requests; because extension code is visible to installed users, that credential should be treated as non-secret, limited in privilege, rate-limited, and rotated when necessary.

## Children's privacy

The extension is intended for workplace use and is not directed to children under 13. We do not knowingly collect information from children.

## Changes to this policy

This policy may be updated when the extension's data practices change. The updated version will be posted at the policy URL shown in the Chrome Web Store listing, with a revised effective date.

## Contact

For privacy questions or requests, contact:

**Privacy contact:** Leighton Solomon

**Email:** lsolomon@dwyeromega.com
