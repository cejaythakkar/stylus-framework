var fs = require('fs'),
	stylus = require('stylus'),
	themePath = __dirname + '/public/stylus/themes',
	buildPath = __dirname + '/public/stylus/build',
	paths = [__dirname + '/public/stylus/common'],
	themesModule = require('./public/js/themes'),
	themes = themesModule.getThemes(themePath),
	buildCssPath = __dirname + '/public/css',
	express = require('express'),
	app = express(),
	jade = require('jade'),
	jadeTools = require('./public/js/jade-tools'),
	listening = require('./public/js/listing'),
	jadeData = {};



app.use(express.static('public'));
	
themesModule.createThemeBuildFile({
	path : buildPath,
	themes : themes	
});

var buildStylSheets = themesModule.getThemes(buildPath);

themesModule.compileStylToCss({
	buildPath : buildPath,
	buildCssPath : buildCssPath,
	buildStylSheets : buildStylSheets
});

jadeData.themeList = listening.getListing();

jadeTools.compileJade({
	jadePath : __dirname + '/public/jade/index.jade',
	htmlPath : __dirname + '/public/index.html',
	data : jadeData.themeList
});

app.set('views','./public/jade');

app.listen(3000,function(){
	console.log('listening on port 3000....')
});

app.get('/',function(request,response){
	response.render('index.jade',{themeList : jadeData.themeList})
});|

app.get('/articles',function(request,response){
	response.render('articles.jade',{themeList : jadeData.themeList})
});|

app.get('/downloads',function(request,response){
	response.render('downloads.jade')
});