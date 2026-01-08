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
        await connection.execute('INSERT INTO defaultdb.zoo (animal_name, animal_pic, animal_description) VALUES (?,?,?)',[animal_name,animal_pic,animal_description]);
        res.status(201).json({message: 'Animal'+animal_name+' added successfully.'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message:'Server error - could not add this animal'+animal_name});
    }

});

//update route using post function
app.post('/updateanimal', async (req, res) => {
    const { id, animal_name, animal_pic, animal_description } = req.body;

    try {
        let connection = await mysql.createConnection(dbConfig);

        const [result] = await connection.execute(
            `UPDATE defaultdb.zoo 
             SET animal_name = ?, animal_pic = ?, animal_description = ?
             WHERE idzoo = ?`,
            [animal_name, animal_pic, animal_description, idzoo]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        res.json({ message: 'Animal with ID' +{idzoo}+ 'updated successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - could not update animal' });
    }
});








//delete using get function
// DELETE animal (GET)
app.get('/deleteanimal/:idzoo', async (req, res) => {
    const { idzoo } = req.params;

    try {
        let connection = await mysql.createConnection(dbConfig);

        const [result] = await connection.execute(
            'DELETE FROM defaultdb.zoo WHERE idzoo = ?',
            [idzoo]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        res.json({ message: 'Animal with ID' +{idzoo}+ 'deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - could not delete animal' });
    }
});


//delete using post function
app.post('/deleteanimal/:idzoo', async (req, res) => {
    const { idzoo } = req.params;

    try {
        const connection = await mysql.createConnection(dbConfig);

        const [result] = await connection.execute(
            'DELETE FROM zoo WHERE idzoo = ?',
            [idzoo]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Animal not found'
            });
        }

        res.json({
            message: 'Animal with zooid' +{idzoo}+ 'deleted successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error - could not delete animal'
        });
    }
});

