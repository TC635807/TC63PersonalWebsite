原始 URL: https://developers.cloudflare.com/pages/functions/pricing/
抓取日期: 2026-10-05
tier: browser

---

Requests to your Functions are billed as Cloudflare Workers requests. Workers plans and pricing can be found in the Workers documentation.
Requests to your Pages functions count towards your quota for Workers Paid plans, including requests from your Function to KV or Durable Object bindings.
Pages supports the Standard usage model.
On both free and paid plans, requests to static assets are free and unlimited. A request is considered static when it does not invoke Functions. Refer to Functions invocation routes to learn more about when Functions are invoked.
Requests to your Pages Functions count towards your quota for the Workers Free plan. For example, you could use 50,000 Functions requests and 50,000 Workers requests to use your full 100,000 daily request usage. The free plan daily request limit resets at midnight UTC.