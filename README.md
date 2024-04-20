# BEFORE GETTING STARTED:
- The code used in this tutorial was taken from Greasy Fork (but it's gone now - I'll add the source when I find it again), modified to work without Greasy Fork, and minified by me.
- This guide is written for the AdGuard AdBlocker extension, if you use other extensions like [Adblock Plus](https://help.adblockplus.org/hc/en-us/articles/360062733293-How-to-write-filters), [uBlock Origin (uBO)](https://github.com/gorhill/uBlock/wiki/Static-filter-syntax),... Check out their filter rules guide first before starting.

Now that you know how to write filter rules, let's get started!

## HOW TO USE?

- Check if your ad-blocking extension supports JavaScript rules and User rules. Here I will use [AdGuard AdBlocker](https://adguard.com/kb/general/ad-filtering/create-own-filters/#javascript-rules) because its syntax is very simple.
- After making sure your ad-blocking extension supports JavaScript rules and User Rules, open [User Rules](https://adguard.com/kb/adguard-browser-extension/features/filters/#user-rules) and add the following code:

```javascript
twitter.com#%#!function(){var e=function(e,i){for(var n=[],t=Object.entries(e);t.length>0;){var o=t.pop();i.includes(o[0])&&n.push(o[1]),null!=o[1]&&"object"==typeof o[1]&&(t=t.concat(Object.entries(o[1])))}return n},i=function(i){for(var n of e(i,["media"]))if(Array.isArray(n))for(var t of n)"object"==typeof t&&(delete t.sensitive_media_warning,t.ext_sensitive_media_warning=null);for(var n of e(i,["legacy"]))null!=n&&n.hasOwnProperty("possibly_sensitive")&&"boolean"==typeof n.possibly_sensitive&&(n.possibly_sensitive=!1)},n=window.JSON.parse;Object.defineProperty(JSON,"parse",{value:function(e){var t=n(e);try{null!=t&&i(t)}catch(o){console.log(o)}return t},writable:!1})}();
```

#### NOTE: The [x.com](x.com) domain is just a domain that redirects to [twitter.com](twitter.com), but if you can browse Twitter on the [x.com](x.com) domain, you also need to add x.com to the above rule:

```javascript
twitter.com,x.com#%#!function(){var e=function(e,i){for(var n=[],t=Object.entries(e);t.length>0;){var o=t.pop();i.includes(o[0])&&n.push(o[1]),null!=o[1]&&"object"==typeof o[1]&&(t=t.concat(Object.entries(o[1])))}return n},i=function(i){for(var n of e(i,["media"]))if(Array.isArray(n))for(var t of n)"object"==typeof t&&(delete t.sensitive_media_warning,t.ext_sensitive_media_warning=null);for(var n of e(i,["legacy"]))null!=n&&n.hasOwnProperty("possibly_sensitive")&&"boolean"==typeof n.possibly_sensitive&&(n.possibly_sensitive=!1)},n=window.JSON.parse;Object.defineProperty(JSON,"parse",{value:function(e){var t=n(e);try{null!=t&&i(t)}catch(o){console.log(o)}return t},writable:!1})}();
```

Remember to click **Save**, then reload the page to apply the rule.

Everything is done, enjoy browsing without warning!
