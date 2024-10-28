const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const superadminRoutes = require("./routes/superadminRoutes");
const orderRoutes = require('./routes/userRoutes');  // Correct route

require("dotenv").config();
const cors = require("cors");

// const userRoutes = require('./routes/userRoutes');
// const deliveryRoutes = require('./routes/deliveryRoutes');

const managerRoutes = require("./routes/managerRoutes");



const app = express();
const PORT = process.env.PORT;

// Connect to the database
require("./config/db").connect();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 600000 },
  })
);


app.use("/auth", authRoutes);
app.use("/superadmin", superadminRoutes);
app.use("/manager", managerRoutes);
app.use('/api', orderRoutes);  // Using the correct route


// Start the server after connecting to the database
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
