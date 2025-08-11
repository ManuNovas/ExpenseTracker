const {connect} = require('mongoose');
const connectionString = process.env.MONGODB_URI;
const databaseSeeder = require('../seeders/databaseSeeder');

function connectDB() {
    connect(connectionString).then(() => {
        console.log("Connected to MongoDB");
        databaseSeeder();
    }).catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });
}

module.exports = connectDB;
