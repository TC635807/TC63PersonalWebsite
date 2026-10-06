# https://github.com/sanity-io/template-nextjs-personal-website

ok: true
title: GitHub - sanity-io/template-nextjs-personal-website: A Next.js Personal Website with a Native Authoring Experience
error: 

This starter is a personal website that uses Next.js for the frontend and Sanity to handle its content. It runs with Next.js Cache Components enabled: every page prerenders into a static shell and refreshes on content changes through Sanity Live — no rebuild required. The template comes with a native Sanity Studio that offers features like real-time collaboration and visual editing with live updates using Presentation.
The Studio connects to Sanity Content Lake, which gives you hosted content APIs with a flexible query language, on-demand image transformations, powerful patching, and more. You can use this starter to kick-start a personal website or learn these technologies.
- Runs on Next.js Cache Components — pages prerender into a static shell and refresh on content changes through Sanity Live
- A performant personal website with editable projects
- A native and customizable authoring environment, accessible on yourpersonalwebsite.com/studio
- Real-time and collaborative content editing with fine-grained revision history
- Side-by-side instant content preview that works across your whole site
- Support for block content and the most advanced custom fields capability in the industry
- Sanity Live Revalidation; no need to wait for a rebuild to publish new content
- Free Sanity project with unlimited admin users, free content updates, and pay-as-you-go for API overages
- A project with starter-friendly and not too heavy-handed TypeScript and Tailwind.css
| Personal Website | Studio | 
|---|---|
| File(s) | Description | 
|---|---|
| sanity.config.ts | Config file for Sanity Studio | 
| sanity.cli.ts | Config file for Sanity CLI | 
| next.config.ts | Enables Cache Components and sets the default cacheLife to Sanity Live | 
| /app/studio/[[...tool]]/Studio.tsx | Where Sanity Studio is mounted | 
| /app/api/draft-mode/enable/route.ts | Serverless route for triggering Draft mode | 
| /app/api/revalidate/route.ts | Route handler the Sanity Function calls to expire cache tags before live events are released | 
| /sanity/schemas | Where Sanity Studio gets its content types from | 
| /sanity/plugins | Where the advanced Sanity Studio customization is setup | 
| /sanity/lib/api.ts ,/sanity/lib/client.ts | Configuration for the Sanity Content Lake client | 
| /sanity/lib/live.ts | sanityFetch ,sanityFetchMetadata ,sanityFetchStaticParams ,getDynamicFetchOptions | 
| sanity.blueprint.ts | Sanity Blueprint that deploys the function in /functions | 
| /functions/invalidate-sync-tags | Sync tag invalidate Sanity Function backing <SanityLive waitFor="function"> | 
The template enables Next.js Cache Components in next.config.ts:
import {sanity} from 'next-sanity/live/cache-life'
const config: NextConfig = {
 cacheComponents: true,
 cacheLife: {default: sanity},
}
Data fetching follows the three-layer (Page → Dynamic → Cached) pattern from the sanity-live-cache-components skill, applied in:
- app/(website)/layout.tsx —Dynamic/CachedNavbar andDynamic/CachedFooter share a'use cache'fetchSettings helper
- app/(website)/page.tsx — homepage
- app/(website)/[slug]/page.tsx — dynamic page route
- app/(website)/projects/[slug]/page.tsx — dynamic project route
Every cached leaf takes perspective and stega as plain props sourced from getDynamicFetchOptions(), so Visual Editing overlays and content-release previewing keep working in Draft Mode while the static shell is fully prerendered in production.
By default every open browser tab reacts to a Sanity Live event by calling a Server Action that expires the cache and refreshes the page, racing the revalidation. This template can instead have Sanity run a Function that expires the Next.js cache first and only then release the event, so <SanityLive waitFor="function"> clients render fresh content on the first refresh and the cache is expired once, not once per tab.
It's opt-in and takes about ten minutes to set up. The pieces are already in the repo: functions/invalidate-sync-tags (the Function), sanity.blueprint.ts (deploys it), app/api/revalidate/route.ts (what it calls) and .github/workflows/blueprints.yml (deploys it from CI with the official Blueprints GitHub Actions).
You need admin access to the Sanity project, plus access to the GitHub repository settings and the hosting provider's environment variables (Vercel below). Whenever the Sanity CLI prints an id as <ST-abc123>, paste it without the <>.
1. Generate a secret. It's shared between the site and the Function, and used in steps 2 and 4.
openssl rand -hex 32
2. Add environment variables on Vercel (Project → Settings → Environment Variables, Production). Don't redeploy yet.
| Name | Value | 
|---|---|
| SANITY_REVALIDATE_SECRET | the secret from step 1 | 
| SANITY_LIVE_WAIT_FOR_FUNCTION | true | 
3. Create a Blueprint stack and a deploy token. Once, from your machine, in the project root:
npx sanity login
npx sanity blueprints init . --project-id <project-id> --stack-name <dataset>
npx sanity blueprints mint-deploy-token --print
npx sanity blueprints info
- <project-id> is theNEXT_PUBLIC_SANITY_PROJECT_ID the deployed site uses.
- A stack is a named deployment target inside the project. The name is only a label; naming it after the dataset (production ) keeps one stack per environment.
- mint-deploy-token prints a token;info prints the stack id (ST-… ). Keep both for step 4.
- init writes.sanity/blueprint.config.json , which is gitignored so every clone binds to its own stack. It also warns that the Blueprint is co-located with a Studio; that's fine here, the Studio is embedded in the Next.js app and the file sits next to the lockfile as required.
4. Configure GitHub (Repository → Settings → Secrets and variables → Actions):
| Kind | Name | Value | 
|---|---|---|
| variable | SANITY_BLUEPRINT_STACK_ID | the ST-… id from step 3 | 
| variable | NEXT_PUBLIC_SANITY_PROJECT_ID | same as the Vercel project (CI already uses this) | 
| variable | NEXT_PUBLIC_SANITY_DATASET | same as the Vercel project (CI already uses this) | 
| variable | REVALIDATE_URL | https://<your-production-domain>/api/revalidate | 
| secret | SANITY_DEPLOY_TOKEN | the token from step 3 | 
| secret | SANITY_REVALIDATE_SECRET | the secret from step 1 | 
5. Deploy the Function. Actions → Sanity Blueprints → Run workflow → main. The log should end with [Functions] Created 1 function and ✅ Blueprints deployed successfully!. From now on every push to main redeploys it and every pull request gets a plan comment showing what would change. (The workflow is skipped until SANITY_BLUEPRINT_STACK_ID exists, and the "Run workflow" button only appears once the workflow file is on the default branch.)
6. Redeploy the site on Vercel so the variables from step 2 apply.
- npx sanity functions env list invalidate-sync-tags listsREVALIDATE_URL andSANITY_REVALIDATE_SECRET .
- Open the site with the browser console open. The Sanity Live welcome message ends with "Events will be delayed until after a Sanity Function has processed them."
- Publish a change in the Studio. The page updates on its first refresh, and npx sanity functions logs invalidate-sync-tags showsRevalidated N sync tags: … .
- 
Only one sync tag invalidate Function can exist per dataset, which is why the Blueprint scopes it to NEXT_PUBLIC_SANITY_PROJECT_ID.NEXT_PUBLIC_SANITY_DATASET . Deploying a second one fails with "a sync tag invalidation subscription already exists".
- 
The Function reads REVALIDATE_URL andSANITY_REVALIDATE_SECRET from whatever environment runsblueprints deploy (GitHub variables and secrets in CI,.env.local locally). KeepSANITY_REVALIDATE_SECRET identical on Vercel and GitHub; nothing else has to stay in sync.
- 
SANITY_LIVE_WAIT_FOR_FUNCTION is read at build time, so changing it needs a redeploy. Leave it unset for local development (the Function can't reachlocalhost ) and for Preview deployments unless you pointREVALIDATE_URL at one. Draft Mode ignores it:includeDrafts wins and the browser refreshes on every event.
- 
To deploy without GitHub Actions, add REVALIDATE_URL andSANITY_REVALIDATE_SECRET to.env.local and runnpx sanity blueprints deploy .
- 
To try the Function against a local dev server without deploying anything: REVALIDATE_URL=http://localhost:3000/api/revalidate SANITY_REVALIDATE_SECRET=<secret> \ npx sanity functions test invalidate-sync-tags --data '{"syncTags": ["s1:example"]}'
We will take a look at installing this template with the Sanity CLI, running locally, and lastly deploying to Vercel. If you'd rather start by deploying to Vercel, please instead reference the instructions in vercel-installation-instructions.md
Run the command in your Terminal to initialize this template on your local computer.
See the documentation if you are having issues with the CLI.
npm create sanity@latest -- --template sanity-io/template-nextjs-personal-website
Navigate to the template directory using cd <your app name>, and start the development servers by running the following command
npm run dev
Open the Next.js app running locally in your browser on http://localhost:3000.
Open the Studio by navigating to the /studio route http://localhost:3000/studio. You should now see a screen prompting you to log in to the Studio. Use the same service (Google, GitHub, or email) that you used when you logged in to the CLI.
The template comes pre-defined with a schema containing Page and Project document types.
From the Studio, click "+ Create" and select the Project document type. Go ahead and create and publish the document.
Your content should now appear in your Next.js app (http://localhost:3000) as well as in the Studio on the "Presentation" Tab
The schema for the Post document type is defined in the studio/src/schemaTypes/post.ts file. You can add more document types to the schema to suit your needs.
Your app is still only running on your local computer. It's time to deploy and get it into the hands of other content editors.
You have the freedom to deploy your Next.js app to your hosting provider of choice. With Vercel and GitHub being a popular choice, we'll cover the basics of that approach.
- Create a GitHub repository from this project. Learn more.
- Create a new Vercel project and connect it to your Github repository.
- Configure your Environment Variables.
Now that you’ve deployed your Next.js application and Sanity Studio, you can optionally invite a collaborator to your Studio. Open up Manage, select your project and click "Invite project members"
They will be able to access the deployed Studio, where you can collaborate together on creating content.
In case of any issues or questions, you can post:
You can remove it by deleting the IntroTemplate component in /app/(website)/layout.tsx.
