/* DBHandler.js: Javascript function that will take update the value in our DB for the given key.
Deliberately generic and unaware of the contents of the DB*/

import mysql from "mysql"

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Ill0g1calm#",
    database:"wealth_inequality_json"
})


// Write the key/value pair to the DB
export function updateDB(key, value) {
    try {
        const query = "UPDATE json_data SET JSON = '" + value +  "' WHERE Description = '" + key + "'";
        console.log("Db Update SQL: " + query);
        db.query(query,(err,data)=>{
            if (err) console.log(err);
            return console.log("Success");
        })
    } catch (error) {
        console.log("Db Update Error: " + error);
    }
}

// Return the JSON for the given description
export function getData(description)
{
    try {
        const query = "SELECT * FROM json_data WHERE Description = '" + description + "'";
        console.log("getData SQL: " + query);
        var returnData;
        db.query(query,(err,data)=>{
            if (err) console.log("DB Error: " + err)
            console.log("data: " + data);
            return data;
        })
        console.log("returnData: " + returnData);
        return returnData;
    } catch (error) {
        console.log("Db fetch Error: " + error);
    }
    return null;
}
