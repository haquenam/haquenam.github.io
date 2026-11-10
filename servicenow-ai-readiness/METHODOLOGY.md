# ServiceNow AI Readiness Assessment Suite

## Research methodology, version 0.6.1

Published working draft: 10 November 2026. Author: Enamul Haque. Independent research preview.

## Distinguishing preparation from configured capability validation

Research Preview 0.6 provides two explicitly distinct assessment stages.

Preparation for adoption evaluates only criteria that can reasonably be established by reviewing existing foundation data, content, policies and service design before enabling the selected AI capability.

Configured experience validation additionally assesses criteria requiring observation of actual AI retrieval, access, categorisation, conversational input, request submission or exception handling.

The preparation stage defers C01, C06, K06, K07, S04, S06 and S07 when those criteria are in scope. These checks are listed in a separate report section rather than treated as failures or implied successes.

A preparation percentage is the proportion of fulfilled answered preparation criteria only. The application also displays a nonnumeric assessment finding to signal unresolved critical conditions, missing evidence and outstanding configured capability validation. It is not a percentage of complete ServiceNow AI capability readiness. Validation criteria cannot be assumed satisfied simply because the customer has suitable data or a documented implementation plan.

The complete list of technical and operational prerequisites outside CMDB, Knowledge Management and Service Catalogue must be checked separately, including entitlement, release, configuration, security, approvals, integration, supervision, evaluation and financial controls. Results do not authorise live autonomous operation.

The seven deferred criteria are an independent research classification based on whether their present wording requires observable operation. Future criterion level rubrics may split an underlying preparation requirement from its corresponding runtime test.

## Purpose

The assessment considers whether selected CMDB, Knowledge Management and Service Catalogue foundations are suitable for specific ServiceNow AI activities. A result does not certify a ServiceNow instance, an AI agent, or autonomous deployment.

## User journey and question explanations

The visitor enters through the Introduction screen in `index.html`. The future authoritative WordPress project page will provide the public research context and link to the assessment application. The browser application then presents Assessment Setup, the relevant foundation questions and the results.

Each question presents a question mark beside the wording. Hover with a mouse, focus with a keyboard or tap on a touch device to read why the criterion is relevant, what the response establishes for the selected capability, suggested evidence and supporting research links. These explanations are versioned alongside the criteria in `criteria.json`.

The introductory page is a feature of the application, not an additional WordPress page. WordPress publication remains a later checkpoint after the research model is approved.

## Capability selection

The user selects a named ServiceNow AI activity, whether they are preparing or validating a configured experience, and its intended operational scope. Core criteria always apply. Optional workflow conditions are selected explicitly and then add relevant foundation criteria. Unrelated criteria do not enter the calculation.

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

Core: C01, C03, C04, C05, C07, C06. Critical: C01, C03, C06.

### Catalog Agent conversational requests

Find suitable items, collect required information and submit authorised requests.

Core: S01, S02, S03, S04, S05, S06, S07. Critical: S03, S04, S05, S06.

### Otto conversational request journey

Help a user find and complete an eligible catalogue request.

Core: S01, S02, S03, S04, S05, S06, S07. Critical: S05, S06, K07.

Optional: Also include knowledge answers during the request journey: K01, K04, K05, K06, K07.

## Interpretation safeguards added in version 0.6.1

Every displayed numerical fulfilment result must state how many applicable criteria were included in its calculation. Unknown and unanswered criteria are disclosed separately. A 100 percent result calculated from one Yes answer is not a 100 percent assessment of the selected AI capability.

Assessment completeness includes a deliberately selected Unknown answer because the user has responded to the question. Such an answer is not evidence of foundation suitability. The fulfilment denominator counts only Yes, Partially and No responses. Evidence coverage is a separate assessor reported measure, never a verified truth claim.

Where any applicable criteria are unknown or unanswered, display a prominent limitation warning. Where evidence coverage is incomplete, display a separate evidence warning. Critical conditions continue to be reported independently of averages.

These changes improve reporting transparency but do not resolve the separate design finding about distinguishing preparation for adoption from observed technical verification. That distinction remains mandatory before production release.

## Response values and calculation

Yes = 1, Partially = 0.5, No = 0. Unknown is not given a numeric score. A Not applicable response needs a written justification of at least 12 characters and cannot be used for critical criteria. All applicable criteria have equal weight because a calibrated weighting study is not available.

The indicative foundation index is the sum of numeric answers within the selected assessment stage divided by the number of numeric answers in that stage, multiplied by 100. If no numeric answers exist, no index is reported. Unknown and unanswered criteria are included in the completeness denominator, not the numerical denominator. This index is not a predicted probability of success or authorisation to adopt AI.

Completeness = answered applicable criteria divided by all applicable criteria, multiplied by 100. Unknown counts as answered for completeness when explicitly selected. Evidence coverage = applicable criteria marked document reviewed or scenario tested divided by applicable criteria, multiplied by 100. All evidence statuses are claims entered by the assessor. The browser does not inspect ServiceNow or confirm evidence authenticity.

Critical gate criteria are independently flagged if not answered Yes. Even when answered Yes, missing evidence status is flagged separately. A high index must not override these warnings. No claims of vendor calibration, percentile ranking or industry benchmark are made.

## Question register


### C01 CMDB

For the selected AI scenarios, is the correct affected configuration item identifiable in the CMDB?

AI rationale: The impact workflow needs the affected CI identifier to determine where dependency tracing begins. Wrong or ambiguous CI records can produce an incorrect analysis.

