原始 URL: https://docs.netlify.com/build/functions/usage-and-billing.md
抓取日期: 2026-10-05
tier: browser

---

---
title: "Functions usage and billing"
description: "Monitor your Functions usage at the team and project levels"
---
> For the complete documentation index for AI agents, see [llms.txt](https://docs.netlify.com/llms.txt). Markdown versions of any documentation page are available by appending `.md` to its docs.netlify.com URL.
How functions are billed, and what options you have for monitoring detailed usage, depend on whether you're on a [Credit-based plan](/manage/accounts-and-billing/billing/overview/#credit-based-plans) or a [Legacy plan](/manage/accounts-and-billing/billing/billing-for-legacy-plans/legacy-pricing-plans/).
If you're unsure which plan you're on, [here's how to check](/manage/accounts-and-billing/billing/billing-for-legacy-plans/billing-faq-for-legacy-plans/#do-i-have-a-legacy-plan).
## Credit-based plans
With a Credit-based plan, functions are billed through the [compute metric](/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/#credit-usage-for-compute) in GB-Hour units.
The default memory allocation for Netlify Functions is 1024 MB (1 GB). For example, if the total runtime of all function invocations across your team is two hours, you will be billed for two GB-Hour units.
If you have a Credit-based Pro or Enterprise plan, you can [increase the memory allocation](/build/functions/configuration/?data-tab=TypeScript#memory-or-vcpu) of a function up to 4096 MB (4 GB), which also provides a proportionally higher vCPU allocation. For non-default memory allocations, GB-Hour units are calculated as the total duration of function invocations multiplied by the configured memory allocation in GB.
For example, assume a function is configured to use 2,560 MB (2.5 GB) and runs for a total of 37 minutes in a given month:
* Its usage in GB-Hour units is (37/60) x 2.5 = 1.54 GB-Hour units.
* Each GB-Hour unit consumes 10 credits, so usage of this function consumes 15.4 credits in that month.
### View team-level credit usage
To check the aggregated credit consumption for functions:
1. Go to 
### NavigationPath Component:
Usage & billing > General
.
2. On that page, scroll down to the **Credit usage breakdown** card and expand the **Compute** entry to view the exact credit consumption for functions in GB-Hour units.
For a view of usage over time, aggregated across all projects in your team, go to 
### NavigationPath Component:
Usage & billing > Account usage insights > Compute
. This view lets you quickly pinpoint trends and spikes over time.
### View project-level observability
For detailed visibility into function invocations in a specific project, down to individual requests, go to 
### NavigationPath Component:
Analytics & metrics > Observability
.
Observability provides built-in [quick actions](/manage/monitoring/observability/overview#quick-insights) to help you easily determine which functions are invoked the most, which are the slowest to run, and which client types make the most requests which invoke functions.
## Legacy plans
With a Legacy plan:
* Functions are billed by request count, regardless of runtime. Limits per plan are [available here](/manage/accounts-and-billing/billing/billing-for-legacy-plans/legacy-pricing-plans/#legacy-pricing-plan-details).
* Memory/vCPU allocation cannot be increased.
* [Background Functions](/build/functions/background-functions) are not available for Legacy plans, except for Enterprise.
* Observability is not available, except for Enterprise. Use [Function Metrics](/manage/monitoring/function-metrics) for a per-function view.
For paid plans, pricing scales with usage. When usage reaches a level limit, the site automatically upgrades to the next level or package. Free tier accounts are also metered based on usage and have a [fixed limit](/manage/accounts-and-billing/billing/billing-for-legacy-plans/billing-faq-for-legacy-plans/#free-tier-limits).
### View usage
At the team level, you can find function usage under 
### NavigationPath Component:
Billing > Account usage insights
. Learn more about [usage and insights](/manage/accounts-and-billing/billing/billing-for-legacy-plans/billing-for-legacy-plans/#usage-and-insights) for legacy-based plans.
At the project level:
1. For an aggregated count of requests in the current billing period, go to 
### NavigationPath Component:
Cloud compute > Functions > Usage
.
2. For more detailed data per function, use [Function Metrics](/manage/monitoring/function-metrics).
## More usage and billing resources
- [Billing overview](/manage/accounts-and-billing/billing/overview)
- [Billing FAQ for Legacy plans](/manage/accounts-and-billing/billing/billing-for-legacy-plans/billing-faq-for-legacy-plans)