原始 URL: https://docs.astro.build/en/guides/deploy/cloudflare/
抓取日期: 2026-10-05
tier: browser

---

Deploy your Astro Site to Cloudflare
You can deploy full-stack applications, including front-end static assets and back-end APIs, as well as on-demand rendered sites, to Cloudflare Workers.
Cloudflare recommends using Cloudflare Workers for new projects. For existing Pages projects, refer to Cloudflare’s migration guide and compatibility matrix.
Prerequisites
Section titled “Prerequisites”
To get started, you will need:
- A Cloudflare account. If you don’t already have one, you can create a free Cloudflare account during the process.
Cloudflare Workers
Section titled “Cloudflare Workers”
How to deploy with Wrangler
Section titled “How to deploy with Wrangler”
- 
Install Wrangler CLI.
- 
If your site uses on-demand rendering, install the @astrojs/cloudflare adapter.This will install the adapter and make the appropriate changes to your astro.config.mjs file in one step.Read more about on-demand rendering in Astro.
- 
Create a Wrangler configuration file. Running astro add cloudflare will create this for you; if you are not using the adapter, you’ll need to create it yourself.
- 
Preview your project locally with Wrangler.
- 
Deploy using npx wrangler deploy .
After your assets are uploaded, Wrangler will give you a preview URL to inspect your site.
How to deploy with CI/CD
Section titled “How to deploy with CI/CD”
You can also use a CI/CD system such as Workers Builds to automatically build and deploy your site on push.
If you’re using Workers Builds:
- 
Follow Steps 1-3 from the Wrangler section above.
- 
Log in to the Cloudflare dashboard and navigate to Compute > Workers & Pages . SelectCreate application .
- 
Under Import a repository , select a Git account and then the repository containing your Astro project.
- 
Configure your project with: 
 - Build command: npx astro build
 - Deploy command: npx wrangler deploy
- Build command: 
- 
Click Save and Deploy . You can now preview your Worker at its providedworkers.dev subdomain.
Troubleshooting
Section titled “Troubleshooting”
404 behavior
Section titled “404 behavior”
For Workers projects, you will need to set not_found_handling if you want to serve a custom 404 page. You can read more about this in the Routing behavior section of Cloudflare’s documentation.
Client-side hydration
Section titled “Client-side hydration”
Client-side hydration may fail as a result of Cloudflare’s Auto Minify setting. If you see Hydration completed but contains mismatches in the console, make sure to disable Auto Minify under Cloudflare settings.
Node.js runtime APIs
Section titled “Node.js runtime APIs”
If you are building a project that is using on-demand rendering with the Cloudflare adapter and the server fails to build with an error message such as [Error] Could not resolve "XXXX. The package "XXXX" wasn't found on the file system but is built into node.:
- 
This means that a package or import you are using in the server-side environment is not compatible with the Cloudflare runtime APIs.
- 
If you are directly importing a Node.js runtime API, please refer to the Astro documentation on Cloudflare’s Node.js compatibility for further steps on how to resolve this.
- 
If you are importing a package that imports a Node.js runtime API, check with the author of the package to see if they support the node:* import syntax. If they do not, you may need to find an alternative package.