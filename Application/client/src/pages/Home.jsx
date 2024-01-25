// Our Home page will display wealth data

import React from "react";
import axios from "axios";
import { useEffect } from 'react'
import { useState } from 'react'

const Home = () => {
    // Load our static from the server side and populate the variables
    const [interestRates, setInterestRateData] = useState([])
    const [wealthData, setWealthData] = useState([])
    const [povertyData, setPovertyData] = useState([])
    const [comparisonData, setComparisonData] = useState([])

    useEffect(()=>{
        const getData = async () =>{
            try{
                var res = await axios.get("http://localhost:8800/interest_rates")
                setInterestRateData(res.data[0].JSON)

                res = await axios.get("http://localhost:8800/wealth_data")
                setWealthData(res.data[0].JSON)

                res = await axios.get("http://localhost:8800/poverty_data")
                setPovertyData(res.data[0].JSON) 

                res = await axios.get("http://localhost:8800/comparison_data")
                setComparisonData(res.data[0].JSON)                    
            }
            catch(err){
                console.log(err)
            }        
        }
        getData()
    },[])

    return (
        <div>
            <h1>Home page</h1>
            <div className="interestRates">
            <h2>Sending interest rate data request ...</h2>
                <h3>{interestRates}</h3>
            </div>            
            <div className="wealthData">
            <h2>Sending wealth data request ...</h2>
                <h3>{wealthData}</h3>
            </div>
            <div className="povertyData">
            <h2>Sending poverty data request ...</h2>
                <h3>{povertyData}</h3>
            </div>
            <div className="comparisonData">
            <h2>Sending comparison data request ...</h2>
                <h3>{comparisonData}</h3>
            </div>                        
        </div>
    )
}

export default Home

