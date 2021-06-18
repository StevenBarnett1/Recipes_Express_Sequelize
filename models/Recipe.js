let Sequelize = require("sequelize")
let sequelize = new Sequelize({ dialect: "sqlite", storage: "./data/database" })

const Recipe = sequelize.define("Recipe",{
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    name:{allowNull:false,type:Sequelize.STRING},
    link:{allowNull:false,type:Sequelize.TEXT},
    picLink:Sequelize.STRING,
    seen:{
        defaultValue:false,
        type:Boolean
    }
},{timestamps:false})

Recipe.sync({ force: true })

module.exports = Recipe
