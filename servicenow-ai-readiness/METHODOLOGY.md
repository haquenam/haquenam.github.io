# ServiceNow AI Readiness Assessment Suite

## Research methodology, version 0.5

Published working draft: 10 November 2026. Author: Enamul Haque. Independent research preview.

## Purpose

The assessment considers whether selected CMDB, Knowledge Management and Service Catalogue foundations are suitable for specific ServiceNow AI activities. A result does not certify a ServiceNow instance, an AI agent, or autonomous deployment.

## User journey and question explanations

The visitor enters through the Introduction screen in `index.html`. The future authoritative WordPress project page will provide the public research context and link to the assessment application. The browser application then presents Assessment Setup, the relevant foundation questions and the results.

Each question presents a question mark beside the wording. Hover with a mouse, focus with a keyboard or tap on a touch device to read why the criterion is relevant, what the response establishes for the selected capability, suggested evidence and supporting research links. These explanations are versioned alongside the criteria in `criteria.json`.

The introductory page is a feature of the application, not an additional WordPress page. WordPress publication remains a later checkpoint after the research model is approved.

## Capability selection

The user selects a named ServiceNow AI activity and its intended operational scope. Core criteria always apply. Optional workflow conditions are selected explicitly and then add relevant foundation criteria. Unrelated criteria do not enter the calculation.

### L1 IT Service Desk AI Specialist

Knowledge based investigation and controlled handling of selected routine incidents.

Core: K01, K02, K03, K04, K05, K06, K07. Critical: K02, K03, K07, S05, C06.

Optional: Include incident redirection or access requests using catalogue items: S01, S02, S05, S07.

Optional: Include incident investigation that uses CI and service context: C01, C02, C04, C05, C06.

### AI Search and Otto knowledge answers

Grounded knowledge responses to approved user questions.

Core: K01, K04, K05, K06, K07. Critical: K06, K07.

Optional: Include procedural troubleshooting answers: K02, K03.

### ITSM AI incident triage and categorisation

Classification of relevant configuration items, services and offerings.

Core: C01, C02, C04, C05, C06. Critical: C02, C06.

### ITSM AI investigation workflow

Investigate incidents using relevant knowledge and available record context.

Core: K01, K02, K03, K04, K05, K06, K07. Critical: K06, K07, C06.

Optional: Include investigation based on CI and service context: C01, C02, C04, C05, C06.

Optional: Include directing users to request items: S01, S02, S07.

### Now Assist CMDB impact analysis

Understand impact through relevant configuration items and service dependency paths.

Core: C01, C02, C03, C04, C05, C06. Critical: C03, C06.

### Catalog Agent conversational requests

Find suitable items, collect required information and submit authorised requests.

Core: S01, S02, S03, S04, S05, S06, S07. Critical: S03, S04, S05, S06.

### Otto conversational request journey

Help a user find and complete an eligible catalogue request.

Core: S01, S02, S03, S04, S05, S06, S07. Critical: S05, S06, K07.

Optional: Also include knowledge answers during the request journey: K01, K04, K05, K06, K07.

## Response values and calculation

Yes = 1, Partially = 0.5, No = 0. Unknown is not given a numeric score. A Not applicable response needs a written justification of at least 12 characters and cannot be used for critical criteria. All applicable criteria have equal weight because a calibrated weighting study is not available.

The indicative foundation index is the sum of numeric answers divided by the number of numeric answers, multiplied by 100. If no numeric answers exist, no index is reported. Unknown and unanswered criteria are included in the completeness denominator, not the numerical denominator. This index is not a predicted probability of success or authorisation to adopt AI.

Completeness = answered applicable criteria divided by all applicable criteria, multiplied by 100. Unknown counts as answered for completeness when explicitly selected. Evidence coverage = applicable criteria marked document reviewed or scenario tested divided by applicable criteria, multiplied by 100. All evidence statuses are claims entered by the assessor. The browser does not inspect ServiceNow or confirm evidence authenticity.

Critical gate criteria are independently flagged if not answered Yes. Even when answered Yes, missing evidence status is flagged separately. A high index must not override these warnings. No claims of vendor calibration, percentile ranking or industry benchmark are made.

## Question register


### C01 CMDB

Can the selected AI workflow identify the correct configuration item without confusing duplicate, obsolete or incorrectly classified records?

