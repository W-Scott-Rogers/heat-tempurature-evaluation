*Processes I currently use

Prior to committing changes, build and test should pass on the local workstation.

A commit hook would cause a build of the source code within a Jenkins* or other CI environment.

Upon a successful build, the success would kick off a test build which would run unit, integration, and TCK tests.

Upon a successful test job build, a hook would create a peer review:
Options:
* Crucible* is an Atlassian program that can tie into git hooks.
* A diff can be sent to reviewers via email or notification.

Upon a successful code review by peers, the code would be merged into the mainline.

Upon the successful merge, a hook would then cause a CI build where artifacts would be pushed to repository, such as Nexus.

Next the artifacts would be used to to build a deploy job, which sets up an alpha (pre-release) server, which is ready for QC testing.


At any point if the CI process fails, developer is notified (I currently use Slack notifications). The step must pass before proceeding to the next step.
