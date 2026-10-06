原始 URL: https://github.com/actions/starter-workflows/blob/main/pages/static.yml
抓取日期: 2026-10-05
tier: browser

---

- 
 Notifications
 You must be signed in to change notification settings
- Fork 7.4k
Collapse file tree
Files
Search this repository(forward slash) forward slash/
/
Copy path
static.yml
More file actions
More file actions
Latest commit
43 lines (38 loc) · 1.23 KB
 · Code owner: @actions/pages, @actions/actions-workflow-development-reviewers, and @actions/starter-workflows
/
Copy path
static.yml
File metadata and controls
43 lines (38 loc) · 1.23 KB
 · Code owner: @actions/pages, @actions/actions-workflow-development-reviewers, and @actions/starter-workflows
You must be signed in to make or propose changes
More edit options
Edit and raw actions
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
# Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages
on:
 # Runs on pushes targeting the default branch
 push:
 branches: [$default-branch]
 # Allows you to run this workflow manually from the Actions tab
 workflow_dispatch:
# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
 contents: read
 pages: write
 id-token: write
# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
 group: "pages"
 cancel-in-progress: false
jobs:
 # Single deploy job since we're just deploying
 deploy:
 environment:
 name: github-pages
 url: ${{ steps.deployment.outputs.page_url }}
 runs-on: ubuntu-latest
 steps:
 - name: Checkout
 uses: actions/checkout@v4
 - name: Setup Pages
 uses: actions/configure-pages@v5
 - name: Upload artifact
 uses: actions/upload-pages-artifact@v3
 with:
 # Upload entire repository
 path: '.'
 - name: Deploy to GitHub Pages
 id: deployment
 uses: actions/deploy-pages@v5