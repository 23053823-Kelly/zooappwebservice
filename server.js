// include the required packages
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const port = 3000;

//database config info
const dbConfig ={
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit:100,
    queueLimit:0,

};

//initialize Express app
const app = express();
//help app to read JSON
app.use(express.json());

//start the server
app.listen(port, () => {
    console.log('Server running on port', port);
});

//Example Route: Get all cards
app.get('/allzooinfo',async (req,res)=>{
    try {
        let connection = await mysql.createConnection(dbConfig);
        const[rows] = await connection.execute('SELECT * FROM defaultdb.zoo');
        res.json(rows)
    } catch (err) {
        console.log(err);
        res.status(500).json({message:'Server error for all the animal infomation'});
    }
});

//Example route: create a new card
app.post('/addanimal',async (req,res)=>{
    const {animal_name, animal_pic ,animal_description} =req.body;
    try {
        let connection = await mysql.createConnection(dbConfig);
        await connection.execute('INSERT INTO zoo (animal_name, animal_pic,animal_description) VALUES (?,?,?)',[animal_name,anmial_pic,animal_description]);
        res.status(201).json({message: 'Animal'+animal_name+' added successfully.'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message:'Server error - could not add this animal'+animal_name});
    }

});

