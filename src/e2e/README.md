> src/e2e/mocks/ - contains route interception logic
> src/e2e/page-objects/ - contains page objects
> src/e2e/tests/ - contains test spec files
> src/e2e/fixtures/ - contains mock data fixture files for response payloads



1. Purpose

Tests can run locally which is achieved by running web server and running as a precondition for tests execution.
To avoid live network dependency (SWAPI is not reliable) the SWAPI calls are intercepted and tests are using mocked data.

The tests are using page object model pattern to improve readability and maintainability.

The scope of the test suite contains only the acceptance criteria that matter most (according to the ASSESSMENT.md):

people search success
people search not found
planets search success
planets search not found
clearing results with empty input
search via button click
search via Enter press
multiple results for partial matches


Include:

this folder contains Playwright-based e2e/integration tests
tests validate the Star Wars Search app requirements
tests are designed to avoid reliance on external services
Example points to cover:

browser automation tool: Playwright
language: TypeScript
goal: stable, maintainable, requirement-focused tests
2. Test strategy
Explain the approach at a high level.

Include:

primary focus is requirement coverage
tests mock SWAPI responses instead of hitting the live API
a small number of high-value browser flows are preferred over many brittle tests
strategy follows shift-left principles
This is also a good place to mention:

why mocking is necessary
why deterministic tests are preferred
how this balances confidence with execution speed
3. Folder structure
Document the meaning of each subfolder.

Suggested items:

tests/ → executable Playwright specs
page-objects/ → page abstractions and reusable UI interaction helpers
fixtures/ → static mock response data
mocks/ → request interception and mock setup logic
support/ → shared utilities/helpers
This makes your structure intentional instead of arbitrary.

4. Naming conventions
Add a short section describing how files should be named.

Examples of what to describe:

spec files are feature-based
fixtures are grouped by API/domain and scenario
page objects are named by page or meaningful UI area
helpers are named by responsibility
Useful rules to mention:

prefer search.people.spec.ts over generic names
prefer planet-not-found.json over vague fixture names
prefer domain-specific component names over generic UI names
5. Mocking approach
This is an important section for the assignment.

Explain:

tests should not depend on live SWAPI
Playwright intercepts outgoing requests
fixtures provide deterministic responses for:
success
not found
multiple results
optional delayed/error cases
Also mention that this supports:

stable CI
repeatable local runs
coverage of edge cases that are hard to guarantee with a live backend
6. Test coverage map
Document what behaviors are covered.

Suggested checklist:

people search success
planet search success
not found scenarios
submit by button
submit by Enter
empty query behavior
keyboard/radio interaction
multiple results
This helps reviewers immediately see traceability from requirements to tests.

7. How to run tests
Keep this section simple.

Include:

prerequisites
how to start the app if needed
how to run Playwright tests
how to open the HTML report
You can also mention whether tests rely on Playwright’s webServer config or expect the app to already be running.

8. Design decisions and trade-offs
This is one of the most valuable sections for the assignment.

Include concise notes like:

why Playwright was chosen for browser-level coverage
why mocking is used instead of real SWAPI calls
why page objects are used only where they improve readability
what you intentionally did not implement to avoid overengineering
You can also note trade-offs such as:

limited number of e2e flows for maintainability
preference for stable selectors over brittle DOM traversal
small abstractions over heavy framework structure
9. Reporting and debugging
Briefly describe how failures are investigated.

Include:

Playwright HTML report
traces/screenshots on failure
where to find generated reports
This signals that your solution is usable in practice, not just theoretically.

10. Future improvements
Add a short final section with optional next steps.

Examples:

add CI execution via GitHub Actions
expand fixture coverage
add accessibility-focused scenarios
add contract validation for mock payload shape
introduce component/unit tests to complement e2e coverage
This shows product thinking without making the README too long.

Suggested final structure
A clean README could look like this:

Purpose
Test strategy
Folder structure
Naming conventions
Mocking approach
Coverage map
How to run tests
Design decisions and trade-offs
Reporting and debugging
Future improvements
 