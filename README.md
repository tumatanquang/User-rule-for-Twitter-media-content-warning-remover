# BEFORE GETTING STARTED:
- The code used in this tutorial was taken from Greasy Fork (but it's gone now - I'll add the source when I find it again), modified to work without Greasy Fork, and minified by me.
- This guide is written for the AdGuard AdBlocker extension, if you use other extensions like [Adblock Plus](https://help.adblockplus.org/hc/en-us/articles/360062733293-How-to-write-filters), [uBlock Origin (uBO)](https://github.com/gorhill/uBlock/wiki/Static-filter-syntax),... Check out their filter rules guide first before starting.

Now that you know how to write filter rules, let's get started!

## HOW TO USE?

- Check if your ad-blocking extension supports JavaScript rules and User rules. Here I will use [AdGuard AdBlocker](https://adguard.com/kb/general/ad-filtering/create-own-filters/#javascript-rules) because its syntax is very simple.
- After making sure your ad-blocking extension supports JavaScript rules and User Rules, open [User Rules](https://adguard.com/kb/adguard-browser-extension/features/filters/#user-rules) and add the following code:

```javascript
twitter.com,x.com#%#!function(){var e=(e,r)=>{for(var t=[],i=Object.entries(e);0!=i.length;){var[s,a]=i.pop();r.includes(s)&&t.push(a),a&&"object"==typeof a&&i.push(...Object.entries(a))}return t},r=JSON.parse;Object.defineProperty(JSON,"parse",{value:t=>{var i;try{(i=r(t))&&((r=>{e(r,["media"]).forEach((e=>{if(Array.isArray(e))for(var r=e.length;--r>=0;){var t=e[r];"object"==typeof t&&(delete t.sensitive_media_warning,t.ext_sensitive_media_warning=null)}})),e(r,["legacy"]).forEach((e=>{e&&e.hasOwnProperty("possibly_sensitive")&&"boolean"==typeof e.possibly_sensitive&&(e.possibly_sensitive=!1)}))})(i),(r=>{var t=/^(promoted-tweet|pinned-tweets|who-to-subscribe)/;e(r,["entries"]).forEach((e=>{if(Array.isArray(e))for(var r=e.length;--r>=0;)t.test(e[r].entryId)&&e.splice(r,1)}))})(i),(r=>{var t=/promoted_?metadata/gi;e(r,["items"]).forEach((r=>{if(Array.isArray(r))for(var i=r.length;--i>=0;)e(r[i],["item"]).forEach((s=>{e(s,["itemContent"]).forEach((e=>{e&&Object.keys(e).some((e=>t.test(e)))&&r.splice(i,1)}))}))}))})(i))}catch(e){console.error(e)}return i},writable:!1})}();
```

Remember to click **Save**, then reload the page to apply the rule.

Everything is done, enjoy browsing without warning!
