const Recipe = require("../models/recipe")

exports.getRecipe = async (req,res) => {
    let recipes = await Recipe.findAll()
    let recipe
    for(let i =0;i<recipes.length;i++){
        recipe = await Recipe.findByPk(Math.round(Math.random() * (recipes.length - 1) + 1))
        if (!recipe.seen) return res.render("display", { recipe: recipe.dataValues })
    }
    let noRecipesLeft = {name: "Need More Recipes!", link: "/recipes/create", picLink:"https://dogtime.com/assets/uploads/2017/10/guilty-dog-looks-meaning-1.jpg"}
    return res.render("display",{recipe:noRecipesLeft})
}

exports.getRecipePost = async (req,res) => {
    let recipe = await Recipe.findByPk(req.body.id)
    recipe.seen = true
    recipe.save()
    res.redirect("/recipes")
}

exports.createRecipeGet = (req,res) => {
    res.render("create")
}

exports.createRecipePost = (req,res) => {
    Recipe.create({name:req.body.name,link:req.body.link,picLink:req.body.picLink}).then(recipe => res.send(recipe))
}

exports.bulkCreate = (req,res) => {
    Recipe.bulkCreate([{ name: "Calamari Crunch", link: "https://www.cookstr.com/Appetizers/Calamari-Crunch-Recipe", picLink:"https://irepo.primecp.com/2018/09/388310/calamari_crunch-2_Large600_ID-2931476.jpg?v=2931476"},
        { name: "Chicken Orzo Pilaf", link: "https://www.cookstr.com/Chicken-Recipes/Chicken-Orzo-Pilaf", picLink: "https://irepo.primecp.com/2016/03/270636/recipe-27743_Large600_ID-1540714.jpg?v=1540714" },
        { name: "Old - Fashioned Beef Stew", link: "https://www.cookstr.com/Chili-Soups-and-Stews/Old-Fashioned-Beef-Stew", picLink: "https://static01.nyt.com/images/2021/01/15/dining/15COOKING-OLD-BEEF-STEW2/15COOKING-OLD-BEEF-STEW2-articleLarge-v2.jpg"},
        { name: "Pork Picadillo Sweet Corn Tamales", link: "https://www.cookstr.com/Pork-Recipes/Pork-Picadillo-Sweet-Corn-Tamales", picLink: "https://irepo.primecp.com/2016/03/269640/recipe-24847_Large600_ID-1529663.jpg?v=1529663"},
        { name: "Mexican Mole Chili", link: "https://www.cookstr.com/Mexican-Recipes/Mexican-Mole-Chili", picLink: "https://irepo.primecp.com/2016/03/265749/recipe-9754_Large500_ID-1488584.jpg?v=1488584" }])
        .then(recipes => res.send(recipes))
}
