var mssql = require ('mssql');

const config = {
    user: 'BD19381',
    password: 'megaware2010',
    server: 'regulus.cotuca.unicamp.br',
    database: 'BD19381'
};

mssql.connect(config)
     .then(conexao => global.conexao = conexao)
     .catch(erro => console.log(erro));

module.exports = mssql;