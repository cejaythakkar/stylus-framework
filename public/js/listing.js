var fs = require('fs'),
	themes = require('./themes'),
	path = require('path');

module.exports = (function(){
	function func(){}

	func.prototype = {
		listingTypeMap : {
			themes : {
			},
			articles : {

			}
		},
		getListing : function(listingType){
			var p = path.resolve(__dirname +'/../stylus/themes'),
				stylFiles = themes.getThemes(p);

			for(var i= 0; i < stylFiles.length ; i++){
				stylFiles[i] = stylFiles[i].replace(/.styl/,"");
			}
			return stylFiles;
		}
	};

	return new func();
})();