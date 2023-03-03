const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const sequelize = require('sequelize'); 
const bd = require('./db/conn')
const Produto = require('./models/Produto');
const Cliente = require('./models/Cliente');



const PORT = 3000;



//TEMPLATE
app.engine("handlebars", handlebars.engine({defaultLayout: "main"}))
app.set('view engine', 'handlebars');
//BODY PARSER
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//MIDLEWARE
app.use(express.static('public'))


//ROTAS
app.get('/', (req,res) => {
    res.render('pages/home')
})

app.post('/login' , async (req, res) => {
    const email = req.body.email
    const senha = req.body.senha
    const pesq = await Cliente.findOne({raw: true, where: {email: email, senha: senha}})
    
    if(pesq === null){
        console.log('cliente não cadastrado')
        res.redirect('/login')
    }else if((pesq.email === email)&&(pesq.senha === senha)){
        console.log('cliente cadastrado')
        res.redirect('/produtos')
    }  
})

app.get('/login', (req,res) => {
    res.render('pages/logar')
})

app.post('/cadastrar', (req,res) => {
    Cliente.create({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        email: req.body.email,
        senha: req.body.senha,
        endereco: req.body.endereco
     }).then(() => {
         res.redirect('/produtos')
     }).catch((err) => {
         console.log("deu ruim!" + err)
     })
})


app.get('/cadastrar', (req,res) => {
    res.render('pages/cadastro')
})

app.post('/produtos', async (req,res) => {
    Produto.create({
       nome: req.body.produto,
       preco: req.body.preco,
       categoria: req.body.cate,
       descricao: req.body.desc
    }).then(() => {
        res.redirect('/produtos')
    }).catch((err) => {
        console.log("deu ruim!" + err)
    })
})

app.get('/deletar/:id', (req, res) => {
    Produto.destroy({where: {id: req.params.id}}).then(() => {
        res.redirect("/produtos")
    }).catch(err => {
        console.log("Deu ruim!" + err)
    })
})

app.get('/produtos', async (req,res) => {
    const produto = await Produto.findAll({raw: true})
    res.render('pages/produto', {valores:produto})
})

app.post('/editar', async (req,res) => {
   Produto.findOne({_id: req.body.id}).then((produto) => {

    produto.nome = req.body.produto
    produto.preco = req.body.preco
    produto.categoria = req.body.cate
    produto.descricao = req.body.desc

    produto.save().then(() => {
        res.redirect('/produtos')
    }).catch((err) => {
        console.log("Deu ruim!" + err)
    })


   }).catch((err) => {
    console.log("Deu ruim!" + err)
   })
})

app.get('/editar/:id', async (req,res) => {
    await Produto.findOne({where: {id:req.params.id}, raw:true, nest:true}).then((produtos) => {
        res.render('pages/editar', {produto: produtos})
    }).catch((err) => {
        console.log("Deu ruim!" + err)
    })
    
})


app.get('/carrinho/:id', async (req,res) => {
    await Produto.findOne({where: {id:req.params.id}, raw:true, nest:true}).then((produtos) => {
        res.render('pages/meu_carrinho', {produto: produtos})
    }).catch((err) => {
        console.log("Deu ruim!" + err)
    })
    
 
})

app.get('/carrinho', (req,res) => {
    res.render('pages/meu_carrinho')
})

app.get('/profile', (req,res) => {
    res.render('pages/perfil')
})





app.listen(PORT, () => {
    console.log('Servidor rodando em:' + PORT)
})