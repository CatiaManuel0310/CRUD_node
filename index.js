const express = require('express');
const app = express();
const hbs =require('express-handlebars');
const PORT = process.env.PORT || 3000;
//Para que possamos receber os valores enviados
const bodyParser = require('body-Parser');
const session = require('express-session');

//Configurar o handlebars
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main'
})); app.set('view engine', 'hbs');

//usar middlewares para trabalhar com bodyParser
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

//Importar MODEL USUÁRIOS
const Usuario = require('./models/Usuario');



//CONFIGURAR AS SESSÕES
app.use(session({
    secret: 'CriarUmaChave',
    resave: false,
    saveUninitialized: true
}))

//O que queremos receber
app.get('/', (req, res) =>{
    if(req.session.errors){
        var arrayErros = req.session.errors;
        req.session.errors ="";
        return res.render('index', {NavActiveCad: true, error:arrayErros});
    }

    if(req.session.success){
        req.session.success = false;
        return res.render('index', {NavActiveCad: true, MsgSuccess:true});
    }
    res.render('index', {NavActiveCad: true});
})

app.get('/users', (req, res) =>{
    res.render('users', {NavActiveUsers: true});
})

app.get('/editar', (req,res) =>{
    res.render('editar');
})

//Para pegar informações do formulário
app.get----('/cad', (req, res)=>{
    var nome =req.body.nome;
    var email = req.body.email;
//Validar os campos do formulário criando um array que contem os erros do formulário
const erros =[];
//Remover os espaços em brancos que ficam antes e depois dos dados
nome = nome.trim();
email = email.trim();
//Limpar o nome de caracteres especiais(apenas letras)
nome = nome.replace(/[^A-zÀ-ú\s]/gi,'');
nome = nome.trim();


//Verificar se os campos estão vazios ou não
if (nome =='' || typeof nome == undefined || nome == null){
    erros.push({mensagem: "Esse campo deve ser preenchido!"});
}
    //Ver se o campo nome é válido
    if(!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/.test(nome)){
        erros.push({mensagem:"Nome inválido!"});
    }

//Verificar se o camp0 email está vazio
if (email =='' || typeof email == undefined || email == null){
    erros.push({mensagem: "Esse campo deve ser preenchido!"});
}
//Validar Email
if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    erros.push({mensagem:"Email inválido!"});
    // if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test
}


//Se detectar algum erro na validação feita em cima, coloca dentro duma sessão os valores que vieram desses erros
if(erros.length > 0){
  console.log(erros);
    req.session.errors = erros;
    req.session.success = false;
    return res.redirect('/');
}
//Oba!!! Agora pode salvar no banco de dados
console.log('Validação realizada com sucesso!');
req.session.session = true;
return res.redirect('/');

})



//O que queremos escutar
app.listen(PORT,() =>{
    console.log('Servidor rodando na em http://localhost:'+PORT);
})

