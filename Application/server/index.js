import express from "express"
import mysql from "mysql"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Ill0g1calm#",
    database:"wealth_inequality_json"
})

app.get("/", (req,res)=>{
    res.json("connected to the backend")
})

app.get("/interest_rates", (req,res)=>{
    const query = "SELECT * FROM json_data WHERE Description = 'Interest Rates'"
    db.query(query,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/wealth_data", (req,res)=>{
    const query = "SELECT * FROM json_data WHERE Description = 'Wealth Data'"
    db.query(query,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/poverty_data", (req,res)=>{
    const query = "SELECT * FROM json_data WHERE Description = 'Poverty Data'"
    db.query(query,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/comparison_data", (req,res)=>{
    const query = "SELECT * FROM json_data WHERE Description = 'Comparison Data'"
    db.query(query,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/debug", (req,res)=>{
    const query = "SELECT * FROM json_data"
    db.query(query,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8800, ()=>{
    console.log("Server started")
})