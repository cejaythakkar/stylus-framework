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
	jadeData = {
		tabList : ['Downloads','Articles']
	},port = process.env.PORT || 3000,
	bodyParser = require('body-parser')
	Server = require('mongodb').Server,
	Db = require('mongodb').Db,
	db = new Db('atmaagyan',new Server('localhost',27017,{'native_parser' : true}));
	

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
	
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

/*jadeTools.compileJade({
	jadePath : __dirname + '/public/jade/index.jade',
	htmlPath : __dirname + '/public/index.html',
	data : jadeData
});*/

app.set('views','./public/jade');

app.listen(port,function(){
	console.log('listening on port %d....',port);
});

app.get('/',function(request,response){
	response.render('index.jade',jadeData)
});

app.get('/articles',function(request,response){
    var articles = db.collection('articles').find();
    	articleNames = [],
    	html = '';
	jadeTools.compileJade(__dirname + '/public/jade/articles.jade')
	articles.toArray(function(err,docs){
		for(var i = 0;i < docs.length ; i++){
			articleNames.push(docs[i].articleName);
		}
		html = jadeTools.getHtml({listing:articleNames});
    	response.send(html);
	});
});

app.get('/articles/:name',function(request,response){
	var name = request.params.name,
		collection = db.collection('articles');
	console.log(name);
	collection.find({'articleName':name}).toArray(function(err,doc){
		response.send(doc[0].html);
	});
});

app.get('/downloads',function(request,response){
	var fn = jade.compile(fs.readFileSync(__dirname + '/public/jade/downloads.jade'));
	response.end(fn());
});

app.get('*',function(request,response){
	response.render('notfound.jade');
});

db.open(function(err,mongoClient){
	app.post('/login',function(request,response){
		console.log(request.body);
	});
});
