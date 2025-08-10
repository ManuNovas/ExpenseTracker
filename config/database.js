const {connect} = require('mongoose');
const connectionString = process.env.MONGODB_URI;

function connectDB() {
    connect(connectionString).then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });
}

module.exports = connectDB;
