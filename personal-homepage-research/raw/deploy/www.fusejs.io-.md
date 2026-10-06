原始 URL: https://www.fusejs.io/
抓取日期: 2026-10-05
tier: browser

---

Fuse.js 
Lightweight fuzzy-search library, with zero dependencies.
Trusted by teams at Google, Microsoft, Anthropic, Atlassian, Spotify, MongoDB, Vercel, Adobe, Signal, HashiCorp, SAP, IBM, Nvidia, Grafana, Elastic, Datadog, PostHog, Mapbox, and more.
Quick Example 
js
import Fuse from 'fuse.js'
const books = [
 { title: "Old Man's War", author: 'John Scalzi' },
 { title: 'The Lock Artist', author: 'Steve Hamilton' },
 { title: 'JavaScript Patterns', author: 'Stoyan Stefanov' }
]
const fuse = new Fuse(books, {
 keys: ['title', 'author'],
 includeScore: true
})
fuse.search('jon')
// [{ item: { title: "Old Man's War", author: "John Scalzi" }, refIndex: 0, score: 0.25 }]
fuse.search('patterns')
// [{ item: { title: "JavaScript Patterns", ... }, refIndex: 2, score: 0.0 }]
Fuse Cloud — Coming Soon
Need Fuse.js search without the client-side overhead? Fuse Cloud is a hosted search API — upload JSON, get an endpoint. Same fuzzy search, zero infrastructure. Learn more →
Features 
- Fuzzy search — typo-tolerant matching powered by the Bitap algorithm
- Token search — split multi-word queries into terms, fuzzy-match each, rank with IDF
- Extended search — operators for exact, prefix, suffix, inverse, and include matching
- Logical search — $and /$or expressions for structured queries
- Weighted keys — boost fields like title overdescription
- Nested search — dot notation, array notation, or custom getFn
- Zero dependencies — works in the browser, Node.js, and Deno
- Two builds — full (~8.6 kB gzip) or basic (~6.8 kB gzip)
Get Started 
sh
npm install fuse.js
See Getting Started for installation options, builds, and imports.
Building for Apple platforms?
fuse-swift is the official Swift port for iOS, macOS, tvOS, watchOS, visionOS, and Linux. Byte-equivalent results, idiomatic Swift API. Currently in release candidate.