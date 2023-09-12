const express = require('express')
const app = express()
const path = require('path')
const port = 3000
app.use(express.json());
var cookieParser = require('cookie-parser')
app.use(cookieParser());

var fakeDB = {
    'bruno_web': {
        productos: [{'nombre': 'producto bruno'}]
    },
    'ariel123':{
        productos: [{'nombre': 'producto de ariel'}]
    },
    'fatima123':{
        productos: [{'nombre': 'producto fatima123'}]
    },
    'magali123':{
        productos: [{'nombre': 'producto de magali123'}]
    }
}

app.get('/', (req, res) => { // devolver todos los productos
    console.log('entró a GET /')
    res.send('funciona ok!');
})

app.get('/set_cookie',function(req, res){
    var cookie_name = 'username'
    res.cookie(cookie_name , 'ariel123').send('Cookie is set');
});

app.get('/read_cookie',function(req, res){
    console.log("Cookies :  ", req.cookies);
    res.send(req.cookies);
});



function middlewareAutenticacion(req, res, next){
    console.log('Este es el middleware!');
    console.log('Usuario en la cookie:', req.cookies.username);
    if(req.cookies.username == undefined){
        res.send('No estás autenticado.')
    } else {
        next();
    }
}

// endpoint que necesita autenticación
app.get('/seguro', middlewareAutenticacion ,(req, res, next) => { // devolver todos los productos
    console.log('entró a GET /seguro')
    res.send(`Endpoint seguro. Usuario: ${req.cookies.username}`);
})

app.get('/productos',middlewareAutenticacion ,(req, res, next) => { // devolver todos los productos
    console.log('entró a GET /productos')

    let nombreUsuario = req.cookies.username;

    

    // mandarle la variable con todos los productos.
    res.send( fakeDB[ nombreUsuario ].productos );
})

/////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
