const express = require("express")

const router = express.Router()
const {
    isAuthenticated
} = require('../config/auth')
//home route
router.get('/', (req, res) => {
    res.send(" server started !!.. welcome")
})

// dashboard route
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.send(" dashboard")
})


module.exports = router