原始 URL: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
抓取日期: 2026-10-05
tier: browser

---

People with admin permissions for a repository can enforce HTTPS for a GitHub Pages site.
About HTTPS and GitHub Pages
All GitHub Pages sites, including sites that are correctly configured with a custom domain, support HTTPS and HTTPS enforcement. For more information about custom domains, see About custom domains and GitHub Pages and Troubleshooting custom domains and GitHub Pages.
GitHub Pages sites created after June 15, 2016, and using github.io domains are served over HTTPS automatically.
GitHub Pages sites shouldn't be used for sensitive transactions like sending passwords or credit card numbers.
Warning
GitHub Pages sites are publicly available on the internet, even if the repository for the site is private (if your plan or organization allows it). If you have sensitive data in your site's repository, you may want to remove the data before publishing. For more information, see About repositories.
Note
RFC3280 states that the maximum length of the common name should be 64 characters. Therefore, the entire domain name of your GitHub Pages site must be less than 64 characters long for a certificate to be successfully created.
Enforcing HTTPS for your GitHub Pages site
- 
On GitHub, navigate to your site's repository.
- 
Under your repository name, click Settings. If you cannot see the "Settings" tab, select the dropdown menu, then click Settings.
- 
In the "Code, planning, and automation" section of the sidebar, click Pages.
- 
Under "GitHub Pages," select Enforce HTTPS.
Troubleshooting certificate provisioning ("Certificate not yet created" error)
When you set or change your custom domain in the Pages settings, an automatic DNS check begins. This check determines if your DNS settings are configured to allow GitHub to obtain a certificate automatically. If the check is successful, GitHub queues a job to request a TLS certificate from Let's Encrypt. On receiving a valid certificate, GitHub automatically uploads it to the servers that handle TLS termination for Pages. When this process completes successfully, a check mark is displayed beside your custom domain name.
The process may take some time. If the process has not completed several minutes after you clicked Save, try clicking Remove next to your custom domain name. Retype the domain name and click Save again. This will cancel and restart the provisioning process.
Resolving problems with mixed content
If you enable HTTPS for your GitHub Pages site but your site's HTML still references images, CSS, or JavaScript over HTTP, then your site is serving mixed content. Serving mixed content may make your site less secure and cause trouble loading assets.
To remove your site's mixed content, make sure all your assets are served over HTTPS by changing http:// to https:// in your site's HTML.
Assets are commonly found in the following locations:
- If your site uses Jekyll, your HTML files will probably be found in the _layouts folder.
- CSS is usually found in the <head> section of your HTML file.
- JavaScript is usually found in the <head> section or just before the closing</body> tag.
- Images are often found in the <body> section.
Tip
If you can't find your assets in your site's source files, try searching your site's source files for http:// in your text editor or on GitHub.
Examples of assets referenced in an HTML file
| Asset type | HTTP | HTTPS | 
|---|---|---|
| CSS | <link rel="stylesheet" href="http:/ | <link rel="stylesheet" href="https:/ | 
| JavaScript | <script type="text/ | <script type="text/ | 
| Image | <a href="http:/ | <a href="https:/ | 
Verifying the DNS configuration
In some cases, an HTTPS certificate will not be able to be generated due to the DNS configuration of your custom domain. This can be caused by extra DNS records, or records not pointing to the IP addresses for GitHub Pages.
To ensure an HTTPS certificate generates correctly, we recommend the following configurations. Any additional A, AAAA, ALIAS, ANAME records with the @ host, or CNAME records pointing to your www subdomain or other custom subdomain that you would like to use with GitHub Pages may prevent the HTTPS certificate from generating.
| Scenario | DNS record type | DNS record name | DNS record value(s) | 
|---|---|---|---|
| Apex domain ( example.com ) | A | @ | 185.199.108.153185.199.109.153185.199.110.153185.199.111.153 | 
| Apex domain ( example.com ) | AAAA | @ | 2606:50c0:8000::1532606:50c0:8001::1532606:50c0:8002::1532606:50c0:8003::153 | 
| Apex domain ( example.com ) | ALIAS orANAME | @ | USERNAME.github.io orORGANIZATION.github.io | 
| Subdomain ( www.example.com ,blog.example.com ) | CNAME | SUBDOMAIN.example.com. | USERNAME.github.io orORGANIZATION.github.io |