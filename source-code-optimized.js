! function() {
	// Helper function to traverse objects and find values at specific keys
	var findObjectsAtKeys = (obj, keys) => {
		var found = [];
		var stack = Object.entries(obj);
		while(stack.length) {
			var [key, value] = stack.pop();
			if(keys.includes(key)) {
				found.push(value);
			}
			if(value && typeof value === 'object') {
				stack.push(...Object.entries(value));
			}
		}
		return found;
	};
	// Fix media objects by removing sensitive media warnings
	var fixMedia = (data) => {
		findObjectsAtKeys(data, ['media']).forEach(obj => {
			if(Array.isArray(obj)) {
				obj.forEach(media => {
					if(typeof media === 'object') {
						delete media.sensitive_media_warning;
						media.ext_sensitive_media_warning = null;
					}
				});
			}
		});
		findObjectsAtKeys(data, ['legacy']).forEach(obj => {
			if(obj && obj.hasOwnProperty('possibly_sensitive') && typeof obj.possibly_sensitive === 'boolean') {
				obj.possibly_sensitive = false;
			}
		});
	};
	// Remove specific entries from home timeline
	var fixHomeTimeline = (data) => {
		findObjectsAtKeys(data, ['entries']).forEach(obj => {
			if(Array.isArray(obj)) {
				for(var i = obj.length; --i >= 0;) {
					if(/^(promoted-tweet|pinned-tweets|who-to-subscribe)/.test(obj[i].entryId)) {
						obj.splice(i, 1);
					}
				}
			}
		});
	};
	// Remove items with promoted metadata from trends
	var fixTrends = (data) => {
		findObjectsAtKeys(data, ['items']).forEach(obj => {
			if(Array.isArray(obj)) {
				for(var i = obj.length; --i >= 0;) {
					findObjectsAtKeys(obj[i], ['item']).forEach(obj2 => {
						findObjectsAtKeys(obj2, ['itemContent']).forEach(obj3 => {
							if(obj3 && Object.keys(obj3).some(key => /promoted_?metadata/ig.test(key))) {
								obj.splice(i, 1);
							}
						});
					});
				}
			}
		});
	};
	// Override JSON.parse to include data fixing
	var originalParse = JSON.parse;
	Object.defineProperty(JSON, "parse", {
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
	});
}();