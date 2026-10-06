原始 URL: https://pagefind.app/docs/
抓取日期: 2026-10-05
tier: browser

---

Getting Started with Pagefind
Pagefind runs after your static generator, and outputs a static search bundle to your generated site. With Pagefind, you don’t need to build a search index by hand — the index is generated for you from your generated site.
Since Pagefind indexes your site after it builds, we’ll do things slightly out of order and add a search UI first — so that it already exists on our built site when we go to index it.
Pagefind provides a prebuilt search UI out of the box. Add the following snippet to a page of your choice:
<link href="/pagefind/pagefind-component-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-component-ui.js" type="module"></script>
<pagefind-modal-trigger></pagefind-modal-trigger>
<pagefind-modal></pagefind-modal>
The /pagefind/pagefind-component-ui.css and /pagefind/pagefind-component-ui.js assets will be created by Pagefind when we index the site.
Now build your site to an output directory — this guide assumes that you’re running hugo and that your site is output to the public/ directory. Pagefind works with any set of static HTML files, so adjust these configurations as needed.
If you’re running a development server (i.e. hugo serve) you won’t see anything yet, as Pagefind needs to index the output of your build. Let’s do that now.
Indexing your site
The easiest way to run Pagefind is through one of the official wrapper packages. If you don’t have Node or Python installed, or want to install Pagefind another way, see the Installing Pagefind guide.
npx
Run the following command from your terminal, where --site points to the output directory of your static site generator. We’ll also add --serve so that we can view our final site right away.
npx -y pagefind --site public --serve
pip
The Python wrapper requires an initial install, then you can run Pagefind with --site pointing to your output directory. We’ll also add --serve so that we can view our final site right away.
python3 -m pip install 'pagefind[extended]'
python3 -m pagefind --site public --serve
Download binary
Download a precompiled release from GitHub and run the binary directly, with --site pointing to your output directory. We’ll also add --serve so that we can view our final site right away.
./pagefind --site public --serve
Build from source
If you have Rust and Cargo installed, you can build and install Pagefind from source, then run it with --site pointing to your output directory. We’ll also add --serve so that we can view our final site right away.
cargo install pagefind
pagefind --site public --serve
Regardless of the command you choose, after Pagefind has downloaded you should see some output along the lines of:
Indexed 2496 pages
Indexed 22852 words
Indexed 0 filters
Created 27 index chunks
Finished in 2.357 seconds
We can see that a bunch of content was indexed, and Pagefind will be running a preview server (likely on :1414).
Note that Pagefind itself does not have any server component — the search integration is fully baked into your static site. The --serve flag here is a shortcut for running Pagefind, followed by serving your output site through any static web server.
Loading this in your browser, you should see a search input on your page. Try searching for some content and you will see results appear from your site.
The last required step is to run Pagefind after building your site on your CMS or hosting platform. Set up the npx command above (minus the --serve flag) to run after your site build — the end goal is that Pagefind will run after every build of your site before it is deployed.
For many use cases, you can stop here and mark it as complete. Or, you can dive deeper into Pagefind and configure it to your liking — check out Configuring the index for some next steps.
Notes
For optimal performance, ensure the lang attribute is set on your html element. See Multilingual Search for more details.