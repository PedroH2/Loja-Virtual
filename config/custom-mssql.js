var mssql = require ('mssql');

const config = {
    user: '*******',
    password: '*********',
    server: 'regulus.cotuca.unicamp.br',
    database: 'BD19381'
};

mssql.connect(config)
     .then(conexao => global.conexao = conexao)
     .catch(erro => console.log(erro));

module.exports = mssql;
