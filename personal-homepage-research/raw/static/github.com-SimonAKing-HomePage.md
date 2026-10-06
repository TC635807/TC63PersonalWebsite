https://github.com/SimonAKing/HomePage
(采集: 2026-10-06, tier=browser, ok=true, content_length=3521)

A modern and elegant personal homepage with fluid animation background, responsive design and smooth page transitions.
Do you want to install such a cool homepage for your website?
Let's start now!
git clone https://github.com/SimonAKing/HomePage.git
cd HomePage
npm install
npm run dev
- Highly encapsulates all the information in the page
- Use WebGL-Fluid-Simulation as background
- Use less ascss preprocessor
- Use pug ashtml preprocessor
- Use gulp as a build tool and configure the build script
- Comfortable animation and beautiful UI
- Responsive, mobile support
- The referenced css andjs files do not exceed18.5 kb in total!
- Delayed response switch page event
- There are many features left for you to explore...
According to the characteristics of the project, it is divided into two categories：
- intro First screen
- main Secondary screen
The corresponding functions, styles and configurations are also based on this standard.
Each key name in the config.json fileconfig.json corresponds to the corresponding component name.
such as：
{
 "head": {
 "title": "SimonAKing",
 "description": "Category:Personal Blog",
 "favicon": "favicon.ico"
 }
}
The above configuration information corresponds to the information in the following layout/head.pug component.
head
 title #{head.title}
 meta(charset="utf-8")
 meta(name="Description" content=`${head.description}`)
 link(rel="icon" href=`${head.favicon}` type="image/x-icon")
Use WebGL-Fluid-Simulation as background at home.
If you want to turn it off, set intro.background: false.
The supportAuthor option is turned on by default for configuration information, that is, authors are supported.
All support items are as follows：
- The octopus cat will be displayed in the upper right corner of the home page.
- The console prints the author's site information
If you want to turn it off, set intro.author: false.
Icons in the project, all from 阿里巴巴矢量图标库
The replacement steps are as follows:
- Please select your icon, add it to the project, and change the color to white.
- Click Font Class method
- Copy the contents of the generated link
- Replace the contents of the file /src/css/common/icon.less , where the contents of theicon selector must be preserved.
- Config.json the corresponding item in the config.json filemain.ul. * .icon
.icon {
 display: block;
 width: 1.5em;
 height: 1.5em;
 margin: 0 auto;
 fill: currentColor;
 font-family: 'iconfont' !important;
 font-size: inherit;
 font-style: normal;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
}
After executing npm run build under the root directory, the project file will be generated to the dist directory.
You can then deploy the dist directory to your favorite server hosting provider.
The following is an example of GithubPage:
- 
create userName.github.io Repo
- 
cd dist git init git add -A git commit -am"init" git remote add origin https://github.com/userName/userName.github.io.git git push -f origin master
- 
Then set the repo's Github Page option in GitHub.
- 
Visit username.github.io to browse!
If your previous username. github.io repo already has content, you can create another repo, such as blog.
Then migrate the occupied items to blog and set the GithubPage option for this repo.
The repo became a subdirectory of username. github.io/blog.
In this way, your username. github.io repo can be left to the home page!
I spent a lot of time and energy to develop this project.
If this project has brought you help, welcome to sponsor, star.
Thank you!