What this tells us: Whether an assessor can identify the intended configuration item reliably before AI analysis is enabled. A change or incident record can point to the CI, or the CI can be supplied directly.

Suggested evidence: Sample incident or change records with the affected CI, CI identifiers and a check for duplicate or obsolete entries.

Suggested improvement: Correct the CI reference on selected records and resolve duplicate or obsolete CI entries.

Sources: R5, R6, R12.


### C02 CMDB

For AI incident categorisation, are the affected configuration items associated with the correct services and service offerings?

AI rationale: Some incident categorisation experiences use service associations to identify which service or offering is affected. This criterion is not a universal requirement for CMDB impact analysis.

What this tells us: Whether service associations support the selected incident categorisation scenarios. It does not establish the quality of the dependency graph used by the impact analysis agent.

Suggested evidence: Samples of affected CIs and mapped service and service offering fields for the selected incident types.

Suggested improvement: Correct the service associations used for incident categorisation.

Sources: R3, R13.


### C03 CMDB

Does the CMDB contain accurate dependency relationships showing which other CIs and services depend on each affected CI?

AI rationale: The documented impact workflow traces upstream dependencies using CMDB relationships in cmdb_rel_ci. Missing or incorrectly directed relationships can hide impacted components and services.

What this tells us: Whether AI can follow reliable dependency paths from the affected CI to components or services potentially impacted by the selected change or incident.

Suggested evidence: Review direct relationship records in cmdb_rel_ci. Trace sample dependency paths from the affected CI and compare them with known impacts.

Suggested improvement: Correct missing, inaccurate or reversed dependency relationships relevant to the selected scenarios.

Sources: R5, R6.


### C04 CMDB

Are the CI records and dependency relationships needed for the selected impact scenarios accurate and sufficiently current?

AI rationale: AI reasons over the CMDB context it receives. Old or inaccurate CI data and relationships weaken the impact assessment.

What this tells us: Whether the selected dependency data accurately represents the environment being assessed.

Suggested evidence: Sample record checks against maintained sources, last update information and confirmation of relevant dependency accuracy.

Suggested improvement: Update stale CI information and correct inaccurate dependency records.

Sources: R12.


### C05 CMDB

Is there an accountable owner and a correction process for defects in the relevant CI and dependency data?

AI rationale: This is an independent governance recommendation. ServiceNow does not list the existence of a named correction owner as an invocation prerequisite, but persistent defects weaken repeated AI assessments.

What this tells us: Whether discovered CMDB defects have a route to remediation, rather than continuing to affect future AI analyses.

Suggested evidence: Named data owners, sample data quality remediation records and a repeatable correction process.

Suggested improvement: Identify accountable data owners and establish a defect correction procedure.

Sources: R12, R13.


### C06 CMDB

In a configured environment, can an authorised user invoke impact analysis and read the required CMDB and incident or change information?

AI rationale: The documented workflow requires appropriate access, including the itil role for reading relevant records and invoking impact analysis. Access needs to be tested after configuration.

What this tells us: Whether the chosen user and configured experience can carry out the documented operation using authorised permissions.

Suggested evidence: Positive and negative access tests with appropriate user roles, the relevant incident or change records and impact analysis invocation.

Suggested improvement: Confirm the required roles and permissions, then retest the configured impact workflow.

Sources: R5, R6.


### C07 CMDB

For each selected impact scenario, is there a clear description of the proposed change or incident for AI to assess?

AI rationale: The documented impact workflow uses a change or incident description alongside the affected CI. Vague descriptions reduce the quality of AI reasoning about likely impact.

What this tells us: Whether enough information about the planned change or incident is available for the AI to reason about the scope and possible consequences.

Suggested evidence: Representative incident or change descriptions, including the action, affected CI, purpose and operational context. A direct invocation can supply a CI identifier and description.

Suggested improvement: Improve change or incident descriptions so the proposed action, affected CI and operational context are clear.

Sources: R5, R6.

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

## CMDB impact analysis clarification in revision 0.6.1

Research review against the ServiceNow Australia release documentation established that the Assess CMDB impact workflow traverses the dependency graph represented by the CMDB relationship table, cmdb_rel_ci. The service association table svc_ci_assoc is not part of this traversal. The previous mapping of C02 to impact analysis was therefore misleading. C02 remains a separate service identification criterion for incident categorisation scenarios, but is no longer included in the impact analysis profile.

C07 now evaluates whether the intended change or incident context is sufficiently described. A record can supply its affected CI and description, or the workflow may be invoked with a CI sys_id and a direct description. This criterion is based on the documented workflow input and AI reasoning process.

The revised impact profile still presents six criteria in configured validation mode. It defers C06 when the organisation is only preparing for adoption. CMDB data stewardship C05 is an independent research recommendation, not an official required condition to invoke the ServiceNow workflow. Technical prerequisites and independent good practice must not be presented as identical.

The application now displays both assessment stage options directly, rather than hiding them inside a dropdown, and repeats the selected stage above each questionnaire.

Primary references:

https://www.servicenow.com/docs/r/servicenow-platform/now-assist-for-configuration-management-database-cmdb/na-cmdb-skill-impact-analysis-use.html

https://www.servicenow.com/docs/r/servicenow-platform/now-assist-for-configuration-management-database-cmdb/na-cmdb-skill-impact-analysis-ref.html

https://www.servicenow.com/docs/r/servicenow-platform/now-assist-for-configuration-management-database-cmdb/na-cmdb-awf-impact-analysis-using.html