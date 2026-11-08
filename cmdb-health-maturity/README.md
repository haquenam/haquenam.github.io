# CMDB Health and Maturity Assessment

**Independent Research Preview 1.0.0, developed by Enamul Haque**

[Open the live assessment](https://haquenam.github.io/cmdb-health-maturity/)

A free, browser based assessment of ServiceNow CMDB quality and management maturity, containing 23 source informed criteria across four stages.

| Dimension | Questions | Weight |
| --- | --- | ---: |
| Data health and integrity | C01 to C06 | 25% |
| CSDM and service modelling | C07 to C11 | 25% |
| Relationship and dependency quality | C12 to C18 | 25% |
| Governance and continuous improvement | C19 to C23 | 25% |

## How to use

Open the web application. Optionally define the organisation, ServiceNow release and scope. Complete every question with measured evidence, indicative self rating, Not assessed or a justified Not applicable response. Review maturity, evidence coverage and suggested actions. Save JSON to resume later or Print to PDF.

There is no backend, login or ServiceNow connection. Answers remain in the current browser page until the user chooses to download a local JSON or PDF file.

## Important distinction

This tool is independently designed. It does not calculate or reproduce the native **ServiceNow CMDB Health Dashboard** score. Its 25% domain weights and explanatory maturity bands are research preview conventions, not certified industry benchmarks, ServiceNow approved maturity targets or production readiness decisions.

Read [the methodology](docs/METHODOLOGY.md), [privacy statement](PRIVACY.md) and [source documentation](assessment-packs/cmdb-health.json) before interpreting results.

## Source code and testing

The runnable `index.html` is a complete standalone application, containing CSS and JavaScript inline so it also works when saved locally. The separate `src/` files and assessment JSON expose the same application source and criteria. No framework, login or remote services are required.

Run the basic scoring regression suite with `node tests/scoring.test.js`. Browser checks were also performed with Chromium.

## Independence and licence

Independent educational research by Enamul Haque. Not affiliated with, endorsed by or certified by ServiceNow. ServiceNow is a trademark of its owner and is used only to identify compatible platform concepts.

The source code is released under the [MIT licence](LICENSE). The related ServiceNow AI Readiness research prototype remains archived at its existing URL as a separate early project.
