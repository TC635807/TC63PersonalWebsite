原始 URL: https://developers.cloudflare.com/pages/platform/limits/
抓取日期: 2026-10-05
tier: browser

---

Below are limits observed by the Cloudflare Free plan. For more details on removing these limits, refer to the Cloudflare plans ↗︎ page.
Each time you push new code to your Git repository, Pages will build and deploy your site. Build limits depend on your plan:
| | Free | Pro | Business | 
|---|---|---|---|
| Builds | 1 build at a time | 5 concurrent builds | 20 concurrent builds | 
| Builds per month | 500 | 5,000 | 20,000 | 
Builds will timeout after 20 minutes. Concurrent builds are counted per account.
Based on your Cloudflare plan type, a Pages project is limited to a specific number of custom domains. This limit is on a per-project basis.
| Free | Pro | Business | Enterprise | 
|---|---|---|---|
| 100 | 250 | 500 | 5001 | 
Pages uploads each file on your site to Cloudflare's globally distributed network to deliver a low latency experience to every user that visits your site. Cloudflare Pages sites can contain up to 20,000 files on the Free plan.
Paid plans (such as Pro, Business, and Enterprise plans) can have up to 100,000 files per site. To enable this increased limit, set the environment variable PAGES_WRANGLER_MAJOR_VERSION=4 in your Pages project settings.
The maximum file size for a single Cloudflare Pages site asset is 25 MiB.
Requests to Pages functions count towards your quota for Workers plans, including requests from your Function to KV or Durable Object bindings.
Pages supports the Standard usage model.
A _headers file can have a maximum of 100 header rules.
An individual header in a _headers file can have a maximum of 2,000 characters. For managing larger headers, it is recommended to implement Pages Functions.
You can have an unlimited number of preview deployments active on your project at a time.
A _redirects file can have a maximum of 2,000 static redirects and 100 dynamic redirects, for a combined total of 2,100 redirects. It is recommended to use Bulk Redirects when you have a need for more than the _redirects file supports.
Your Pages site can be managed by an unlimited number of users via the Cloudflare dashboard. Note that this does not correlate with your Git project – you can manage both public and private repositories, open issues, and accept pull requests via without impacting your Pages site.
Cloudflare Pages has a limit of 100 projects2 per account. This limit is not routinely increased.
If you need to host more than 100 sites, use one of these products designed for scale:
- Workers for Platforms — Deploy sites and applications at scale with no project limit. Supports static assets.
- Workers Static Assets — Deploy static sites as individual Workers. Paid plans support up to 500 Workers per account, each serving up to 100,000 static asset files.
In order to protect against abuse of the service, Cloudflare limits the number of new Pages projects you can create within your first 48 hours of using the service. If you are temporarily blocked from creating new projects, this restriction will automatically lift once the initial 48-hour window has passed.