AI rationale: Incorrect configuration identity can lead to an unsuitable service classification or impact result.

What this tells us: Whether the intended AI activity can reliably recognise the correct configuration item, rather than use a duplicate or outdated record as operational context.

Suggested evidence: Sample configuration item matches, identification checks and duplicate review.

Suggested improvement: Check identification rules and correct ambiguous or duplicated records.

Sources: R3, R12.

### C02 CMDB

Are the configuration items relevant to this workflow linked to the correct services and service offerings?

AI rationale: AI categorisation and service context depend on usable service associations.

What this tells us: Whether service and service offering context associated with the relevant configuration items can be trusted for routing, classification or investigation.

Suggested evidence: Sample incident mappings and relevant CSDM relationships.

Suggested improvement: Review and correct the mappings for the services in your pilot.

Sources: R3, R13.

### C03 CMDB

For AI impact analysis, do the relevant configuration items have valid and correctly directed dependency paths to impacted services?

AI rationale: Topology based impact analysis needs trustworthy dependency direction and coverage.

What this tells us: Whether the dependency paths needed by AI assisted impact analysis are available and reflect known service effects.

Suggested evidence: Dependency paths compared with known service impacts.

Suggested improvement: Remediate the relationships used by your intended impact scenarios.

Sources: R5, R6.

### C04 CMDB

Are the configuration attributes and relationships consumed by AI sufficiently accurate, current and traceable to maintained sources?

AI rationale: Stale or conflicting source data weakens AI context and conclusions.

What this tells us: Whether the configuration facts supplied to AI are current enough, accurate enough and traceable to maintained sources.

Suggested evidence: Source timestamps, reconciliation review and selected record checks.

Suggested improvement: Correct stale records and establish appropriate source refresh controls.

Sources: R12.

### C05 CMDB

Is someone accountable for correcting configuration or service relationship defects discovered during AI evaluation?

AI rationale: The reliability of AI context depends on a repeatable way of fixing defects.

What this tells us: Whether discovered configuration defects can be corrected through accountable ownership before they recur in AI outputs.

Suggested evidence: Named owner, improvement records and examples of resolved defects.

Suggested improvement: Assign a data owner and introduce a tracked defect correction process.

Sources: R12, R13.

### C06 CMDB

Can the intended AI identity access the required configuration information while restricted records remain protected?

AI rationale: A workflow needs authorised access to relevant context without inappropriate disclosure.

What this tells us: Whether AI can obtain the required configuration context while protected records remain unavailable to unauthorised identities.

Suggested evidence: Positive and negative access tests using the intended identities.

Suggested improvement: Review role access and test permitted and denied retrieval paths.

Sources: R6, R3.

### K01 Knowledge

Do approved articles cover the actual questions and incident categories selected for this AI capability?

AI rationale: Content outside the selected demand patterns does not support useful answers or resolutions.

What this tells us: Whether approved knowledge covers the real questions and incident categories within the chosen AI scope. Missing coverage becomes a priority for knowledge preparation.

Suggested evidence: Top incident categories and queries mapped to relevant published articles.

Suggested improvement: Prioritise coverage of the common scoped incidents and questions.

Sources: R1, P1.

### K02 Knowledge

For selected incident types, are the instructions complete, ordered and usable by the intended audience?

AI rationale: Autonomous investigation requires repeatable procedures, not merely topic descriptions.

What this tells us: Whether the selected incident procedures contain enough ordered detail for an AI assistant or specialist to follow safely and consistently.

Suggested evidence: Subject matter review and walkthrough of sample diagnosis and resolution steps.

Suggested improvement: Rewrite procedures with prerequisites, diagnostic steps and expected results.

Sources: R1, P1.

### K03 Knowledge

Are operational decisions, exceptions, unsafe conditions and escalation triggers documented rather than known only to experienced staff?

AI rationale: The tacit tax arises when the knowledge AI needs remains informal and inaccessible.

What this tells us: Whether undocumented analyst judgement, exceptions and escalation rules would create gaps when work is delegated to AI.

Suggested evidence: Analyst interviews, exception tables, policy conditions and escalation walkthroughs.

Suggested improvement: Capture undocumented decision rules, exceptions and escalation boundaries.

Sources: P1, A2.

### K04 Knowledge

Have relevant articles been validated for accuracy and contradictions against current operational practice?

