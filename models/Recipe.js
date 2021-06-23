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

    Recipe.sync()
    
    let createAndResetSeen = async ()=>{
        let recipes = await Recipe.findAll()
        if (!recipes.length) {
            Recipe.bulkCreate([{ name: "Calamari Crunch", link: "https://www.cookstr.com/Appetizers/Calamari-Crunch-Recipe", picLink: "https://irepo.primecp.com/2018/09/388310/calamari_crunch-2_Large600_ID-2931476.jpg?v=2931476" },
            { name: "Chicken Orzo Pilaf", link: "https://www.cookstr.com/Chicken-Recipes/Chicken-Orzo-Pilaf", picLink: "https://irepo.primecp.com/2016/03/270636/recipe-27743_Large600_ID-1540714.jpg?v=1540714" },
            { name: "Old - Fashioned Beef Stew", link: "https://www.cookstr.com/Chili-Soups-and-Stews/Old-Fashioned-Beef-Stew", picLink: "https://static01.nyt.com/images/2021/01/15/dining/15COOKING-OLD-BEEF-STEW2/15COOKING-OLD-BEEF-STEW2-articleLarge-v2.jpg" },
            { name: "Pork Picadillo Sweet Corn Tamales", link: "https://www.cookstr.com/Pork-Recipes/Pork-Picadillo-Sweet-Corn-Tamales", picLink: "https://irepo.primecp.com/2016/03/269640/recipe-24847_Large600_ID-1529663.jpg?v=1529663" },
            { name: "Mexican Mole Chili", link: "https://www.cookstr.com/Mexican-Recipes/Mexican-Mole-Chili", picLink: "https://irepo.primecp.com/2016/03/265749/recipe-9754_Large500_ID-1488584.jpg?v=1488584" }])
        }
        let seen = await Recipe.findAll({ where: { seen: true } })
            for (recipe of seen) {
                recipe.seen = false
                recipe.save()
            }
    }
    createAndResetSeen()



module.exports = Recipe
