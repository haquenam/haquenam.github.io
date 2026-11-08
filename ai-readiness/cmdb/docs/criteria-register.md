# CMDB AI Readiness Assessment: Criteria Register v0.1

**Product:** ServiceNow AI Readiness Assessment Suite by Enamul Haque  
**Prepared:** 8 November 2026  
**Status:** Source-grounded draft of actual assessment questions; ready for methodology and usability review  
**First target use case:** AI-assisted change and service impact analysis using CMDB CI and service relationships  
**Do not claim:** ServiceNow endorsement, certification, universal readiness thresholds or verified industry benchmark.

## What is established now

These **30 actual candidate questions** are ready to be used in a questionnaire and measurable-evidence workflow. They were assembled from the prior research/memory pack and checked against the ServiceNow sources below. Official ServiceNow guidance supports the underlying data-health and CSDM subject matter; **the question wording, selection, gate assignment, sample tests and combined scoring approach are independent project design choices**. All questions do **not** need to appear to every respondent: applicability depends on scope and capabilities.

Before the assessment begins, collect non-scored scope metadata: relevant ServiceNow release and licensed capabilities; target AI use case; selected CI classes and critical services; assessment period; scope exclusions; whether the AI feature is advisory-only; and evidence mode (indicative self-report or measured). Do not request production credentials or raw confidential CMDB exports.

**Answer modes:** measurable numeric numerator/denominator; bounded expert-reviewed sample; evidence-based 0–4 process maturity; scenario test results; conditional pass/fail. Each answer also has **not assessed / evidence missing / not applicable (with reason)**. Users may provide a self-rating for an indicative assessment, but it is not equivalent to verified measurements. A failed critical gate must override any high aggregate score. The 0–100 weights and threshold values remain provisional and need realistic pilot calibration; that does *not* prevent the questions from being published in this draft.

**Source traceability convention:** `SN-H` / `SN-M` / `SN-F` / `SN-C` / `SN-I` / `SN-A` refer to ServiceNow documentation; `NIST` refers to an external framework. A source code means *basis for the check*, not an assertion that the vendor publishes the exact same question, weight, gate or target.

## The 30-question register

### D1. Data completeness and integrity

| ID | Assessment question | Measurement or scoring basis | Evidence required | Source basis | Critical gate? |
|---|---|---|---|---|---|
| **C01** | What proportion of in-scope CIs have every *required* identity attribute populated? | CIs passing required-field rules ÷ eligible in-scope CIs, by class | CMDB Health Completeness, configured required fields and inclusion rules | SN-H, SN-M | No |
| **C02** | What proportion of in-scope CIs have the *recommended* operational attributes populated? | CIs passing recommended-field rules ÷ eligible in-scope CIs, by class | CMDB Health recommended-fields metric; class-scoped sampled records | SN-H, SN-M | No |
| **C03** | What is the duplicate CI rate for independently identified CI classes in scope? | Duplicate independent CIs ÷ eligible independent CIs | CMDB Health Correctness duplicate metric, identification rules | SN-M, SN-I | No |
| **C04** | What is the stale CI rate under appropriate, class-specific freshness rules? | Stale in-scope CIs ÷ eligible in-scope CIs, with rule and period stated | CMDB Health staleness scorecards, class-specific rules | SN-M, SN-F | No |
| **C05** | What is the orphan CI rate under the approved class-specific orphan rules? | Orphan CIs ÷ eligible CIs, by class and rule | CMDB Health orphan metric; actual configured orphan rules | SN-M | No |
| **C06** | Do relevant CIs pass the configured CMDB compliance audits for the target use case? | CIs passing relevant current audits ÷ CIs evaluated, disclose audit coverage | CMDB Health compliance audits; audit run date and rule scope | SN-H, SN-M | No |

### D2. CSDM and service modelling