AI rationale: Conflicting or incorrect instructions can make grounded answers unreliable.

What this tells us: Whether the knowledge used for generated answers and resolution steps is accurate and free from conflicting instructions.

Suggested evidence: Article owner sign off and sampled comparison with real working practices.

Suggested improvement: Resolve contradictory guidance and validate material instructions with service owners.

Sources: R1, P1.

### K05 Knowledge

Are the relevant articles clearly structured, described by metadata and maintained through a review process?

AI rationale: Well structured, current content improves retrievability and interpretation.

What this tells us: Whether relevant articles are organised and maintained so that the intended AI experience can interpret and retrieve them reliably.

Suggested evidence: Article templates, metadata completeness, review dates and stale content reports.

Suggested improvement: Apply consistent templates and establish scheduled maintenance.

Sources: R1.

### K06 Knowledge

Can the selected AI experience retrieve the relevant published articles through its configured search sources and profiles?

AI rationale: A correct article offers no value if the AI experience cannot find it.

What this tells us: Whether the AI Search configuration actually retrieves suitable published articles for representative questions.

Suggested evidence: Index status, source and search profile configuration, query test results.

Suggested improvement: Correct indexing and search profile configuration, then test representative queries.

Sources: R2.

### K07 Knowledge

Do knowledge retrieval and generated responses respect the intended user and agent access restrictions?

AI rationale: Restricted articles must not appear in responses to unauthorised users.

What this tells us: Whether knowledge retrieval and generated responses protect restricted information for the relevant user and agent identities.

Suggested evidence: Positive and negative access tests with appropriate identities and content classes.

Suggested improvement: Fix access controls and retest restricted retrieval before any pilot.

Sources: R2, P1.

### S01 Catalogue

Are active catalogue items available for the request types the selected AI experience must recognise or fulfil?

AI rationale: AI needs a valid target for intended requests and redirection.

What this tells us: Whether valid catalogue destinations exist for the requests the AI experience is expected to recognise or fulfil.

Suggested evidence: Request demand mapped to active items and allowed requester audiences.

Suggested improvement: Prioritise missing items for common request intents.

Sources: R9, P1.

### S02 Catalogue

Are catalogue item names, descriptions and guidance clear enough for AI to distinguish similar requests?

AI rationale: Ambiguous item descriptions increase incorrect request selection.

What this tells us: Whether the intended AI experience can distinguish similar catalogue items using their descriptions and eligibility information.

Suggested evidence: Item metadata review and sample utterance matching checks.

Suggested improvement: Clarify labels, descriptions, eligibility and alternative request paths.

Sources: R9, R7.

### S03 Catalogue

Do the items selected for conversational ordering meet the requirements of the chosen Catalog Agent experience?

AI rationale: Unsupported item configurations fall back to a form or prevent a full conversation.

What this tells us: Whether selected items can be handled by the specific conversational catalogue capability, rather than unexpectedly falling back to forms.

Suggested evidence: Conversational coverage report and checks for supported variables and scripting.

Suggested improvement: Review item eligibility for the specific mechanism and keep safe form fallback.

Sources: R7, R8.

### S04 Catalogue

Can the conversation collect and correctly validate the mandatory information needed to submit those requests?

AI rationale: Incomplete or incorrectly mapped variables produce failed or unsuitable requests.

What this tells us: Whether the conversational flow can collect complete, valid request data before submission.

Suggested evidence: Variable mapping tests, mandatory field scenarios and conditional input examples.

Suggested improvement: Simplify variables or implement supported validation and dialogue flows.

Sources: R7, R8.

### S05 Catalogue

Are user eligibility, entitlements and approval rules enforced by the underlying ServiceNow workflow?

AI rationale: An AI recommendation must not bypass access and approval controls.

What this tells us: Whether the platform enforces requester eligibility and approval policies even when the request begins in an AI conversation.

Suggested evidence: Request impersonation cases, positive and negative authorisation tests, approval history.

Suggested improvement: Enforce user criteria and approvals at platform level, then retest.

Sources: R9, P1.

### S06 Catalogue

Do AI initiated submissions create the correct request records and enter a working fulfilment process?

AI rationale: Successful conversational intake is insufficient without controlled downstream execution.

What this tells us: Whether an AI initiated request produces the correct records and can be tracked through real fulfilment.

Suggested evidence: Test order record, fulfilment owner, approval status and tracking history.

