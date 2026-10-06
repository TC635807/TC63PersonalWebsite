原始 URL: https://github.com/academicpages/academicpages.github.io
采集日期: 2026-10-05

Academic Pages is a GitHub Pages template for personal and professional portfolio-oriented websites.
- Register a GitHub account if you don't have one and confirm your e-mail (required!)
- Click the "Use this template" button in the top right.
- On the "New repository" page, enter your public repository name as "[your GitHub username].github.io", which will also be your website's URL.
- Edit site-wide configuration in _config.yml and double check that theurl is the one that you just selected in the previous step and thatrepository reflects the correct path for your repository.
- Add your site content, upload any files (like PDFs, .zip files, etc.) to the files/ directory. They will appear at https://[your GitHub username].github.io/files/example.pdf.
- Check status by going to the repository settings, in the "GitHub pages" section
- (Optional) Use the Jupyter notebooks or python scripts in the markdown_generator folder to generate markdown files for publications and talks from a TSV file.
See more info at https://academicpages.github.io/
Additional tutorials for working with the Academic Pages template can be found at the following sites:
When you are initially working on your website, it is very useful to be able to preview the changes locally before pushing them to GitHub. To work locally you will need to:
- Clone the repository and made updates as detailed above.
- 
Make sure you have ruby-dev, bundler, and nodejs installed On most Linux distributions and Windows Subsystem Linux the command is: sudo apt install ruby-dev ruby-bundler nodejs If you see error Unable to locate package ruby-bundler ,Unable to locate package nodejs , run the following:sudo apt update && sudo apt upgrade -ythen try running sudo apt install ruby-dev ruby-bundler nodejs again.On MacOS the commands are: brew install ruby brew install node gem install bundler
- 
Run bundle install to install ruby dependencies. If you get errors, delete Gemfile.lock and try again.If you see file permission error like Fetching bundler-2.6.3.gem ERROR: While executing gem (Gem::FilePermissionError) You don't have write permissions for the /var/lib/gems/3.2.0 directory. orBundler::PermissionError: There was an error while trying to write to /usr/local/bin. Install Gems Locally (Recommended):bundle config set --local path 'vendor/bundle' then try run bundle install again. If succeeded, you should see a folder calledvendor and.bundle .
- 
Run jekyll serve -l -H localhost to generate the HTML and serve it fromlocalhost:4000 the local server will automatically rebuild and refresh the pages on change to Markdown (*.md) and HTML files, while changes to the core template and configuration (i.e.,_config.yml ) will require stopping and restarting Jekyll.
You may also trybundle exec jekyll serve -l -H localhost to ensure jekyll to use specific dependencies on your own local machine.
If you are running on Linux it may be necessary to install some additional dependencies prior to being able to run locally: sudo apt install build-essential gcc make
Working from a different OS, or just want to avoid installing dependencies? You can use the provided Dockerfile to build a container that will run the site for you if you have Docker installed.
You can build and execute the container by running the following command in the repository:
chmod -R 777 .
docker compose up
You should now be able to access the website from localhost:4000.
If you are using Visual Studio Code you can use the Dev Container that comes with this Repository. Normally VS Code detects that a development container configuration is available and asks you if you want to use the container. If this doesn't happen you can manually start the container by F1->DevContainer: Reopen in Container. This restarts your VS Code in the container and automatically hosts your academic page locally on http://localhost:4000. All changes will be updated live to that page after a few seconds.
Bug reports and feature requests to the template should be submitted via GitHub. For questions concerning how to style the template, please feel free to start a new discussion on GitHub.
This repository was forked (then detached) by Stuart Geiger from the Minimal Mistakes Jekyll Theme, which is © 2016 Michael Rose and released under the MIT License (see LICENSE.md). It is currently being maintained by Robert Zupko, and additional maintainers would be welcome.
If you have bugfixes and enhancements that you would like to submit as a pull request, you will need to fork this repository as opposed to using it as a template. This will also allow you to synchronize your copy of the template to your fork as well.
Unfortunately, one logistical issue with a template theme like Academic Pages that makes it a little tricky to get bug fixes and updates to the core theme. If you use this template and customize it, you will probably get merge conflicts if you attempt to synchronize, although rebasing the changes from this template will work along with manually cherry picking the relevant commits. If you are not comfortable with the Git command line, you can save your various .yml configuration files and Markdown files, delete the repository, and fork it again.