| ID | Assessment question | Measurement or scoring basis | Evidence required | Source basis | Critical gate? |
|---|---|---|---|---|---|
| **C07** | Are in-scope business applications, application services and technical CIs classified in the correct CSDM roles/classes? | Expert-reviewed correctly classified records ÷ sample reviewed | CSDM Data Foundations stage reports and sampled class review | SN-C | No |
| **C08** | Are critical application services represented and linked to their technical components? | Critical application services with validated technical support map ÷ in-scope critical application services | CSDM dashboards and service-map review | SN-C | No |
| **C09** | Are business services or offerings related to the correct application services where the use case requires those links? | Required service-to-application links confirmed ÷ expected links in sampled critical services | CSDM Run-stage indicators and owner-verified service mappings | SN-C | No |
| **C10** | Can each selected business-critical service be traced to the right technical dependency scope? | Critical services with verified end-to-end paths ÷ critical services tested | CSDM service model, dependency view, stakeholder review | SN-C, SN-A | Yes — for target critical services |
| **C11** | Are the CSDM Data Foundations findings relevant to the chosen use case reviewed and assigned remediation owners? | Applicable high-priority findings with accepted dispositions ÷ relevant high-priority findings | CSDM Data Foundations report, improvement backlog and ownership | SN-C | No |

### D3. Service relationships and dependency quality

| ID | Assessment question | Measurement or scoring basis | Evidence required | Source basis | Critical gate? |
|---|---|---|---|---|---|
| **C12** | What proportion of expected dependencies for critical services is represented in the CMDB? | Verified present expected links ÷ reference expected links; require bounded sample | Expert-validated architecture topology compared with CMDB links | SN-C, SN-A | No |
| **C13** | Are the types and directions of dependencies correct for impact traversal? | Correct link type/direction ÷ sampled reference links | Relationship records versus trusted topology reference | SN-M, SN-A | Yes — for critical traversed paths |
| **C14** | What percentage of in-scope CI relationships are duplicates? | Duplicate relationships ÷ relationships in assessment scope | CMDB Relationship Health duplicate metric | SN-H, SN-M | No |
| **C15** | What percentage of in-scope relationships are orphaned? | Orphan relationships ÷ relationships in scope | CMDB Relationship Health orphan metric | SN-H, SN-M | No |
| **C16** | What percentage of in-scope relationships are stale because a connected CI is stale? | Stale relationships ÷ relationships in scope | CMDB Relationship Health stale metric | SN-M | No |
| **C17** | Do relevant relationships comply with configured suggested, hosting and containment rules? | Compliant applicable links ÷ links tested; identify exclusions | CMDB Relationship Health rule conformance summaries | SN-H, SN-M | No |
| **C18** | Do representative dependency traversals return the expected upstream/downstream impact paths for Tier-1 services? | Passing predefined topology tests ÷ executed tests; record false negatives | Approved topology gold set, traversal outcomes, expected impact path | SN-A, SN-C | Yes — critical service coverage |

### D4. Governance, provenance and ownership

| ID | Assessment question | Measurement or scoring basis | Evidence required | Source basis | Critical gate? |
|---|---|---|---|---|---|
| **C19** | What proportion of in-scope CIs and services has an active, accountable operational owner? | Records with valid active accountable owner ÷ eligible CI/service records | CMDB ownership attributes, team references, sampled attestation | SN-F, SN-C | No |
| **C20** | Are authoritative data sources and attribute-level reconciliation responsibilities defined for critical CI classes? | Relevant classes/attributes with defined source authority ÷ relevant set | IRE reconciliation and source-rule review; source catalogue | SN-I, SN-F | No |
| **C21** | Do CI identification rules uniquely identify records entering the in-scope CMDB classes? | Positive and collision tests passed ÷ defined IRE test cases | Identification rule configuration and duplicate simulation results | SN-I | No |
| **C22** | Are critical CI/service records periodically certified or reviewed by accountable owners? | Due reviews completed and valid ÷ due reviews in defined period | Certification/audit tasks, attestation dates, sampled reviews | SN-H, SN-C | No |
| **C23** | Are CMDB Health jobs, remediation workflows and trend reviews operating for relevant classes and rules? | Controls operating and evidenced, 0–4 maturity anchors | Enabled health jobs, health-history reports, remediation backlog and closure verification | SN-H, SN-F | No |

### D5. AI security and operational controls

