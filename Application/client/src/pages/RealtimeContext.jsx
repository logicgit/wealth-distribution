// RealtimeContext.jsx
// Retrieves wealth data and the runs a continual loop which calls into the calculation engine
// to display our calcs.

import React from "react";
import axios from "axios";

import { useEffect } from 'react'
import { useState } from 'react'

import { calcInterestSincePageLoaded } from "../engine/engine"; 
import { calcInterestSinceStartOfDay } from "../engine/engine";
import { calcInterestSinceStartOfYear } from "../engine/engine";
import { howManyCanWeAfford } from "../engine/engine";

import FerrariImage from "../images/ferrari.png";
import PhoneImage from "../images/phone.png";
import BoatImage from "../images/boat.png";




const RealtimeContext = () => {
    // Handle user changing page so we can stop our run loop
    var pageUnloading = false;

    const [wealthColumns, setWealthColumns] = useState([])
    const [wealthRecords, setWealthRecords] = useState([])
    const [comparisonData, setComparisonData] = useState([])
    const [interestRates, setInterestRateData] = useState([])

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
    
    useEffect(()=>{
        window.addEventListener('beforeunload', () => {
            var pageUnload = true;
            console.log("temp");
        })   

        // Retrieves wealth data, stores it and writes the intro text
        const getData = async () =>{
            try{
                var res = await axios.get("http://localhost:8800/wealth_data")
                var jsonObject = JSON.parse(res.data[0].JSON);
                setWealthColumns(Object.keys(jsonObject.Wealth[0]));
                setWealthRecords(jsonObject.Wealth);

                res = await axios.get("http://localhost:8800/comparison_data")
                jsonObject = JSON.parse(res.data[0].JSON);
                setComparisonData(jsonObject.ComparisonItems)    
                
                // Load Interest rate data
                res = await axios.get("http://localhost:8800/interest_rates")
                jsonObject = JSON.parse(res.data[0].JSON);            
                setInterestRateData(jsonObject.InterestRates)                
            }
            catch(err){
                console.log(err)
            }        
        }
      
        getData();      
    },[])

    
    // This is our main run loop. Which calls into the calculation engine and updates our page then sleeps for 100ms.
    const calculationLoop = async () =>{
        var totalWealth = 0;
        var wealthRecord = null;
        var comparisonRecord = null;
        var interestRate = interestRates.UK;

        try {
            while (true) {
                // Sleep to ensure page is loaded 
                await sleep(100);   
            
                // Set the intro text and store the total wealth
                wealthRecord = wealthRecords[1];
                comparisonRecord = comparisonData[1];
    
                if (wealthRecord == null || comparisonRecord == null || interestRate == null) continue;
                
                var introString = "The richest person in the UK is currently " + wealthRecord.Name + " with a total wealth of £" + wealthRecord.Wealth + "BN. We know that's a lot of money but actually how much is it and how much does it grow by? Let's use the current Bank of England interest rate which is " + interestRates.UK + "%."  
                var introStringElement = document.getElementById("introString")
                totalWealth = wealthRecord.Wealth * 1000000000;
                
                if (introStringElement) introStringElement.innerHTML = introString;
                break;
            }

            // Divide the interest rate by 100
            interestRate /= 100;
    
            // Call into our calc engine to get the growth values and set them in our realTimeTable
            // Call into our calc engine and update the comparisonTable
            var headingPopulated = false;
            while (true) {          
                var realTimeTable = document.getElementsByClassName("realTimeTable")[0];
                var comparisonTable = document.getElementsByClassName("comparisonTable")[0];            

                // Since page loaded
                var pageInterest = calcInterestSincePageLoaded(totalWealth, interestRate);
                if (realTimeTable.rows != null) realTimeTable.rows[1].cells[0].innerHTML = pageInterest.toLocaleString();      
    
                // Since start of day
                var dayInterest = calcInterestSinceStartOfDay(totalWealth, interestRate);
                if (realTimeTable.rows != null) realTimeTable.rows[1].cells[1].innerHTML = dayInterest.toLocaleString();         
    
                // Since start of year
                var yearInterest = calcInterestSinceStartOfYear(totalWealth, interestRate);
                if (realTimeTable.rows != null) realTimeTable.rows[1].cells[2].innerHTML = yearInterest.toLocaleString();         
    
                // Comparison items
                // Populate the column headers
                if (!headingPopulated) {
                    if (comparisonTable.rows != null) {
                        for (var i = 0; i < comparisonData.length; i++)
                        {
                            var name = comparisonData[i].Name;
                            var cost = parseInt(comparisonData[i].Cost);
                            comparisonTable.rows[0].cells[i].innerHTML = name + " (£" + cost.toLocaleString() + ")";
                        }
                    }
    
                    // Populate the images
                    if (comparisonTable.rows != null) {
                        for (var i = 0; i < comparisonData.length; i++)
                        {
                            // TODO not working
                            var image = comparisonData[i].Image;
                            //document.getElementById("Image1").src = {PhoneImage};
                        }
                    }                
    
                    headingPopulated = true;
                }
    
                // Populate the counts
                if (comparisonTable.rows != null) {
                    for (var i = 0; i < comparisonData.length; i++)
                    {
                        var cost = parseInt(comparisonData[i].Cost);
                        var amount = 0;
                        switch (i) {
                            case 0:
                                amount = howManyCanWeAfford(cost, parseInt(pageInterest));
                                break;
                            case 1:
                                amount = howManyCanWeAfford(cost, parseInt(dayInterest));
                                break;
                            case 2:
                                amount = howManyCanWeAfford(cost, parseInt(yearInterest));
                                break;
                        }
                        howManyCanWeAfford(cost, parseInt(pageInterest));
                        comparisonTable.rows[2].cells[i].innerHTML = amount;
                    }
                }         
    
                await sleep(100); 
            }
        } catch (error) {
            console.log("Error in calculation loop: " + error);
        }
        
    }

    calculationLoop();  

    return (
        <div>
            <h1>Real-time growth</h1>
            <p id="introString"></p>
            <div className="realTimeDiv">
                <table className="realTimeTable">
                    <thead>
                        <tr>
                            <th>Since the page loaded £</th>
                            <th>Since the start of the day £</th>
                            <th>Since the start of the year £</th>                                                  
                        </tr>
                        </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>                                                  
                        </tr>                                               
                    </tbody>
                </table>
            </div>
            <p>So these are huge numbers and that's just how much their wealth is growing by! For each of these counters let's see what this money could buy them!</p>

            <div className="comparisonDiv">              

                <table className="comparisonTable">

                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>                                                  
                        </tr>
                        </thead>
                    <tbody>
                        <tr>
                            <td><img src={PhoneImage} alt="image1" id="Image1"></img></td>
                            <td><img src={FerrariImage} alt="image2" id="Image2"></img></td>
                            <td><img src={BoatImage} alt="image3" id="Image3"></img></td>
                        </tr>  
                        <tr>
                            <td>
                            </td>
                            <td></td>
                            <td></td>                                                  
                        </tr>   
                        <tr>                    
                            <td></td>
                            <td></td>
                            <td></td>                                                  
                        </tr>                                             
                    </tbody>
                </table>
            </div>
        </div>
        
    )
}

export default RealtimeContext

