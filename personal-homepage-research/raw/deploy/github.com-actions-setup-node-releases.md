原始 URL: https://github.com/actions/setup-node/releases
抓取日期: 2026-10-05
tier: browser

---

actions
/
setup-node
Public
Notifications
You must be signed in to change notification settings
Fork
1.7k
Star
5k
Releases: actions/setup-node
Releases · actions/setup-node
Release list
Previous
Next
Jump to release
v7.0.0
v6.5.0
v6.4.0
v6.3.0
v6.2.0
v6.1.0
v6.0.0
v5.0.0
v3.9.1
v3.9.0
Previous
Next
v7.0.0
v7.0.0
Latest
Marketplace
Latest
Marketplace
Compare
Choose a tag to compare
Sorry, something went wrong.
Filter
Loading
Sorry, something went wrong.
Uh oh!
There was an error while loading.
Please reload this page
.
No results found
View all tags
v-gowridurgad
released this
14 Jul 02:46
Immutable
release. Only release title and notes can be modified.
v7.0.0
8207627
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
GPG key ID:
B5690EEEBB952194
Verified
Learn about vigilant mode
.
What's Changed
Enhancements:
Add cache-primary-key and cache-matched-key as outputs by @gowridurgad in
#1577
Migrate to ESM and upgrade dependencies by @gowridurgad in
#1574
Bug fixes:
Remove dummy NODE_AUTH_TOKEN export by @gowridurgad in
#1558
Only use
mirrorToken
in
getManifest
if it's provided by
@deiga
in
#1548
Documentation updates:
Add documentation for publishing to npm with Trusted Publisher (OIDC) by @chiranjib-swain in
#1536
docs: Update restore-only cache documentation by @priya-kinthali in
#1550
docs: Update caching recommendations to mitigate cache poisoning risks by @chiranjib-swain in
#1567
Dependency update:
Upgrade @actions/cache to 5.1.0, log cache write denied by
@jasongin
in
#1569
New Contributors
@chiranjib-swain made their first contribution in
#1536
@deiga
made their first contribution in
#1548
@jasongin
made their first contribution in
#1569
Full Changelog
:
v6...v7.0.0
Contributors
deiga, jasongin, and 3 other contributors
Assets
3
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
12 people reacted
v6.5.0
v6.5.0
Marketplace
Marketplace
Compare
Choose a tag to compare
Sorry, something went wrong.
Filter
Loading
Sorry, something went wrong.
Uh oh!
There was an error while loading.
Please reload this page
.
No results found
View all tags
v-HarithaVattikuti
released this
14 Jul 02:51
Immutable
release. Only release title and notes can be modified.
v6.5.0
2499707
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
GPG key ID:
B5690EEEBB952194
Verified
Learn about vigilant mode
.
What's Changed
Update @actions/cache to 5.1.0 and add security overrides for undici and fast-xml-parser by @HarithaVattikuti in
#1579
Full Changelog
:
v6.4.0...v6.5.0
Contributors
v-HarithaVattikuti
Assets
3
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
4 people reacted
v6.4.0
v6.4.0
Marketplace
Marketplace
Compare
Choose a tag to compare
Sorry, something went wrong.
Filter
Loading
Sorry, something went wrong.
Uh oh!
There was an error while loading.
Please reload this page
.
No results found
View all tags
v-gowridurgad
released this
20 Apr 02:57
v6.4.0
48b55a0
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
GPG key ID:
B5690EEEBB952194
Verified
Learn about vigilant mode
.
What's Changed
Dependency updates:
Upgrade
@actions
dependencies by @Copilot in
#1525
Update Node.js versions in versions.yml and bump package to v6.4.0 by @priya-kinthali in
#1533
New Contributors
@Copilot made their first contribution in
#1525
Full Changelog
:
v6...v6.4.0
Contributors
actions and v-priya-kinthali
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
3 people reacted
v6.3.0
v6.3.0
Marketplace
Marketplace
Compare
Choose a tag to compare
Sorry, something went wrong.
Filter
Loading
Sorry, something went wrong.
Uh oh!
There was an error while loading.
Please reload this page
.
No results found
View all tags
v-gowridurgad
released this
04 Mar 02:52
v6.3.0
53b8394
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
GPG key ID:
B5690EEEBB952194
Verified
Learn about vigilant mode
.
What's Changed
Enhancements:
Support parsing
devEngines
field by
@susnux
in
#1283
When using node-version-file: package.json, setup-node now prefers devEngines.runtime over engines.node.
Dependency updates:
Fix npm audit issues by @gowridurgad in
#1491
Replace uuid with crypto.randomUUID() by
@trivikr
in
#1378
Upgrade minimatch from 3.1.2 to 3.1.5 by
@dependabot
in
#1498
Bug fixes:
Remove hardcoded bearer for mirror-url
@marco-ippolito
in
#1467
Scope test lockfiles by package manager and update cache tests by @gowridurgad in
#1495
New Contributors
@susnux
made their first contribution in
#1283
Full Changelog
:
v6...v6.3.0
Contributors
susnux, trivikr, and 3 other contributors
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
4 people reacted
v6.2.0
v6.2.0
Marketplace
Marketplace
Compare
Choose a tag to compare
Sorry, something went wrong.
Filter
Loading
Sorry, something went wrong.
Uh oh!
There was an error while loading.
Please reload this page
.
No results found
View all tags
v-HarithaVattikuti
released this
15 Jan 03:07
v6.2.0
6044e13
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
GPG key ID:
B5690EEEBB952194
Verified
Learn about vigilant mode
.
What's Changed
Documentation
Documentation update related to absence of Lockfile by @mahabaleshwars in
#1454
Correct mirror option typos by
@MikeMcC399
in
#1442
Readme update on checkout version v6 by
@deining
in
#1446
Readme typo fixes
@munyari
in
#1226
Advanced document update on checkout version v6 by @aparnajyothi-y in
#1468
Dependency updates:
Upgrade @actions/cache to v5.0.1 by
@salmanmkc
in
#1449
New Contributors
@mahabaleshwars made their first contribution in
#1454
@MikeMcC399
made their first contribution in
#1442
@deining
made their first contribution in
#1446
@munyari
made their first contribution in
#1226
Full Changelog
:
v6...v6.2.0
Contributors
munyari, deining, and 4 other contributors
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
5 people reacted
v6.1.0
v6.1.0
Marketplace
Marketplace
Compare
Choose a tag to compare
Sorry, something went wrong.
Filter
Loading
Sorry, something went wrong.
Uh oh!
There was an error while loading.
Please reload this page
.
No results found
View all tags
v-gowridurgad
released this
03 Dec 03:19
v6.1.0
395ad32
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
GPG key ID:
B5690EEEBB952194
Verified
Learn about vigilant mode
.
What's Changed
Enhancement:
Remove always-auth configuration handling by @priyagupta108 in
#1436
Dependency updates:
Upgrade @actions/cache from 4.0.3 to 4.1.0 by
@dependabot
[bot] in
#1384
Upgrade actions/checkout from 5 to 6 by
@dependabot
[bot] in
#1439
Upgrade js-yaml from 3.14.1 to 3.14.2 by
@dependabot
[bot] in
#1435
Documentation update:
Add example for restore-only cache in documentation by @aparnajyothi-y in
#1419
Full Changelog
:
v6...v6.1.0
Contributors
dependabot, v-aparnajyothi-y, and v-priyagupta108
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
2 people reacted
v6.0.0
v6.0.0
Marketplace
Marketplace
Compare
Choose a tag to compare
Sorry, something went wrong.
Filter
Loading
Sorry, something went wrong.
Uh oh!
There was an error while loading.
Please reload this page
.
No results found
View all tags
v-HarithaVattikuti
released this
14 Oct 02:55
v6.0.0
2028fbc
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
GPG key ID:
B5690EEEBB952194
Verified
Learn about vigilant mode
.
What's Changed
Breaking Changes
Limit automatic caching to npm, update workflows and documentation by @priyagupta108 in
#1374
Dependency Upgrades
Upgrade ts-jest from 29.1.2 to 29.4.1 and document breaking changes in v5 by
@dependabot
[bot] in
#1336
Upgrade prettier from 2.8.8 to 3.6.2 by
@dependabot
[bot] in
#1334
Upgrade actions/publish-action from 0.3.0 to 0.4.0 by
@dependabot
[bot] in
#1362
Full Changelog
:
v5...v6.0.0
Contributors
dependabot and v-priyagupta108
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
17 people reacted
v5.0.0
v5.0.0
Marketplace
Marketplace
Compare
Choose a tag to compare
Sorry, something went wrong.
Filter
Loading
Sorry, something went wrong.
Uh oh!
There was an error while loading.
Please reload this page
.
No results found
View all tags
v-gowridurgad
released this
04 Sep 02:52
v5.0.0
a0853c2
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
GPG key ID:
B5690EEEBB952194
Verified
Learn about vigilant mode
.
What's Changed
Breaking Changes
Enhance caching in setup-node with automatic package manager detection by @priya-kinthali in
#1348
This update, introduces automatic caching when a valid
packageManager
field is present in your
package.json
. This aims to improve workflow performance and make dependency management more seamless.
To disable this automatic caching, set
package-manager-cache: false
steps
:
-
uses
:
actions/checkout@v5
-
uses
:
actions/setup-node@v5
with
:
package-manager-cache
:
false
Upgrade action to use node24 by
@salmanmkc
in
#1325
Make sure your runner is on version v2.327.1 or later to ensure compatibility with this release.
See Release Notes
Dependency Upgrades
Upgrade @octokit/request-error and @actions/github by
@dependabot
[bot] in
#1227
Upgrade uuid from 9.0.1 to 11.1.0 by
@dependabot
[bot] in
#1273
Upgrade undici from 5.28.5 to 5.29.0 by
@dependabot
[bot] in
#1295
Upgrade form-data to bring in fix for critical vulnerability by @gowridurgad in
#1332
Upgrade actions/checkout from 4 to 5 by
@dependabot
[bot] in
#1345
New Contributors
@priya-kinthali made their first contribution in
#1348
@salmanmkc
made their first contribution in
#1325
Full Changelog
:
v4...v5.0.0
Contributors
dependabot, salmanmkc, and 2 other contributors
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
20 people reacted
v3.9.1
v3.9.1
Marketplace
Marketplace
Compare
Choose a tag to compare
Sorry, something went wrong.
Filter
Loading
Sorry, something went wrong.
Uh oh!
There was an error while loading.
Please reload this page
.
No results found
View all tags
v-HarithaVattikuti
released this
17 Apr 13:58
v3.9.1
3235b87
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
GPG key ID:
B5690EEEBB952194
Verified
Learn about vigilant mode
.
What's Changed
Add workflow file for publishing releases to immutable action package by @aparnajyothi-y in
#1281
Full Changelog
:
v3...v3.9.1
Contributors
v-aparnajyothi-y
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
5 people reacted
v3.9.0
v3.9.0
Marketplace
Marketplace
Compare
Choose a tag to compare
Sorry, something went wrong.
Filter
Loading
Sorry, something went wrong.
Uh oh!
There was an error while loading.
Please reload this page
.
No results found
View all tags
v-gowridurgad
released this
14 Apr 02:47
v3.9.0
dbe1369
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
GPG key ID:
B5690EEEBB952194
Verified
Learn about vigilant mode
.
What's Changed
Upgrade @actions/cache to 4.0.3 by @gowridurgad in
#1270
In scope of this release we updated actions/cache package to ensure continued support and compatibility, as older versions of the package are now deprecated. For more information please refer to the
toolkit/cache
.
Full Changelog
:
v3...v3.9.0
Contributors
v-gowridurgad
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
1 person reacted
Previous
1
2
3
4
5
6
7
Next
Previous
Next