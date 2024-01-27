// Our Home page will display wealth data

import React from "react";
import axios from "axios";

import { useEffect } from 'react'
import { useState } from 'react'

const WealthRedistribution = () => {
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
            <h1>Wealth Redistribution</h1>
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
            <h2>Redistribution</h2>
                <table className="sliderTable">
                    <thead>
                        <tr>
                            <th key={0}>
                                <a href="https://www.webcodzing.com/" target="_blank"> 
                                    <button>5%</button> 
                                </a>
                            </th>
                            <th key={1}>
                                <a href="https://www.webcodzing.com/" target="_blank"> 
                                    <button>10%</button> 
                                </a>
                            </th>
                            <th key={2}>
                                <a href="https://www.webcodzing.com/" target="_blank"> 
                                    <button>15%</button> 
                                </a>
                            </th>
                            <th key={3}>
                                <a href="https://www.webcodzing.com/" target="_blank"> 
                                    <button>25%</button> 
                                </a>
                            </th>
                            <th key={4}>
                                <a href="https://www.webcodzing.com/" target="_blank"> 
                                    <button>50%</button> 
                                </a>
                            </th>                                                                                    
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td>                                
                                    2.9048
                                </td>
                                <td>                                
                                </td>
                                <td>                                
                                </td>
                                <td>                                
                                </td>
                                <td>                                
                                    126578
                                </td>                                                                                                
                            </tr>
                    </tbody>
                </table>

            </div>            
            <div  className="povertyDiv">
                <h2>People living in poverty</h2>
                <table className="povertyTable">
                    <thead>
                        <tr>
                            <th key={0}>Category</th>
                            <th key={1}>Count #</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td>{povertyRecords.Children}</td>
                                <td>Children</td>
                            </tr>
                            <tr>
                                <td>{povertyRecords.Adults}</td>
                                <td>Adults</td>
                            </tr>
                            <tr>
                                <td>{povertyRecords.Pensioners}</td>
                                <td>Pensioners</td>
                            </tr>                            
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WealthRedistribution

