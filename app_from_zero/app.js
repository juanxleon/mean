//instanciado el framework express
var express = require('express');
//instanciando el modulo http de nodejs
var http = require('http');
//creando la aplicacion express
var app = express();
//le indicamos el puerto de escucha 
app.set('port', process.env.PORT || 3000);
app.use(express.bodyParser());

//creacion de las rutas 
app.get('/', function(req, res){
	res.send('¡hola, Express!');
});
//metodo GET
app.get('/users/:userName',function(req, res){
	var name = req.params.userName;
	res.send('¡Hola, ' + name + '!');
});
//metodo POST
app.post('/users', function(req, res){
	var username = req.body.username;
	res.send('¡hola, ' + username + '!');
});

app.get(/\/personal\/(\d*)\/?(edit)?/, function(req, res){
	var message = ' el perfil del empleado #' + req.params[0];
	if(req.params[1] === 'edit'){
		message = 'Editando' + message;
	}else{
		message = 'Vierdo' + message;
	}
	res.send(message);
});

//funcion por la cual se asigna al puerto a escuchar la aplicacion
http.createServer(app).listen(app.get('port'),function(){
	console.log('Express server listening on port ' + app.get('port'));
}); 