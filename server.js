let express = require("express")
let app = express()
const path = require("path")
const port = 3000
const recipesRouter = require("./routes/recipes")

app.use(express.urlencoded({extended:false}))
app.use("/recipes",recipesRouter)
app.use("/public",express.static(path.join(__dirname,"static")))
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")










app.listen(port, console.log(`port is up at ${port}`))
