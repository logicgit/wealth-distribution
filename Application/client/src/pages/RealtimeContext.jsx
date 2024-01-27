// Our Home page will display wealth data

import React from "react";
import axios from "axios";

import { useEffect } from 'react'
import { useState } from 'react'

const RealtimeContext = () => {
    // Load our static from the server side and populate the variables
    const [wealthColumns, setWealthColumns] = useState([])
    const [wealthRecords, setWealthRecords] = useState([])
    const [povertyColumns, setPovertyColumns] = useState([])
    const [povertyRecords, setPovertyRecords] = useState([])

    useEffect(()=>{
        const getData = async () =>{
            try{
                // Load Wealth Data
                var res = await axios.get("http://localhost:8800/wealth_data")
                var jsonObject = JSON.parse(res.data[0].JSON);
                setWealthColumns(Object.keys(jsonObject.Wealth[0]))
                setWealthRecords(jsonObject.Wealth)

                // Load Poverty Data
                res = await axios.get("http://localhost:8800/poverty_data")
                jsonObject = JSON.parse(res.data[0].JSON);
                setPovertyColumns(Object.keys(jsonObject.Poverty))
                setPovertyRecords(jsonObject.Poverty)
            }
            catch(err){
                console.log(err)
            }        
        }
        getData()
    },[])

    return (
        <div>
            <h1>Real-time Context</h1>
            <div className="wealthDiv">
                <h2>The top 20 richest families</h2>
                <table className="wealthTable">
                    <thead>
                        <tr>
                            <th key={0}>{wealthColumns[1]}</th>
                            <th key={1}>{wealthColumns[0]}</th>
                            <th key={2}>{wealthColumns[3]}</th>
                            <th key={3}>{wealthColumns[2]} £BN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            wealthRecords.map((wealthRecord, i) =>(
                                <tr key={i}>
                                    <td>{wealthRecord.Rank}</td>
                                    <td>{wealthRecord.Name}</td>
                                    <td>{wealthRecord.Industry}</td>
                                    <td>{wealthRecord.Wealth}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div  className="sliderDiv">
            <h2></h2>

            </div>            
        </div>
    )
}

export default RealtimeContext

