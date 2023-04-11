// IMPORT DEPENDENCIES
const express = require("express")
const bodyParser = require("body-parser")
const sequelize = require('./utils/database')


const port = process.env.PORT || 3030
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    next();
})

// TEST ROUTE
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// CRUD ROUTES
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));

// HANDLE ERRORS
app.use((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({ message: message });
})


// SYNC DATABASE
sequelize.sync({force:true})
    .then(() => {
        console.log('Database Connected!')
        app.listen(port, () => {
            console.log(`server running on port: ${port} 
                live at: http://localhost:${port}`
            );
        })
    })
.catch(e => console.error(e))