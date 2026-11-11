# Website analytics

`alphabravomedia.co` uses Cloudflare Web Analytics automatic injection. There is no manual beacon in the website source. The existing Content Security Policy allows `https://static.cloudflareinsights.com` to load the automatically injected script. Its same-origin `/cdn-cgi/rum` collection endpoint is covered by `connect-src 'self'`.

Open [Cloudflare](https://dash.cloudflare.com/), select Ayoub's account, and open **Web Analytics** under **Analytics & Logs**. Select `alphabravomedia.co`. Use the date, page path, hostname, and referrer filters to see which guides receive visits and where readers come from. [Overview](https://developers.cloudflare.com/web-analytics/), [dimensions](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/).

The Cloudflare property was created on November 6, 2026. Automatic injection is enabled, with EU visitors excluded (`lite: true`). A zone Configuration Rule named **Public website analytics exclusions** disables RUM on non-primary hostnames and on admin, CMS, API, and legacy unlisted-gallery paths. This rule changes analytics injection; it does not grant or restrict access to those pages. Preserve it during future configuration changes.

The Free plan does not support custom Web Analytics rules. Request-level exclusions use `disable_rum` in a Configuration Rule instead. These settings live in Cloudflare, so a site deployment does not recreate them. [Web Analytics limits](https://developers.cloudflare.com/web-analytics/limits/), [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/settings/).

After deploying the CSP change, verify exactly one correct-token beacon on public HTML and verify that the CSP permits it. Check excluded paths without recording private content. Cloudflare injection can take time to propagate. A local build does not contain the automatically injected beacon and cannot prove edge collection. [Automatic setup](https://developers.cloudflare.com/web-analytics/get-started/), [beacon/CSP FAQ](https://developers.cloudflare.com/web-analytics/faq/).

Social referrers show visits arriving from social platforms, not those platforms' reach or engagement. Use Google Search Console for search impressions/clicks and the social platforms' own reports for their audience metrics. A website visit or an outbound contact click is not proof of a received inquiry. Cloudflare's standard Web Analytics does not provide custom-event reporting. Do not add another tracker without a measurement need.

To stop collection, disable automatic injection in the existing Cloudflare property. Keep the property and its history. No API credentials belong in the repository; the browser beacon token is a public installation identifier.

## Search Console and indexing

The November 11, 2026 review used the `alphabravomedia.co` domain property, accessible under `destinybeta100@gmail.com`. The report was last updated November 5; individual examples include older crawls. Search Console reports search visibility, independently of Cloudflare Web Analytics.

The malformed `/gear/sigma-16-28mm/sigma-28-105mm` and reverse lens URLs came from former relative Markdown links. The current content already uses `/gear/.../` links. `public/_redirects` now sends both historical paths, with or without a trailing slash, directly to the intended lens page. After building, run `node scripts/check-route-retirement.mjs` to check these redirects and rendered links.

The `www.alphabravomedia.co` hostname previously pointed to `today20092.github.io` without Cloudflare proxying and failed HTTPS certificate validation. The apex is served by the `alphabravomedia-site` Worker. On November 11, 2026, the following Cloudflare repair was applied and both HTTP and HTTPS were verified in a browser with the path and query string preserved:

1. Create a Cloudflare Single Redirect in the `alphabravomedia.co` zone matching `(http.host eq "www.alphabravomedia.co")`. Use status `301`, dynamic destination `concat("https://alphabravomedia.co", http.request.uri.path)`, and preserve the query string. Preserve other rules in the zone.
2. Change only the existing `www` CNAME target to `alphabravomedia.co` and enable proxying. Do not alter mail, `media`, `tiny`, or `go` records. Cloudflare must serve a valid certificate for `www`; never bypass certificate errors to test it.
3. Verify both HTTP and HTTPS `www` requests redirect to the HTTPS apex with their path and query intact, including `/gear/sigma-16-28mm/?source=www-check`. Verify the apex still responds normally.

This hostname redirect belongs in Cloudflare: Workers static-assets `_redirects` does not support domain-level source rules. [Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/), [static-assets redirect support](https://developers.cloudflare.com/workers/static-assets/redirects/).

The ruleset is `Canonical website hostname` (`261501070f6e42359c4f70f9b080c82f`), rule reference `www_to_apex`. The existing DNS record ID is `bd63c6064e721797f02d72d53cbd106b`; its former value was `today20092.github.io`, `proxied: false`, TTL automatic. The current value is `alphabravomedia.co`, `proxied: true`. Preserve this redirect during future DNS or ruleset changes. Restoring the former value would restore the known broken GitHub Pages alias.

All 35 current sitemap URLs returned 200 with self-canonicals and no `noindex` during the review. Search Console showed the sitemap as **Success**, last read November 8, with 35 discovered pages; no resubmission was needed. The route baseline was also refreshed from 26 to those 35 existing public routes, with no original routes removed.

Keep the unlisted wedding gallery excluded and absent from the build. `media.alphabravomedia.co` is an object-storage host; its root 404 is not a missing website page. Do not expose bucket listings or redirect every missing media object to the website. The `tiny` short-link service is separate from this repository; its robots exclusion is not evidence that public website pages are blocked.

Existing service and portfolio redirects are intentional route retirements. The old mobile-podcast URL now redirects to `/about/`; several portfolio URLs redirect to their replacement on `ayoubabed.xyz`. Current public pages with successful responses, self-canonicals, and no indexing block may still be listed as "Crawled - currently not indexed" until Google revisits them. Indexing is Google's decision and cannot be guaranteed. Submit the current sitemap and use URL Inspection for important current pages after release; do not remove intentional canonical tags or privacy exclusions to clear report counts.
