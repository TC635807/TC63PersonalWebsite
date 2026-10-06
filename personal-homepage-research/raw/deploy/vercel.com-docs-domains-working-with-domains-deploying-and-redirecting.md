原始 URL: https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting
抓取日期: 2026-10-05
tier: browser

---

Domains
Working with Domains
Deploying & Redirecting Domains
Copy page
Copy page
On this page
Deploying & Redirecting Domains
Copy page
Copy page
Deploying your Domain
Once the domain has been added to your project and configured, it is
automatically applied to your latest production deployment
.
The
first deployment
of a
new project is always a production deployment. Vercel then assigns your custom
domain to that deployment automatically.
When you assign a custom domain to a project that's using
Git
, each push (including merges) that you make to the
production branch
(commonly
main
) will trigger a deployment to the domain.
When you assign a domain to a
different
branch, you'll need to make a new deployment to the desired branch for the domain to resolve correctly.
Reverts take effect immediately, assigning the
Custom Domain
to the deployment made prior to the point the revert is effective from.
Redirecting domains
You can add domain redirects from the
Domains
section in the sidebar when more than one domain is present in the project. This provides a way to, for example, redirect a
www
subdomain
to an
apex domain
, but can be used in a variety of ways.
If a user visits your domain with or without the "www" subdomain prefix, we
will attempt to redirect automatically. You might still want to add this
redirect explicitly.
To add a redirect, open
Domains
in the sidebar within
Project Settings
, then select
Edit
on the domain you want to redirect from. Use the
Redirect to
dropdown to select the domain you want to redirect to:
Edit domain modal.
A
domain redirect
that redirects requests made to
www.acme.com
to
acme.com
.
Redirecting
www
domains
Adding an
apex domain
to a
Project
on Vercel will automatically suggest adding its
www
counterpart. Using both of these domains ensures that visitors can always access your site, regardless of whether or not they use
www
when entering the URL.
We recommend using the
www
subdomain as your primary domain, with a redirect from the non-
www
domain to it. This allows the
Vercel CDN
more control over incoming traffic for improved reliability, speed, and security. The redirect is also cached on visitor's browsers for faster subsequent visits.
Some browsers like Google Chrome automatically hide the
www
subdomain from the address bar, so this redirect may not affect your URL appearance.
Choosing to redirect the
www
domain to the non-
www
also works but provides Vercel less control over incoming traffic. Alternatively, you can choose to add only the domain you typed.
Additional technical information about Domain redirects
The DNS spec forbids using CNAME records on apex domains like
example.com
. They are, however, allowed for subdomains like
www.example.com
. This is why Vercel recommends primarily using a
www
domain with a CNAME record, and adding a redirect from the non-
www
domain to it.
Using CNAME instead of A records ensures that domains on Vercel are fast, reliable, and fault-tolerant. Unlike A records, CNAME records avoid hard-coding a specific IP address in favor of an additional lookup at the DNS level. This means that Vercel can quickly steer traffic in the case of DDoS attacks or for performance optimizations.
While we recommend using
www
as described above, Vercel maximizes the reliability and performance of your apex domain if you choose to use it as your primary domain by leveraging the
Anycast methodology
. This means Vercel still supports geographically routed traffic at infinite scale if you use an A record.
Programmatic redirects
You can also add redirects programmatically using frameworks and Vercel Functions.
Learn more
.
Last updated
August 11, 2026
Related Vercel documentation
Cross-link map: Deploying & Redirecting Domains (/docs/domains/working-with-domains/deploying-and-redirecting)
From the Vercel docs graph (built 2026-10-05T05:39:47.698Z), spanning vercel.com docs + KB, nextjs.org, ai-sdk.dev, and other Vercel documentation sites. Full graph as JSON:
https://vercel.com/docs/graph.json
Semantically closest pages
Adding & Configuring a Custom Domain
— Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
Working with domains
— Learn how domains work and the options Vercel provides for managing them.
Transferring Domains to Another Team or Project
— Domains can be transferred to another team or project within Vercel, or to and from a third-party registrar. Learn how t
Setting up a custom domain
— Add and configure a custom domain for your Vercel project using the CLI.
Redirects
— Learn how to use redirects on Vercel to instruct Vercel's platform to redirect incoming requests to a new URL.
This page links to (6)
Vercel CDN overview
— Vercel's CDN is a globally distributed platform that handles routing, caching, security, and compression for every deplo
Environments
— Environments are for developing locally, testing changes in a pre-production environment, and serving end-users in produ
Working with domains
— Learn how domains work and the options Vercel provides for managing them.
Deploying Git Repositories with Vercel
— Vercel automatically deploys supported Git repositories on every branch push and when changes merge into the production
Projects overview
— A project is where you deploy and operate frontend apps, APIs, backends, containers, and agent workloads on Vercel.
Redirects
— Learn how to use redirects on Vercel to instruct Vercel's platform to redirect incoming requests to a new URL.
Pages that link here (7)
By site: vercel-kb (1) · vercel-docs (6)
From vercel-kb
Can I use my domain on Vercel with A records?
— Point your apex domain to Vercel with an A record \(76.76.21.21 or your domain card's value\), pair it with a www CNAME,
From vercel-docs
Environments
— Environments are for developing locally, testing changes in a pre-production environment, and serving end-users in produ
Setting up a custom domain
— Add and configure a custom domain for your Vercel project using the CLI.
Working with domains
— Learn how domains work and the options Vercel provides for managing them.
Adding & Configuring a Custom Domain
— Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
Static Configuration with vercel.json
— Learn how to use vercel.json to configure and override the default behavior of Vercel from within your project.
Redirects
— Learn how to use redirects on Vercel to instruct Vercel's platform to redirect incoming requests to a new URL.
Previous
Claiming Ownership
Next
Removing a Domain
Was this helpful?