const express  = require("express")

const router = express.Router()

//home route
router.get('/', (req,res)=> {
    res.send(" server started !!.. welcome")
})

// dashboard route
router.get('/dashboard', (req,res)=> {
    res.send(" dashboard")
})


module.exports = router