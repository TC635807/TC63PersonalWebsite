原始 URL: https://developers.cloudflare.com/pages/configuration/custom-domains/
抓取日期: 2026-10-05
tier: browser

---

When deploying your Pages project, you may wish to point custom domains (or subdomains) to your site.
To add a custom domain:
- 
In the Cloudflare dashboard, go to the Workers & Pages page. Go to Workers & Pages ↗
- 
Select your Pages project > Custom domains.
- 
Select Set up a domain.
- 
Provide the domain that you would like to serve your Cloudflare Pages site on and select Continue.
If you are deploying to an apex domain (for example, example.com), then you will need to add your site as a Cloudflare zone and configure your nameservers.
To use a custom apex domain (for example, example.com) with your Pages project, configure your nameservers to point to Cloudflare's nameservers. If your nameservers are successfully pointed to Cloudflare, Cloudflare will proceed by creating a CNAME record for you.
If you are deploying to a subdomain, it is not necessary for your site to be a Cloudflare zone. You will need to add a custom CNAME record to point the domain to your Cloudflare Pages site. To deploy your Pages project to a custom apex domain, that custom domain must be a zone on the Cloudflare account you have created your Pages project on.
If you do not want to point your nameservers to Cloudflare, you must create a custom CNAME record to use a subdomain with Cloudflare Pages. After logging in to your DNS provider, add a CNAME record for your desired subdomain, for example, shop.example.com. This record should point to your custom Pages subdomain, for example, <YOUR_SITE>.pages.dev.
| Type | Name | Content | 
|---|---|---|
| CNAME | shop.example.com | <YOUR_SITE>.pages.dev | 
If your site is already managed as a Cloudflare zone, the CNAME record will be added automatically after you confirm your DNS record.
To detach a custom domain from your Pages project, you must modify your zone's DNS records.
- 
Go to the DNS Records page for your website in the Cloudflare dashboard. Go to Records ↗
- 
Locate your Pages project's CNAME record.
- 
Select Edit.
- 
Select Delete.
- 
In the Cloudflare dashboard, go to the Workers & Pages page. Go to Workers & Pages ↗
- 
Select your Pages project.
- 
Go to Custom domains.
- 
Select the three dot icon next to your custom domain > Remove domain.
After completing these steps, your Pages project will only be accessible through the *.pages.dev subdomain you chose when creating your project.
To disable access to your project's provided *.pages.dev subdomain:
- 
Use Cloudflare Access over your previews ( *.{project}.pages.dev ). Refer to Customize preview deployments access.
- 
Redirect the *.pages.dev URL associated with your production Pages project to a custom domain. You can use the account-level Bulk Redirect feature to redirect your*.pages.dev URL to a custom domain.
For guidelines on caching, refer to Caching and performance.
Certification Authority Authorization (CAA) records allow you to restrict certificate issuance to specific Certificate Authorities (CAs).
This can cause issues when adding a custom domain to your Pages project if you have CAA records that do not allow Cloudflare to issue a certificate for your custom domain.
To resolve this, add the necessary CAA records to allow Cloudflare to issue a certificate for your custom domain.
Refer to the Certification Authority Authorization (CAA) FAQ for more information.
Once a custom domain is set up, if you change the DNS entry to point to something else (for example, your origin), the custom domain will become inactive. If you then change that DNS entry to point back at your custom domain, anybody using that DNS entry to visit your website will get errors until it becomes active again. If you want to redirect traffic away from your Pages project temporarily instead of changing the DNS entry, it would be better to use an Origin rule or a redirect rule instead.
- Debugging Pages - Review common errors when deploying your Pages project.