| ID | Assessment question | Measurement or scoring basis | Evidence required | Source basis | Critical gate? |
|---|---|---|---|---|---|
| **C24** | Can only properly authorised users and AI workflows access the in-scope CI and service information? | Allowed and denied access tests passed ÷ relevant persona tests | Role- and persona-based positive/negative access tests; technical control configuration | NIST | Yes — confidentiality and authorisation |
| **C25** | Can a reviewer trace an AI impact conclusion back to the input CI/change and dependency path used? | Explanations with sufficient reproducible references ÷ sampled test outputs | Scenario log, input context, topology path, explanation/citation review | SN-A, NIST | No |
| **C26** | Is the impact assessment advisory-only, or are any production-affecting actions explicitly authorised, logged and subject to approval/rollback? | Pass/fail conditional gate: if read-only, verify read-only boundary; if action-enabled, verify controls | Action-capability inventory, permissions, approval and rollback test evidence | NIST | Yes — apply to configured action capability |

### D6. AI impact-analysis use-case validation

| ID | Assessment question | Measurement or scoring basis | Evidence required | Source basis | Critical gate? |
|---|---|---|---|---|---|
| **C27** | Can the target CI be correctly resolved from representative change/incident inputs? | Correct target CI resolutions ÷ benchmark input cases | Gold-set cases, resolved CI identifiers, false-resolution analysis | SN-A | Yes — for required entry route |
| **C28** | Are change/incident descriptions sufficiently specific to support reliable dependency-based impact reasoning? | Cases meeting an approved description quality rubric ÷ sampled cases | Redacted case descriptions, SME rubric and review evidence | SN-A | No |
| **C29** | How often does the output identify the correct affected critical services without missing major impacts? | Critical-service recall and false-negative rate on expert-reviewed gold set | Reference impact scenarios and SME-scored expected/actual results | SN-A, NIST | Yes — use-case safety/accuracy |
| **C30** | When input/topology is missing, ambiguous or contradictory, does the AI fail safely and disclose uncertainty rather than assert unsupported impact conclusions? | Safe handling success ÷ negative and ambiguous test scenarios | Deliberately incomplete and contradictory test cases, expected responses | SN-A, NIST | Yes — handling unknowns |

## Implementation notes: why these are not simply 30 Likert questions

1. **Use native metrics when they exist.** CMDB Health provides configured completeness, correctness, compliance and relationship health; do not overwrite its definitions or mix incompatible denominator populations.
2. **State the measurement scope.** Report by critical service and CI class, in addition to any estate-wide summary; a broad average can conceal failed Tier-1 dependencies.
3. **Separate status from score.** A critical gate can be `pass`, `fail`, `unknown`, or `not applicable with justification`. It must not be silently averaged into a 0–100 score.
4. **Avoid invented vendor cut-offs.** There is no basis here for claiming that 80% relationship coverage, 90% ownership or any single headline figure constitutes an official ServiceNow AI-readiness requirement. Define preliminary targets only for pilots, disclose their status and calibrate them with tested outcomes.
5. **Assign question-level remedial guidance.** The table below contains initial actions; all should be refined when the evidence schema and ownership model are agreed.
6. **Revalidate release-specific capabilities** at implementation, especially Now Assist for CMDB and Data Foundations, since editions, plugins and UI naming change.
7. **Synthetic test fixtures** should include high scores with failed access, wrong direction on one critical edge, missing evidence, and ambiguous CI inputs.

### Suggested scoring contract (not yet a final acceptance standard)

- Each measured criterion normalises to 0–100 using a **typed** formula (higher-is-better, lower-is-better, maturity, scenario, binary).
- Aggregate applicable assessed criteria via transparent weights, retaining full precision until presentation.
- Report separately: `maturity score`, `critical gate status`, `evidence coverage/assurance`, `tested scenario performance`.
- `not assessed` is not a pass; `N/A` requires justification. Missing mandatory evidence can produce `Not verifiable` rather than a positive readiness decision.
- Proposed use-case decision labels: `Blocked`, `Not verifiable`, `Remediation required`, `Pilot candidate`, `Production candidate (human approval required)`.

### Example answer record

```json
{
  "criterionId": "C13",
  "scope": "Critical application service dependency paths",
  "type": "scenario-test",
  "passed": 18,
  "tested": 20,
  "assurance": "expert-validated-sample",
  "criticalGate": "fail",
  "criticalFailures": 2,
  "status": "blocked",
  "sourceRuleVersion": "0.1.0",
  "remarks": "Illustrative fictional data, not a ServiceNow threshold"
}
```

## Initial remediation catalogue

