原始 URL: https://vercel.com/docs/limits/usage
抓取日期: 2026-10-05
tier: browser

---

Manage and optimize usage
There are three plans on Vercel: Hobby, Pro, and Enterprise. To see which plan you are on, select your team from the team switcher. Next to your team name, you will see the plan you are on.
The Usage page shows the usage of all projects in your Vercel account by default. To access it, open Usage in the sidebar from your Vercel dashboard.
To use the usage page:
- To investigate the usage of a specific team, use the team switcher to select your team
- From your dashboard, open Usage in the sidebar
- We recommend you look at usage over the last 30 days to determine patterns. Change the billing cycle dropdown under Usage to Last 30 days
- You can choose to view the usage of a particular project by selecting it from the dropdown
- In the overview, you'll see an allotment indicator. It shows how much of your usage you've consumed in the current cycle and the projected cost for each item
- Review the breakdown by project and region to understand the metrics causing the high usage
The usage dashboard helps you understand and project your usage. You can also set up alerts to notify you when you're approaching usage limits. You can set up the following features:
- 
Spend Management: Spend management is an opt-in feature. Pro teams and Enterprise teams on the Flexible Commitment plan can set up a spend amount for your team to trigger notifications or actions. For example a webhook or pausing your projects when you hit your set amount
- 
Usage Notifications: Usage notifications are set up automatically. Pro teams can also configure the threshold for usage alerts to notify you when you're approaching your usage limits Interested in the Enterprise plan?Contact our sales team to learn more about the Enterprise plan and how it can benefit your team.
The table below shows the CDN metrics on the Usage dashboard.
To view information on managing each resource, select the resource link in the Metric column. To jump straight to guidance on optimization, select the corresponding resource link in the Optimize column.
| Manage and Optimize pricing | | | | 
|---|---|---|---|
| Metric | Description | Priced | Optimize | 
|---|---|---|---|
| Fast Data Transfer | The data transfer between Vercel's CDN and your sites' end users. | Yes | Learn More | 
| Fast Origin Transfer | The data transfer between Vercel's CDN to Vercel Compute | Yes | Learn More | 
| CDN Requests | The number of cached and uncached requests that your deployments have received | Yes | Learn More | 
The table below shows the metrics for the Functions section of the Usage dashboard.
To view information on managing each resource, select the resource link in the Metric column. To jump straight to guidance on optimization, select the corresponding resource link in the Optimize column.
| Manage and Optimize pricing | | | | 
|---|---|---|---|
| Metric | Description | Priced | Optimize | 
|---|---|---|---|
| Function Invocations | The number of times your Functions have been invoked | Yes | Learn More | 
| Active CPU | The total CPU time used by your Functions | Yes | Learn More | 
| Provisioned Memory | The memory allocated to function instances while requests are in progress | Yes | Learn More | 
| Throttles | Instances where requests to Functions are not served due to concurrency limits | No | N/A | 
The table below shows the metrics for the Builds section of the Usage dashboard.
To view information on managing each resource, select the resource link in the Metric column. To jump straight to guidance on optimization, select the corresponding resource link in the Optimize column.
| Manage and Optimize pricing | | | | 
|---|---|---|---|
| Metric | Description | Priced | Optimize | 
|---|---|---|---|
| Build Minutes | The amount of build usage based on the build machine type used for each build | Yes | Learn More | 
The table below shows the metrics for the Deployment Storage section of the Usage dashboard.
To view information on managing each resource, select the resource link in the Metric column. To jump straight to guidance on optimization, select the corresponding resource link in the Optimize column.
| Manage and Optimize pricing | | | | 
|---|---|---|---|
| Metric | Description | Priced | Optimize | 
|---|---|---|---|
| Deployment Storage | Build outputs and static assets stored for your deployments | Yes | Learn More | 
| Functions Storage | Vercel Function bundles stored in each region where Vercel deploys them | Yes | Learn More | 
The table below shows the metrics for the Remote Cache Artifacts section of the Usage dashboard.
To view information on managing each resource, select the resource link in the Metric column. To jump straight to guidance on optimization, select the corresponding resource link in the Optimize column.
| Manage and Optimize pricing | | | | 
|---|---|---|---|
| Metric | Description | Priced | Optimize | 
|---|---|---|---|
| Number of Remote Cache Artifacts | The number of uploaded and downloaded artifacts using the Remote Cache API | No | N/A | 
| Total Size of Remote Cache Artifacts | The size of uploaded and downloaded artifacts using the Remote Cache API | No | Learn More | 
| Time Saved | The time saved by using artifacts cached on the Vercel Remote Cache API | No | N/A | 
The table below shows the metrics for the Global Config section of the Usage dashboard.
To view information on managing each resource, select the resource link in the Metric column. To jump straight to guidance on optimization, select the corresponding resource link in the Optimize column.
| Manage and Optimize pricing | | | | 
|---|---|---|---|
| Metric | Description | Priced | Optimize | 
|---|---|---|---|
| Reads | The number of times your Global Config has been read | Yes | Learn More | 
| Writes | The number of times your Global Config has been updated | Yes | Learn More | 
The table below shows the metrics for the Data Cache section of the Usage dashboard.
To view information on managing each resource, select the resource link in the Metric column. To jump straight to guidance on optimization, select the corresponding resource link in the Optimize column.
| Manage and Optimize pricing | | | | 
|---|---|---|---|
| Metric | Description | Priced | Optimize | 
|---|---|---|---|
| Overview | The usage from fetch requests to origins | No | Learn More | 
| Reads | The total amount of Read Units used to access the Data Cache | No | Learn More | 
| Writes | The total amount of Write Units used to store new data in the Data Cache | No | Learn More | 
The table below shows the metrics for the Incremental Static Regeneration section of the Usage dashboard.
To view information on managing each resource, select the resource link in the Metric column. To jump straight to guidance on optimization, select the corresponding resource link in the Optimize column.
| Manage and Optimize pricing | | | | 
|---|---|---|---|
| Metric | Description | Priced | Optimize | 
|---|---|---|---|
| Reads | The total amount of Read Units used to access ISR data | Yes | Learn More | 
| Writes | The total amount of Write Units used to store new ISR data | Yes | Learn More | 
The table below shows the metrics for the Web Analytics, Speed Insights, and Observability Plus sections of the Usage dashboard.
To view information on managing each resource, select the resource link in the Metric column. To jump straight to guidance on optimization, select the corresponding resource link in the Optimize column.
| Manage and Optimize pricing | | | | 
|---|---|---|---|
| Metric | Description | Priced | Optimize | 
|---|---|---|---|
| Web Analytics Events | The number of page views and custom events tracked across all your projects | Yes | Learn More | 
| Speed Insights Events | The number of events reported from browsers for Speed Insights | Yes | Learn More | 
| Observability Plus Events | The number of events collected, based on requests made to your site | Yes | Learn More | 
The table below shows the metrics for the Image Optimization section of the Usage dashboard.
To view information on managing each resource, select the resource link in the Metric column. To jump straight to guidance on optimization, select the corresponding resource link in the Optimize column.
| Manage and Optimize pricing | | | | 
|---|---|---|---|
| Metric | Description | Priced | Optimize | 
|---|---|---|---|
| Image Transformations | The number of image transformations performed by the Image Optimization API | Yes | Learn More | 
| Image Cache Reads | The number of reads from the Image Optimization cache | Yes | Learn More | 
| Image Cache Writes | The number of writes to the Image Optimization cache | Yes | Learn More | 
Count shows the total number of a certain metric, across all projects in your account. This is useful to understand past trends about your usage.
Project shows the total usage of a certain metric, per project. This is useful to understand how different projects are using resources and is useful to help you start understanding the best opportunities for optimizing your usage.
For region-based pricing, you can view the usage of a certain metric, per region. This is useful to understand the requests your site is getting from different regions.
- Requests: The ratio of cached vs uncached requests
- Fast Data Transfer: The ratio of incoming vs outgoing data transfer
- Fast Origin Transfer: The ratio of incoming vs outgoing data transfer
- Functions invocations: Successful vs errored vs timed out invocations
- Functions execution: Successful vs errored vs timed out invocations
- Builds: Completed vs errored builds
- Remote Cache Artifacts: Uploaded vs downloaded artifacts
- Remote Cache total size: Uploaded vs downloaded artifacts
This shows the average usage of a certain metric over a 24 hour period.
For more information on Vercel's pricing, guidance on optimizing consumption, and invoices, see the following resources:
Was this helpful?