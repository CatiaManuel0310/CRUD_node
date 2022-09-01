
//conecção com BANCO DE DADOS(ORM- SEQUELIZE)

const Sequelize = require('sequelize');
const sequelize = Sequelize('banco', 'usuário', 
'senha', {
    host:"127.0.0.1",
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    logging: false
})

//const sequelize = Sequelize('nome do banco', 'root', 
//'senha', {}


//preciso baixar o Xampp para guardar os dados no banco de dados 

sequelize.authenticate().then(function(){
    console.log('Conectado no banco de dados com secesso!');
}).catch(function(err){
    console.log('Falha ao se conectar: '+err);
})

//No terminal digite: node ./models/db.js 



module.exports = {Sequelize, sequelize}