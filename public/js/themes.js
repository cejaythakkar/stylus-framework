var fs = require('fs'),
	stylus = require('stylus');

module.exports = (function(){
	function func(){}

	func.prototype = {
		stylFileArray : [],
		path : '',
		getThemes : function(path){
			var fileNameArray = fs.readdirSync(path);
			this.stylFileArray = [];
			this.path = path;
			this.checkForFile(fileNameArray);
			return this.stylFileArray;
		},
		checkForFile : function(fileNameArray){
			var stat;

			for(var i = 0; i < fileNameArray.length ; i++){
				stat = fs.statSync(this.path + '/' + fileNameArray[i]);
				stat.isFile() && this.isStylusFile(fileNameArray[i]);
			}
		},
		isStylusFile : function(file){
			file.match(/\.styl/) && this.stylFileArray.push(file);
		},
		createThemeBuildFile : function(configObj){
			var path = configObj.path,
				string = '',
				theme;

			for(var i = 0;i < configObj.themes.length ; i++){
				theme = configObj.themes[i];
				string = '@import "../themes/' + theme + '"\n@import "../common/main"';
				fs.writeFileSync(path +'/' + theme.replace(/.styl/,"") + 'Build.styl',string);
			}
		},
		compileStylToCss : function(configObj){
			var stylContent;
			for(var i = 0 ; i < configObj.buildStylSheets.length ; i++){
				stylContent = fs.readFileSync(configObj.buildPath + '/' + configObj.buildStylSheets[i]).toString();
				
				stylus(stylContent)
				.set('paths',[configObj.buildPath])
				.render(function( err , css ){
					if(err) throw err;
					console.log(css);
					fs.writeFileSync(configObj.buildCssPath + '/' + configObj.buildStylSheets[i].replace(/.styl/,"") + '.css',css);
				});
			}
		}
	}
	 return new func();
})();