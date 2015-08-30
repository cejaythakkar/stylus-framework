var theme = require('./public/js/theme'),
	express = require('express'),
	app = express();

app.use(express.static('public'));

app.listen(3000,function(request,response){
	console.log('listening to port 3000');
	theme.getThemes();
});
