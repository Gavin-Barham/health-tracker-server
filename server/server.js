const express = require("express")
const { Sequelize, sequelize } = require('../database/models')

// import routes
const devRoute = require('./routes/dev')
const app = express()
const port = process.env.PORT || 3030



const connectDB = async () => {
    console.log('Connecting...')

    try {
        await sequelize.authenticate();
        console.log('Connection Successful Established.')
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
};

(async () => {
    await connectDB()
    try {
        app.listen(port, () => {
            console.log(`server running on port: ${port} 
                live at: http://localhost:${port}`
                );
        })
    } catch(e) {
        console.error(e);
    }
})();


app.get('/', devRoute);

app.get("/blog", (req, res) => {
    res.send("blog it up baby");
});
