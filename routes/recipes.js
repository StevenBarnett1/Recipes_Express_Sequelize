const express = require("express")
let router = express.Router()
router.use(express.urlencoded({extended:false}))
const recipesController = require("../controllers/recipesController")

router.get("/",recipesController.getRecipe)
router.post("/",recipesController.getRecipePost)
router.get("/create",recipesController.createRecipeGet)
router.post("/create",recipesController.createRecipePost)


module.exports = router
