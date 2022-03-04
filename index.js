const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()

const veterinaryRouter = require("./src/routers/veterinary")
const dateRouter = require("./src/routers/date")

const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URL)

const port = process.env.PORT | 4041
app.use(express.json())
app.use(cors())

app.use(veterinaryRouter)
app.use(dateRouter)

app.listen(port, () => {
    console.log(`server running on PORT ${port}`)
})