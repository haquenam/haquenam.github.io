# CMDB Health and Maturity methodology

## Purpose

An independent self assessment across four equal dimensions: data health and integrity (C01 to C06), CSDM and service modelling (C07 to C11), relationship and dependency quality (C12 to C18), and governance and continuous improvement (C19 to C23).

This is not the native ServiceNow CMDB Health Dashboard, a certification or a validated external benchmark. It does not retrieve instance data.

## Scoring rules

* Higher is better measurements: `100 × passing / eligible`.
* Lower is better measurements: `100 × (1 − adverse / eligible)`.
* Maturity level 0 to 4: `25 × level`.
* Self ratings are marked indicative and not treated as measured.
* Each scored applicable criterion has equal weight within its domain.
* Each of the four domains carries an equal 25% weight, provided at least one check in that domain has a score.
* Not assessed is a valid explicit response but does not generate a score. It reduces coverage.
* Not applicable is allowed only with a written explanation and is excluded from the applicable count.

The overall is an average of scored domain results. A band is displayed only when at least 80% of applicable checks have a score and every domain is represented. This 80% condition is a presentation rule authored for the preview.

## Descriptive maturity bands

| Composite | Author defined label |
| --- | --- |
| 0 to under 20 | Initial |
| 20 to under 40 | Developing |
| 40 to under 60 | Establishing |
| 60 to under 80 | Managed |
| 80 to 100 | Optimised |

These labels do not map to official CSDM Foundation, Crawl, Walk, Run or Fly stages and must not be used as vendor certifications.

Coverage means the percentage of applicable checks that received a score. Measured coverage means the percentage answered through a measured method. Reviewed evidence means that the **respondent** marked the source as reviewed. It is not independent assurance.

This instrument reuses 23 relevant CMDB foundation questions from an earlier 30 question AI readiness pilot. Seven AI specific questions and all associated critical AI readiness gates were omitted. The result describes CMDB health and operational management maturity, not how ready an AI deployment is.

## Official reference documentation

* [ServiceNow CMDB Health overview](https://www.servicenow.com/docs/r/servicenow-platform/configuration-management-database-cmdb/overview-cmdb-health.html)
* [CMDB Health metrics](https://www.servicenow.com/docs/r/servicenow-platform/configuration-management-database-cmdb/r_CMDBHealthMetrics.html)
* [CMDB Health configuration](https://www.servicenow.com/docs/r/servicenow-platform/configuration-management-database-cmdb/c_CMDBHealthSetupandConfig.html)
* [CSDM Data Foundations](https://www.servicenow.com/docs/r/servicenow-platform/common-service-data-model-csdm/csdm-data-foundations-dashboard-csdm.html)
* [CMDB Identification and Reconciliation](https://www.servicenow.com/docs/r/servicenow-platform/configuration-management-database-cmdb/c_CMDBIdentifyandReconcile.html)

These references support the platform concepts and measurement topics. They do **not** authorise or endorse the tool's questionnaire, weights, maturity bands or interpretations. Always verify the exact product release, installed plugins, rules and configured scope.

## Practical interpretation

An attractive score does not establish that all CI records or dependencies are correct. It is only an input to discussion. Substantiate findings using native CMDB Health results, sampled relationships, reconciliation records, owner review and business priorities. Treat unjustified N/A exclusions, limited data scope and unreviewed self ratings as limitations. Remediation suggestions in this prototype are not ranked by cost or business risk.
