const express = require("express")
const app = express()
const port = 3030


app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(port, () => {
    console.log(`server running on port: ${port} live at : http://localhost:${port}`)
})