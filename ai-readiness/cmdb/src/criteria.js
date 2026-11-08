window.ASSESSMENT_CONFIG = {
  "product": "ServiceNow AI Readiness Assessment Suite by Enamul Haque",
  "module": "CMDB AI Readiness: Impact Analysis",
  "version": "0.2.0-alpha",
  "scoringVersion": "pilot-0.1",
  "scope": "AI-assisted service/change impact analysis (not autonomous write authorisation)",
  "domains": [
    {
      "id": "D1",
      "name": "Data completeness and integrity",
      "weight": 20
    },
    {
      "id": "D2",
      "name": "CSDM and service modelling",
      "weight": 15
    },
    {
      "id": "D3",
      "name": "Service relationships and dependency quality",
      "weight": 25
    },
    {
      "id": "D4",
      "name": "Governance, provenance and ownership",
      "weight": 15
    },
    {
      "id": "D5",
      "name": "AI security and operational controls",
      "weight": 10
    },
    {
      "id": "D6",
      "name": "AI impact-analysis use-case validation",
      "weight": 15
    }
  ],
  "criteria": [
    {
      "id": "C01",
      "domain": "D1",
      "question": "What proportion of in-scope CIs have every required identity attribute populated?",
      "measure": "CIs passing required-field rules ÷ eligible in-scope CIs, by class",
      "evidence": "CMDB Health Completeness, configured required fields and inclusion rules",
      "sourceCodes": [
        "SN-H",
        "SN-M"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "higher",
      "remediation": "Repair missing required attributes; correct class rules and feeds.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C02",
      "domain": "D1",
      "question": "What proportion of in-scope CIs have the recommended operational attributes populated?",
      "measure": "CIs passing recommended-field rules ÷ eligible in-scope CIs, by class",
      "evidence": "CMDB Health recommended-fields metric; class-scoped sampled records",
      "sourceCodes": [
        "SN-H",
        "SN-M"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "higher",
      "remediation": "Define fit-for-purpose field rules and fill high-value gaps.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C03",
      "domain": "D1",
      "question": "What is the duplicate CI rate for independently identified CI classes in scope?",
      "measure": "Duplicate independent CIs ÷ eligible independent CIs",
      "evidence": "CMDB Health Correctness duplicate metric, identification rules",
      "sourceCodes": [
        "SN-M",
        "SN-I"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "lower",
      "remediation": "Investigate identification rules, data-source overlaps and duplicate-remediation tasks.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C04",
      "domain": "D1",
      "question": "What is the stale CI rate under appropriate, class-specific freshness rules?",
      "measure": "Stale in-scope CIs ÷ eligible in-scope CIs, with rule and period stated",
      "evidence": "CMDB Health staleness scorecards, class-specific rules",
      "sourceCodes": [
        "SN-M",
        "SN-F"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "lower",
      "remediation": "Review collection schedules, staleness policies and retirement.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C05",
      "domain": "D1",
      "question": "What is the orphan CI rate under the approved class-specific orphan rules?",
      "measure": "Orphan CIs ÷ eligible CIs, by class and rule",
      "evidence": "CMDB Health orphan metric; actual configured orphan rules",
      "sourceCodes": [
        "SN-M"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "lower",
      "remediation": "Correct missing dependencies or attributes; retire obsolete records.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C06",
      "domain": "D1",
      "question": "Do relevant CIs pass the configured CMDB compliance audits for the target use case?",
      "measure": "CIs passing relevant current audits ÷ CIs evaluated, disclose audit coverage",
      "evidence": "CMDB Health compliance audits; audit run date and rule scope",
      "sourceCodes": [
        "SN-H",
        "SN-M"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "higher",
      "remediation": "Enable/fix applicable audits and address repeated failures.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C07",
      "domain": "D2",
      "question": "Are in-scope business applications, application services and technical CIs classified in the correct CSDM roles/classes?",
      "measure": "Expert-reviewed correctly classified records ÷ sample reviewed",
      "evidence": "CSDM Data Foundations stage reports and sampled class review",
      "sourceCodes": [
        "SN-C"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "higher",
      "remediation": "Reclassify wrongly modelled records and update modelling standards.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C08",
      "domain": "D2",
      "question": "Are critical application services represented and linked to their technical components?",
      "measure": "Critical application services with validated technical support map ÷ in-scope critical application services",
      "evidence": "CSDM dashboards and service-map review",
      "sourceCodes": [
        "SN-C"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "higher",
      "remediation": "Populate missing application services and supporting-CI relationships.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C09",
      "domain": "D2",
      "question": "Are business services or offerings related to the correct application services where the use case requires those links?",
      "measure": "Required service-to-application links confirmed ÷ expected links in sampled critical services",
      "evidence": "CSDM Run-stage indicators and owner-verified service mappings",
      "sourceCodes": [
        "SN-C"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "higher",
      "remediation": "Link the service model to the application service layer.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C10",
      "domain": "D2",
      "question": "Can each selected business-critical service be traced to the right technical dependency scope?",
      "measure": "Critical services with verified end-to-end paths ÷ critical services tested",
      "evidence": "CSDM service model, dependency view, stakeholder review",
      "sourceCodes": [
        "SN-C",
        "SN-A"
      ],
      "critical": true,
      "criticalContext": "Yes — for target critical services",
      "metricType": "higher",
      "remediation": "Resolve missing service model nodes and wrong dependency edges.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C11",
      "domain": "D2",
      "question": "Are the CSDM Data Foundations findings relevant to the chosen use case reviewed and assigned remediation owners?",
      "measure": "Applicable high-priority findings with accepted dispositions ÷ relevant high-priority findings",
      "evidence": "CSDM Data Foundations report, improvement backlog and ownership",
      "sourceCodes": [
        "SN-C"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "higher",
      "remediation": "Triage model gaps, designate owners and evidence closure.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C12",
      "domain": "D3",
      "question": "What proportion of expected dependencies for critical services is represented in the CMDB?",
      "measure": "Verified present expected links ÷ reference expected links; require bounded sample",
      "evidence": "Expert-validated architecture topology compared with CMDB links",
      "sourceCodes": [
        "SN-C",
        "SN-A"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "higher",
      "remediation": "Map missing dependencies, focusing on critical service paths.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C13",
      "domain": "D3",
      "question": "Are the types and directions of dependencies correct for impact traversal?",
      "measure": "Correct link type/direction ÷ sampled reference links",
      "evidence": "Relationship records versus trusted topology reference",
      "sourceCodes": [
        "SN-M",
        "SN-A"
      ],
      "critical": true,
      "criticalContext": "Yes — for critical traversed paths",
      "metricType": "higher",
      "remediation": "Correct parent/child direction and relationship semantics; rerun traversal.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C14",
      "domain": "D3",
      "question": "What percentage of in-scope CI relationships are duplicates?",
      "measure": "Duplicate relationships ÷ relationships in assessment scope",
      "evidence": "CMDB Relationship Health duplicate metric",
      "sourceCodes": [
        "SN-H",
        "SN-M"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "lower",
      "remediation": "Deduplicate invalid relationships; fix ingest rules.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C15",
      "domain": "D3",
      "question": "What percentage of in-scope relationships are orphaned?",
      "measure": "Orphan relationships ÷ relationships in scope",
      "evidence": "CMDB Relationship Health orphan metric",
      "sourceCodes": [
        "SN-H",
        "SN-M"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "lower",
      "remediation": "Repair broken endpoints or clean up invalid links.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C16",
      "domain": "D3",
      "question": "What percentage of in-scope relationships are stale because a connected CI is stale?",
      "measure": "Stale relationships ÷ relationships in scope",
      "evidence": "CMDB Relationship Health stale metric",
      "sourceCodes": [
        "SN-M"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "lower",
      "remediation": "Repair the source CI freshness issue and recheck its links.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C17",
      "domain": "D3",
      "question": "Do relevant relationships comply with configured suggested, hosting and containment rules?",
      "measure": "Compliant applicable links ÷ links tested; identify exclusions",
      "evidence": "CMDB Relationship Health rule conformance summaries",
      "sourceCodes": [
        "SN-H",
        "SN-M"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "higher",
      "remediation": "Correct invalid relationship types and class modelling.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C18",
      "domain": "D3",
      "question": "Do representative dependency traversals return the expected upstream/downstream impact paths for Tier-1 services?",
      "measure": "Passing predefined topology tests ÷ executed tests; record false negatives",
      "evidence": "Approved topology gold set, traversal outcomes, expected impact path",
      "sourceCodes": [
        "SN-A",
        "SN-C"
      ],
      "critical": true,
      "criticalContext": "Yes — critical service coverage",
      "metricType": "higher",
      "remediation": "Repair missing/wrong service paths and retest affected scenarios.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C19",
      "domain": "D4",
      "question": "What proportion of in-scope CIs and services has an active, accountable operational owner?",
      "measure": "Records with valid active accountable owner ÷ eligible CI/service records",
      "evidence": "CMDB ownership attributes, team references, sampled attestation",
      "sourceCodes": [
        "SN-F",
        "SN-C"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "higher",
      "remediation": "Assign accountable owners and remove inactive/stale references.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C20",
      "domain": "D4",
      "question": "Are authoritative data sources and attribute-level reconciliation responsibilities defined for critical CI classes?",
      "measure": "Relevant classes/attributes with defined source authority ÷ relevant set",
      "evidence": "IRE reconciliation and source-rule review; source catalogue",
      "sourceCodes": [
        "SN-I",
        "SN-F"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "higher",
      "remediation": "Define data authority and reconcile conflicting updates.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C21",
      "domain": "D4",
      "question": "Do CI identification rules uniquely identify records entering the in-scope CMDB classes?",
      "measure": "Positive and collision tests passed ÷ defined IRE test cases",
      "evidence": "Identification rule configuration and duplicate simulation results",
      "sourceCodes": [
        "SN-I"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "higher",
      "remediation": "Adjust identification precedence and validate multiple-source cases.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C22",
      "domain": "D4",
      "question": "Are critical CI/service records periodically certified or reviewed by accountable owners?",
      "measure": "Due reviews completed and valid ÷ due reviews in defined period",
      "evidence": "Certification/audit tasks, attestation dates, sampled reviews",
      "sourceCodes": [
        "SN-H",
        "SN-C"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "higher",
      "remediation": "Introduce risk-based attestation and review cadence.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C23",
      "domain": "D4",
      "question": "Are CMDB Health jobs, remediation workflows and trend reviews operating for relevant classes and rules?",
      "measure": "Controls operating and evidenced, 0–4 maturity anchors",
      "evidence": "Enabled health jobs, health-history reports, remediation backlog and closure verification",
      "sourceCodes": [
        "SN-H",
        "SN-F"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "maturity",
      "remediation": "Activate the appropriate jobs; assign health findings and monitor recurring errors.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C24",
      "domain": "D5",
      "question": "Can only properly authorised users and AI workflows access the in-scope CI and service information?",
      "measure": "Allowed and denied access tests passed ÷ relevant persona tests",
      "evidence": "Role- and persona-based positive/negative access tests; technical control configuration",
      "sourceCodes": [
        "NIST"
      ],
      "critical": true,
      "criticalContext": "Yes — confidentiality and authorisation",
      "metricType": "higher",
      "remediation": "Correct access policy and verify negative tests before use.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C25",
      "domain": "D5",
      "question": "Can a reviewer trace an AI impact conclusion back to the input CI/change and dependency path used?",
      "measure": "Explanations with sufficient reproducible references ÷ sampled test outputs",
      "evidence": "Scenario log, input context, topology path, explanation/citation review",
      "sourceCodes": [
        "SN-A",
        "NIST"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "higher",
      "remediation": "Record source context and show dependency path/uncertainty in reports.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C26",
      "domain": "D5",
      "question": "Is the impact assessment advisory-only, or are any production-affecting actions explicitly authorised, logged and subject to approval/rollback?",
      "measure": "Pass/fail conditional gate: if read-only, verify read-only boundary; if action-enabled, verify controls",
      "evidence": "Action-capability inventory, permissions, approval and rollback test evidence",
      "sourceCodes": [
        "NIST"
      ],
      "critical": true,
      "criticalContext": "Yes — apply to configured action capability",
      "metricType": "binary",
      "remediation": "Enforce human approval and guardrails; never infer autonomous permission from analysis capability.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C27",
      "domain": "D6",
      "question": "Can the target CI be correctly resolved from representative change/incident inputs?",
      "measure": "Correct target CI resolutions ÷ benchmark input cases",
      "evidence": "Gold-set cases, resolved CI identifiers, false-resolution analysis",
      "sourceCodes": [
        "SN-A"
      ],
      "critical": true,
      "criticalContext": "Yes — for required entry route",
      "metricType": "higher",
      "remediation": "Improve CI linking and reference quality; reject ambiguous inputs.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C28",
      "domain": "D6",
      "question": "Are change/incident descriptions sufficiently specific to support reliable dependency-based impact reasoning?",
      "measure": "Cases meeting an approved description quality rubric ÷ sampled cases",
      "evidence": "Redacted case descriptions, SME rubric and review evidence",
      "sourceCodes": [
        "SN-A"
      ],
      "critical": false,
      "criticalContext": "",
      "metricType": "higher",
      "remediation": "Improve required description fields and requester guidance.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C29",
      "domain": "D6",
      "question": "How often does the output identify the correct affected critical services without missing major impacts?",
      "measure": "Critical-service recall and false-negative rate on expert-reviewed gold set",
      "evidence": "Reference impact scenarios and SME-scored expected/actual results",
      "sourceCodes": [
        "SN-A",
        "NIST"
      ],
      "critical": true,
      "criticalContext": "Yes — use-case safety/accuracy",
      "metricType": "higher",
      "remediation": "Fix reference topology, tune assumptions, constrain deployment until misses are understood.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    },
    {
      "id": "C30",
      "domain": "D6",
      "question": "When input/topology is missing, ambiguous or contradictory, does the AI fail safely and disclose uncertainty rather than assert unsupported impact conclusions?",
      "measure": "Safe handling success ÷ negative and ambiguous test scenarios",
      "evidence": "Deliberately incomplete and contradictory test cases, expected responses",
      "sourceCodes": [
        "SN-A",
        "NIST"
      ],
      "critical": true,
      "criticalContext": "Yes — handling unknowns",
      "metricType": "higher",
      "remediation": "Add insufficient-evidence handling, uncertainty messages and human review.",
      "targetStatus": "No official universal target; raw ratio or maturity anchors for pilot scoring",
      "weightWithinDomain": 1
    }
  ],
  "sources": {
    "SN-H": {
      "name": "ServiceNow CMDB Health overview",
      "url": "https://www.servicenow.com/docs/r/servicenow-platform/configuration-management-database-cmdb/overview-cmdb-health.html"
    },
    "SN-M": {
      "name": "ServiceNow CMDB Health KPIs and metrics",
      "url": "https://www.servicenow.com/docs/r/servicenow-platform/configuration-management-database-cmdb/r_CMDBHealthMetrics.html"
    },
    "SN-F": {
      "name": "ServiceNow CMDB Data Foundations",
      "url": "https://www.servicenow.com/docs/r/servicenow-platform/configuration-management-database-cmdb/cmdb-sa-df-dashboard.html"
    },
    "SN-C": {
      "name": "ServiceNow CSDM Data Foundations dashboard",
      "url": "https://www.servicenow.com/docs/r/servicenow-platform/common-service-data-model-csdm/csdm-data-foundations-dashboard-csdm.html"
    },
    "SN-I": {
      "name": "ServiceNow Identification and Reconciliation Engine",
      "url": "https://www.servicenow.com/docs/r/4AA65edJ2a~o5pASflQppQ/b5bByjHam4u~hzRS80IwpA"
    },
    "SN-A": {
      "name": "ServiceNow Now Assist Suite July 2026 release notes",
      "url": "https://www.servicenow.com/docs/r/store-release-notes/na-suite-rn-2026-07-09.html"
    },
    "NIST": {
      "name": "NIST AI Risk Management Framework",
      "url": "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/"
    }
  },
  "pilotMinimumScore": 75,
  "pilotMinimumCoverage": 80,
  "sourceNote": "These criteria are independently authored, source-informed. Rule interpretations, weights and gates are not ServiceNow-certified thresholds. Pilot thresholds are for demonstration and testing only."
};