| ID | Remediation if check fails |
|---|---|
| C01 | Repair missing required attributes; correct class rules and feeds. |
| C02 | Define fit-for-purpose field rules and fill high-value gaps. |
| C03 | Investigate identification rules, data-source overlaps and duplicate-remediation tasks. |
| C04 | Review collection schedules, staleness policies and retirement. |
| C05 | Correct missing dependencies or attributes; retire obsolete records. |
| C06 | Enable/fix applicable audits and address repeated failures. |
| C07 | Reclassify wrongly modelled records and update modelling standards. |
| C08 | Populate missing application services and supporting-CI relationships. |
| C09 | Link the service model to the application service layer. |
| C10 | Resolve missing service model nodes and wrong dependency edges. |
| C11 | Triage model gaps, designate owners and evidence closure. |
| C12 | Map missing dependencies, focusing on critical service paths. |
| C13 | Correct parent/child direction and relationship semantics; rerun traversal. |
| C14 | Deduplicate invalid relationships; fix ingest rules. |
| C15 | Repair broken endpoints or clean up invalid links. |
| C16 | Repair the source CI freshness issue and recheck its links. |
| C17 | Correct invalid relationship types and class modelling. |
| C18 | Repair missing/wrong service paths and retest affected scenarios. |
| C19 | Assign accountable owners and remove inactive/stale references. |
| C20 | Define data authority and reconcile conflicting updates. |
| C21 | Adjust identification precedence and validate multiple-source cases. |
| C22 | Introduce risk-based attestation and review cadence. |
| C23 | Activate the appropriate jobs; assign health findings and monitor recurring errors. |
| C24 | Correct access policy and verify negative tests before use. |
| C25 | Record source context and show dependency path/uncertainty in reports. |
| C26 | Enforce human approval and guardrails; never infer autonomous permission from analysis capability. |
| C27 | Improve CI linking and reference quality; reject ambiguous inputs. |
| C28 | Improve required description fields and requester guidance. |
| C29 | Fix reference topology, tune assumptions, constrain deployment until misses are understood. |
| C30 | Add insufficient-evidence handling, uncertainty messages and human review. |

## Documented source register (check against the assessed release)

- **SN-H** — ServiceNow CMDB Health overview: https://www.servicenow.com/docs/r/servicenow-platform/configuration-management-database-cmdb/overview-cmdb-health.html
- **SN-M** — ServiceNow CMDB Health KPIs and metrics: https://www.servicenow.com/docs/r/servicenow-platform/configuration-management-database-cmdb/r_CMDBHealthMetrics.html
- **SN-F** — ServiceNow CMDB success advisor / Data Foundations: https://www.servicenow.com/docs/r/servicenow-platform/configuration-management-database-cmdb/cmdb-sa-df-dashboard.html
- **SN-C** — ServiceNow CSDM Data Foundations dashboard: https://www.servicenow.com/docs/r/servicenow-platform/common-service-data-model-csdm/csdm-data-foundations-dashboard-csdm.html
- **SN-I** — ServiceNow Identification and Reconciliation Engine concepts: https://www.servicenow.com/docs/r/4AA65edJ2a~o5pASflQppQ/b5bByjHam4u~hzRS80IwpA
- **SN-A** — ServiceNow Now Assist Suite July 2026 release notes, CMDB Impact Analysis: https://www.servicenow.com/docs/r/store-release-notes/na-suite-rn-2026-07-09.html
- **NIST** — NIST AI Risk Management Framework: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/

## Explicit open decisions (not research blockers)

- **Question coverage:** Validate that these 30 questions collectively support the chosen impact-analysis use case. Consider a short indicative path and a detailed evidence-assisted path, with applicability filtering rather than asking all users all 30 questions.
- **Weights and acceptance thresholds:** Choose *published project pilot defaults* and test those against realistic scenarios; do not misrepresent them as ServiceNow-certified or statistically benchmarked.
- **Minimum scenario-set size and quality:** Define how many reviewed critical-service cases are needed to call a test representative, how unknowns are handled, and what constitutes a critical false negative.
- **Assurance:** Define a repeatable evidence audit protocol and responsibilities for independently reviewing control evidence.
- **Publication:** No GitHub repository, WordPress page, ServiceNow connection, DNS or production resource has been changed in this draft.

**Next engineering action:** Convert this approved-as-a-draft questionnaire into a versioned machine-readable criteria pack and review the scoring/gating contract against test fixtures. No further broad research phase is required.