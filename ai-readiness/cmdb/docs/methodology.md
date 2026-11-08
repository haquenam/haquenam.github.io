# CMDB AI Readiness: Methodology (Alpha v0.2.0)

**Status:** independently developed research preview. The rules are transparent but not calibrated or certified.

## Intended use and scope
AI-assisted *read-only* change/service impact analysis using CI and service relationships. This assessment is not approval for autonomous changes or production actions.

## Evidence
Each criterion can use a user-supplied measurement, an anchored maturity score or an indicative self-rating. Selecting **Not assessed** completes the navigation requirement without contributing positive score or verified evidence. Noncritical **Not applicable** responses require a justification. Critical criteria cannot be excluded as N/A.

Assessors must identify the population, time period and evidence source, and should use a representative scope of critical services. The app does not validate answers against an instance.

## Scoring
- **Higher is better:** `100 × passing / eligible`.
- **Lower is better:** `100 × (1 − adverse / eligible)`.
- **Boolean:** 100 if pass, 0 if fail.
- **Maturity:** integer from 0 to 4, multiplied by 25.
- **Indicative self-rating:** 0–4 multiplied by 25; remains unverified.
- **Domain:** weighted mean of applicable scored criteria within that domain (equal criterion weights in this pilot).
- **Overall:** weighted mean of domains with scored criteria; missing evidence reduces coverage but is not silently assigned 0.
- **Presentation:** retain floating precision during calculation and round for display.

Pilot domain weights: Data integrity **20%**, CSDM/service modelling **15%**, relationships **25%**, governance/ownership **15%**, AI controls **10%**, AI impact-analysis validation **15%**.

The **75/100** and **80% coverage** conditions are illustrative project settings. ServiceNow's readiness evaluation threshold belongs to its own application and must not be treated as a universal CMDB threshold.

## Critical gates and decision
Eight use-case-specific controls are marked critical. Each needs an explicit gate result and sufficient evidence. A failed critical gate produces **Blocked by critical control** regardless of composite score; an unknown critical result prevents an assured positive outcome. Even a passing pilot outcome is only an *evidence-supported pilot candidate*, not a production authorisation.

## Evidence assurance and limitations
A measured answer marked verified contributes to evidence assurance; self-rating does not. This is respondent-declared verification and is **not independent assurance**. Evidence coverage and assurance are distinct from numerical quality.

The prototype does not compute statistically validated confidence intervals, enterprise benchmarks, a universal AI readiness index or ServiceNow-certified recommendations. Indicator thresholds, sampling methods and weights need independent SME review and realistic pilot testing before claims beyond research preview.

## Source hierarchy
1. Official, release-specific ServiceNow product documentation.
2. Recognised standards/frameworks for data quality and AI governance.
3. Community/practitioner implementation observations, clearly distinguished from official requirements.
4. Independently authored rules and hypotheses in this tool.

The [criteria register](criteria-register.md) identifies each proposed check, evidence, source code and remediation. The `assessment-packs/cmdb.json` file contains the executable version. The application also exposes a live source list in its Methodology section.

**Important:** Linked documents can change across ServiceNow releases or subscriptions. Verify each cited capability and rule against the target instance release before relying on an answer.

## Known improvement areas
- Calibrate weights and boundaries against real (appropriately de-identified) scenarios.
- Introduce richer evidence provenance and sampling quality.
- Expand use-case profiles and test failure/false-negative patterns.
- Strengthen offline accessibility and cross-browser tests.

