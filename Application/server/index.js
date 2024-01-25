// This is our main entry point
// Used to call our WebScraper on start up 
// Used to handle requests from client

import express from "express"
import mysql from "mysql"
import cors from "cors"
import { scrapeInterestRateData } from "./WebScraper.js"
import { getData } from "./DBHandler.js";

// Scrape the web to get a refresh of our static data
const interestRateJSON = scrapeInterestRateData();  

// Start our server
const app = express()

app.use(express.json())
app.use(cors())

// Get our DB connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Ill0g1calm#",
    database:"wealth_inequality_json"
})

// Handle requests to /
app.get("/", (req,res)=>{
    console.log("request received")
})

async function asyncDBCall(description)  {
    console.log("Request received: " + description)
    var returnValue

    switch (description) {
        case "webscrape":
            returnValue = await scrapeInterestRateData()
            console.log("Return Value: " + returnValue)
            return returnValue
    }
}

//Handle a webscrape request
app.get("/webscrape", (req,res)=>{
    try {     
        const returnValue = asyncDBCall("webscrape")
        console.log (" value: " + returnValue)
        if (returnValue != null) return(res.json("Success scraping and persisting interest rate: " + returnValue))
        return res.json("asyncDBCall error")
    }
    catch (error) {
        console.error(error)
    }     
})

// Handle an interest rates request
app.get("/interest_rates", (req,res)=>{
    console.log ("Received interest rates request")
    try {     
        const query = "SELECT JSON FROM json_data WHERE description = 'Interest Rates'"
        
        db.query(query,(err,data)=>{
            if (err) return res.json(err)
            console.log("DQ Query successful, sending back response")
            return res.json(data)
        })
    }
    catch (error) {
        console.error(error)
    }    
})

// Handle a wealth data request
app.get("/wealth_data", (req,res)=>{
    console.log ("Received wealth data request")    
    try {     
        const query = "SELECT JSON FROM json_data WHERE description = 'Wealth Data'"
        
        db.query(query,(err,data)=>{
            if (err) return res.json(err)
            console.log("DQ Query successful, sending back response")
            return res.json(data)
        })
    }
    catch (error) {
        console.error(error)
    }    
})

// Handle a poverty data request
app.get("/poverty_data", (req,res)=>{
    console.log ("Received poverty data request")    

    try {     
        const query = "SELECT JSON FROM json_data WHERE description = 'Poverty Data'"
        
        db.query(query,(err,data)=>{
            if (err) return res.json(err)
            console.log("DQ Query successful, sending back response")
            return res.json(data)
        })
    }
    catch (error) {
        console.error(error)
    }    
})

// Handle a comparison data request
app.get("/comparison_data", (req,res)=>{
    console.log ("Received comparison data request")    

    try {     
        const query = "SELECT JSON FROM json_data WHERE description = 'Comparison Data'"
        
        db.query(query,(err,data)=>{
            if (err) return res.json(err)
            console.log("DQ Query successful, sending back response")
            return res.json(data)
        })
    }
    catch (error) {
        console.error(error)
    }   
})

app.listen(8800, ()=>{
    console.log("Server started")
})