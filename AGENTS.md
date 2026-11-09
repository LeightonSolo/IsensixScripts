# Isensix Chrome Extension Scripts

This repository contains the Tampermonkey/Chrome extension scripts used by Isensix Field Operations technicians.

## Canonical repositories

Chrome extension:

https://github.com/LeightonSolo/IsensixScripts

Dashboard:

https://github.com/LeightonSolo/isensix-calibration-visualizer

The dashboard repository is separate. Do not assume dashboard UI or Worker changes belong in this repository.

## System data flow

1. These scripts run in technicians' browsers through Tampermonkey or Chrome.
2. They read relevant data from Isensix customer servers.
3. They normalize the collected data.
4. They send data to Cloudflare Workers.
5. Cloudflare Workers store and serve data through the `calibration-db` Cloudflare D1 database.
6. The dashboard repository presents calibration history, server inventory, Job Information, analytics, calendar scheduling, travel planning, and reports.

## Repository responsibilities

This repository owns:

- Tampermonkey and Chrome extension scripts
- Customer-server page integration
- Browser-side data extraction
- Data normalization and payload construction
- Requests that send collected data to Cloudflare Workers
- Extension-specific authentication, timing, and retry behavior

The `isensix-calibration-visualizer` repository owns:

- Dashboard pages and browser-side UI
- Cloudflare Worker routes and API contracts
- Cloudflare D1 schemas, migrations, and queries
- Calibration history and server inventory views
- Job Information records, analytics, and cleanup workflows
- Calendar scheduling, technician assignments, and travel details
- Reports and summary views

## Working rules

- Identify the active repository before editing. Use the Git remote and repository contents rather than assuming a local filesystem path.
- Treat Worker endpoints, request payloads, D1 schemas, and field names as shared interfaces between the two repositories.
- When changing a payload field, inspect the corresponding Worker consumer, D1 schema, and dashboard usage.
- When changing a Worker response or database field, check whether these scripts depend on it before removing or renaming it.
- Preserve compatibility with the customer-server pages where practical; these scripts may run against multiple Isensix versions.
- Be careful with browser permissions, authentication tokens, customer data, and technician-specific behavior.
- Prefer small, reviewable changes and run relevant syntax checks or tests after edits.
- Do not modify dashboard files from this repository unless explicitly requested.
- If code and this document disagree, inspect the current implementation, report the conflict, and follow the user's explicit request.

## Cross-repository change checklist

When a change affects data sent to the dashboard:

1. Identify the payload field or endpoint being changed.
2. Find the matching Worker route in `isensix-calibration-visualizer`.
3. Check the D1 schema and migrations.
4. Check dashboard consumers and analytics.
5. Preserve backward compatibility when older extension versions may still be active.
6. Test the extension payload and the Worker consumer together when possible.