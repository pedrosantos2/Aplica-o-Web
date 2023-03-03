const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Cliente = db.define('clientes', {
    nome: {
        type: DataTypes.STRING,
    },
    sobrenome: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    senha: {
        type: DataTypes.STRING,
    },
    endereco: {
        type: DataTypes.STRING,
    },
},{
        createdAt: false,
        updatedAt: false,

})

// Cliente.sync({force: true})

module.exports = Cliente