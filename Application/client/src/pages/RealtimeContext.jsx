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

const RealtimeContext = () => {
    // Handle user changing page so we can stop our run loop
    var pageUnloading = false;

    const [wealthColumns, setWealthColumns] = useState([])
    const [wealthRecords, setWealthRecords] = useState([])
    const [povertyRecords, setPovertyRecords] = useState([])
    
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

        while (true) {
            // Sleep to ensure page is loaded 
            await sleep(100);   
        
            // Set the intro text and store the total wealth
            var wealthRecord = wealthRecords[1];
            if (wealthRecord == null) continue;
            
            var introString = "The richest person in the UK is currently " + wealthRecord.Name + " with a total wealth of £" + wealthRecord.Wealth + "BN. We know that's a lot of money but actually how much is it and how much does it grow by? Let's assume a conservative growth rate of 5% ..."
            var introStringElement = document.getElementById("introString")
            totalWealth = wealthRecord.Wealth * 1000000000;
            
            if (introStringElement) introStringElement.innerHTML = introString;
            break;
        }
        var tmp = 0;

        // Call into our calc engine to get the growth values and set them in our table
        while (true) {          
            var realTimeTable = document.getElementsByClassName("realTimeTable")[0];
            
            // Since page loaded
            var interest = calcInterestSincePageLoaded(totalWealth);
            if (realTimeTable.rows != null) realTimeTable.rows[1].cells[0].innerHTML = interest;      

            // Since start of day
            var interest = calcInterestSinceStartOfDay(totalWealth);
            if (realTimeTable.rows != null) realTimeTable.rows[1].cells[1].innerHTML = interest;      

            // Since start of year
            var interest = calcInterestSinceStartOfYear(totalWealth);
            if (realTimeTable.rows != null) realTimeTable.rows[1].cells[2].innerHTML = interest;      

            await sleep(100); 
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
        </div>
    )
}

export default RealtimeContext

