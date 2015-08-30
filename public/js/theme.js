var fs = require('fs'),
	path = require('path');

module.exports = (function(){

	function func(){}

	func.prototype = {
		getThemes : function(){
			var path = './public/stylus/brands',
				directoryContent = fs.readdirSync(path),
				themes = [];
			for(var i = 0 ; i < directoryContent.length ; i++){
				themes.push(directoryContent[i]);
			}
			return themes;
		}
	}

	return new func();
})();