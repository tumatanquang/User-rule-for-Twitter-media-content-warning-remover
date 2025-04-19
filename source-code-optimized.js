/**
 * Based on: https://greasyfork.org/en/scripts/437359-twitter-hide-content-warning-crap/code
 */
!function() {
	// Helper function to traverse objects and find values at specific keys
	var findObjectsAtKeys = (obj, keys) => {
		var found = [];
		for(var stack = Object.entries(obj); stack.length != 0;) {
			var [key, value] = stack.pop();
			if(keys.includes(key)) {
				found.push(value);
			}
			if(value && typeof value === 'object') {
				stack.push(...Object.entries(value));
			}
		}
		return found;
	}
	// Fix media objects by removing sensitive media warnings
	var fixMedia = (data) => {
		findObjectsAtKeys(data, ['media']).forEach(obj => {
			if(Array.isArray(obj)) {
				for(var i = obj.length; --i >= 0;) {
					var media = obj[i];
					if(typeof media === 'object') {
						delete media.sensitive_media_warning;
						media.ext_sensitive_media_warning = null;
					}
				}
			}
		})
		findObjectsAtKeys(data, ['legacy']).forEach(obj => {
			if(obj && obj.hasOwnProperty('possibly_sensitive') && typeof obj.possibly_sensitive === 'boolean') {
				obj.possibly_sensitive = false;
			}
		})
	}
	// Remove specific entries from home timeline
	var fixHomeTimeline = (data) => {
		var pattern = /^(promoted-tweet|pinned-tweets|who-to-subscribe)/;
		findObjectsAtKeys(data, ['entries']).forEach(obj => {
			if(Array.isArray(obj)) {
				for(var i = obj.length; --i >= 0;) {
					if(pattern.test(obj[i].entryId)) {
						obj.splice(i, 1);
					}
				}
			}
		})
	}
	// Remove items with promoted metadata from trends
	var fixTrends = (data) => {
		var pattern = /promoted_?metadata/ig;
		findObjectsAtKeys(data, ['items']).forEach(obj0 => {
			if(Array.isArray(obj0)) {
				for(var i = obj0.length; --i >= 0;) {
					findObjectsAtKeys(obj0[i], ['item']).forEach(obj1 => {
						findObjectsAtKeys(obj1, ['itemContent']).forEach(obj2 => {
							if(obj2 && Object.keys(obj2).some(key => pattern.test(key))) {
								obj0.splice(i, 1);
							}
						})
					})
				}
			}
		})
	}
	// Override JSON.parse to include data fixing
	var originalParse = JSON.parse;
	Object.defineProperty(JSON, 'parse', {
		value: (val) => {
			var data;
			try {
				data = originalParse(val);
				if(data) {
					fixMedia(data);
					fixHomeTimeline(data);
					fixTrends(data);
				}
			}
			catch(e) {
				console.error(e);
			}
			return data;
		},
		writable: false
	})
}()