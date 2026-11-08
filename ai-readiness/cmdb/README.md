# ServiceNow AI Readiness Assessment Suite by Enamul Haque

## CMDB AI Readiness — Alpha v0.2.0

[**Launch the CMDB assessment**](https://haquenam.github.io/ai-readiness/cmdb/)

This is an independently developed, open-source **research preview** that assesses the suitability of CMDB data for AI-assisted change and service impact analysis. It is **not** an official ServiceNow product, certification or production deployment approval.

### What is included

- Six guided stages with **30 criteria** and visible progress.
- Explanatory help, explicit responses for every question and sequential stage unlocking.
- Self-ratings and measured results; unassessed/N/A responses handled separately.
- Domain-weighted scoring, eight critical gates and evidence coverage.
- Synthetic demonstration, local JSON save/import, and browser **Print / Save as PDF**.
- A source-informed methodology and fully readable scoring engine.

### Run and test

The published `index.html` contains all CSS, configuration and JavaScript required to run the app without a backend. The same unbundled source appears under `src/` and `assessment-packs/` for inspection. No dependency installation is needed.

Run `node tests/scoring.test.js` (Node.js 18+ recommended) to validate the calculation engine against synthetic scenarios. Open `index.html` to use the assessment. On GitHub Pages it is deployed at the link above.

### Data and privacy

The assessment calculates in the visitor's browser; it has **no submission endpoint, account system or assessment database**. It does not send answers to the owner. JSON snapshots and browser-generated PDF reports stay under the visitor's control. Do not enter confidential configuration records, credentials or personal data. GitHub Pages may log requests/IP addresses for hosting and security. See [PRIVACY.md](PRIVACY.md).

### Methodology and evidence

The scoring rules, critical gates, weights and thresholds are **project-defined pilot hypotheses**, not universal ServiceNow AI readiness requirements. In particular, an illustrative score boundary of **75/100** and **80% evidence coverage** must not be presented as ServiceNow certification rules. An elevated aggregate cannot override a failed critical control.

Read [methodology](docs/methodology.md) and the [30-criterion register](docs/criteria-register.md) for references and limitations. The application is release-aware in intent but does **not** automatically inspect a ServiceNow instance or verify supplied measurements.

### Architecture and roadmap

This public alpha is hosted in a new isolated directory of the owner's existing GitHub Pages repository to avoid delaying testing. A future dedicated `servicenow-ai-readiness-suite` repository is planned. WordPress at [enamulhaque.co.uk](https://enamulhaque.co.uk/) will become the comprehensive public documentation home. Knowledge Article and Service Catalogue modules are not yet released.

Source: [MIT licence](LICENSE). ServiceNow is a trademark of its respective owner, used here solely to identify platform compatibility; no affiliation, approval or endorsement is implied.

