"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const index_1 = require("./src/routes/index");
const app = express();
// env setup
require('dotenv').config();
// json setup
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// enable cors
app.use(cors());
// routes
app.use('/api/v1', index_1.default.api);
// routes(app, '/api/v1');
// Setting up server
const PORT = process.env.PORT;
app.get('/', (req, res) => res.send(`Server running on port ${PORT}`));
// Enable much better reporting for unhandled promise rejections.
process.on('unhandledRejection', e => {
    console.error(`${Date.now()} - unhandledRejection - index.js`);
    console.error(e);
    process.exit(0);
});
// Enable better reporting on warnings.
process.on('warning', e => console.error(e));
// Enable better reporting on uncaught exceptions.
process.on('uncaughtException', e => {
    console.error(`${Date.now()} - uncaughtException - index.js`);
    console.error(e);
    process.exit(0);
});
// mongoose connection
const databaseUri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.jnmms.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose.connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log('Database Connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
process.on('SIGINT', () => {
    console.log('Received interrupt signal. Closing MongoDB connections...');
    mongoose.connection.close();
});
