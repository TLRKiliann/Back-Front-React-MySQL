const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'usr_name',
    host: '192.168.XX.XX',
    port: 3306,
    password: 'your_passwd',
    database: 'name_db'
})

app.post('/create', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const birth = req.body.birth;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    db.query('INSERT INTO memberpark (firstname, lastname, birth, username, email, password) VALUES (?,?,?,?,?,?)',
        [firstname, lastname, birth, username, email, password], (err, result) => {
            if (err) {
                console.log(err, result)
            }
            else {
                res.send("Values inserted !")
            }
        })
});

app.get('/allMembers', (req,res) => {
    db.query('SELECT * from memberpark', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    }) 
})

app.put('/update', (req, res) => {
    const order_id = req.body.order_id;
    const username = req.body.username;

    db.query('UPDATE memberpark SET username=? WHERE order_id=?',
        [username, order_id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete('/delete/:order_id', (req, res) => {
    const order_id = req.params.order_id;

    db.query('DELETE FROM memberpark WHERE order_id=?', order_id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.listen(3001, () => {
    console.log("Server is running on port 3001 !");
});
