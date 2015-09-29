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
		compileJade : function(path){
			this.fn = jade.compileFile(path,{pretty : true});
			// return fn;
			// configObj.htmlPath && fs.writeFileSync(configObj.htmlPath , html);
		},
		getHtml : function(data){
			return this.fn(data);
		}
	}
	 return new func();
})();
