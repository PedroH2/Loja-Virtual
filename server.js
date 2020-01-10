        const express = require ('express');

        const expressLayouts = require('express-ejs-layouts')

        const bodyParser = require('body-parser');

        const app = express();

        const porta  = 3333;

        app.set("view engine", "ejs");

        app.use(expressLayouts);

        app.use(bodyParser.urlencoded({extended: true}));

        app.use(express.static(__dirname + '/public'));

        const conexao = require('./config/custom-mssql');

        app.get('/', function(req, res){

            var requisicao = new conexao.Request();

            requisicao.query("Select top 4 * from Viagens",
                function(codErro, RecordSet){
                    if(codErro)
                        console.log("erro no banco de dados"+codErro);
                    res.render("pages/home",
                        { Viagens: RecordSet["recordset"]}
                );
            });
        })

        app.get('/viagem/:id_viag?', function (req, res) {

            console.log("req:" + req.params.id_viag);
            var requisicao = new conexao.Request();
            var Sqlconnection = "select * from Viagens ";
                Sqlconnection+=" where id_viag=" + req.params.id_viag;


            requisicao.query(Sqlconnection,
            function (codErro, RecordSet){
                if (codErro) 
                    console.log("Erro no Banco de Dados: " + codErro);
                else
                    res.render('pages/viagem',
                        { Viagens: RecordSet["recordset"] }
                );  
            })
        })

        app.get('/viagem/compra/:id/:idH', function (req, res) {

            var id_viag= request.params.id;
            var nome_local= request.params.idH;

            global.Carrinho = global.Carrinho  +
                            "{id_viag:"+id_viag+
                            ",nome_local: "+nome_local+"}";

        var carrinho = "["+global.Carrinho+"]";
        res.render('pages/lista', {Carrinho:carrinho});                     

        })    
        //carrinho
        app.get('/viagem/Carrinho/:id?', function (request, response) {
            var strSql = "select * from jogos where id in (select id_produto from carrinho where id ="+ request.params.id+"))";
        
                requisicao.query(strSql,
                    function (codErro, RecordSet) {
                        if (codErro)
                            console.log("Erro no Banco de Dados: " + codErro);
                        else
                            response.render("paginas/jogo", {
                                listaJogos: RecordSet["recordset"]
                            });
            });
        
        });
        


        app.get('/contato', function (req, res) {
            res.render('pages/contato')
        })

        app.post('/contato', function (req, res ){

            var user = [
                    { "nome":req.body.txtNome,
                    "email":req.body.txtEmail,
                    "msg":req.body.txtMensagem
                }
                ]

            res.render("pages/respContato", 
                {contato:user})
            
        })

        app.get('/sobre', function (req, res) {
            // criando um "vetor" de nome users
            var users = [
                        {
                            nome: "Pedro henrique Soares dos Santos",
                            email: "pedroo._santos@hotmail.com",
                            avatar: 'https://avatars1.githubusercontent.com/u/49794364?s=400&u=183f48293eeb9c785caa6c49a7962b40fad2c8ea&v=4',
                            github: "https://github.com/PedroH2",
                        },
                        {
                            nome: "Diego Fernandes",
                            email: "diego.schell.f@gmail.com",
                            avatar: "https://avatars0.githubusercontent.com/u/2254731?s=460&v=4",
                            github: "https://github.com/diego3g",
                        },
                        {
                            nome: "Gabriel Froes",
                            email: "g.froes@gmail.com",
                            avatar: "https://avatars1.githubusercontent.com/u/19231904?s=460&v=4",
                            github: "https://github.com/gabrielfroes",
                        }
                
            
                    ]    
            res.render("pages/sobremim", {
                usuarios: users
            })
            }
        )

            app.get('/historia', function (req, res) {
                var user = [
                            {
                                nome: "Pedro Henrique Soares dos Santos",
                                avatar: 'https://avatars1.githubusercontent.com/u/49794364?s=400&u=183f48293eeb9c785caa6c49a7962b40fad2c8ea&v=4',
                                github: "https://api.github.com/users/pedroH2",
                                
                            }
                    
                        
                        ]    
                res.render("pages/historia", {
                    usuarios: user
                })
            })
            
        app.listen(porta, function (req, res) {
            console.log("Server active at localhost:" + porta)
        })