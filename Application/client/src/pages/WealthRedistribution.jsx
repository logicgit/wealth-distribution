// Our Home page will display wealth data

import React from "react";
import axios from "axios";

import { useEffect } from 'react'
import { useState } from 'react'

import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import { adjustValue } from "../engine/engine";
import { reduceValue } from "../engine/engine";
import { reducedPovertyNumber } from "../engine/engine";

// Load our static from the server side and populate the variables
const WealthRedistribution = () => {
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

    // Slider has changed
    // Write the % to the table
    // Call the CalcEngine to get updated wealth data
    // Call the CalcEngine to get updated poverty data
    const sliderChanged = (value) => {
        // Get our cell and set the %
        var sliderTable = document.getElementsByClassName("sliderTable")[0];
        let percentCells = sliderTable.rows[1].cells;
        percentCells[1].innerHTML = value + "%";

        // Loop around the wealth columns, call adjustValue to reduce by the percentage
        // and set the corresponding value in our redistribution table
        var wealthTable = document.getElementsByClassName("wealthTable")[0];
        var wealthToShare = 0
        for (var i = 1, row; row = wealthTable.rows[i]; i++) {
            let wealthCells = row.cells;
            let wealthValue = wealthCells[3].innerHTML
            sliderTable.rows[i].cells[0].innerHTML = reduceValue(wealthValue, value);

            // Store the total wealth shared for later
            if (i == 1) {
                wealthToShare = wealthValue;
            }
        }

        // Loop around the poverty columns, call adjustValue to reduce by the percentage
        // and set the corresponding value in our redistribution table
          var povertyTable = document.getElementsByClassName("povertyTable")[0];
          var totalPovertyCount = 0;
          for (var i = 1, row; row = povertyTable.rows[i]; i++) {
            let povertyCells = row.cells;
            let povertyCount = povertyCells[0].innerHTML;

            // Store the total poverty count for later
            if (i == 1) {
                totalPovertyCount = povertyCount
            } 

            let adjustedPovertyCount = povertyCount - reducedPovertyNumber(totalPovertyCount, povertyCount, wealthToShare, value); 
            sliderTable.rows[i].cells[2].innerHTML = adjustedPovertyCount;       
        }     
    };

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
            <h2>&#xbb;&#xbb;&#xbb;&#xbb;  Redistribute  &#xbb;&#xbb;&#xbb;&#xbb;</h2>
                <table className="sliderTable">
                    <thead>
                        <tr>
                            <th key={0}>
                                Adjusted £BN
                            </th>
                            <th key={1}>
                                0&emsp;&emsp;&emsp;&emsp;&emsp;100%
                            <Slider
                                    onChangeComplete={sliderChanged}
                            />
                            </th>
                            <th key={2}>
                                Adjusted #
                            </th>                                                                                 
                        </tr>
                    </thead>
                    <tbody>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td>0</td></tr>                            
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
                                <td>{povertyRecords.Total}</td>
                                <td>Total</td>
                            </tr>                        
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

