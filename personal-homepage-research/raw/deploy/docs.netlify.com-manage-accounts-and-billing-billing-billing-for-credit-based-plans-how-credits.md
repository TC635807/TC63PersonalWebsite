原始 URL: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work.md
抓取日期: 2026-10-05
tier: browser

---

---
title: "How credits work"
description: "Learn about how credits work for Netlify's Credit-based pricing plans."
---
> For the complete documentation index for AI agents, see [llms.txt](https://docs.netlify.com/llms.txt). Markdown versions of any documentation page are available by appending `.md` to its docs.netlify.com URL.
Netlify's Credit-based pricing plans are optimized to simplify metered & usage-based billing and work smoothly with AI development workflows. By using credits to measure and bill for usage, Netlify users have fewer metrics to track and more flexibility on how to optimize their spending.
Learn how credits work for our standard pricing plans in this doc. Credit-based standard plans include the Free, Personal, and Pro plans. To learn how credits work for Enterprise plans, check out [How credits work for enterprise plans](/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work-for-enterprise-plans/).
> **Note - Credit-based plans for new accounts:** Starting on September 4, 2025, all new Netlify accounts will use the new credit-based pricing plans. 
If you've created your Netlify account with a Free, Starter, or Pro plan before September 4, 2025, then your pricing plan is now considered a Legacy pricing plan. There is no action required for you. You have the option to switch to a credit-based plan. Learn more about [Legacy pricing plans](/manage/accounts-and-billing/billing/billing-for-legacy-plans/legacy-pricing-plans/) or [Billing for legacy pricing plans](/manage/accounts-and-billing/billing/billing-for-legacy-plans/billing-for-legacy-plans/).
> **Tip - Enterprise plan questions?:** For credit-based billing details specific to Enterprise plans, see [How credits work for enterprise plans](/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work-for-enterprise-plans/). For the latest and most accurate billing information for your plan, reach out to your account manager or use this [Sales form](https://www.netlify.com/contact/sales/) to share your questions.
### Note - On an Enterprise plan?
See [How credits work for enterprise plans](/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work-for-enterprise-plans/) for credit rates specific to your plan.
## Monthly credit allotment 
Each Credit-based plan includes a monthly credit allotment that a web project will use for that month's billing cycle. Some features are also only available on certain plans or have different limits across the Credit-based pricing plans.
| Free | Personal | Pro |
|------|----------|-----|
| 300 credits/month | 1,000 credits/month | Starts at 3,000 credits/month with more options| 
| Hard limit | Option to purchase more credits | Option to purchase more credits | 
Once your credit balance is completely used up, all of your web projects (sites/apps) are paused and visitors to your web projects will find a `Site not available` page at each of your web project's URLs.
### Credit balance usage order
Your credit balance will be used up in the order that your credits expire, starting with credits that will expire the soonest and then ending with credits that do not expire, such as [credit packs](/manage/accounts-and-billing/billing/billing-for-credit-based-plans/buy-credit-packs/) or any remaining credits from auto recharge.
### Monthly plan credits 
Monthly plan credits are included with your plan each billing cycle. The balance resets at the start of each cycle.
In general, monthly plan credits do not roll over, but if you have a Pro plan with 5,000 monthly credits or higher, then any leftover credits can roll over for an additional month. Learn more about [rollover credits](#rollover-credits).
### Other ways to get credits
While your monthly credits reset after each month, other credits can have their own expiration date or no expiration date and they can be issued on demand, such as when you buy [credit packs](/manage/accounts-and-billing/billing/billing-for-credit-based-plans/buy-credit-packs/) or through a special one-time promotion or Hackathon event.
### Rollover credits
If you have a Pro plan with 5,000 monthly credits or higher, then unused monthly credits from the previous cycle are carried forward automatically as rollover credits. If you used all your monthly credits last cycle, nothing rolls over.
## Buying more credits
If you have a Personal or Pro plan, you have two options to buy more credits:
### Buy credit packs
You can purchase additional credits at any time. Credits bought in credit packs roll over for future months.
Learn more about [buying credit packs](/manage/accounts-and-billing/billing/billing-for-credit-based-plans/buy-credit-packs/).
### Auto recharge
Control your spend and keep your web projects active by enabling auto recharge. Auto recharge automatically reloads your credit balance when it runs out with small increments of credits only when your projects need it.
Auto recharge can only be enabled or disabled by a Team Owner for all web projects on a team and is turned off by default for all projects. If you are on a Pro plan, you can also add additional Team Owners to your team.
If you have a Personal or Pro plan and you've enabled auto recharge, the payment method saved to your Netlify team account will be charged at these rates when your credit balance runs out:
| Free | Personal | Pro |
|------|----------|-----|
| N/A | 500 credits for $5 | 1,500 credits for $10 | 
Only Team Owners can enable or disable auto recharge for all web projects on a team. You cannot enable auto recharge for only a specific project on a team.
For guided steps on enabling auto recharge, check out [Configure auto-recharge](/manage/accounts-and-billing/billing/billing-for-credit-based-plans/configure-auto-recharge).
## Credits usage for metered billing
Here is how credit usage is calculated by Netlify's metered billing at a high-level. For more detailed and technical explanations, check out the sections below.
| Feature | Credit usage | Quick high-level description |
|---------|-------|----------|
| [Production deploys](#credit-usage-for-production-deploys) | 15 credits each | Deploying your project to production, build minutes no longer calculated |
| Deploy Previews or branch deploys | 0 credits | Free deployments for previewing, experimenting, and creating versions of your site/app |
| [Compute](#credit-usage-for-compute) | 10 credits per GB-hour | The "processing power" your site/app needs to run things like serverless functions, scheduled functions, background functions, Preview servers, and Agent Runners. Compute is made up of Functions compute, Preview server compute, Agent Runners compute, and Database compute. |
| [AI inference](#credit-usage-for-ai-inference) | 180 credits per USD of AI model usage | The costs of running AI models and agents on Netlify, particularly for Agent Runners and AI Gateway. |
| [Netlify Forms submissions](#credit-usage-for-forms-submissions) | Free for all credit plans | Netlify's highly customizable forms service with spam protection support available |
| [Bandwidth](#credit-usage-for-bandwidth) | 20 credits per GB | Data sent out to the internet, such as assets hosted on Netlify or files downloaded from your site/app. Bandwidth is made up of Database bandwidth and Web bandwidth. |
| [Web requests](#credit-usage-for-web-requests) | 2 credits per 10,000 requests | Web traffic requests to your site or app, includes page views, API calls, redirects, requests to serverless functions, asset requests | 
Explore pricing estimates for various combinations of Netlify's features and services with our [Pricing estimation calculator](https://www.netlify.com/pricing/#calculator).
### Credit usage for production deploys
Production deploys are a type of deploy that is optimized to work as the finalized version of your web project that shows up at your primary domain and is live on the web. Your primary domain can be a custom domain, such as `mycompany.com`, or your Netlify default URL, such as `MY-PROJECT-NAME.netlify.app`.
Netlify supports three types of deploys: 
- [Production deploys](/deploy/deploy-types/production-deploy) for finalized and production-ready released versions of your web project
- [Deploy Previews](/deploy/deploy-types/deploy-previews) for reviewing and experimenting with changes before they are released
- [Branch deploys](/deploy/deploy-types/branch-deploys) for reviewing and experimenting with changes from specific branches or for maintaining different versions of your project
Deploy Previews and branch deploys are optimized to work as preview environments for reviewing and experimenting.
With Credit-based pricing plans, each successful production deploy consumes 15 credits during that month's billing cycle and you have free deployments for previewing, experimenting, and creating versions of your site/app.
Failed deploys and rolling back a production deploy to a previous production deploy does not consume credits.
Learn more about Netlify's [deploy types](/deploy/deploy-types/production-deploy).
### Credit usage for compute
Compute is the amount of resources used by your functions, Preview servers, Agent Runners, and Netlify Database, and represents the "processing power" your site/app needs. 
Compute is measured in GB-hours and includes:
- **[Functions compute](#functions-compute)**: measures usage for Serverless Functions, Scheduled Functions, and Background Functions
- **[Preview server compute](#preview-server-compute)**: measures usage for Preview servers
- **[Agent Runners compute](#agent-runners-compute)**: measures usage for Agent Runners
- **[Database compute](#database-compute)**: measures usage for Netlify Database
At a high-level, compute represents the amount of data transfer in gigabytes needed in an hour.
Compute consumes 10 credits per GB-hour. A GB-hour represents a combination of memory allocation and execution time, creating a more transparent way to understand and manage your resource usage. We use this metric on our credit plans, instead of charging per invocation, because it more accurately reflects the compute resources reserved to run your functions. This means we multiply the amount of time your functions run by the memory they are allocated during the billing cycle.
### Note - On an Enterprise plan?
On Enterprise plans, compute is made up of two metrics: Functions & Agents compute, a single metric that covers functions, Preview servers, and Agent Runners, and Database compute. You can find Enterprise compute rates in our docs on [How credits work for Enterprise plans](/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work-for-enterprise-plans).
#### Functions compute
Functions compute is the amount of resources used by your functions. This includes the following features:
 - Serverless Functions
 - Scheduled Functions - Functions triggered on a schedule
 - Background Functions - Long-running background tasks
Note that Edge functions don't contribute to the compute usage metric. Edge functions are measured through web requests.
#### Preview server compute
Preview server compute is the amount of resources used by your [Preview servers](/manage/preview-servers/overview), which are live preview environments for your site/app.
#### Agent Runners compute
Agent Runners compute is the amount of resources used by the environment your [Agent Runners](/build/build-with-ai/agent-runners/overview) work in while an agent run is active. The AI model usage during an agent run is billed separately through the [AI inference](#credit-usage-for-ai-inference) meter.
#### Database compute
[Netlify Database](/build/data-and-storage/netlify-database/) uses Database compute, which is measured in GB-hours.
### Credit usage for forms submissions
Netlify's web forms service is free and unlimited for all credit-based plans.
We recommend taking measures to help prevent abuse of your project. For example, you can reduce form submission spam by adding a [reCAPTCHA 2 challenge](/manage/forms/spam-filters#recaptcha-2-challenge) and [honeypot field](/manage/forms/spam-filters#honeypot-field).
### Credit usage for AI inference 
AI inference is a usage meter that measures the costs of using AI models and agents on Netlify through Agent Runners and the AI Gateway.
AI inference is measured based on the costs set by AI model providers, which convert AI model usage tokens to USD. Netlify then converts every $1 USD spent on AI model usage to 180 Netlify credits.
You can set an [AI Credit Usage Limit](/build/build-with-ai/manage-ai-for-your-team/manage-ai-features/#limit-ai-feature-usage) that tracks AI inference from [Agent Runners](/build/build-with-ai/agent-runners/overview) specifically. Note that on Enterprise plans, the AI Credit Usage Limit factors in AI inference from both Agent Runners and [AI Gateway](/build/ai-gateway/overview).
To learn more about how AI inference pricing works, check out our docs on [AI inference pricing](/manage/accounts-and-billing/billing/billing-for-credit-based-plans/pricing-for-ai-features).
> **Tip - Want to limit Agent Runners?:** 
> **Snippet** component (self-closing)
### Credit usage for bandwidth
Bandwidth is the amount of data traffic your site or app sends out to the internet.
Bandwidth consumes 20 credits per GB used and includes:
- Web bandwidth
- Database bandwidth
#### Web bandwidth
Web bandwidth is the amount of data traffic your project sends out to the internet. This includes the following features:
 - Assets & web content served - All static assets hosted on Netlify, HTML, CSS, JavaScript files served to visitors
 - Image serving - Images served through Netlify's CDN
 - File downloads - Any files downloaded from your site/web project
 - API responses - Data served through serverless functions
 - Large Media (Deprecated) - Git LFS files served through Netlify Large Media
#### Database bandwidth
Database bandwidth is the amount of data traffic generated by Netlify Database.
### Credit usage for web requests
Web requests are web traffic requests to your site/app, including requests to your site's main (production) URL, as well as to any active branch deploys and Deploy Previews.
A web request is counted whenever a user or system accesses content hosted on your project. This includes requests for HTML pages, images, JavaScript, CSS files, and other static assets.
Web requests use 2 credits per 10 thousand (10,000) requests.
Features that use web requests include: 
 - Page views - Each visitor request to your site/app pages
 - API calls - Requests to your serverless functions
 - Asset requests hosted by Netlify - Requests for CSS, JavaScript, images, and other static files hosted by Netlify
 - Redirects
 - Edge functions
## Monitor credit usage
For help monitoring your web project's credit usage, check out [Monitor credit usage](/manage/accounts-and-billing/billing/billing-for-credit-based-plans/monitor-usage-for-credit-based-plans/).
## Calculate common usage patterns 
Use our [Pricing calculator](https://www.netlify.com/pricing/#calculator) to calculate common usage patterns.
## FAQ
Get more of your questions answered, such as "[What happens when credits are used up?](/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans/#what-happens-when-credits-are-used-up)" in our [Billing FAQ for Credit-based plans](/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans/).