var fs = require('fs'),
	jade = require('jade'),
	listing = require('./listing'),
	path = require('path');

module.exports = (function(){
	function func(){}

	func.prototype = {
		init : function(){
			console.log(path.resolve('public/stylus/themes'));
			var themeList = listing.getListing();

			this.compileJade({
				jadePath : path.resolve(__dirname + '/../jade/left_panel.jade'),
				data : themeList
			});
		},
		compileJade : function(configObj){
			console.log(configObj.data);
			var fn = jade.compileFile(configObj.jadePath,{pretty : true}),
				html = fn({
					themeList : configObj.data
				});

			configObj.htmlPath && fs.writeFileSync(configObj.htmlPath , html);
		}
	}
	 return new func();
})();