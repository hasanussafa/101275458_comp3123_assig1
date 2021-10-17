// Name: Kazi Hasanus Safa, Student ID: 101275458

const express = require('express');// Importing module
const fs = require("fs");
let count = 0; // Variable declare for counting 
let expr = express(); // start express application
expr.get('/', (req, res) => { // home page
    res.send('Welcome to my application!');
});

//Return individual user by id
expr.get('/user', (req, res) => { // user page
    let user_id = req.query['uid'];
    try {
        let users_data = fs.readFileSync("./users.json");// read from user.json file data
        let users = JSON.parse(users_data);
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == user_id) {
                count = 1;
               res.json(users[i]);
               console.log("\n");
            }
        }
        if (count === 0) {
        res.send(`No user found`); // if id does not match
       }
    } catch (err) { //error control
        res.send(err);
    }
});

// return all users by ascending order
expr.get('/users/all', (req, res) => { // for all user
    try {
        let users_data = fs.readFileSync("./users.json"); 
        let users = JSON.parse(users_data);
        users.sort((first_data, second_data) => {// data sorting
            if (first_data.name > second_data.name) { //compareing username
                return 1;
            } else if (first_data.name <first_data.name) {
                return -1;
            } else {
                return 0;
            }
        });
        res.json(users);
        console.log("\n");

    } catch (err) {
        res.send(err);
    }
});
expr.listen(8085, () => {
    console.log("Application is using port number 8085");
    console.log("Thank you!");
});
