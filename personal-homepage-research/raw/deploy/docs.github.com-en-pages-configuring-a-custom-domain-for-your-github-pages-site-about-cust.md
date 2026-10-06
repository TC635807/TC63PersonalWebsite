原始 URL: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages
抓取日期: 2026-10-05
tier: browser

---

Supported custom domains
Tip
We recommend verifying your custom domain prior to adding it to your repository, in order to improve security and avoid takeover attacks. For more information, see Verifying your custom domain for GitHub Pages.
GitHub Pages works with two types of domains: subdomains and apex domains. For a list of unsupported custom domains, see Troubleshooting custom domains and GitHub Pages.
| Supported custom domain type | Example | 
|---|---|
| www subdomain | www.example.com | 
| Custom subdomain | blog.example.com | 
| Apex domain | example.com | 
You can set up either or both of apex and www subdomain configurations for your site. For more information on apex domains, see Using an apex domain for your GitHub Pages site.
We recommend always using a www subdomain, even if you also use an apex domain. When you create a new site with an apex domain, we automatically attempt to secure the www subdomain for use when serving your site's content, but you need to make the DNS changes to use the www subdomain. If you configure a www subdomain, we automatically attempt to secure the associated apex domain. For more information, see Managing a custom domain for your GitHub Pages site.
Using a custom domain across multiple repositories
By default, if you set a custom domain for a user site or organization site, that same custom domain will be used for all project sites owned by the same account. For more information about site types, see What is GitHub Pages?.
For example, if the custom domain for your user site is www.octocat.com, and you have a project site with no custom domain configured that is published from a repository called octo-project, the GitHub Pages site for that repository will be available at www.octocat.com/octo-project.
You can override the default custom domain by adding a custom domain to the individual repository.
Note
The URLs for project sites that are privately published are not affected by the custom domain for your user or organization site. For more information about privately published sites, see Changing the visibility of your GitHub Pages site in the GitHub Enterprise Cloud documentation.
To remove the default custom domain, you must remove the custom domain from your user or organization site.
Using a subdomain for your GitHub Pages site
A subdomain is the part of a URL before the root domain. You can configure your subdomain as www or as a distinct section of your site, like blog.example.com.
Subdomains are configured with a CNAME record through your DNS provider. For more information, see Managing a custom domain for your GitHub Pages site.
www subdomains
A www subdomain is the most commonly used type of subdomain. For example, www.example.com includes a www subdomain.
www subdomains are the most stable type of custom domain because www subdomains are not affected by changes to the IP addresses of GitHub's servers.
Custom subdomains
A custom subdomain is a type of subdomain that doesn't use the standard www variant. Custom subdomains are mostly used when you want two distinct sections of your site. For example, you can create a site called blog.example.com and customize that section independently from www.example.com.
Using an apex domain for your GitHub Pages site
An apex domain is a custom domain that does not contain a subdomain, such as example.com. Apex domains are also known as base, bare, naked, root apex, or zone apex domains.
An apex domain is configured with an A, ALIAS, or ANAME record through your DNS provider. For more information, see Managing a custom domain for your GitHub Pages site.
If you are using an apex domain as your custom domain, we recommend also setting up a www subdomain. If you configure the correct records for each domain type through your DNS provider, GitHub Pages will automatically create redirects between the domains. For example, if you configure www.example.com as the custom domain for your site, and you have GitHub Pages DNS records set up for the apex and www domains, then example.com will redirect to www.example.com. If you instead configure example.com as the custom domain, then www.example.com will redirect to example.com. Automatic redirects also apply to other subdomains, as www.blog.example.com will redirect to blog.example.com or vice versa. It is not possible to configure a domain that starts with www.www.. For more information, see Managing a custom domain for your GitHub Pages site.
Securing the custom domain for your GitHub Pages site
If your GitHub Pages site is disabled but has a custom domain set up, it is at risk of a domain takeover. Having a custom domain configured with your DNS provider while your site is disabled could result in someone else hosting a site on one of your subdomains.
Verifying your custom domain prevents other GitHub users from using your domain with their repositories. If your domain is not verified, and your GitHub Pages site is disabled, you should immediately update or remove your DNS records with your DNS provider. For more information, see Verifying your custom domain for GitHub Pages and Managing a custom domain for your GitHub Pages site.
There are a couple of reasons your site might be automatically disabled.
- If you downgrade from GitHub Pro to GitHub Free, any GitHub Pages sites that are currently published from private repositories in your account will be unpublished. For more information, see Downgrading your account's plan.
- If you transfer a private repository to a personal account that is using GitHub Free, the repository will lose access to the GitHub Pages feature, and the currently published GitHub Pages site will be unpublished. For more information, see Transferring a repository.