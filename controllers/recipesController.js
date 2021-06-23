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
