// IMPORT DEPENDENCIES
const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')

// IMPORT DATABASE
const sequelize = require('./utils/database')

// IMPORT MIDDLEWARE
const validateAuthToken = require('./middleware/validateJWT');
const handleErrors = require('./middleware/handleErrors');

// IMPORT ROUTES
const handleAuthRoutes = require('./routes/auth')
const handleUsersRoutes = require('./routes/users')


const port = process.env.PORT || 3030
const app = express()

// PARSE REUESTS AND COOKIES / SET RESPONSE HEADER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    next();
})
app.use(cookieParser());


// CRUD ROUTES //

// OPEN ENDPOINTS
app.use('/auth', handleAuthRoutes);

// RESTRICTED ENDPOINTS
app.use(validateAuthToken);
app.use('/users', handleUsersRoutes);

// HANDLE ERRORS
app.use(handleErrors);

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