! function() {
	var find_objects_at_keys = function(obj, keys) {
		var found = [];
		var stack = Object.entries(obj);
		while(stack.length > 0) {
			var current = stack.pop();
			if(keys.includes(current[0])) {
				found.push(current[1]);
			}
			if(current[1] != null && typeof(current[1]) == 'object') {
				stack = stack.concat(Object.entries(current[1]));
			}
		}
		return found;
	};
	var fix_media = function(data) {
		for(var obj of find_objects_at_keys(data, ['media'])) {
			if(!Array.isArray(obj)) {
				continue;
			}
			for(var media of obj) {
				if(typeof media != 'object') {
					continue;
				}
				delete media.sensitive_media_warning;
				media.ext_sensitive_media_warning = null;
			}
		};
		for(var obj of find_objects_at_keys(data, ['legacy'])) {
			if(obj != null && obj.hasOwnProperty('possibly_sensitive') && typeof obj.possibly_sensitive == 'boolean') {
				obj.possibly_sensitive = false;
			}
		}
	};
	var fix_home_timeline = function(data) {
		var one_items = find_objects_at_keys(data, ['entries']);
		for(var obj of one_items) {
			if(!Array.isArray(obj)) {
				continue;
			}
			for(let i = obj.length; --i >= 0;) {
				if(/^(promoted-tweet|pinned-tweets|who-to-subscribe)/.test(obj[i]['entryId'])) {
					obj.splice(i, 1);
				}
			}
		}
	};
	var fix_trends = function(data) {
		var one_items = find_objects_at_keys(data, ['items']);
		for(var obj of one_items) {
			if(!Array.isArray(obj)) {
				continue;
			}
			for(var i = obj.length; --i >= 0;) {
				var two_item = find_objects_at_keys(obj[i], ['item']);
				for(var obj2 of two_item) {
					var three_item = find_objects_at_keys(obj2, ['itemContent']);
					for(var obj3 of three_item) {
						if(obj3 != null && Object.keys(obj3).some(key => /promoted_?metadata/ig.test(key))) {
							obj.splice(i, 1);
						}
					}
				}
			}
		}
	};
	var old_parse = window.JSON.parse;
	Object.defineProperty(JSON, "parse", {
		value: function(val) {
			var data = old_parse(val);
			try {
				if(data != null) {
					fix_media(data);
					fix_home_timeline(data);
					fix_trends(data);
				}
			}
			catch(e) {
				console.log(e)
			}
			return data
		},
		writable: !1
	});
}();`