const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('produtos', {
    nome: {
        type: DataTypes.STRING,
    },
    preco: {
        type: DataTypes.STRING,
    },
    categoria: {
        type: DataTypes.STRING,
    },
    descricao: {
        type: DataTypes.STRING,
    },
    ranking: {
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,

})

// Produto.sync({force: true})

module.exports = Produto