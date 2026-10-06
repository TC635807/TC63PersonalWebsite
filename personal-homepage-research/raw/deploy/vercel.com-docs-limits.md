原始 URL: https://vercel.com/docs/limits
抓取日期: 2026-10-05
tier: browser

---

Limits
You can raise many of the limits on this page. The process depends on your plan:
- Enterprise: Contact your Vercel account team to request a limit increase. Limits marked as Custom are set in your contract.
- Pro: Talk to sales about Enterprise for custom limits.
- Hobby: Upgrade to Pro for higher limits.
To prevent abuse of our platform, we apply the following limits to all accounts.
| | Hobby | Pro | Enterprise | 
|---|---|---|---|
| Projects | 200 | Unlimited | Unlimited | 
| Deployments Created per Day | 100 | 6000 | Custom | 
| Functions Created per Deployment | Framework-dependent* | ∞ | ∞ | 
| Proxied Request Timeout (Seconds) | 120 | 120 | 120 | 
| Vercel Projects Connected per Git Repository | 25 | 150 | Custom | 
| Routes created per Deployment | 2048 | 2048 | Custom | 
| Build Time per Deployment (Minutes) | 45 | 45 | 45 | 
| Static File uploads | 100 MB | 1 GB | N/A | 
| Concurrent Deployments | 1 | Up to 500* | Custom | 
| Disk Size (GB) | 32 | 32 up to 64 | 32 up to 64 | 
| Cron Jobs (per project) | 100* | 100 | 100 | 
| Deploy Hooks (per project) | 5 | 5 | 10 | 
Hobby teams get a monthly allotment of each billable resource. Pro teams get a monthly credit that applies across billable resources, and Vercel charges for additional usage on demand once you use that credit. For the allotments and the on-demand rates, see typical monthly usage guidelines.
See the Pro trial limitations section for information on the limits that apply to Pro trials.
The limit of "Routes created per Deployment" encapsulates several options that can be configured on Vercel:
- If you are using a vercel.json configuration file, each rewrite, redirect, or header is counted as a Route
- If you are using the Build Output API, you might configure routes for your deployments
Note that most frameworks will create Routes automatically for you. For example, Next.js will create a set of Routes corresponding to your use of dynamic routes, redirects, rewrites and custom headers.
The maximum duration of the Build Step is 45 minutes. When the limit is reached, the Build Step will be interrupted and the Deployment will fail.
Every build container has a fixed amount of resources available to it. You can find the resources available for each build machine type here.
For more information on troubleshooting these, see Build container resources.
When using the CLI to deploy, the maximum size of the source files that can be uploaded is limited to 100 MB for Hobby and 1 GB for Pro. If the size of the source files exceeds this limit, the deployment will fail.
The maximum size of the Build's cache depends on the build machine type:
| Build machine type | Maximum cache size | 
|---|---|
| Basic | 1.5 GB | 
| Standard | 1.5 GB | 
| Enhanced | 3 GB | 
| Turbo | 4.75 GB | 
Elastic build machines use the limit of the machine type assigned to each build.
The cache is retained for one month and applies at the level of each Build cache key.
See the Observability Plus limitations section for the limits that apply to Observability Plus, which includes Observability Query.
Monitoring is deprecated and replaced by Observability Plus. If your team still has access to Monitoring, see Monitoring limits and pricing.
There are two types of logs: build logs and runtime logs. Both have different behaviors when storing logs.
Build logs are stored indefinitely for each deployment.
Runtime logs are stored for 1 hour on Hobby, 1 day on Pro, and for 3 days on Enterprise accounts. To learn more about these log limits, read here.
The maximum number of Environment Variables per environment per Project
is 1000. For example, you cannot have more than 1000 Production Environment Variables.
The total size of your Environment Variables, names and values, is limited to 64KB for projects using Node.js, Python, Ruby, Go, Java, and .NET runtimes. This limit is the total allowed for each deployment, and is also the maximum size of any single Environment Variable. For more information, see the Environment Variables documentation.
If you are using System Environment Variables, the framework-specific ones (i.e. those prefixed by the framework name) are exposed only during the Build Step, but not at runtime. However, the non-framework-specific ones are exposed at runtime. Only the Environment Variables that are exposed at runtime are counted towards the size limit.
| | Hobby | Pro | Enterprise | 
|---|---|---|---|
| Domains per Project | 50 | Unlimited* | Unlimited* | 
- To prevent abuse, Vercel implements soft limits of 100,000 domains per project for the Pro plan and 1,000,000 domains for the Enterprise plan. These limits are flexible and can be increased upon request. If you need more domains, please contact our support team for assistance.
The maximum number of files that can be uploaded when creating a CLI Deployment is 15,000 for source files. Deployments that contain more files than the limit will fail at the build step.
Although there is no upper limit for output files created during a build, you can expect longer build times as a result of having many thousands of output files (100,000 or more, for example). If the build time exceeds 45 minutes then the build will fail.
We recommend using Incremental Static Regeneration (ISR) to help reduce build time. Using ISR will allow you pre-render a subset of the total number of pages at build time, giving you faster builds and the ability to generate pages on-demand.
The amount of time (in seconds) that a proxied request (rewrites or routes with an external destination) is allowed to process an HTTP request. The maximum timeout is 120 seconds (2 minutes).
If the external server does not reply until the maximum timeout is reached, an error with the message ROUTER_EXTERNAL_TARGET_ERROR will be returned.
See the Limits and Pricing section for more details about the limits of Vercel Web Analytics.
See the Limits and Pricing doc for more details about the limits of the Speed Insights feature on Vercel.
See the Cron Jobs limits section for more information about the limits of Cron Jobs on Vercel.
Vercel Workflows limits the size and throughput of each workflow run, including events and steps per run, payload size, stored data per run, and stream throughput. It also rate limits the requests your team's workflows make to the Workflows backend, such as creating events, writing to streams, and reading run data. Requests over the rate limit are retried automatically with backoff, so hitting it slows your workflows down but does not cause them to fail. See Workflow limits and Workflow rate limits for the values on each plan.
The limits of Vercel functions are based on the runtime that you use.
For example, different runtimes allow for different bundle sizes, maximum duration, and memory.
If you have an existing project, deployed to Vercel before April 23rd 2025 and not using Fluid compute, Vercel Functions have the following defaults and maximum limits for the duration of a function:
| | Default | Maximum | 
|---|---|---|
| Hobby | 10s | 60s (1 minute) | 
| Pro | 15s | 300s (5 minutes) | 
| Enterprise | 15s | 900s (15 minutes) | 
Vercel does not support connecting a project on your Hobby team to Git repositories owned by Git organizations. You can either switch to an existing Team or create a new one.
The same limitation applies in the Project creation flow when importing an existing Git repository or when cloning a Vercel template to a new Git repository as part of your Git organization.
See the Reserved Environment Variables docs for more information.
Rate limits are hard limits that apply to the platform when performing actions that require a response from our API.
The rate limits table consists of the following five columns:
- Description - A brief summary of the limit which, where relevant, will advise what type of plan it applies to.
- Name - The unique identifier of the limit. Some limits share a description, so use the name to tell them apart.
- Limit - The amount of actions permitted within the amount of time (Duration) specified.
- Duration - The amount of time (seconds) in which you can perform the specified amount of actions. Once a rate limit is hit, it will be reset after the Duration has expired. If a description mentions a different time period, the Duration column shows the window the API enforces.
- Scope - How the rate limit is applied:
 - owner - Rate limit applies to the team or to an individual user, depending on the resource.
 - user - Rate limit applies to an individual user.
 - team - Rate limit applies to the team.
 - project - Rate limit applies to an individual project.
