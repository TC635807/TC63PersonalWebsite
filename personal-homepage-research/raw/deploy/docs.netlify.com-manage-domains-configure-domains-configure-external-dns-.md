原始 URL: https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/
抓取日期: 2026-10-05
tier: browser

---

For the complete Netlify documentation index, see llms.txt. Markdown versions of any documentation page are available by appending .md to its URL.
If you’ve assigned an externally registered domaindomainThe web address people use to visit your site, such as yoursite.com. to your site, and you don’t want to use Netlify DNSDNSThe system that translates a domain name like yoursite.com into the address computers use to find your site., you need to configure your external DNS provider to point your domain to Netlify.
To access customized details about the DNS records you need to configure, go to and select Pending DNS verification next to the custom domain.
The next steps vary depending on the type of domain or subdomainsubdomainA prefix added to a domain name, such as blog in blog.yoursite.com..
- For a subdomain of a domain you own, such as blog.petsofnetlify.com orwww.petsofnetlify.com , follow the directions below for subdomain configuration.
- For an apex domain with no subdomain, such as petsofnetlify.com , make sure to read our advice about using apex domains, then follow the directions below for apex domain configuration.
Configure a subdomain
Section titled “Configure a subdomain”
To point a subdomain such as blog.petsofnetlify.com or www.petsofnetlify.com to your site on Netlify, you must first add the domain to your site on Netlify and then create a CNAME record with your DNS provider.
For example, if your site’s domain is blog.petsofnetlify.com and your Netlify subdomain is brave-curie-12345.netlify.app:
- Follow the instructions to add the domain blog.petsofnetlify.com to thebrave-curie-12345.netlify.app site on Netlify. At the end of the process, Netlify provides a CNAME record to add to your DNS provider.
- Find your DNS provider’s DNS record settings for your apex domain, petsofnetlify.com .
- On your DNS provider’s site, add the CNAME record with your subdomain, blog , as the host.
- Point the record to your Netlify subdomain, brave-curie-12345.netlify.app .
- Save your settings. It may take a full day for the settings to propagate across the global Domain Name System.
If your site uses the www subdomain, as in www.petsofnetlify.com, you will use the same procedure described above. Once you configure the www subdomain, an apex domain will also be added automatically to your site. You’ll need to follow the steps in the section below to configure the apex domain too. Learn more about our special handling for www subdomains.
Configure an apex domain
Section titled “Configure an apex domain”
Unlike subdomains, apex domains don’t support CNAME records. You must configure your apex domain with an ALIAS, ANAME, flattened CNAME, or A record. Different DNS providers support different record types. Depending on what your DNS provider supports, use either the recommended configuration or the fallback option below.
If your DNS provider supports ALIAS, ANAME, or flattened CNAME records, use this recommended configuration, which is more resilient than the fallback option.
- Find your DNS provider’s DNS record settings for your apex domain, such as petsofnetlify.com .
- Add an ALIAS, ANAME, or flattened CNAME record. Depending on your provider, leave the host field empty or enter @ .
- Point the record to Netlify’s load balancer at: apex-loadbalancer.netlify.com .
- Save your settings. It may take a full day for the settings to propagate across the global Domain Name System.
If your DNS provider does not support ALIAS, ANAME, or flattened CNAME records, use this fallback option.
- Find your DNS provider’s DNS record settings for your apex domain, such as petsofnetlify.com .
- Add an A record. Depending on your provider, leave the host field empty or enter @ .
- Point the record to Netlify’s load balancer IP address: 75.2.60.5 .
- Save your settings. It may take a full day for the settings to propagate across the global Domain Name System.
In both cases, the apex domain eventually resolves to our load balancer IP address. This means the apex domain can’t take advantage of direct DNS routing on a global CDN like Netlify’sCDNA network of servers around the world that delivers your site’s files from the location closest to each visitor.. Because of this, we recommend using a subdomain for your primary domain when using external DNS.
DNS record propagation
Section titled “DNS record propagation”
Depending on your DNS provider, changes to DNS records can take several hours to propagate and take effect for the entire internet.
If more than 24 hours have passed since you configured your DNS records, and your site is still not accessible at your custom domain, try our DNS troubleshooting tips.
Did you find this doc useful?
Your feedback helps us improve our docs.