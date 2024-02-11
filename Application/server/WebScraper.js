/* WebScraper.js: Javascript functions that at will scrape the web
for the metrics we need to write to our DB */

import axios from 'axios'
import { updateDB } from "./DBHandler.js"

// Use the Bank of England website to get the interest rate and call a function to scrape the html
// Then call a function to build up the JSON
// Then persist the data to the database
export async function scrapeInterestRateData() {
	try {
        console.log("Starting the webscrape: calling https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate")
		const response = await axios.get(
			'https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate'
		)
        var interestRate = parseInterestRateData(response.data)
        var interestRateJSON = buildInterestRateJSON(interestRate)

        // Update the DB
        updateDB("Interest Rates", interestRateJSON); 
        return interestRate
	} catch (error) {
		console.error(error)
	}
}

// Use the search string "stat-figure" and increment to get an offset
// so we can create a substring which searches for the next "<"
// 		<span class="stat-figure">5.25%</span>
function parseInterestRateData(html) {
    console.log("Parsing html")
    try {
        const currentRateOffset = html.search("stat-figure") + 13
        var currentRateSubstring = html.substr(currentRateOffset, 10)
        const spanOffset = currentRateSubstring.search("<")
        currentRateSubstring = currentRateSubstring.substr(0, spanOffset-1)
        console.log(currentRateSubstring)
        return currentRateSubstring
	} catch (error) {
		console.error(error)
	}        
}

// Use the passed in rate to build the JSON
// {"InterestRates": {"UK": "5.25"}}
function buildInterestRateJSON(interestRate) {
    console.log("Building interest rate JSON")
    try {    
        var interestRateJson = "{\"InterestRates\": {\"UK\": \"" + interestRate + "\"}}"
        console.log(interestRateJson)
        return interestRateJson
	} catch (error) {
		console.error(error)
        return error
	}         
}