Below are six examples that provide further information on how rate limits work.
You are able to delete up to 60 domains every 60 seconds (1 minute). Should you hit the rate limit, you will need to wait another minute before you can delete another domain.
You are able to delete up to 20 teams every 3600 seconds (1 hour). Should you hit the rate limit, you will need to wait another hour before you can delete another team.
You are able to change your username up to 6 times every 604800 seconds (1 week). Should you hit the rate limit, you will need to wait another week before you can change your username again.
You are able to build 100 Deployments every 3600 seconds (1 hour). Should you hit the rate limit, you will need to wait another hour before you can build a deployment again. This corresponds to the api-deployments-free-per-hour limit in the table below.
You are able to deploy 100 times every 86400 seconds (1 day). Should you hit the rate limit, you will need to wait another day before you can deploy again.
You can trigger deploy hooks up to 60 times every 3600 seconds (1 hour) per project, across all deploy hooks in the project. This corresponds to the "Deploy hook triggers per hour" limit in the table below.
The following table lists all API rate limits that apply when using the Vercel REST API. These limits apply to actions such as deployments, domain management, team operations, and more.
| Description | Name | Limit | Duration (Seconds) | Scope | 
|---|---|---|---|---|
| Abuse report creation per minute. | api-abuse-create-report | 200 | 60 | owner | 
| Artifacts requests per minute (Free). | api-artifacts-free | 100 | 60 | owner | 
| Requests per minute to fetch the microfrontends groups for a team. | api-microfrontends-groups | 30 | 60 | owner | 
| Requests per minute to fetch the microfrontends config for a team. | api-microfrontends-config | 30 | 60 | owner | 
| Requests per minute to fetch the deployment of the best default app. | api-microfrontends-best-default-app-deployment | 30 | 60 | owner | 
| Artifacts requests per minute (Paid). | api-artifacts-paid | 10000 | 60 | owner | 
| Remote Cache purge requests per minute. | api-artifacts-remote-caching-purge | 5 | 60 | owner | 
| Project production deployment per minute. | api-projects-production-deployment | 500 | 60 | user | 
| Project expiration updates per minute. | api-projects-deployment-expiration | 100 | 60 | owner | 
| Project expiration lock requests per minute. | api-projects-expiration-lock | 200 | 60 | owner | 
| Project expiration schedule requests per minute. | api-projects-expiration-schedule | 200 | 60 | owner | 
| Project expiration unlock requests per minute. | api-projects-expiration-unlock | 200 | 60 | owner | 
| Project release configuration updates per minute. | api-projects-rolling-release | 100 | 60 | owner | 
| Project domains get per minute. | api-projects-domains-get | 500 | 60 | user | 
| Get project domains count per minute. | api-projects-domains-get-count | 100 | 60 | user | 
| Project domains verification per minute. | api-projects-domains-verify | 100 | 60 | user | 
| Project branches get per minute. | api-projects-branches-get | 100 | 60 | user | 
| Project branches get search per minute. | api-projects-branches-get-search | 500 | 60 | user | 
| Project domain creation, update, or remove per minute. | api-projects-domains-post | 100 | 60 | owner | 
| Project protection bypass creation, update, or remove per minute. | api-projects-protection-bypass-patch | 100 | 60 | owner | 
| Listing Deployment Protection Exceptions per minute | api-projects-deployment-protection-exceptions-list | 250 | 60 | owner | 
| Project environment variable retrieval per minute. | api-projects-environment-variable-get | 500 | 60 | owner | 
| Project environment variable updates per minute. | api-projects-environment-variable-patch | 120 | 60 | owner | 
| Team enable new standard protection for all projects updates per minute. | api-teams-enable-new-standard-protection-all-projects-patch | 10 | 60 | owner | 
| Project environment variable creation per minute. | api-projects-environment-variable-post | 120 | 60 | owner | 
| Project environment variable deletions per minute. | api-projects-environment-variable-delete | 60 | 60 | owner | 
| Project client certificate uploads per minute. | api-projects-client-cert-post | 5 | 60 | owner | 
| Project client certificate deletions per minute. | api-projects-client-cert-delete | 5 | 60 | owner | 
| Project client certificate retrievals per minute. | api-projects-client-cert-get | 300 | 60 | owner | 
| Project environment variable batch deletions per minute. | api-projects-environment-variable-batch-delete | 60 | 60 | owner | 
| Project environment variable pulls per minute. | api-environment-pull | 500 | 60 | owner | 
| Custom deployment suffix changes per hour. | api-custom-suffix | 5 | 3600 | owner | 
| Deploy hook triggers per hour. | api-deploy-hook-trigger | 60 | 3600 | owner | 
| Deployments retrieval per minute. | api-deployments-get | 500 | 60 | user | 
| Deployments retrieval per minute (Enterprise). | api-deployments-get-enterprise | 2000 | 60 | user | 
| Deployments per day (Free). | api-deployments-free-per-day | 100 | 86400 | owner | 
| Deployments per day (Pro). | api-deployments-paid-per-day | 6000 | 86400 | owner | 
| Deployments per day (Enterprise). | api-deployments-enterprise-per-day | 24000 | 86400 | owner | 
| Deployments per hour (Free). | api-deployments-free-per-hour | 100 | 3600 | owner | 
| Deployments per hour (Pro). | api-deployments-paid-per-hour | 450 | 3600 | owner | 
| Deployments per hour (Enterprise). | api-deployments-enterprise-per-hour | 1800 | 3600 | owner | 
| Deployments per five minutes (Free). | api-deployments-flood | 60 | 300 | owner | 
| Deployments per five minutes (Pro). | api-deployments-flood-pro | 120 | 300 | owner | 
| Deployments per five minutes (Enterprise). | api-deployments-flood-enterprise | 300 | 300 | owner | 
| Deployment user access check per minute. | api-deployments-get-user-access | 100 | 60 | user | 
| Deployment undeletes per minute. | api-deployments-undelete | 100 | 60 | owner | 
| Skipped deployments per minute. | api-deployments-skip-deployment-queue | 100 | 60 | user | 
| AI domain search per minute. | api-domains-ai-search | 20 | 60 | user | 
| Domains deletion per minute. | api-domains-delete | 100 | 60 | owner | 
| Domain price per minute. | api-domains-price | 100 | 60 | user | 
| Domains retrieval per minute. | api-domains-get | 200 | 60 | user | 
| Domains retrieval per minute. | api-domains-get-domain | 500 | 60 | user | 
| Domain project domains retrieval per minute. | api-domains-get-project-domains | 200 | 60 | user | 
| Domain's transfer auth code. | api-domains-get-auth-code | 50 | 60 | user | 
| Domain's transfer auth code. | api-domains-set-auth-code | 10 | 60 | user | 
| Domain contact verification status retrieval per minute. | api-domains-get-contact-verification-status | 20 | 60 | user | 
| Domains dns config retrieval per minute. | api-domains-get-config | 500 | 60 | user | 
| Domains update per minute. | api-domains-patch | 60 | 60 | owner | 
| Domains creation per hour. | api-domains-post | 120 | 3600 | owner | 
| Domain delegation requests per day. | api-domains-post-request-delegation | 20 | 86400 | owner | 
| Automatic domain delegation requests per minute. | api-domains-post-request-delegation-auto | 10 | 60 | owner | 
| Enterprise domain delegation requests per minute. | api-domains-post-request-delegation-enterprise | 10 | 60 | owner | 
| Domains record update per minute. | api-domains-records-patch | 50 | 60 | owner | 
| Domains record creation per minute. | api-domains-records-post | 50 | 60 | owner | 
| Domains status retrieval per minute. | api-domains-status | 150 | 60 | owner | 
| Domains availability retrieval per minute. | api-domains-availability | 60 | 60 | user | 
| Domain verification record retrieval per minute. | api-domains-get-verification-record | 60 | 60 | owner | 
| Domain ownership claim attempts per minute. | api-domains-claim-ownership | 10 | 60 | owner | 
| Domain save attempts per minute. | api-domains-save-domain | 20 | 60 | user | 
| Domain unsave attempts per minute. | api-domains-unsave-domain | 20 | 60 | user | 
| Domain DNSSEC DS record listing per minute. | api-domains-list-dnssec | 50 | 60 | user | 
| Domain DNSSEC DS record creation per minute. | api-domains-create-dnssec | 30 | 60 | owner | 
| Domain DNSSEC DS record deletion per minute. | api-domains-delete-dnssec | 30 | 60 | owner | 
| Events retrieval per minute. | api-events-get | 60 | 60 | user | 
| Event types listing per minute. | api-events-list-types | 60 | 60 | user | 
| Events retrieval per minute. | api-events-audit-log-post | 10 | 60 | user | 
| Download Audit Log exports per minute. | api-events-audit-log-get | 5 | 60 | user | 
| Setup up Audit Log Stream per minute | api-events-audit-log-stream | 10 | 60 | user | 
| Check Audit Log Stream status per minute | api-events-audit-log-stream-status | 30 | 60 | user | 
| Plan retrieval per minute. | api-plan-get | 120 | 60 | owner | 
| Plan update per hour. | api-plan-put | 60 | 3600 | owner | 
| Requests to self-unblock per hour. | api-plan-increase-block-threshold | 5 | 3600 | owner | 
| Team deletion per hour. | api-teams-delete | 20 | 3600 | user | 
| Team retrieval per minute. | api-teams-get | 600 | 60 | user | 
| Team retrieval per minute. | api-teams-get-available-roles | 600 | 60 | user | 
| Team update per hour. | api-teams-patch | 100 | 3600 | user | 
| Requests per minute to patch the microfrontends groups for a team. | api-teams-microfrontends-patch | 10 | 60 | user | 
| Team SSO configuration per hour. | api-teams-sso-configure | 100 | 3600 | user | 
| Team creation per day (Free). | api-teams-post-free | 5 | 86400 | user | 
| Team creation per day (Paid). | api-teams-post-paid | 25 | 86400 | user | 
| Team slug creation per hour. | api-teams-post-slug | 200 | 3600 | user | 
| Team slug update per week. | api-teams-update-slug | 6 | 604800 | owner | 
| Team exclusivity creation per team per hour. | api-teams-post-git-exclusivity | 10 | 3600 | owner | 
| Team exclusivity update per team per hour. | api-teams-patch-git-exclusivity | 10 | 3600 | owner | 
| Team exclusivity delete per team per hour. | api-teams-delete-git-exclusivity | 10 | 3600 | owner | 
| Team exclusivity list per user per minute. | api-teams-list-git-exclusivity | 120 | 60 | user | 
| Git exclusivity get per user per minute. | api-teams-get-git-exclusivity | 120 | 60 | user | 
| Preview Deployment Suffix updates per day. | api-teams-update-preview-deployment-suffix | 10 | 86400 | owner | 
| Team member deletion per ten minutes. | api-team-members-delete | 500 | 600 | owner | 
| Team member retrieval per minute. | api-team-members-get | 120 | 60 | owner | 
| Team member update per ten minutes. | api-team-members-patch | 40 | 600 | owner | 
| Team member creation per hour (Free). | api-team-members-post-free | 50 | 3600 | owner | 
| Team member creation per hour (Paid). | api-team-members-post-paid | 150 | 3600 | owner | 
| Team member creation per hour (Enterprise). | api-team-members-post-enterprise | 300 | 3600 | owner | 
| Team member creation (batch) | api-team-members-post-batch | 1 | 1 | owner | 
| Team invite requests per hour. | api-team-members-post-request | 10 | 3600 | user | 
| Team invite retrieval per minute. | api-team-members-get-invite | 120 | 60 | owner | 
| Requests to bulk update project retention per minute. | api-teams-bulk-update-project-retention | 1 | 60 | owner | 
| Requests to list teams eligible for merge per minute. | api-merge-list | 60 | 60 | user | 
| Requests to get the status of a merge per minute. | api-merge-status | 120 | 60 | user | 
| Requests to create merge plans per minute. | api-merge-plan | 20 | 60 | user | 
| Requests to create merge plans per minute. | api-merge-start | 20 | 60 | user | 
| Organizations retrieval per minute. | api-organizations-get | 120 | 60 | owner | 
| User retrieval per minute. | api-www-user-get | 500 | 60 | owner | 
| User update per minute. | api-www-user-patch | 60 | 60 | owner | 
| Username update per week. | api-www-user-update-username | 6 | 604800 | owner | 
| Uploads per day (Free). | api-upload-free | 5000 | 86400 | owner | 
| Uploads per day (Pro). | api-upload-paid | 40000 | 86400 | owner | 
| Uploads per day (Enterprise). | api-upload-enterprise | 80000 | 86400 | owner | 
| API key creation per team per hour. | api-keys-post-team | 500 | 3600 | team | 
| API key creation per user per hour. | api-keys-post-user | 32 | 3600 | user | 
| Token retrieval per minute. | api-user-tokens-get | 160 | 60 | owner | 
| Token creation per hour. | api-user-tokens-post | 32 | 3600 | owner | 
| Token deletion per ten minutes. | api-user-tokens-delete | 120 | 600 | owner | 
| Bulk token deletion per hour. | api-user-tokens-delete-all | 5 | 3600 | owner | 
| Payment method update per day. | api-billing-sources-post | 10 | 86400 | owner | 
| Payment method setup per hour | api-billing-sources-setup | 10 | 3600 | owner | 
| Balance due retrieval per minute. | billing-invoices-balance-due | 70 | 60 | owner | 
| Overdue invoices retrieval per minute. | billing-invoices-overdue | 70 | 60 | owner | 
| Upcoming invoice retrieval per minute. | billing-invoices-upcoming-invoice | 70 | 60 | owner | 
| Invoice Settings updates per ten minutes. | billing-invoices-update-invoice-settings | 10 | 600 | owner | 
| Concurrent Builds updates per ten minutes. | billing-invoices-update-concurrent-builds | 10 | 600 | owner | 
| Monitoring updates per ten minutes. | billing-invoices-update-monitoring | 10 | 600 | owner | 
| Web Analytics updates per ten minutes. | billing-invoices-update-web-analytics | 10 | 600 | owner | 
| Preview Deployment Suffix updates per ten minutes. | billing-invoices-update-preview-deployment-suffix | 10 | 600 | owner | 
| Team Level Password Protection updates per ten minutes. | billing-invoices-update-password-protection | 10 | 600 | owner | 
| Retry payment per ten minutes. | billing-invoices-retry-payment | 25 | 600 | owner | 
| Alias retrieval per ten minutes. | now-alias-get | 300 | 600 | user | 
| Alias creation per ten minutes. | now-alias-post | 120 | 600 | owner | 
| Aliases list per minute. | now-aliases-get | 500 | 60 | user | 
| Aliases deletion per minute. | now-aliases-delete | 100 | 60 | owner | 
| Certificate deletion per ten minutes. | now-cert-generator-delete | 60 | 600 | owner | 
| Certificate retrieval per minute. | now-cert-generator-get | 500 | 60 | user | 
| Certificate update per hour. | now-cert-generator-patch | 30 | 3600 | owner | 
| Certificate creation per hour. | now-cert-generator-post | 30 | 3600 | owner | 
| User supplied certificate update per hour. | now-cert-generator-put | 30 | 60 | owner | 
| Deployments list per minute. | now-list | 1000 | 60 | user | 
| Deployments configuration list per minute. | now-list-configuration | 100 | 60 | owner | 
| Deployments deletion per ten minutes. | now-rm | 200 | 600 | owner | 
| Integration job creation per five minutes. | integration-job-creation | 100 | 300 | owner | 
| Integration retrieval per minute (All). | api-integrations-integrations-get | 100 | 60 | user | 
| Integration retrieval per minute (Single). | api-integrations-integration-get | 100 | 60 | user | 
| Integration creation per minute. | api-integrations-integration-post | 120 | 3600 | user | 
| Integration update per minute. | api-integrations-integration-patch | 120 | 3600 | user | 
| Integration deletion per minute. | api-integrations-integration-delete | 120 | 3600 | user | 
| Integration deployment action updates per minute. | api-integrations-deployment-update-action | 100 | 60 | user | 
| Marketplace integration installations per minute. | api-integrations-marketplace-integration-install | 120 | 3600 | user | 
| Marketplace integration uninstallations per minute. | api-integrations-marketplace-integration-uninstall | 120 | 3600 | user | 
| Marketplace integration secrets rotation requests per minute. | api-integrations-marketplace-request-secrets-rotation | 120 | 60 | user | 
| Marketplace integration security rules operations per minute. | api-integrations-marketplace-security-rules | 120 | 60 | user | 
| Marketplace integration transfers per minute. | api-integrations-marketplace-integration-transfer | 120 | 3600 | user | 
| Marketplace purchase provisions per minute. | api-integrations-marketplace-provision-purchase | 120 | 3600 | user | 
| Resource drains retrieval per minute. | api-integrations-get-resource-drains | 100 | 60 | user | 
| Integration product get per minute. | api-integrations-get-product | 120 | 60 | user | 
| Integration products get per minute. | api-integrations-get-products | 120 | 60 | user | 
| Integration product delete per minute. | api-integrations-delete-product | 120 | 3600 | user | 
| Integration product create per minute. | api-integrations-create-product | 120 | 3600 | user | 
| Integration product create per minute. | api-integrations-update-product | 120 | 3600 | user | 
| Integration product billing plans retrieval per minute. | api-integrations-get-billing-plans | 120 | 3600 | user | 
| Integration installation billing plans retrieval per minute. | api-integrations-get-installation-billing-plans | 120 | 3600 | user | 
| Integration resource billing plans retrieval per minute. | api-integrations-get-resource-billing-plans | 120 | 3600 | user | 
| Integration resource usage retrieval per minute. | api-integrations-get-resource-usage | 120 | 3600 | user | 
| Store-to-project connection per minute. | api-integrations-connect-store-project | 120 | 3600 | user | 
| Integration SSO redirect URI create per minute. | api-integrations-get-sso-redirect-uri | 20 | 60 | user | 
| Integration MCP access token requests. | api-integrations-alloc-mcp-access-token | 2 | 60 | user | 
| Integration MCP access token requests when cached. | api-integrations-alloc-mcp-access-token-cached | 200 | 60 | user | 
| Integration partner OAuth connect-url requests. | api-integrations-create-connect-url | 10 | 60 | user | 
| Resource-scoped partner-issued access token allocations via integration.resourceTokenEndpoint. | api-integrations-alloc-resource-token | 30 | 60 | user | 
| MCP domain search requests per minute per IP. | mcp-domain-search | 100 | 60 | user | 
| Installation Resource secrets update per minute. | api-integrations-update-resource-secrets | 240 | 60 | user | 
| Installation Resource import per minute. | api-integrations-import-resource | 100 | 60 | user | 
| Installation account info retrieval per minute. | api-integrations-get-account-info | 60 | 60 | user | 
| Installation event create per minute. | api-integrations-create-event | 60 | 60 | user | 
| Integration favorite retrieval per minute. | api-integrations-fav-get | 100 | 60 | user | 
| Integration favorite update per minute. | api-integrations-fav-patch | 120 | 3600 | user | 
| Integration configuration creation per minute. | api-integrations-configuration-post | 120 | 3600 | owner | 
| Integration authorization creation per minute. | api-integrations-authorize-post | 120 | 3600 | user | 
| Integration configuration retrieval per minute (All). | api-integrations-configurations-get | 200 | 60 | user | 
| Integration configuration retrieval per minute (Single). | api-integrations-configuration-get | 120 | 60 | user | 
| Most recent integration configuration retrieval per minute (Single). | api-integrations-configuration-get-most-recent | 60 | 60 | user | 
| Integration configuration permissions retrieval per minute (All). | api-integrations-configuration-get-permissions | 60 | 60 | user | 
| Integration configuration update per minute. | api-integrations-configuration-patch | 120 | 3600 | owner | 
| Integration associated user transfers per minute. | api-integrations-configuration-transfer | 120 | 3600 | user | 
| Integration configuration deletion per minute. | api-integrations-configuration-delete | 120 | 3600 | owner | 
| Integration metadata retrieval per minute. | api-integrations-metadata-get | 300 | 60 | user | 
| Integration metadata creation per minute. | api-integrations-metadata-post | 300 | 60 | user | 
| Integration metadata deletion per minute. | api-integrations-metadata-delete | 60 | 60 | user | 
| Integration logs retrieval per minute. | api-integrations-log-drains-get | 100 | 60 | user | 
| Integration logs creation per minute. | api-integrations-log-drains-post | 20 | 60 | user | 
| Integration logs deletion per minute. | api-integrations-log-drain-delete | 60 | 60 | user | 
| Integration webhooks retrieval per minute. | api-integrations-webhooks-get | 100 | 60 | user | 
| Integration webhooks retrieval per minute. | api-integrations-webhook-get | 100 | 60 | user | 
| Integration webhooks retrieval per minute. | api-integrations-webhook-events-get | 100 | 60 | user | 
| Integration webhooks creation per minute. | api-integrations-webhook-post | 20 | 60 | user | 
| Integration webhooks deletion per minute. | api-integrations-webhook-delete | 60 | 60 | user | 
| Integration app install status retrieval per minute. | api-integrations-app-install-status | 60 | 60 | user | 
| Membership info retrievals per minute for an installation. | api-marketplace-get-partner-member | 1000 | 60 | owner | 
| Membership info retrievals per minute for a user. | api-marketplace-get-installation-member | 60 | 60 | user | 
| List of memberships retrieval per minute for a user. | api-marketplace-get-memberships | 60 | 60 | user | 
| Integration resource usage retrieval per minute. | api-integrations-get-prepayment-balances | 120 | 60 | user | 
| Integration resource sql query execution per minute. | api-integrations-execute-resource-sql-query | 60 | 60 | user | 
| Integration resource Redis command execution per minute. | api-integrations-execute-resource-redis-command | 600 | 60 | user | 
| Installation prepayment balance submissions per minute. | api-marketplace-submit-prepayment-balances | 10 | 60 | user | 
| Installation billing data submissions per minute. | api-marketplace-submit-billing-data | 10 | 60 | user | 
| Installation invoice submissions per minute. | api-marketplace-submit-invoice | 10 | 60 | user | 
| Marketplace installation updates per minute | api-marketplace-update-installation | 10 | 60 | user | 
| Installation resources retrieval per minute. | api-marketplace-get-resources | 1000 | 60 | user | 
| Installation resource deletion per minute. | api-marketplace-delete-resource | 100 | 60 | user | 
| Integration invoice retrieval per minute. | api-marketplace-get-invoice | 120 | 60 | user | 
| Integration resource retrieval per minute. | api-marketplace-get-resource | 1000 | 60 | user | 
| Start resource import per minute. | api-marketplace-start-resource-import | 60 | 60 | user | 
| Complete resource import per minute. | api-marketplace-resource-import-complete | 60 | 60 | user | 
| Integration payment method retrieval per minute. | api-marketplace-get-installation-payment-method | 60 | 60 | user | 
| Integration payment method list per minute. | api-marketplace-list-installation-payment-method | 60 | 60 | user | 
| Integration payment method update per minute. | api-marketplace-update-installation-payment-method | 60 | 60 | user | 
| Admin users for the installation. | api-marketplace-get-installation-admins | 60 | 60 | user | 
| Update admin users for the installation. | api-marketplace-update-installation-admins | 60 | 60 | user | 
| Create authorization for a marketplace purchase. | api-marketplace-billing-authorization-create | 30 | 60 | user | 
| Check marketplace authorization state. | api-marketplace-billing-authorization-state-read | 500 | 60 | user | 
| Get installation statistics for a marketplace integration. | api-marketplace-analytics-get-installations | 500 | 60 | user | 
| Get installation statistics for a marketplace integration. | api-marketplace-analytics-get-provisions | 500 | 60 | user | 
| Get billing summary for a marketplace integration. | api-marketplace-analytics-get-billing-summary | 500 | 60 | user | 
| Get invoices by month for a marketplace integration. | api-marketplace-analytics-get-invoices | 500 | 60 | user | 
| Webhooks updates per minute. | api-webhook-update | 60 | 60 | user | 
| Webhooks tests per minute. | api-webhook-test | 60 | 60 | user | 
| Log Drain retrieval per minute. | api-drains-get | 100 | 60 | user | 
| Log Drain creation per minute. | api-drains-post | 20 | 60 | user | 
| Log Drain deletion per minute. | api-drains-delete | 60 | 60 | user | 
| Log Drain test per minute. | api-drains-test | 30 | 60 | user | 
| Log Drain update per minute. | api-drains-update | 30 | 60 | user | 
| Drain create per minute. | api-drains-create-drain | 30 | 60 | user | 
| Drain delete per minute. | api-drains-delete-drain | 30 | 60 | user | 
| Drain retrieval per minute. | api-drains-get-drain | 100 | 60 | user | 
| Drain update per minute. | api-drains-update-drain | 30 | 60 | user | 
| Drain test per minute. | api-drains-test-drain | 30 | 60 | user | 
| Runtime Logs retrieval per minute. | runtime-logs-get | 100 | 60 | user | 
| Request Logs retrieval per minute. | request-logs-get | 240 | 60 | user | 
| Logs UI preset creation per minute. | logs-preset-create | 100 | 60 | user | 
| Logs UI preset reads per minute. | logs-preset-get | 100 | 60 | user | 
| Logs UI preset edits per minute. | logs-preset-edit | 100 | 60 | user | 
| Log Drain retrieval per minute. | api-integrations-log-drains-allowed-domains | 100 | 60 | user | 
| Suggested teams retrieval per minute. | api-integrations-suggested-teams | 30 | 60 | user | 
| Integration installed retrieval per minute (All). | api-integrations-installed | 20 | 60 | user | 
| Integration otel endpoint creation/updates per minute. | api-integrations-otel-endpoint-upsert | 20 | 60 | user | 
| Integration otel endpoint retrieval per minute. | api-integrations-otel-endpoint-get | 100 | 60 | user | 
| Integration otel endpoint deletion per minute. | api-integrations-otel-endpoint-delete | 60 | 60 | user | 
| Check retrieval per minute. | api-checks-get-all-checks | 500 | 60 | user | 
| Check retrieval per minute. | api-checks-get-check | 500 | 60 | user | 
| Checks retrieval per minute. | api-checks-get-all-checks-v2 | 300 | 60 | owner | 
| Check retrieval per minute. | api-checks-get-check-v2 | 300 | 60 | owner | 
| Check runs retrieval per minute. | api-checks-get-all-check-runs-v2 | 500 | 60 | owner | 
| Check runs for check retrieval per minute. | api-checks-get-run-for-check-v2 | 500 | 60 | owner | 
| Check run log retrieval per minute. | api-checks-get-check-run-logs | 60 | 60 | owner | 
| Check runs retrieval per minute. | api-checks-get-check-run-v2 | 500 | 60 | owner | 
| State retrieval per minute. | api-deployment-integrations-get-state | 500 | 60 | user | 
| Deployment integrations skip action. | api-deployment-integrations-skip | 200 | 60 | user | 
| Global Config writes per hour (Paid). | api-global-config-update | 100 | 3600 | owner | 
| Global Config writes per month (Free). | api-global-config-update-free | 250 | 2592000 | owner | 
| Global Config token changes per day. | api-global-config-edit-tokens | 500 | 86400 | owner | 
| Global Config deletions per 5 minutes. | api-global-config-delete | 60 | 300 | owner | 
| Global Configs reads per minute. | api-global-configs-get | 500 | 60 | owner | 
| Global Config reads per minute. | api-global-config-get | 500 | 60 | owner | 
| Global Config schema reads per minute. | api-global-config-schema-get | 500 | 60 | owner | 
| Global Config schema updates per minute. | api-global-config-schema-update | 60 | 60 | owner | 
| Global Config backup queries per minute. | api-global-config-backups-get | 100 | 60 | owner | 
| Global Config backup retrievals per minute. | api-global-config-backup-get | 60 | 60 | owner | 
| Endpoint Verification retrieval per minute. | api-endpoint-verification-post | 100 | 60 | user | 
| Secure Compute networks created per hour. | api-connect-create-network | 5 | 3600 | owner | 
| Secure Compute networks deleted per hour. | api-connect-delete-network | 25 | 3600 | owner | 
| Secure Compute network lists per minute. | api-connect-list-networks | 250 | 60 | owner | 
| Secure Compute network reads per minute. | api-connect-read-network | 250 | 60 | owner | 
| Secure Compute network updates per hour. | api-connect-update-network | 25 | 3600 | owner | 
| Recents create per minute. | api-recents-create | 100 | 60 | user | 
| Recents delete per minute. | api-recents-delete | 100 | 60 | user | 
| Recents get retrieval per minute. | api-recents-get | 100 | 60 | user | 
| Update notification settings preferences. | api-notifications-update-preferences | 20 | 60 | user | 
| Stores get retrieval per minute. | api-storage-stores-get | 200 | 60 | user | 
| Accept storage terms of service. | api-storage-accept-tos | 100 | 60 | user | 
| Store get retrieval per minute. | api-storage-store-get | 400 | 60 | user | 
| Access credentials per minute. | api-storage-get-token-set | 1000 | 60 | user | 
| Blob stores create per minute. | api-storage-blob-store-create | 100 | 60 | user | 
| Blob stores create per minute for Hobby teams. | api-storage-blob-store-create-hobby | 10 | 60 | user | 
| Blob stores update per minute. | api-storage-blob-store-update | 100 | 60 | user | 
| Blob stores delete per minute. | api-storage-blob-store-delete | 100 | 60 | user | 
| Postgres stores create per minute. | api-storage-postgres-store-create | 100 | 60 | user | 
| Postgres stores update per minute. | api-storage-postgres-store-update | 100 | 60 | user | 
| Postgres stores delete per minute. | api-storage-postgres-store-delete | 100 | 60 | user | 
| Postgres stores warm-up per minute. | api-storage-postgres-store-warm | 100 | 60 | user | 
| Stores connect per minute. | api-storage-connect-store-project | 100 | 60 | user | 
| Stores disconnect per minute. | api-storage-disconnect-store-project | 100 | 60 | user | 
| Store RW token revocations per minute. | api-storage-revoke-store-rw-token | 20 | 60 | user | 
| Store RW token restorations per minute. | api-storage-restore-store-rw-token | 20 | 60 | user | 
| Integration stores create per minute. | api-storage-integration-store-create | 100 | 60 | user | 
| Integration stores update per minute. | api-storage-integration-store-update | 100 | 60 | user | 
| Integration stores delete per minute. | api-storage-integration-store-delete | 100 | 60 | user | 
| Integration stores repl commandse per minute. | api-storage-integration-store-repl | 100 | 60 | user | 
| Stores rotate default store token set per minute. | api-storage-rotate-default-store-token-set | 100 | 60 | user | 
| Transfer Stores per minute. | api-storage-transfer | 100 | 60 | user | 
| Stores set locked per minute. | api-storage-set-store-locked | 100 | 60 | user | 
| Vercel Blob Simple Operations per minute for Hobby plan. | api-blob-simple-operation-hobby | 1200 | 60 | team | 
| Vercel Blob Simple Operations per minute for Pro plan. | api-blob-simple-operation-pro | 7200 | 60 | team | 
| Vercel Blob Simple Operations per minute for Enterprise plan. | api-blob-simple-operation-enterprise | 9000 | 60 | team | 
| Vercel Blob Advanced Operations per minute for Hobby plan. | api-blob-advanced-operation-hobby | 1500 | 60 | team | 
| Vercel Blob Advanced Operations per minute for Pro plan. | api-blob-advanced-operation-pro | 4500 | 60 | team | 
| Vercel Blob Advanced Operations per minute for Enterprise plan. | api-blob-advanced-operation-enterprise | 7500 | 60 | team | 
| Ip Blocking create per minute. | api-ip-blocking-create | 60 | 60 | user | 
| Ip Blocking list executed per minute. | api-ip-blocking-list | 100 | 60 | user | 
| Ip Blocking reads executed per minute. | api-ip-blocking-get | 100 | 60 | user | 
| Ip Blocking delete per minute. | api-ip-blocking-delete | 100 | 60 | user | 
| Speed Insights aggregate queries executed per hour. | api-speed-insights-aggregate | 400 | 3600 | team | 
| IP Bypass reads per minute. | api-security-ip-bypass-read | 100 | 60 | user | 
| IP Bypass updates per minute. | api-security-ip-bypass-write | 30 | 60 | user | 
| Attack Status | api-security-firewall-attack-status | 20 | 60 | user | 
| Observability Plus project configuration changes per team-project per week. | api-observability-configuration-projects-weekly | 5 | 604800 | owner | 
| Project Bulk Redirect reads per minute | api-bulk-redirects-get | 200 | 60 | owner | 
| Project Bulk Redirect mutations per minute | api-bulk-redirects-update | 30 | 60 | owner | 
| Project Bulk Redirect version reads per minute | api-bulk-redirects-versions-get | 500 | 60 | owner | 
| Project Bulk Redirect version updates per minute | api-bulk-redirects-versions-update | 20 | 60 | owner | 
| Project Bulk Redirect settings reads per minute | api-bulk-redirects-settings-get | 300 | 60 | owner | 
| Project Bulk Redirect settings updates per minute | api-bulk-redirects-settings-update | 10 | 60 | owner | 
| Project custom environment pack settings updates per minute | api-custom-environments-settings-update | 10 | 60 | owner | 
| AI rule generation per minute. | api-nl-rule-generation | 60 | 60 | owner | 
| Project Routes reads per minute | api-project-routes-get | 200 | 60 | owner | 
| Project Routes mutations per minute | api-project-routes-update | 60 | 60 | owner | 
| Project Routes version reads per minute | api-project-routes-versions-get | 500 | 60 | owner | 
| Project Routes version updates per minute | api-project-routes-versions-update | 20 | 60 | owner | 
| Vade review configuration requests per minute. | api-vade-configure | 30 | 60 | owner | 
| Vade tasks retrieval requests per minute. | api-vade-tasks | 100 | 60 | owner | 
| Vade runtime fix trigger requests per minute. | api-vade-runtime-fix | 100 | 60 | owner | 
| Vade apply patch requests per minute. | api-vade-apply-patch | 30 | 60 | owner | 
| Vade ignore patch requests per minute. | api-vade-ignore-patch | 30 | 60 | owner | 
| Vade code generation and follow-up requests per minute. | api-vade-code | 20 | 60 | owner | 
| Vade code threads retrieval requests per minute. | api-vade-code-threads | 100 | 60 | owner | 
| Vade code messages retrieval requests per minute. | api-vade-code-messages | 100 | 60 | owner | 
| Vade audit retrieval requests per minute. | api-vade-audit-get | 250 | 60 | owner | 
| Vade audit creation requests per minute. | api-vade-audit-create | 30 | 60 | owner | 
| Vade apply trial credits requests per minute. | api-vade-apply-trial-credits | 10 | 60 | owner | 
| Vade automations creation requests per minute. | api-vade-automations-create | 30 | 60 | owner | 
| Vade automations list requests per minute. | api-vade-automations-list | 250 | 60 | owner | 
| Vade automations retrieval requests per minute. | api-vade-automations-get | 250 | 60 | owner | 
| Vade automations update requests per minute. | api-vade-automations-update | 60 | 60 | owner | 
| Vade automations deletion requests per minute. | api-vade-automations-delete | 30 | 60 | owner | 
| Vade automation manual trigger requests per minute. | api-vade-automations-trigger | 30 | 60 | owner | 
| Vade automation runs retrieval requests per minute. | api-vade-automations-runs | 250 | 60 | owner | 
| Sandbox control plane requests per minute for Hobby plan. | api-sandboxes-control-plane-hobby | 1000 | 60 | owner | 
| Sandbox control plane requests per minute for Pro plan. | api-sandboxes-control-plane-pro | 10000 | 60 | owner | 
| Sandbox control plane requests per minute for Enterprise plan. | api-sandboxes-control-plane-enterprise | 100000 | 60 | owner | 
| Sandbox, snapshot and drive deletions per second. | api-sandboxes-control-plane-delete | 20 | 1 | owner | 
| Manual AI code review requests per minute. | api-vade-request-review | 30 | 60 | owner | 
| VCR management API requests per minute for Hobby plan. | api-vcr-crud-hobby | 100 | 60 | owner | 
| VCR management API requests per minute for Pro plan. | api-vcr-crud-pro | 500 | 60 | owner | 
| VCR management API requests per minute for Enterprise plan. | api-vcr-crud-enterprise | 1000 | 60 | owner | 
| VCR registry (Docker) requests per minute for Hobby plan. | api-vcr-registry-hobby | 1000 | 60 | owner | 
| VCR registry (Docker) requests per minute for Pro plan. | api-vcr-registry-pro | 5000 | 60 | owner | 
| VCR registry (Docker) requests per minute for Enterprise plan. | api-vcr-registry-enterprise | 10000 | 60 | owner | 
| Compliance document downloads per minute. | api-compliance-download-document | 30 | 60 | user | 
| Compliance bulk (zip) document downloads per minute. | api-compliance-bulk-download | 10 | 60 | user | 
| Compliance document list requests per minute. | api-compliance-list-items | 120 | 60 | user | 
| Compliance item detail requests per minute. | api-compliance-get-item | 120 | 60 | user | 
Dynamic quotas cap how fast your provisioning rate for a resource can grow. They do not cap the total number of actions in a fixed window.
Each dynamic quota has an allowed rate, measured per minute, that moves between a minimum and a maximum. The unit depends on the resource and is named in the limit's description.
- You start at the minimum rate when you have made no requests against the limit for 10 minutes.
- While you consume at or above your current allowed rate, that rate climbs at the ramp per minute rate, toward the maximum rate.
- Consuming less than your allowed rate lets it decay back down toward the minimum at the same slope.
Your allowance is one minute's worth of your current allowed rate, so you can spend a full minute of capacity in one burst and then wait for it to refill.
For example, take a limit with a minimum rate of 100 units per minute, a ramp of 200 units per minute, and a maximum rate of 1,000 units per minute. After 10 minutes with no requests you start at 100 units per minute, which gives you an allowance of 100 units. Keep consuming at or above your allowed rate and it climbs to 300 units per minute after one minute, 500 after two minutes, and reaches the 1,000 maximum after four and a half minutes of sustained usage. Drop below your allowed rate and it falls back toward 100 units per minute at the same slope.
Once your recent usage has drawn down your allowance, the API responds with a 429 status code and a rate_limit_exceeded error. The error message tells you how to react: while you are below the maximum, it reports the rate you are ramping up to, which means a retry will succeed shortly. Continuing the example above, a request rejected while your allowed rate is 300 units per minute returns a message like:
Allocation rate limit exceeded (300 units/min). Allocation rate is ramping up to 500 units/min, retry shortly.
A single request can be larger than your full allowance. When your allowance is full, that request still goes through, but it drains your allowance below zero. Later requests get a 429 until your allowance refills. Continuing the example above, a 250-unit request admitted when your allowance is 100 units leaves you 150 units short, so follow-up requests are rejected for a short time.
The dynamic quotas table consists of the following five columns:
- Description - A brief summary of the limit which, where relevant, will advise what type of plan it applies to.
- Minimum rate (per minute) - The rate you start at, and the floor your allowed rate decays back to. The API returns this as minRate .
- Maximum rate (per minute) - The highest rate the limit can ramp up to. The API returns this as maxRate .
- Ramp (per minute) - How much the allowed rate climbs for each minute of sustained usage, toward the maximum. The API returns this as stepPerMinute .
- Scope - How the rate limit is applied:
 - owner - Rate limit applies to the team or to an individual user, depending on the resource.
 - user - Rate limit applies to an individual user.
 - team - Rate limit applies to the team.
 - project - Rate limit applies to an individual project.
| Description | Minimum rate (per minute) | Maximum rate (per minute) | Ramp (per minute) | Scope | 
|---|---|---|---|---|
| Sandbox vCPU provisioning ramp for Hobby plan (vCPUs per minute). | 20 | 40 | 20 | owner | 
| Sandbox vCPU provisioning ramp for Pro plan (vCPUs per minute). | 150 | 5000 | 500 | owner | 
| Sandbox vCPU provisioning ramp for Enterprise plan (vCPUs per minute). | 150 | 5000 | 500 | owner | 
Was this helpful?