https://github.com/blinkfox/hexo-theme-matery
(采集: 2026-10-05, tier=browser, ok=true)

🇨🇳中文说明 | 国内访问示例(http://blinkfox.com) | Github Deploy Demo(https://blinkfox.github.io)
This is a Hexo blog theme with 'Material Design' and responsive design.
- Simple and beautiful, and post is Beautiful and readable.
- Material Design.
- Responsive design, which can be displayed well on desktop, tablet, mobile phone, etc.
- Home page carousel posts and changing 'banner' picture dynamically everyday.
- Blog posts list with waterflow (There will be 24 images if the article doesn't have featured pictures).
- Archive page with timeline.
- Tags page of the word cloud and categories page of the radar chart
- Rich 'About' page (including about me, posts charts, my projects, my skills, gallery etc.)
- Friendly link page for customizable data
- Support post topping and rewards
- Support MathJax
- TOC
- Can be set append the copyright information when copying the content of the post
- Can be set to do password verification when reading a post
- Comment module of Gitalk, Gitment, Valine and Disqus.(Gitalk is recommended)
- Integrated Busuanzi Statistics, Google Analytics and post word count statistics.
- Support music playback and video playback on the homepage
- Support the emoji emoticon and use themarkdown emoji grammar to directly generate the corresponding emoticon.
- Support DaoVoice, Tidio online chat.
Thanks to these contributors, without whom, hexo-theme-matery won't be this perfect.
hexo-theme-matery recommend you to use Hexo 5.0.0 and above. If you already have your own Hexo blog, I suggest you upgrade Hexo to the latest stable version.
Click here to download master branch of the last stable version of the code.After decompressing, copy the hexo-theme-matery folder
to your themes folder of your Hexo blog project.
Of course, you can use git clone to download in your themes folder.
git clone https://github.com/blinkfox/hexo-theme-matery.git
Modify the value of theme in _config.yml of Hexo's root folder: theme: hexo-theme-matery.
- Please modify the value of url of_config.yml to your website's mainURL (e.g.http://xxx.github.io ).
- It's recommended to modify the value of the two per_page to be a multiple of6 , such as:12 ,18 , etc. so that the posts list can be displayed well under each screen.
- If you are a Chinese user, it is recommended to change the value of language tozh-CN .
categories page is to show all of categories. If the source directory of your blog doesn't have categories/index.md file, you need to create a new one like this:
hexo new page "categories"
when editing your new page file /source/categories/index.md, you need something like:
---
title: categories
date: 2018-09-30 17:25:30
type: "categories"
layout: "categories"
---
tags page is to show all of tags. If the source directory of your blog doesn't have tags/index.md file, you need to create a new one like this:
hexo new page "tags"
and put the following in your new page file /source/tags/index.md,
---
title: tags
date: 2018-09-10 18:23:38
type: "tags"
layout: "tags"
---
about page is to show my blog and myself information. If the source directory of your blog doesn't have about/index.md file, create a new one like this:
hexo new page "about"
and edit your new page file /source/about/index.md to include:
---
title: about
date: 2018-09-30 17:25:30
type: "about"
layout: "about"
---
contact page is to show contact information. If the source directory of your blog doesn't have contact/index.md file, you need to new one like this:
hexo new page "contact"
when editing your new page file /source/contact/index.md, include the following at the beginning:
---
title: contact
date: 2018-09-30 17:25:30
type: "contact"
layout: "contact"
---
Note：The message board depends on a third-party comment system, please activate your comment system to be effective. And in the theme's _config.yml file, the "menu" of the 19 to 21 line is configured, and the comment about the message board could be canceled.
The friends page is a page for displaying Friendly Links information. If you don't have a friends/index.md file in your blog's source directory, then you need to create a new one. The command is as follows:
hexo new page "friends"
Edit the file /source/friends/index.md you just created, at least you need the following:
---
title: friends
date: 2018-12-12 21:25:30
type: "friends"
layout: "friends"
---
Also, create a new _data directory in your blog's source directory and a new friends.json file in the _data directory. The contents of the file is as follows:
[{
 "avatar": "http://image.luokangyuan.com/1_qq_27922023.jpg",
 "name": "MaJang",
 "introduction": "I am not a master, just looking for the master's footsteps.",
 "url": "http://luokangyuan.com/",
 "title": "Read More"
}, {
 "avatar": "http://image.luokangyuan.com/4027734.jpeg",
 "name": "Blinkfox",
 "introduction": "Hello, I'm blinkfox, I like programming.",
 "url": "https://blinkfox.github.io/",
 "title": "Visit Blog"
}, {
 "avatar": "http://image.luokangyuan.com/avatar.jpg",
 "name": "ja_rome",
 "introduction": "Ordinary steps can also go out of the great journey.",
 "url": "https://me.csdn.net/jlh912008548",
 "title": "Read More"
}]
If the source directory of your blog doesn't have 404.md file, you need create a new one. In /source/404.md, you need something as follows:
---
title: 404
date: 2020-05-30 00:00:00
type: "404"
layout: "404"
description: "Cannot find the page you want :("
---
- The menu navigation name can be Chinese or English (e.g.: Index or主页 )
- Icon icon can be found in Font Awesome
menu:
 Index:
 url: /
 icon: fas fa-home
 Tags:
 url: /tags
 icon: fas fa-tags
 Categories:
 url: /categories
 icon: fas fa-bookmark
 Archives:
 url: /archives
 icon: fas fa-archive
 About:
 url: /about
 icon: fas fa-user-circle
 Friends:
 url: /friends
 icon: fas fa-address-book
If you need a secondary menu, you can do the following on the basis of the original basic menu navigation.
- Add the children keyword to the first level menu that needs to add a secondary menu (e.g.: addchildren un