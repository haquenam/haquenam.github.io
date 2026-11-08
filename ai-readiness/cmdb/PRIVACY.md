# Privacy and data handling

This independent alpha does **not** have an account system, backend API, central assessment database or third-party tracking script. Questionnaire answers and calculations live in the browser's current page session. Refreshing the page loses unsaved work.

**Save / resume:** The visitor can export answers and organisation metadata to a JSON file and import it later. The visitor controls where that file is kept and shared. A print-friendly report is produced by the browser's Print / Save as PDF feature, not by uploading assessment data to a PDF service.

The tool intentionally does not request ServiceNow credentials, authentication tokens, live instance access or raw CMDB exports. Please use aggregated metrics and avoid entering confidential, personal or security-sensitive data.

The application is served by **GitHub Pages**, whose hosting and security infrastructure may process/log network information including IP addresses. Links to cited ServiceNow or NIST resources open other websites under their own privacy practices.

This describes the alpha's source code; if analytics or remote services are introduced later, this notice must be updated *before* deployment.
