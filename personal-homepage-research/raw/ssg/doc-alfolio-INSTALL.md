# https://github.com/alshedivat/al-folio/blob/main/docs/INSTALL.md

ok: true


The recommended approach for using al-folio is to first create your own site using the template with as few changes as possible, and only when it is up and running customize it however you like. This way it is easier to pinpoint what causes a potential issue in case of a bug.
For the quickest setup, follow the Quick Start Guide, which will have you up and running in 5 minutes.
Use the "Use this template" button (recommended) when creating your own al-folio site. This creates a clean, independent copy that is not linked to the main al-folio repository.
If you already forked the repository, your fork will work fine, but you should be aware of a common pitfall:
- Forks maintain a connection to the original repository, which can make it easy to accidentally submit pull requests to al-folio with your personal site changes
- Solution: When making changes to your fork, always create a new branch (e.g., git checkout -b my-site-updates ) and verify that you're pushing to your own fork before submitting pull requests
- Only submit pull requests to alshedivat/al-folio if you're intentionally contributing improvements that benefit the entire al-folio community
If you plan to upload your site to <your-github-username>.github.io, the repository name <your-github-username>.github.io or <your-github-orgname>.github.io, as stated in the GitHub pages docs.
When configuring _config.yml, set url to https://<your-github-username>.github.io and leave baseurl empty (do NOT delete it), setting it as baseurl:.
Starting version v0.3.5, al-folio will automatically re-deploy your webpage each time you push new changes to your repository! ✨
Once everything is deployed, you can download the repository to your machine and start customizing it locally:
git clone git@github.com:<your-username>/<your-repo-name>.git
See Local setup using Docker or other sections below for local development options.
If you are using Windows, it is highly recommended to use Windows Subsystem for Linux (WSL), which is a compatibility layer for running Linux on top of Windows. You can follow these instructions to install WSL and Ubuntu on your machine. You only need to go up to the step 4 of the tutorial (you don't have to enable the optional systemd nor the graphical applications), and then you can follow the instructions below to install docker. You can install docker natively on Windows as well, but it has been having some issues as can be seen in #1540, #2007.
Using Docker to install Jekyll and Ruby dependencies is the easiest way.
You need to take the following steps to get al-folio up and running on your local machine:
- First, install docker and docker-compose.
- Finally, run the following command that will pull the latest pre-built image from DockerHub and will run your website.
docker compose pull
docker compose up
Note that when you run it for the first time, it will download a docker image of size 400MB or so. To see the template running, open your browser and go to http://localhost:8080. You should see a copy of the theme's demo website.
Now, feel free to customize the theme however you like (don't forget to change the name!). Also, your changes should be automatically rendered in real-time (or maybe after a few seconds).
For v1.x, Docker serves from a container-local destination (/tmp/_site) to avoid host bind-mount write deadlocks during notebook and asset generation.
Beta: You can also try the slimmed docker image with docker compose -f docker-compose-slim.yml up, but it may lag behind the full image on some host architectures.
Note: this approach is only necessary if you would like to build an older or very custom version of al-folio.
Build and run a new docker image using:
docker compose up --build
If you want to update jekyll, install new ruby packages, etc., all you have to do is build the image again using --force-recreate argument at the end of the previous command! It will download Ruby and Jekyll and install all Ruby packages again from scratch.
If you want to use a specific docker version, you can do so by changing the version tag to your_version in docker-compose.yml (for example, image: amirpourmand/al-folio:v1.0.0). Plugin patch releases do not require a new starter Docker image unless the starter wiring, lockfile, Dockerfile, or image build inputs change.
Sometimes, there might be some bugs in the current docker image. It might be version mismatch or anything. If you want to debug and easily solve the problem for yourself you can do the following steps:
docker compose up -d
docker compose logs
Then you can see the bug! You can enter the container via this command:
docker compose exec -it jekyll /bin/bash
Then you can run the script:
./bin/entry_point.sh
You might see problems for package dependecy or something which is not available. You can fix it now by using
bundle install
./bin/entry_point.sh
Most likely, this will solve the problem but it shouldn't really happen. So, please open a bug report for us.
al-folio supports Development Containers.
For example, when you open the repository with Visual Studio Code (VSCode), it prompts you to install the necessary extension and automatically install everything necessary.
For a hands-on walkthrough of running al-folio locally without using Docker, check out this cool blog post by one of the community members!
Assuming you have Ruby and Bundler installed on your system (hint: for ease of managing ruby gems, consider using rbenv), and also Python and pip (hint: for ease of managing python packages, consider using a virtual environment, like venv or conda).
bundle install
# optional but recommended if you use jupyter posts:
# installs jupyter + nbconvert for jekyll-jupyter-notebook
./bin/setup-python-deps
# or manually:
# python3 -m pip install --user --break-system-packages jupyter nbconvert
bundle exec jekyll serve
In v1.x, al-folio is a thin starter. Do not run starter-local npm build commands for theme/runtime assets; those are owned by al-* gems and loaded through plugin contracts.
Interactive TOC (toc.sidebar) and TikZ (tikzjax: true) use pinned CDN runtime assets from _config.yml (third_party_libraries.tocbot and third_party_libraries.tikzjax), not install-time downloads.
Starter plugin wiring lives in:
- Gemfile for dependency declarations
- _config.yml for Jekyll plugin activation/config
al-folio starter does not currently use a gemspec; contributor/plugin integration docs should reference the two files above.
If jekyll-jupyter-notebook is enabled and jupyter-nbconvert is missing, builds continue but notebook rendering is skipped with a warning.
To see the template running, open your browser and go to http://localhost:4000. You should see a copy of the theme's demo website. Now, feel free to customize the theme however you like. After you are done, remember to commit your final changes.
Deploying your website to GitHub Pages is the most popular option. Starting version v0.3.5, al-folio will automatically re-deploy your webpage each time you push new changes to your repository main branch! ✨
- The name of your repository MUST BE <your-github-username>.github.io or<your-github-orgname>.github.io .
- In _config.yml , seturl tohttps://<your-github-username>.github.io and leavebaseurl empty.
- Set up automatic deployment of your webpage (see instructions below).
- Make changes to your main branch, commit, and push!
- After deployment, the webpage will become available at <your-github-username>.github.io .
- In _config.yml , seturl tohttps://<your-github-username>.github.io andbaseurl to/<your-repository-name>/ .
- Set up automatic deployment of your webpage (see instructions below).
- Make changes to your main branch, commit, and push!
- After deployment, the webpage will become available at <your-github-username>.github.io/<your-repository-name>/ .
- Click on Actions tab and Enable GitHub Actions; do not worry about creating any workflows as everything has already been set for you.
- Go to Settings -> Actions -> General -> Workflow permissions , and giveRead and write permissions to GitHub Actions
- Make any other changes to your webpage, commit, and push to your main branch. This will automatically trigger the Deploy action.
- Wait for a few minutes and let the action complete. You can see the progress in the Actions tab. If completed successfully, in addition to the main branch, your repository should now have a newly builtgh-pages branch. Do NOT touch this branch!
- Finally, in the Settings of your repository, in the Pages section, set the branch to gh-pages (NOT tomain ). For more details, see Configuring a publishing source for your GitHub Pages site.
If you keep your site on another branch, open .github/workflows/deploy.yml on the branch you keep your website on and change on->push->branches and on->pull\_request->branches to the branch you keep your website on. This will trigger the action on pulls/pushes on that branch. The action will then deploy the website on the branch it was triggered from.
If you need to manually re-deploy your website to GitHub pages, go to Actions, click "Deploy" in the left sidebar, then "Run workflow."
Deploy on Netlify
- 
Use this template -> Create a new repository.
- 
Netlify: Add new site -> Import an existing project -> GitHub and give Netlify access to the repository you just created.
- 
Netlify: In the deploy settings 
 - Set Branch to deploy to main
 - Base directory is empty
 - Set Build command to sed -i "s/^\(baseurl: \).*$/baseurl:/" _config.yml && bundle exec jekyll build
 - Set Publish directory to _site
- Set Branch to deploy to 
- 
Netlify: Add the following two environment variables 
 - 
Key Value JEKYLL_ENVproductionRUBY_VERSIONset to the Ruby version found in .github/workflows/deploy.yml (for example,3.3.5 )
- 
- 
Netlify: Click Deploy and wait for the site to be published. If you want to use your own domain name, follow the steps in this documentation.
If you decide to not use GitHub Pages and host your page elsewhere, simply run:
bundle exec jekyll build
which will (re-)generate the static webpage in the _site/ folder.
Then simply copy the contents of the _site/ directory to your hosting server.
If you also want to remove unused css classes from your file, install purgecss first — it is not a project devDependency, so npm ci does not provide it (our CI workflows install it globally at deploy time):
npm install -g purgecss
purgecss -c purgecss.config.js
which will replace the css files in the _site/assets/css/ folder with the purged css files. If you prefer not to install it globally, npx purgecss -c purgecss.config.js works too.
Note: Make sure to correctly set the url and baseurl fields in _config.yml before building the webpage. If you are deploying your webpage to your-domain.com/your-project/, you must set url: your-domain.com and baseurl: /your-project/. If you are deploying directly to your-domain.com, leave baseurl blank, do not delete it.
Note: Do not try using this method unless you know what you are doing (make sure you are familiar with publishing sources). This approach allows to have the website's source code in one repository and the deployment version in a different repository.
Let's assume that your website's publishing source is a publishing-source subdirectory of a git-versioned repository cloned under $HOME/repo/.
For a user site this could well be something like $HOME/<user>.github.io.
Firstly, from the deployment repo dir, checkout the git branch hosting your publishing source.
Then from the website sources dir (commonly your al-folio fork's clone):
bundle exec jekyll build --destination $HOME/repo/publishing-source
This will instruct jekyll to deploy the website under $HOME/repo/publishing-source.
Note: Jekyll will clean $HOME/repo/publishing-source before building!
The quote below is taken directly from the jekyll configuration docs:
Destination folders are cleaned on site builds
The contents of <destination> are automatically cleaned, by default, when the site is built. Fi
