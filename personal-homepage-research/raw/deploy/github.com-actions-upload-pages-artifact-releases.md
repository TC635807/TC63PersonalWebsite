原始 URL: https://github.com/actions/upload-pages-artifact/releases
抓取日期: 2026-10-05
tier: browser

---

actions
/
upload-pages-artifact
Public
Notifications
You must be signed in to change notification settings
Fork
136
Star
513
Releases: actions/upload-pages-artifact
Releases · actions/upload-pages-artifact
Release list
Previous
Next
Jump to release
v5.0.0
v4.0.0
v3.0.1
v3.0.0
v2.0.0
v1.0.10
v1.0.9: Merge pull request #63 from actions/chmod-delete
v1.0.8
v1.0.7
v1.0.6
Previous
Next
v5.0.0
v5.0.0
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
tsusdere
released this
10 Apr 18:22
v5.0.0
fc324d3
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
GPG key ID:
B5690EEEBB952194
Verified
Learn about vigilant mode
.
Changelog
Update upload-artifact action to version 7
@Tom-van-Woudenberg
(
#139
)
feat: add
include-hidden-files
input
@jonchurch
(
#137
)
See details of
all code changes
since previous release.
Contributors
jonchurch and Tom-van-Woudenberg
Assets
2
Source code
(zip)
2026-04-08T19:09:19Z
Source code
(tar.gz)
2026-04-08T19:09:19Z
15 people reacted
v4.0.0
v4.0.0
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
TooManyBees
released this
14 Aug 19:21
v4.0.0
7b1f4a7
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
GPG key ID:
B5690EEEBB952194
Verified
Learn about vigilant mode
.
What's Changed
Potentially breaking change: hidden files (specifically dotfiles) will not be included in the artifact by
@tsusdere
in
#102
If you need to include dotfiles in your artifact: instead of using this action, create your own artifact according to these requirements
https://github.com/actions/upload-pages-artifact?tab=readme-ov-file#artifact-validation
Pin
actions/upload-artifact
to SHA by
@heavymachinery
in
#127
Full Changelog
:
v3.0.1...v4.0.0
Contributors
tsusdere and heavymachinery
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
2 people reacted
v3.0.1
v3.0.1
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
github-actions
released this
07 Feb 06:59
v3.0.1
56afc60
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
GPG key ID:
B5690EEEBB952194
Verified
Learn about vigilant mode
.
Changelog
Group tar's output to prevent it from messing up action logs
@SilverRainZ
(
#94
)
Update README.md
@uiolee
(
#88
)
Bump the non-breaking-changes group with 1 update
@dependabot
(
#92
)
Update Dependabot config to group non-breaking changes
@JamesMGreene
(
#91
)
Bump actions/checkout from 3 to 4
@dependabot
(
#76
)
See details of
all code changes
since previous release.
Contributors
JamesMGreene, SilverRainZ, and 2 other contributors
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
3 people reacted
v3.0.0
v3.0.0
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
github-actions
released this
19 Dec 14:50
v3.0.0
0252fc4
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
 The key has expired.
GPG key ID:
4AEE18F83AFDEB23
Expired
Verified
Learn about vigilant mode
.
Changelog
Use
v4
upload-artifact tag
@robherley
(
#80
)
Upload pages artifact with upload-artifact v4-beta
@konradpabjan
(
#78
)
To deploy a GitHub Pages site which has been uploaded with this version of
actions/upload-pages-artifact
, you must also use
actions/deploy-pages@v4
or newer.
⚠️
For use with products other than GitHub.com, such as GitHub Enterprise Server, please be aware that this new Actions artifacts service is not yet supported in the latest GHES release at this time.
See details of
all code changes
since previous release.
Contributors
konradpabjan and robherley
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
1 person reacted
v2.0.0
v2.0.0
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
github-actions
released this
10 Jul 18:14
v2.0.0
a753861
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
 The key has expired.
GPG key ID:
4AEE18F83AFDEB23
Expired
Verified
Learn about vigilant mode
.
Changelog
⚠️
BREAKING CHANGE:
Remove built-in
chmod
commands for
v2
@JamesMGreene
(
#69
)
Update README for
v2
@JamesMGreene
(
#70
)
See details of
all code changes
since previous release.
Contributors
JamesMGreene
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
1 person reacted
v1.0.10
v1.0.10
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
github-actions
released this
10 Jul 17:33
v1.0.10
84bb4cd
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
 The key has expired.
GPG key ID:
4AEE18F83AFDEB23
Expired
Verified
Learn about vigilant mode
.
Changelog
readme: fix/improve note about permissions
@tshepang
(
#65
)
Revert
chmod
removal for
v1
@JamesMGreene
(
#68
)
Add file perms handling
@tsusdere
(
#64
)
See details of
all code changes
since previous release.
Contributors
JamesMGreene, tshepang, and tsusdere
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
v1.0.9: Merge pull request #63 from actions/chmod-delete
v1.0.9: Merge pull request #63 from actions/chmod-delete
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
tsusdere
released this
16 Jun 18:56
v1.0.9
66b63f4
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
 The key has expired.
GPG key ID:
4AEE18F83AFDEB23
Expired
Verified
Learn about vigilant mode
.
Removed
chmod
as we moved towards trusting correct file permissions have been set. In the event this isn't the case then we raise an error in the action related to the file permissions.
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
v1.0.8
v1.0.8
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
github-actions
released this
24 Mar 15:13
v1.0.8
64bcae5
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
 The key has expired.
GPG key ID:
4AEE18F83AFDEB23
Expired
Verified
Learn about vigilant mode
.
Changelog
Fail if no artifact file is found to upload
@JamesMGreene
(
#55
)
Fix link to releases in README
@waldyrious
(
#53
)
Bump actions/publish-action from 0.2.1 to 0.2.2
@dependabot
(
#47
)
Add Dependabot config for Actions usage updates
@JamesMGreene
(
#46
)
See details of
all code changes
since previous release.
Contributors
JamesMGreene, waldyrious, and dependabot
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
v1.0.7
v1.0.7
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
github-actions
released this
16 Dec 18:17
v1.0.7
253fd47
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
 The key has expired.
GPG key ID:
4AEE18F83AFDEB23
Expired
Verified
Learn about vigilant mode
.
Changelog
Don't change file permissions of other files
@KyeRussell
(
#44
)
See details of
all code changes
since previous release.
Contributors
KyeRussell
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
v1.0.6
v1.0.6
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
github-actions
released this
08 Dec 23:30
v1.0.6
c8641e8
This commit was created on GitHub.com and signed with GitHub’s
verified signature
.
 The key has expired.
GPG key ID:
4AEE18F83AFDEB23
Expired
Verified
Learn about vigilant mode
.
Changelog
Customize artifact name @yuradanyliuk (
#41
)
Fix permissions
@yoannchaudet
(
#42
)
Print warnings about changed file permissions in bulk
@TooManyBees
(
#38
)
Update to latest
actions/publish-action
@JamesMGreene
(
#36
)
See details of
all code changes
since previous release.
Contributors
JamesMGreene, TooManyBees, and 2 other contributors
Assets
2
Loading
Uh oh!
There was an error while loading.
Please reload this page
.
Previous
1
2
Next
Previous
Next