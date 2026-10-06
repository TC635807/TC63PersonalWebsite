原始 URL: https://vercel.com/docs/domains/working-with-domains/add-a-domain
抓取日期: 2026-10-05
tier: browser

---

Domains
Working with Domains
Adding a Domain
Copy page
Copy page
On this page
Adding & Configuring a Custom Domain
Copy page
Copy page
Vercel provides all deployments with a
vercel.app
URL, which enables you to share Deployments with your Team for collaboration. However, to provide greater personalization and flexibility to your project, you can instead add a
custom domain
. If you don't own a domain yet, you can
purchase it with Vercel
.
You can manage all domain settings related to a project from
Settings
and then
Domains
in the sidebar, regardless of whether you are using
apex domains
or
subdomains
in your project. This document will guide you through both options.
Hobby teams have a limit of 50 custom domains per project.
Add and configure domain
The following steps provide an overview of how to add and configure a custom domain in Vercel:
Navigate to Domain Settings
On the
dashboard
, pick the project to which you would like to assign your domain.
Once you have selected your project, open
Settings
in the sidebar and then select
Domains
.
Add your domain
From the
Domains
page, click the
Add Domain
button:
The button to click on the domains page.
Input the domain you wish to include in the project:
Text input on the add domain page to input your domain name in.
If you add an apex domain (e.g.
example.com
) to the project, Vercel will prompt you to add the
www
subdomain prefix. For more information about why we recommend using a
www
domain, see "
Redirecting
www
domains
".
Using wildcard domain
You can also use your
custom domain
as a
wildcard domain
by prefixing it with
*.
.
Vercel needs access to DNS challenges to issue and renew wildcard
certificates. Use the
nameservers method
, or
delegate
certificate validation
if you can't change your domain's nameservers.
To add a
wildcard domain
, use the prefix
*
, for example
*.acme.com
.
A wildcard domain being deployed.
Use wildcard domains with an external DNS provider
If you can't change your domain's nameservers, delegate the
_acme-challenge
subdomain to Vercel for certificate issuance and renewal. Your existing DNS provider continues to manage the rest of your DNS records, including the wildcard record that routes traffic to Vercel.
The following steps use the
acme.com
DNS zone and cover both
*.acme.com
and
*.foo.acme.com
. The apex domain is
acme.com
; neither wildcard configures the apex domain itself.
Use this workaround only if you can't change your domain's nameservers.
Delegating the challenge can prevent other hosting providers from issuing or
renewing certificates that use the same challenge name.
Add your wildcard domain to your project's
Settings > Domains
.
In your team's
Domains
page, select
acme.com
. Under
DNS Records
, click
Enable Vercel DNS
. Keep your existing nameservers configured at your registrar.
At your
existing DNS provider
, add both
NS
records for the wildcard you're configuring. The names below are relative to the
acme.com
DNS zone:
Wildcard domain
Type
Name
Value
*.acme.com
NS
_acme-challenge
ns1.vercel-dns.com.
*.acme.com
NS
_acme-challenge
ns2.vercel-dns.com.
*.foo.acme.com
NS
_acme-challenge.foo
ns1.vercel-dns.com.
*.foo.acme.com
NS
_acme-challenge.foo
ns2.vercel-dns.com.
If your provider requires a full record name, use
_acme-challenge.acme.com
or
_acme-challenge.foo.acme.com
, respectively. These records delegate certificate validation; they don't route website traffic.
At the
same DNS provider
, add the matching wildcard
CNAME
record to route traffic to Vercel:
Wildcard domain
Type
Name
Value
*.acme.com
CNAME
*
cname.vercel-dns-0.com.
*.foo.acme.com
CNAME
*.foo
cname.vercel-dns-0.com.
After the records propagate, check the domain's configuration and certificate status in your project's
Settings > Domains
. Keep the
NS
records in place so Vercel can renew the certificate automatically.
Configure the domain
Once you have added your custom domain, you will need to configure the DNS records of your domain with your registrar so it can be used with your Project. The dashboard will automatically display different methods for configuring it:
If the domain is in use by another Vercel account
, you will need to
verify access to the domain
, with a
TXT
record
If you're using an
Apex domain
(e.g. example.com), you will need to configure it with an
A
record
If you're using a
Subdomain
(e.g. docs.example.com), you will need to configure it with a
CNAME
record
Both
apex domains
and
subdomains
can also be configured using the
Nameservers
method.
Before changing nameservers,
copy your existing DNS
records
to Vercel, including MX records for email and any verification TXT records.
Changing only the website's A or CNAME record at your current DNS provider
does not require moving the rest of your DNS records.
Apex domains
You can configure apex domains with an
A
record.
DNS configuration for an apex domain.
Subdomains
You can configure
subdomains
with a
CNAME
record. Each project has a unique CNAME record e.g.
d1d4fc829fe7bc7c.vercel-dns-017.com
.
DNS configuration for a subdomain.
Vercel Nameservers
If you choose to use a wildcard domain Vercel's nameservers will be automatically enabled for you on saving the domain settings. You will then be provided with the Vercel nameservers to copy and use with your registrar.
DNS configuration for Vercel nameservers.
Verify domain access
If the domain is in use by another Vercel account, you may be prompted to verify access to the domain. Note that this will not move the domain into your account, but will allow you to use it in your project. If you have multiple domains to verify, be aware that you can only set up one TXT record at a time, but you can modify it after the domain is transferred.
Verify domain access.
Once the domain has been configured and Vercel has verified it, the status of the domain will be updated within the UI to confirm that it is ready for use.
Properly configured domain.
If a someone visits your domain with or without the "www" subdomain prefix,
Vercel will attempt to redirect them to your domain. For more robust
protection, you should explicitly add this domain and
redirect
it
.
Troubleshooting domain setup
If the domain does not show a valid configuration, compare the records at your authoritative DNS provider with the values shown in the project's
Domains
settings.
Symptom
What to check
The domain has an invalid configuration
Check for conflicting A, AAAA, or CNAME records for the same hostname. Use the values shown for your project rather than copying another project's records.
A subdomain does not resolve
For
www.example.com
, use
www
as the record name in Vercel's DNS form. Other DNS providers may use a different name format.
The apex domain works but
www
does not, or the reverse
Add both domains to the project and
configure a redirect
to your preferred domain.
Email stopped arriving after a nameserver change
Restore your email provider's records using the
email troubleshooting steps
.
DNS changes can take time to propagate. Use
DNS verification
to compare the published records, and see
domain troubleshooting
for configuration and certificate errors.
Last updated
September 16, 2026
Related Vercel documentation
Cross-link map: Adding & Configuring a Custom Domain (/docs/domains/working-with-domains/add-a-domain)
From the Vercel docs graph (built 2026-10-05T05:39:47.698Z), spanning vercel.com docs + KB, nextjs.org, ai-sdk.dev, and other Vercel documentation sites. Full graph as JSON:
https://vercel.com/docs/graph.json
Semantically closest pages
Setting up a custom domain
— Add and configure a custom domain for your Vercel project using the CLI.
Working with domains
— Learn how domains work and the options Vercel provides for managing them.
Troubleshooting domains
— Learn about common reasons for domain misconfigurations and how to troubleshoot your domain on Vercel.
Configuring Custom Domains
— Add, verify, redirect, and remove wildcard and custom domains for a multi-tenant application using the Vercel SDK.
Managing DNS Records
— Learn how to add, verify, and remove DNS records for your domains on Vercel with this guide.
This page links to (3)
Managing DNS Records
— Learn how to add, verify, and remove DNS records for your domains on Vercel with this guide.
Troubleshooting domains
— Learn about common reasons for domain misconfigurations and how to troubleshoot your domain on Vercel.
Deploying & Redirecting Domains
— Learn how to deploy your domains and set up domain redirects with this guide.
Pages that link here (39)
By site: v0 (1) · vercel-kb (10) · vercel-docs (28)
From v0
Custom domain
— Add custom domains to your v0 deployments to give your applications a professional, branded URL.
From vercel-kb
Can I use my domain on Vercel with A records?
— Point your apex domain to Vercel with an A record \(76.76.21.21 or your domain card's value\), pair it with a www CNAME,
Accessing Vercel-hosted sites from mainland China
— Understand why Vercel-hosted sites may be slow or inaccessible in mainland China, and explore steps to improve performan
Deploying React with Vercel
— Deploy React with Vercel to replace your build pipeline and shared staging. See how framework detection, previews, and F
Deploy to Vercel with Self-Hosted Git Pipelines \(GitLab & Bitbucket\)
— Learn how to use GitLab Pipelines to deploy to Vercel including support for self-managed GitLab.
How can I manage my Vercel DNS records?
— Add, edit, and delete Vercel DNS records from the dashboard, CLI, or REST API, and fix the Invalid Configuration error o
Migrate self-hosted Next.js and containers from AWS to Vercel
— Migrate containers from AWS to Vercel: deploy with Dockerfile.vercel, keep RDS, S3, and SQS in AWS over OIDC, and cut ov
How to set up a staging environment on Vercel
— Set up a staging environment on Vercel with custom environments, staged production deployments, or a branch-based previe
Troubleshooting Cross-Origin Errors \(net::ERR_BLOCKED_BY_ORB\) with Deployment Protection
— Learn to resolve \
net::ERR_BLOCKED_BY_ORB\\
errors on protected Vercel deployments. This guide explains how cross-origi
Using Vercel as a Standalone CDN
— Use Vercel's external rewrites to proxy and cache content from external websites or APIs through Vercel's global edge ne
How can I migrate a site to Vercel without downtime?
— Information about how to assign a Vercel deployment to a domain without downtime.
From vercel-docs
Build Features for Customizing Deployments
— Learn how to customize your deployments using Vercel's build features.
Anatomy of the Checks API
— Learn how to create your own Checks with Vercel Integrations. You can build your own Integration to register any arbitra
vercel alias
— Learn how to apply custom domain aliases to your Vercel deployments using the vercel alias CLI command.
Deployment Protection on Vercel
— Learn how to control access to your Vercel project's preview and production URLs with Deployment Protection. Configure p
Accessing Deployments through Generated URLs
— When you create a new deployment, Vercel will automatically generate a unique URL which you can use to access that parti
Preview Deployment Suffix
— When you create a new deployment, Vercel will automatically generate a unique URL which you can use to access that parti
Free Domain with Pro
— Every paid Pro team gets one free first-year custom domain on an eligible TLD. Claim yours at checkout or from domain se
Managing DNS Records
— Learn how to add, verify, and remove DNS records for your domains on Vercel with this guide.
Setting up a custom domain
— Add and configure a custom domain for your Vercel project using the CLI.
Troubleshooting domains
— Learn about common reasons for domain misconfigurations and how to troubleshoot your domain on Vercel.
Working with domains
— Learn how domains work and the options Vercel provides for managing them.
Assigning a custom domain to an environment
— Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
Transferring Domains to Another Team or Project
— Domains can be transferred to another team or project within Vercel, or to and from a third-party registrar. Learn how t
Deploying Bitbucket Projects with Vercel
— ​Vercel for Bitbucket automatically deploys your Bitbucket projects with Vercel, providing Preview Deployment URLs, and
Deploying GitHub Projects with Vercel
— Vercel for GitHub automatically deploys your GitHub projects with Vercel, providing Preview Deployment URLs, and automat
Deploying GitLab Projects with Vercel
— ​Vercel for GitLab automatically deploys your GitLab projects with Vercel, providing Preview Deployment URLs, and automa
Incremental Migration to Vercel
— Learn how to migrate your app or website to Vercel with minimal risk and high impact.
Notifications
— Learn how to use Notifications to view and manage important alerts about your deployments, domains, integrations, accoun
Multi-Project Platforms Quickstart
— Programmatically host code for user-generated or AI-generated applications on Vercel.
Multi-Tenant Platform Concepts
— Understand tenants, domains, routing, and architecture for building multi-tenant applications on Vercel for Platforms.
Configuring Custom Domains
— Add, verify, redirect, and remove wildcard and custom domains for a multi-tenant application using the Vercel SDK.
Multi-tenant Limits
— Understand the limits and features available for Vercel for Platforms.
Multi-Tenant Platform Quickstart
— Set up wildcard domains, custom domains, domain verification, and redirects for a multi-tenant application on Vercel.
Production checklist for launch
— Ensure your application is ready for launch with this comprehensive production checklist by the Vercel engineering team.
Project settings
— Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
Static Configuration with vercel.json
— Learn how to use vercel.json to configure and override the default behavior of Vercel from within your project.
Transferring a project
— Learn how to transfer a project between Vercel teams.
Managing the visibility of the Vercel Toolbar
— Learn how to enable or disable the Vercel Toolbar for your team, project, and session.
Previous
Working with Domains
Next
Adding a Domain to an Environment
Was this helpful?