https://github.com/theme-next/hexo-theme-next
(采集: 2026-10-05, better-crawler tier=browser, ok=true)

«NexT» is a high quality elegant Hexo theme. It is crafted from scratch with love.

 💟 Muse | 🔯 Mist | ♓️ Pisces | ♊️ Gemini
 More «NexT» examples here.
The simplest way to install is to clone the entire repository:
$ cd hexo
$ git clone https://github.com/theme-next/hexo-theme-next themes/next
Or you can see detailed installation instructions if you want any other variant.
NexT supports a large number of third-party plugins, which can be easily configured.
For example, if you want to enable pjax on your site, just set pjax to true in NexT config file:
# Easily enable fast Ajax navigation on your website.
# Dependencies: https://github.com/theme-next/theme-next-pjax
pjax: true
Then visit the «Dependencies» link to get the installation instructions of this module.
If you want to specify a CDN link for any plugins, you need to set / update the CDN link.
For example, if you want to use mediumzoom and load the plugin via CDN, go to NexT config and see:
vendors:
 # ...
 # Some contents...
 # ...
 mediumzoom: # Set or update mediumzoom CDN URL.
NexT releases new versions every month. You can update to latest master branch by the following command:
$ cd themes/next
$ git pull
And if you see any error message during update (something like «Commit your changes or stash them before you can merge»), recommended to learn Hexo data files feature.
However, you can bypass update errors by using the Commit, Stash or Reset commands for local changes. See here how to do it.
If you want to update from v5.1.x to the latest version, read this.
- Visit the Awesome NexT list to share plugins and tutorials with other users.
- Join our Telegram / Gitter / Riot chats.
- Add or improve translation in few seconds.
- Report a bug in GitHub Issues.
- Request a new feature on GitHub.
- Vote for popular feature requests.
We welcome you to join the development of NexT. Please see contributing document. 🤗
Also, we welcome Issue or PR to our official-plugins.
 «NexT» send special thanks to these great services that sponsor our core infrastructure:

 GitHub allows us to host the Git repository, Netlify allows us to distribute the documentation.
 
 Crowdin allows us to translate conveniently the documentation.

 Codacy allows us to monitor code quality, Travis CI allows us to run the test suite.