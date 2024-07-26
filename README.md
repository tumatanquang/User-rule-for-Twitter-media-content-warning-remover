# BEFORE GETTING STARTED:
- The code used in this tutorial was taken from Greasy Fork (but it's gone now - I'll add the source when I find it again), modified to work without Greasy Fork, and minified by me.
- This guide is written for the AdGuard AdBlocker extension, if you use other extensions like [Adblock Plus](https://help.adblockplus.org/hc/en-us/articles/360062733293-How-to-write-filters), [uBlock Origin (uBO)](https://github.com/gorhill/uBlock/wiki/Static-filter-syntax),... Check out their filter rules guide first before starting.

Now that you know how to write filter rules, let's get started!

## HOW TO USE?

- Check if your ad-blocking extension supports JavaScript rules and User rules. Here I will use [AdGuard AdBlocker](https://adguard.com/kb/general/ad-filtering/create-own-filters/#javascript-rules) because its syntax is very simple.
- After making sure your ad-blocking extension supports JavaScript rules and User Rules, open [User Rules](https://adguard.com/kb/adguard-browser-extension/features/filters/#user-rules) and add the following code:

```javascript
twitter.com,x.com#%#!function(){let e=(e,t)=>{let r=[],i=Object.entries(e);for(;i.length;){let[s,o]=i.pop();t.includes(s)&&r.push(o),o&&"object"==typeof o&&i.push(...Object.entries(o))}return r},t=t=>{e(t,["media"]).forEach(e=>{Array.isArray(e)&&e.forEach(e=>{"object"==typeof e&&(delete e.sensitive_media_warning,e.ext_sensitive_media_warning=null)})}),e(t,["legacy"]).forEach(e=>{e&&e.hasOwnProperty("possibly_sensitive")&&"boolean"==typeof e.possibly_sensitive&&(e.possibly_sensitive=!1)})},r=t=>{e(t,["entries"]).forEach(e=>{if(Array.isArray(e))for(let t=e.length-1;t>=0;t--)/^(promoted-tweet|pinned-tweets|who-to-subscribe)/.test(e[t].entryId)&&e.splice(t,1)})},i=t=>{e(t,["items"]).forEach(t=>{if(Array.isArray(t))for(let r=t.length-1;r>=0;r--)e(t[r],["item"]).forEach(i=>{e(i,["itemContent"]).forEach(e=>{e&&Object.keys(e).some(e=>/promoted_?metadata/ig.test(e))&&t.splice(r,1)})})})},s=JSON.parse;Object.defineProperty(JSON,"parse",{value(e){let o;try{(o=s(e))&&(t(o),r(o),i(o))}catch(n){console.error(n)}return o},writable:!1})}();
```

Remember to click **Save**, then reload the page to apply the rule.

Everything is done, enjoy browsing without warning!
