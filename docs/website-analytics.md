# Website analytics

`alphabravomedia.co` uses Cloudflare Web Analytics automatic injection. There is no manual beacon in the website source. The existing Content Security Policy allows `https://static.cloudflareinsights.com` to load the automatically injected script. Its same-origin `/cdn-cgi/rum` collection endpoint is covered by `connect-src 'self'`.

Open [Cloudflare](https://dash.cloudflare.com/), select Ayoub's account, and open **Web Analytics** under **Analytics & Logs**. Select `alphabravomedia.co`. Use the date, page path, hostname, and referrer filters to see which guides receive visits and where readers come from. [Overview](https://developers.cloudflare.com/web-analytics/), [dimensions](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/).

The Cloudflare property was created on November 6, 2026. Automatic injection is enabled, with EU visitors excluded (`lite: true`). A zone Configuration Rule named **Public website analytics exclusions** disables RUM on non-primary hostnames and on admin, CMS, API, and legacy unlisted-gallery paths. This rule changes analytics injection; it does not grant or restrict access to those pages. Preserve it during future configuration changes.

The Free plan does not support custom Web Analytics rules. Request-level exclusions use `disable_rum` in a Configuration Rule instead. These settings live in Cloudflare, so a site deployment does not recreate them. [Web Analytics limits](https://developers.cloudflare.com/web-analytics/limits/), [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/settings/).

After deploying the CSP change, verify exactly one correct-token beacon on public HTML and verify that the CSP permits it. Check excluded paths without recording private content. Cloudflare injection can take time to propagate. A local build does not contain the automatically injected beacon and cannot prove edge collection. [Automatic setup](https://developers.cloudflare.com/web-analytics/get-started/), [beacon/CSP FAQ](https://developers.cloudflare.com/web-analytics/faq/).

Social referrers show visits arriving from social platforms, not those platforms' reach or engagement. Use Google Search Console for search impressions/clicks and the social platforms' own reports for their audience metrics. A website visit or an outbound contact click is not proof of a received inquiry. Cloudflare's standard Web Analytics does not provide custom-event reporting. Do not add another tracker without a measurement need.

To stop collection, disable automatic injection in the existing Cloudflare property. Keep the property and its history. No API credentials belong in the repository; the browser beacon token is a public installation identifier.