Suggested improvement: Fix fulfilment integration and verify record creation and tracking.

Sources: R7, P1.

### S07 Catalogue

When a request is unclear or unsupported, does the experience provide safe clarification, form fallback or human escalation?

AI rationale: The system must handle exceptions without inventing or forcing unsafe requests.

What this tells us: Whether ambiguous or unsupported requests have a safe way to clarify, redirect or reach a human rather than producing an unsuitable request.

Suggested evidence: Ambiguous, cancelled and unsupported request tests and fallback results.

Suggested improvement: Document and test the clarification and fallback routes.

Sources: R8, R10, P1.

## Reference register

Documentation establishes capability relevance and potential dependencies. Exact question wording, response values and aggregation method are independent author design choices. Release, application version and entitlement requirements require validation before customer implementation.

R1: ServiceNow Knowledge Base readiness

https://www.servicenow.com/docs/r/intelligent-experiences/sn-ai-impl-kb-readiness.html

Source type: Official product documentation, Australia release

R2: ServiceNow AI Search readiness

https://www.servicenow.com/docs/r/intelligent-experiences/sn-ai-impl-ai-search.html

Source type: Official product documentation, Australia release

R3: ServiceNow incident categorisation agentic workflow

https://www.servicenow.com/docs/r/it-service-management/now-assist-for-it-service-management-itsm/now-assist-itsm-aiagents-catincidents-usecase.html

Source type: Official product documentation, verify selected release

R5: ServiceNow analyze change and incident impact

https://www.servicenow.com/docs/r/servicenow-platform/now-assist-for-configuration-management-database-cmdb/na-cmdb-skill-impact-analysis-use.html

Source type: Official product documentation, Australia release

R6: ServiceNow analyze impact workflow reference

https://www.servicenow.com/docs/r/servicenow-platform/now-assist-for-configuration-management-database-cmdb/na-cmdb-skill-impact-analysis-ref.html

Source type: Official product documentation, Australia release

R7: ServiceNow Catalog Agent

https://www.servicenow.com/docs/r/servicenow-platform/service-catalog/c_catalog_agent.html

Source type: Official product documentation, Australia release

R8: ServiceNow conversational catalog status conditions

https://www.servicenow.com/docs/r/servicenow-platform/service-catalog/catalog-conv-limitations.html

Source type: Official product documentation, Australia release

R9: ServiceNow Service Catalog readiness

https://www.servicenow.com/docs/r/intelligent-experiences/sn-ai-impl-srvc-catalog.html

Source type: Official product documentation, Australia release

R10: ServiceNow Otto for Virtual Agent readiness

https://www.servicenow.com/docs/r/intelligent-experiences/sn-ai-impl-nava.html

Source type: Official product documentation, Australia release

R12: ServiceNow CMDB Health overview

https://www.servicenow.com/docs/r/servicenow-platform/configuration-management-database-cmdb/overview-cmdb-health.html

Source type: Official product documentation, Australia release

R13: ServiceNow Common Service Data Model

https://www.servicenow.com/docs/r/xanadu/servicenow-platform/common-service-data-model-csdm/csdm-landing-page.html

Source type: Official documentation, Xanadu release. Cross release use requires verification

P1: L1 Specialist Implementor Playbook

https://www.servicenow.com/community/itsm-articles/l1-it-service-desk-ai-specialist-implementor-s-playbook/ta-p/3612829

Source type: ServiceNow Community implementation guidance, distinct from product documentation

A1: Can We Delegate IT Service Delivery to ServiceNow AI?

https://enamulhaque.co.uk/can-we-delegate-it-service-delivery-to-servicenow-ai/

Source type: Author independent research and commentary

A2: Who Puts AI to Work? The Rise of the Forward Deployed Engineer

https://enamulhaque.co.uk/who-puts-ai-to-work-the-rise-of-the-forward-deployed-engineer/

Source type: Author research and tacit tax concept

## Known limitations

The assessment focuses on three foundations. It does not evaluate the whole platform configuration, contract, licence, human oversight arrangements, agent routing, privilege boundaries beyond questions, model behaviour or production operation. Assessor answers are not independently verified. A limited scoped sample may not represent the enterprise. The response scale and equal weights are a pilot method rather than an externally validated quantitative model. Source references must be rechecked against the customer release and relevant Store application.