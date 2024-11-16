const express = require("express");
const app = express();
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 8000;

const corsOptions = { origin: 'http://localhost:3000',
     optionsSuccessStatus: 200, };

app.use(cors(corsOptions));

app.use(express.json());

// import routes for API
const ProductRoutes = require("./Routes/route");

//mount the API routes
app.use("/api/v1",ProductRoutes);

const DBconnect = require("./config/DB");
DBconnect();

app.listen(PORT,()=>{
    console.log(`Server listening on port no. ${PORT}`);
});

app.get('/', (req, res) => {
    res.status("200").json({
        message : "Home route",
        success: true,
    })
})