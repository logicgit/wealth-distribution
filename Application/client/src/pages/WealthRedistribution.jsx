// Our Home page will display wealth data

import React from "react";
import axios from "axios";

import { useEffect } from 'react'
import { useState } from 'react'

import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import { reduceValue } from "../engine/engine";
import { reducedValue } from "../engine/engine";
import { reducePovertyNumber } from "../engine/engine";
import { calculatePercentageChange } from "../engine/engine";

// Load our static from the server side and populate the variables
const WealthRedistribution = () => {
    const [wealthColumns, setWealthColumns] = useState([])
    const [wealthRecords, setWealthRecords] = useState([])
    const [povertyRecords, setPovertyRecords] = useState([])
    const [interestRates, setInterestRateData] = useState([])

    useEffect(()=>{
        const getData = async () =>{
            try{
                // Load Wealth Data
                var res = await axios.get("http://localhost:8800/wealth_data")
                var jsonObject = JSON.parse(res.data[0].JSON);
                setWealthColumns(Object.keys(jsonObject.Wealth[0]));
                setWealthRecords(jsonObject.Wealth);

                // Load Poverty Data
                res = await axios.get("http://localhost:8800/poverty_data")
                jsonObject = JSON.parse(res.data[0].JSON);
                setPovertyRecords(jsonObject.Poverty);

                // Load Interest rate data
                res = await axios.get("http://localhost:8800/interest_rates")
                setInterestRateData(res.data[0].JSON)
            }
            catch(err){
                console.log(err)
            }        
        }
        getData()
        document.getElementById("explanationString").innerHTML = explanationString;

    },[])

    // Build up the string that explains what's happened
    var explanationString = "The total wealth of the country's richest 20 families is £290.48 billion. The total number of people in poverty is 15.4 million."

    // Slider has changed
    // Write the % to the table
    // Call the CalcEngine to get updated wealth data
    // Call the CalcEngine to get updated poverty data
    const sliderChanged = (value) => {
        try {
            // Get our cell and set the %
            var sliderTable = document.getElementsByClassName("sliderTable")[0];
            let percentCells = sliderTable.rows[1].cells;
            percentCells[1].innerHTML = value + "%";

            // Loop around the wealth columns, call adjustValue to reduce by the percentage
            // and set the corresponding value in our redistribution table
            var wealthTable = document.getElementsByClassName("wealthTable")[0];
            var newTotalWealth = 0
            var wealthToShare = 0
            var totalReducedValue = 0
            for (var i = 1, row; row = wealthTable.rows[i]; i++) {
                let wealthCells = row.cells;
                let wealthValue = wealthCells[3].innerHTML
                let adjustedWealth = reduceValue(wealthValue, value);
                sliderTable.rows[i].cells[0].innerHTML = adjustedWealth;

                // Store the total wealth shared for later
                if (i == 1) {
                    wealthToShare = wealthValue;
                    newTotalWealth = adjustedWealth;
                    totalReducedValue = reducedValue(wealthValue, value);
                }
            }

            // Loop around the poverty columns, call adjustValue to reduce by the percentage
            // and set the corresponding value in our redistribution table
            var povertyTable = document.getElementsByClassName("povertyTable")[0];
            var totalPovertyCount = 0;
            var newTotalPovertyCount = 0;
            for (var i = 1, row; row = povertyTable.rows[i]; i++) {
                let povertyCells = row.cells;
                let povertyCount = povertyCells[0].innerHTML;

                // Store the total poverty count for later
                if (i == 1) {
                    totalPovertyCount = parseInt(povertyCount);
                } 

                // Reduce and set the poverty
                let adjustedPovertyCount = reducePovertyNumber(totalPovertyCount, povertyCount, wealthToShare, value); 
                sliderTable.rows[i].cells[4].innerHTML = adjustedPovertyCount.toLocaleString();      
                
                // Store the new total poverty count for later
                if (i == 1) {
                    newTotalPovertyCount = (totalPovertyCount - adjustedPovertyCount);
                }             

                // Set the % change
                let adjustedPovertyPercentage = calculatePercentageChange(povertyCount, (povertyCount-adjustedPovertyCount));
                sliderTable.rows[1].cells[3].innerHTML = adjustedPovertyPercentage;  

                // Update the explanation string
                if (adjustedPovertyPercentage == 0)
                {
                    explanationString = "The total wealth of the country's richest 20 families is £ " + wealthToShare + " billion. The total number of people in poverty is " + totalPovertyCount.toLocaleString() + "."
                    document.getElementById("explanationString").style.color = "red";
                }   
                else if (adjustedPovertyPercentage == 100)
                {
                    explanationString = "Congratulations! You've just eradicated poverty in the UK. By redistributing 53% of the wealth from the super-rich to the poor you remove " + totalPovertyCount.toLocaleString() + " from poverty and the 20th wealthiest family in the country still has nearly £4 billion."
                    document.getElementById("explanationString").style.color = "green";
                }   
                else
                {
                    explanationString = "You've resdistributed £" + totalReducedValue + " billon (" + value + "%) from the super-rich to the poor. This has moved " + newTotalPovertyCount.toLocaleString() + " people (" + adjustedPovertyPercentage + ")% out of poverty."
                    document.getElementById("explanationString").style.color = "orange";
                }

                document.getElementById("explanationString").innerHTML = explanationString;
            }     
        } catch (error) {
            
        }
             
    };

    return (
        <div>
            <h1>Wealth Redistribution</h1>
            <p id="explanationString"></p>
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
                            <th>%</th>
                            <th key={1}>                                
                            <Slider
                                    onChangeComplete={sliderChanged}
                            />
                            </th>
                            <th>%</th>                            
                            <th key={2}>
                                Adjusted #
                            </th>                                                                                 
                        </tr>
                    </thead>
                    <tbody>
                            <tr><td>0.0</td><td>0</td><td></td><td>0</td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td></td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td></td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td></td><td></td><td>0</td></tr>
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>      
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>  
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>  
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>  
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>  
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>  
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>  
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>  
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>  
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>  
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>  
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>  
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>  
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>  
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>  
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>  
                            <tr><td>0.0</td><td></td><td></td><td></td><td></td></tr>                                                    
                    </tbody>
                </table>

            </div>            
            <div  className="povertyDiv">
                <h2>People living in poverty</h2>
                <table className="povertyTable">
                    <thead>
                        <tr>
                            <th key={0}>Count #</th>
                            <th key={1}>Category</th>
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

