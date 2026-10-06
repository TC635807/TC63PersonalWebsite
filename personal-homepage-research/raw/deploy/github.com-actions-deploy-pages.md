原始 URL: https://github.com/actions/deploy-pages
抓取日期: 2026-10-05
tier: browser

---

This action is used to deploy Actions artifacts to GitHub Pages.
See action.yml for the various inputs this action supports (or below).
For examples that make use of this action, check out our starter-workflows in a variety of frameworks.
This action deploys a Pages site previously uploaded as an artifact (e.g. using actions/upload-pages-artifact).
We recommend this action to be used in a dedicated job:
jobs:
 # Build job
 build:
 # <Not provided for brevity>
 # At a minimum this job should upload artifacts using actions/upload-pages-artifact
 # Deploy job
 deploy:
 # Add a dependency to the build job
 needs: build
 # Grant GITHUB_TOKEN the permissions required to make a Pages deployment
 permissions:
 pages: write # to deploy to Pages
 id-token: write # to verify the deployment originates from an appropriate source
 # Deploy to the github-pages environment
 environment:
 name: github-pages
 url: ${{ steps.deployment.outputs.page_url }}
 # Specify runner + deployment step
 runs-on: ubuntu-latest
 steps:
 - name: Deploy to GitHub Pages
 id: deployment
 uses: actions/deploy-pages@v4 # or specific "vX.X.X" version tag for this action
| Input | Required? | Default | Description | 
|---|---|---|---|
| token | true | ${{ github.token }} | The GitHub token used to create an authenticated client - Provided for you by default! | 
| timeout | false | "600000" | Time in milliseconds after which to timeout and cancel the deployment (default: 10 minutes) | 
| error_count | false | "10" | Maximum number of status report errors before cancelling a deployment (default: 10) | 
| reporting_interval | false | "5000" | Initial time in milliseconds between deployment status reports. Successful non-terminal polls use exponential backoff up to 30 seconds, or the configured interval when higher, with ±20% jitter. Error backoff is added separately (default: 5 seconds). | 
| artifact_name | false | "github-pages" | The name of the artifact to deploy | 
| preview | false | "false" | Is this attempting to deploy a pull request as a GitHub Pages preview site? (NOTE: This feature is only in alpha currently and is not available to the public!) | 
| Output | Description | 
|---|---|
| page_url | The URL of the deployed Pages site | 
| Variable | Description | 
|---|---|
| GITHUB_PAGES | This environment variable is created and set to the string value "true" so that framework build tools may choose to differentiate their output based on the intended target hosting platform. | 
There are a few important considerations to be aware of:
- 
The artifact being deployed must have been uploaded in a previous step, either in the same job or a separate job that doesn't execute until the upload is complete. See actions/upload-pages-artifact for more information about the format of the artifact we expect.
- 
The job that executes the deployment must at minimum have the following permissions: 
 - pages: write
 - id-token: write
- 
The deployment should target the github-pages environment (you may use a different environment name if needed, but this is not recommended.)
- 
If your Pages site is using a source branch, the deployment must originate from this source branch unless your environment is protected in which case the environment protection rules take precedence over the source branch rule
- 
If your Pages site is using GitHub Actions as the source, while not required we highly recommend you also protect your environment (we will configure it by default for you).
When we invoke a job using GitHub Actions the job requests an OIDC token from GitHub's OIDC provider which responds with a JSON web token (JWT). Each token is unique to each workflow job learn more about OIDC tokens.
OIDC tokens are minted within the context of a single job, and are used to form a trust relationship which validates properties of the workflow run against a third-party (e.g. cloud providers such as AWS or Azure). In the context of GitHub Pages, this is most relevant to ensure a workflow respects branch protection settings. To do this, the OIDC token includes a claim about which branch/ref is executing the workflow. The token is passed to the pages deployment API as part of the request payload, where it's decoded internally to validate the claims and verify if that workflow is allowed to deploy to pages.
A common question regarding OIDC tokens is the need to use both pages:write and id-token:write. The pages permission relates to the GITHUB_TOKEN by giving it the permissions to create pages deployments when calling the GitHub API. The id-token permission is necessary to request the OIDC JWT token. For more information on the id-token, check the docs on adding permissions settings.
This action is primarily designed for use with GitHub.com's Actions workflows and Pages deployments. However, certain releases should also be compatible with GitHub Enterprise Server (GHES) 3.7 and above.
| Release | GHES Compatibility | 
|---|---|
| v4 | | 
| v3 | >= 3.9 | 
| v3.x.x | >= 3.9 | 
| v2 | >= 3.9 | 
| v2.x.x | >= 3.9 | 
| v1 | >= 3.7 | 
| v1.2.8 | >= 3.7 | 
| v1.2.7 | >= 3.9 Incompatible with prior versions! | 
| v1.2.6 | >= 3.7 | 
| v1.x.x | >= 3.7 | 
In order to release a new version of this Action:
- 
Locate the semantic version of the upcoming release (a draft is maintained by the draft-release workflow).
- 
Publish the draft release from the main branch with semantic version as the tag name, with the checkbox to publish to the GitHub Marketplace checked. ☑️
- 
After publishing the release, the release workflow will automatically run to create/update the corresponding major version tag such asv1 .⚠️ Environment approval is required. Check the Release workflow run list.
The scripts and documentation in this project are released under the MIT License.