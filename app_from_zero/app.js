//instanciado el framework express
var express = require('express');
//instanciando el modulo http de nodejs
var http = require('http');
//creando la aplicacion express
var app = express();
//le indicamos el puerto de escucha 
app.set('port', process.env.PORT || 3000);
//instanceamos plantillas jade
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//activamos el cache de la pagina
app.set('view cache', true);
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'estoEsUnSecreto'}));
//app.use(express.static(path.join(__dirname, 'public')));
//creacion de las rutas 
//pasando parametros a una vista 
app.get('/', function(req, res){
	res.render('index',{
		title : '¡hola, express!',
		username : 'Juan Leon'
	});
});
app.get('/sintaxis', function(req, res){
	res.render('sintaxis');
});
//metodo GET
//manejo de cookies
app.get('/users/:userName',function(req, res){
	req.session.name = req.params.userName;
	var name = req.params.userName;
	//res.send('¡Hola, ' + name + '!');	
	res.cookie('name', 'Juan Leon', {expires: new Date(Date.now() + 900000)});
	//res.send('<p>vea el valor de la cookie <a href="/name">Aqui</a></p>');
	res.send('<p>Vea el valor de esta sesion <a href="/nameSession">Aqui</a></p>');
});
//mostrar sessiones 
app.get('/nameSession', function(req, res){
	res.send(req.session.name);
});
//Mostrar Cookies
app.get('/name',function(req, res){
	var response = '';
	if(req.cookies.name){
		response = req.cookies.name;
		res.clearCookie('name');	
	}else{
		response = 'No tienes Cookies, estas ya fueron borradas'
	}
	res.send(response);
	
});
//metodo POST
app.post('/users', function(req, res){
	var username = req.body.username;
	res.send('¡hola, ' + username + '!');	
});
//expresion regular en la url 
app.get(/\/personal\/(\d*)\/?(edit)?/, function(req, res){
	var message = ' el perfil del empleado #' + req.params[0];
	message = (req.params[1] === 'edit')? 'Editando' + message : 'Vierdo' + message;
	res.send(message);
});

//Importando el nuevo modulo HealthComponent.js
var HealthComponent = require('./healthComponent.js');
var myHealthComponent = new HealthComponent(10);
// O se puede llamar 
//var HealthComponent = require('./healthComponent.js')(10);


//funcion por la cual se asigna al puerto a escuchar la aplicacion
http.createServer(app).listen(app.get('port'),function(){
	console.log('Express server listening on port ' + app.get('port'));
}); 